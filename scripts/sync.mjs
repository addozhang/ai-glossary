#!/usr/bin/env node
/**
 * sync.mjs — 把仓库内的内容编译成站点数据
 *
 * 用法：
 *   npm run sync
 *   node scripts/sync.mjs --check        # 只比对，不写入（CI 用）
 *
 * 输入：
 *   content/terms/<分类>/<id>.md   一条一个文件：frontmatter 存字段，正文存定义
 *   content/glossary.md            站点级文本：导语、辨析、参考链接、使用建议
 *   data/taxonomy.json             分类与标签的受控词表
 * 输出：
 *   data/glossary.js               供前端直接 <script> 引入（勿手改）
 *
 * 零第三方依赖，不读任何仓库外路径。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');
const TERMS_DIR = path.join(ROOT, 'content/terms');
const SITE_MD = path.join(ROOT, 'content/glossary.md');
const TAXONOMY = path.join(ROOT, 'data/taxonomy.json');
const OUT = path.join(ROOT, 'data/glossary.js');

function fail(msg) { console.error('✗ ' + msg); process.exit(1); }

/* ---------- frontmatter ---------- */
function unquote(v) {
  v = v.trim();
  if (v.length > 1 && v[0] === '"' && v[v.length - 1] === '"')
    return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  if (v.length > 1 && v[0] === "'" && v[v.length - 1] === "'")
    return v.slice(1, -1).replace(/''/g, "'");
  return v;
}
function parseFrontmatter(text, where) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) fail(`${where} 缺少 frontmatter`);
  const fm = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li && key) { (fm[key] = fm[key] || []).push(unquote(li[1])); continue; }
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const v = kv[2].trim();
    if (v === '') { fm[key] = []; continue; }
    if (/^\[.*\]$/.test(v)) {
      fm[key] = v.slice(1, -1).split(',').map(s => unquote(s)).filter(s => s !== '');
    } else {
      fm[key] = unquote(v);
    }
  }
  return { fm, body: text.slice(m[0].length).replace(/^\s*\n/, '') };
}

/* ---------- 受控词表 ---------- */
const tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
const CATS = tax.categories, TAGS = tax.tags;
const catById = {}, catIdx = {}, tagIds = new Set();
CATS.forEach((c, i) => { catById[c.id] = c; catIdx[c.id] = i; });
TAGS.forEach(t => tagIds.add(t.id));

/* ---------- 读词条：一条一个文件 ---------- */
const terms = [], ids = new Map();

for (const entry of fs.readdirSync(TERMS_DIR, { withFileTypes: true })) {
  if (entry.name.startsWith('.')) continue;
  if (!entry.isDirectory()) fail(`content/terms/ 下只应有分类目录，发现文件：${entry.name}`);
  const cat = entry.name;
  if (!catById[cat]) fail(`目录 content/terms/${cat}/ 不是已注册的分类，请先在 data/taxonomy.json 登记`);
  const dir = path.join(TERMS_DIR, cat);
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.')) continue;
    if (!f.endsWith('.md')) fail(`${cat}/${f} 不是 .md 文件`);
    const id = f.slice(0, -3);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) fail(`${cat}/${f}：文件名必须是 URL 安全的 id（小写字母、数字、连字符）`);
    if (ids.has(id)) fail(`id 重复：${id}（${ids.get(id)} 与 ${cat}/${f}）`);
    const where = `${cat}/${f}`;
    const { fm, body } = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8'), where);
    if (!fm.term) fail(`${where} 的 frontmatter 缺少 term`);
    const def = body.trim();
    if (!def) fail(`${where} 没有定义正文`);
    const tags = Array.isArray(fm.tags) ? fm.tags : [];
    for (const t of tags) if (!tagIds.has(t)) fail(`${where} 用了未登记的标签 #${t}`);
    const order = fm.order === undefined ? 9999 : Number(fm.order);
    if (Number.isNaN(order)) fail(`${where} 的 order 不是数字`);
    ids.set(id, where);
    terms.push({
      id, term: fm.term,
      en: typeof fm.en === 'string' ? fm.en : '',
      zh: typeof fm.zh === 'string' ? fm.zh : '',
      cat, tags: [...new Set(tags)].sort(), order, def,
    });
  }
}

if (!terms.length) fail('content/terms/ 下没有找到任何词条');

terms.sort((a, b) =>
  catIdx[a.cat] - catIdx[b.cat] || a.order - b.order || a.term.localeCompare(b.term, 'en'));

/* ---------- 读站点级文本 ---------- */
const SITE = fs.readFileSync(SITE_MD, 'utf8');
const { fm: siteFm, body: siteBody } = parseFrontmatter(SITE, 'content/glossary.md');
if (!siteFm.updated) fail('content/glossary.md 的 frontmatter 缺少 updated: YYYY-MM-DD');

const intro = [], leadLines = [], confusions = [], links = [], usageLines = [], notes = [];
let section = 'intro', linkGroup = '', inComment = false;
for (const line of siteBody.split('\n')) {
  if (inComment) { if (line.includes('-->')) inComment = false; continue; }
  if (/^\s*<!--/.test(line)) { if (!line.includes('-->')) inComment = true; continue; }
  const h = line.match(/^## (.+)$/);
  if (h) {
    const title = h[1].trim();
    if (title.startsWith('附二')) { section = 'links'; continue; }
    if (title.startsWith('附：')) { section = 'confusions'; continue; }
    if (title.startsWith('一条使用建议')) { section = 'usage'; continue; }
    if (/^〇、/.test(title)) { section = 'lead'; continue; }
    section = 'note'; notes.push({ title, lines: [] });
    continue;
  }
  if (/^---\s*$/.test(line) || !line.trim()) continue;
  switch (section) {
    case 'intro':  intro.push(line.trim()); break;
    case 'lead':   leadLines.push(line.trim()); break;
    case 'usage':  usageLines.push(line.trim()); break;
    case 'note':   notes[notes.length - 1].lines.push(line.trim()); break;
    case 'confusions': {
      const m = line.match(/^\| \*\*(.*?)\*\* \| (.*?) \|$/);
      if (m && !m[1].includes('容易混')) confusions.push({ pair: m[1], note: m[2] });
      break;
    }
    case 'links': {
      const g = line.match(/^\*\*(.+?)\*\*$/);
      if (g) { linkGroup = g[1]; break; }
      const m = line.match(/^- \[(.*?)\]\((.*?)\)/);
      if (m) links.push({ group: linkGroup, name: m[1], url: m[2] });
      break;
    }
  }
}

/* ---------- 输出 ---------- */
const fullTitle = typeof siteFm.title === 'string' ? siteFm.title : 'AI 黑话词典：LLM 时代的术语速查表';
const ti = fullTitle.indexOf('：');
const data = {
  meta: {
    title: ti > -1 ? fullTitle.slice(0, ti) : fullTitle,
    subtitle: ti > -1 ? fullTitle.slice(ti + 1) : 'LLM 时代的术语速查表',
    description: (intro[0] || '').replace(/\*\*/g, '').slice(0, 120),
    source: 'https://github.com/addozhang/ai-glossary',
    license: siteFm.license || 'CC BY 4.0',
    updated: siteFm.updated,
    count: terms.length,
  },
  categories: CATS,
  tags: TAGS,
  intro,
  lead: { title: '先分清那个「推理」', lines: leadLines },
  terms,
  confusions,
  links,
  usage: { title: '一条使用建议', lines: usageLines },
  notes,
};

const banner = `/* 自动生成，请勿直接编辑。\n * 词条源：content/terms/<分类>/<id>.md\n * 站点文本：content/glossary.md\n * 词表：data/taxonomy.json\n * 生成命令：npm run sync\n */\n`;
const output = banner + 'const GLOSSARY = ' + JSON.stringify(data, null, 2) + ';\n'
  + "if (typeof window !== 'undefined') window.GLOSSARY = GLOSSARY;\n"
  + "if (typeof module !== 'undefined' && module.exports) module.exports = GLOSSARY;\n";

if (CHECK_ONLY) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (current !== output) fail('内容源已修改但 data/glossary.js 未重新生成 —— 请运行 npm run sync 后提交');
  console.log('✓ 源与生成物一致');
  process.exit(0);
}

fs.writeFileSync(OUT, output, 'utf8');

const byCat = {};
terms.forEach(t => { byCat[t.cat] = (byCat[t.cat] || 0) + 1; });
console.log(`✓ ${terms.length} 词条 / ${confusions.length} 组辨析 / ${links.length} 条链接`);
console.log('  ' + CATS.map(c => `${c.name} ${byCat[c.id] || 0}`).join(' · '));
console.log(`  输出：${OUT}`);

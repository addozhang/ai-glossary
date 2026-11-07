#!/usr/bin/env node
/**
 * sync.mjs — 把仓库内的结构化内容编译成站点数据
 *
 * 用法：
 *   npm run sync
 *   node scripts/sync.mjs --check        # 只比对，不写入（CI 用）
 *
 * 输入（全部是结构化的，没有文章骨架）：
 *   content/terms/<分类>/<id>.md   词条：一条一个文件，frontmatter 存字段，正文存定义
 *   data/site.json                 站点元信息
 *   data/taxonomy.json             分类与标签的受控词表
 *   data/confusions.json           易混淆对照
 *   data/links.json                参考资源
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
const OUT = path.join(ROOT, 'data/glossary.js');

function fail(msg) { console.error('✗ ' + msg); process.exit(1); }
function readJSON(rel) {
  const p = path.join(ROOT, rel);
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { fail(`${rel} 不是合法 JSON：${e.message}`); }
}

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
const tax = readJSON('data/taxonomy.json');
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

/* ---------- 站点级结构化数据 ---------- */
const site = readJSON('data/site.json');
if (!site.title) fail('data/site.json 缺少 title');
if (!site.updated) fail('data/site.json 缺少 updated');

const confusions = readJSON('data/confusions.json');
if (!Array.isArray(confusions)) fail('data/confusions.json 必须是数组');
for (const c of confusions) {
  if (!c.pair || !c.note) fail(`confusions 条目缺少 pair 或 note：${JSON.stringify(c).slice(0, 60)}`);
  if (c.terms) for (const id of c.terms) {
    if (!ids.has(id)) fail(`data/confusions.json 里「${c.pair}」引用了不存在的词条 id：${id}`);
  }
}

const links = readJSON('data/links.json');
if (!Array.isArray(links)) fail('data/links.json 必须是数组');
for (const g of links) {
  if (!g.group || !Array.isArray(g.items)) fail('data/links.json 每个分组都需要 group 与 items');
  for (const it of g.items) {
    if (!it.name || !/^https?:\/\//.test(it.url)) fail(`参考链接非法：${JSON.stringify(it).slice(0, 60)}`);
  }
}

/* ---------- 输出 ---------- */
const data = {
  meta: {
    title: site.title,
    description: site.description || '',
    source: site.repo || 'https://github.com/addozhang/ai-glossary',
    license: site.license || 'CC BY 4.0',
    updated: site.updated,
    count: terms.length,
  },
  categories: CATS,
  tags: TAGS,
  terms,
  confusions,
  links,
};

const banner = `/* 自动生成，请勿直接编辑。\n * 词条源：content/terms/<分类>/<id>.md\n * 数据源：data/site.json、taxonomy.json、confusions.json、links.json\n * 生成命令：npm run sync\n */\n`;
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
const linkCount = links.reduce((n, g) => n + g.items.length, 0);
console.log(`✓ ${terms.length} 词条 / ${confusions.length} 组辨析 / ${linkCount} 条链接`);
console.log('  ' + CATS.map(c => `${c.name} ${byCat[c.id] || 0}`).join(' · '));
console.log(`  输出：${OUT}`);

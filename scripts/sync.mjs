#!/usr/bin/env node
/**
 * sync.mjs — 把仓库内的 Markdown 源编译成站点数据
 *
 * 用法：
 *   npm run sync
 *   node scripts/sync.mjs                      # 默认读 content/glossary.md
 *   node scripts/sync.mjs path/to/other.md    # 临时从别处导入（不产生依赖）
 *
 * 两个输入文件：
 *   content/glossary.md   词条、辨析、参考链接、正文散文（唯一内容源）
 *   data/taxonomy.json    分类与标签的受控词表
 * 一个输出文件：
 *   data/glossary.js      供前端直接 <script> 引入（勿手改）
 *
 * 不需要任何第三方依赖，也不依赖 Obsidian 或任何本机路径。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');
const MD = process.argv.find(a => !a.startsWith('-') && a.endsWith('.md'))
  ? path.resolve(process.argv.find(a => !a.startsWith('-') && a.endsWith('.md')))
  : path.join(ROOT, 'content/glossary.md');
const TAXONOMY = path.join(ROOT, 'data/taxonomy.json');
const OUT = path.join(ROOT, 'data/glossary.js');

const tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
const CATS = tax.categories, TAGS = tax.tags;
const catBySection = {}, catNameById = {}, tagIds = new Set();
CATS.forEach(c => { catBySection[c.section] = c.id; catNameById[c.id] = c.name; });
TAGS.forEach(t => tagIds.add(t.id));

const md = fs.readFileSync(MD, 'utf8');
const lines = md.split('\n');

/* ---------- frontmatter ---------- */
const fm = {};
if (lines[0].trim() === '---') {
  for (let i = 1; i < lines.length && lines[i].trim() !== '---'; i++) {
    const m = lines[i].match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^"|"$/g, '');
  }
}
if (!fm.updated) throw new Error('content/glossary.md 的 frontmatter 缺少 updated: YYYY-MM-DD');

/* ---------- utils ---------- */
function fail(msg) { console.error('✗ ' + msg); process.exit(1); }
function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36).slice(0, 5);
}
function slug(s) {
  let base = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!base) base = 'term';
  if (/[^\x00-\x7F]/.test(s)) base += '-' + hash(s);
  return base.slice(0, 64);
}
function parseName(raw) {
  const m = raw.match(/^(.*?)（(.*)）$/);
  if (!m) return { term: raw.trim(), en: '', zh: '' };
  const term = m[1].trim(), inner = m[2].trim();
  const parts = inner.split('，').map(x => x.trim());
  let en = '', zh = '';
  if (parts.length >= 2 && /[\u4e00-\u9fa5]/.test(parts[parts.length - 1])) {
    zh = parts.pop(); en = parts.join('，');
  } else if (/[\u4e00-\u9fa5]/.test(inner)) zh = inner;
  else en = inner;
  return { term, en, zh };
}
function parseTags(def) {
  const m = def.match(/(?:\s+#([a-z][a-z0-9-]*))+\s*$/);
  if (!m) return { def: def.trim(), tags: [] };
  const tags = [...m[0].matchAll(/#([a-z][a-z0-9-]*)/g)].map(x => x[1]);
  for (const t of tags) if (!tagIds.has(t)) {
    fail(`未知标签 #${t}（位置：${def.slice(0, 40)}…）。请先在 data/taxonomy.json 登记。`);
  }
  return { def: def.slice(0, m.index).trim(), tags: [...new Set(tags)].sort() };
}

/* ---------- parse ---------- */
const intro = [], leadLines = [], confusions = [], links = [], usageLines = [], notes = [];
const terms = [], usedIds = new Set();
let section = 'intro', cat = '', linkGroup = '', inComment = false;
let lineNo = 0;

for (const line of lines) {
  lineNo++;
  if (inComment) { if (line.includes('-->')) inComment = false; continue; }
  if (/^\s*<!--/.test(line)) { if (!line.includes('-->')) inComment = true; continue; }
  const h = line.match(/^## (.+)$/);
  if (h) {
    const title = h[1].trim();
    if (title.startsWith('附二')) { section = 'links'; cat = ''; continue; }
    if (title.startsWith('附：')) { section = 'confusions'; cat = ''; continue; }
    if (title.startsWith('一条使用建议')) { section = 'usage'; cat = ''; continue; }
    const m = title.match(/^([〇一二三四五六七八九十]+)、(.+)$/);
    if (m && m[1] === '〇') { section = 'lead'; cat = ''; continue; }
    if (m && catBySection[m[1]]) {
      cat = catBySection[m[1]];
      if (m[2] !== catNameById[cat]) {
        fail(`第 ${lineNo} 行：章节标题「${m[2]}」与 taxonomy.json 中的「${catNameById[cat]}」不一致，请同步修改。`);
      }
      section = 'terms'; continue;
    }
    section = 'note'; notes.push({ title, lines: [] }); cat = '';
    continue;
  }
  if (/^---\s*$/.test(line)) continue;
  if (line.trim() === '') continue;
  if (section === 'intro' && /^(title|updated|license):/.test(line)) continue;

  switch (section) {
    case 'intro':       intro.push(line.trim()); break;
    case 'lead':        leadLines.push(line.trim()); break;
    case 'usage':       usageLines.push(line.trim()); break;
    case 'note':        notes[notes.length - 1].lines.push(line.trim()); break;
    case 'terms': {
      const m = line.match(/^- \*\*(.*?)\*\* — (.*)$/);
      if (!m) break;
      const { term, en, zh } = parseName(m[1].trim());
      const parsed = parseTags(m[2]);
      let id = slug(term), n = 2;
      while (usedIds.has(id)) id = slug(term) + '-' + (n++);
      usedIds.add(id);
      terms.push({ id, term, en, zh, cat, tags: parsed.tags, def: parsed.def });
      break;
    }
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

if (!terms.length) throw new Error('没有解析到任何词条，请检查 content/glossary.md 的格式');

/* ---------- output ---------- */
const fullTitle = fm.title || 'AI 黑话词典：LLM 时代的术语速查表';
const ti = fullTitle.indexOf('：');
const data = {
  meta: {
    title: ti > -1 ? fullTitle.slice(0, ti) : fullTitle,
    subtitle: ti > -1 ? fullTitle.slice(ti + 1) : 'LLM 时代的术语速查表',
    description: (intro[0] || '').replace(/\*\*/g, '').slice(0, 120),
    source: 'https://github.com/addozhang/ai-glossary',
    license: fm.license || 'CC BY 4.0',
    updated: fm.updated,
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

const banner = `/* 自动生成，请勿直接编辑。\n * 内容源：content/glossary.md\n * 词表：data/taxonomy.json\n * 生成命令：npm run sync\n */\n`;
const output = banner + 'const GLOSSARY = ' + JSON.stringify(data, null, 2) + ';\n'
  + "if (typeof window !== 'undefined') window.GLOSSARY = GLOSSARY;\n"
  + "if (typeof module !== 'undefined' && module.exports) module.exports = GLOSSARY;\n";

if (CHECK_ONLY) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (current !== output) {
    console.error('✗ content/glossary.md 与 data/glossary.js 不同步，请运行 npm run sync 后提交。');
    process.exit(1);
  }
  console.log('✓ 源与生成物一致');
  process.exit(0);
}

fs.writeFileSync(OUT, output, 'utf8');

const byCat = {};
terms.forEach(t => { byCat[t.cat] = (byCat[t.cat] || 0) + 1; });
console.log(`✓ ${terms.length} 词条 / ${confusions.length} 组辨析 / ${links.length} 条链接`);
console.log('  ' + CATS.map(c => `${c.name} ${byCat[c.id] || 0}`).join(' · '));
console.log(`  源：${MD}`);
console.log(`  输出：${OUT}`);

#!/usr/bin/env node
/**
 * validate.mjs — 内容合规与质量校验（无第三方依赖）
 *
 * 分工：
 *   sync.mjs     负责「能不能解析」——格式错、标签未登记、id 冲突都会直接失败
 *   validate.mjs 负责「内容对不对」——同步状态、重复词条、质量下限、目录整洁
 *
 * CI 在每次 push / PR 时运行。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TERMS_DIR = path.join(ROOT, 'content/terms');
const SITE_MD = path.join(ROOT, 'content/glossary.md');

const errors = [], warns = [];
const E = m => errors.push(m);
const W = m => warns.push(m);

/* 1. 源与生成物同步（这一步同时跑完整解析，格式错误会在这里暴露） */
try {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/sync.mjs'), '--check'], { stdio: 'pipe' });
  console.log('✓ 源与生成物同步');
} catch (e) {
  const msg = (e.stderr || e.stdout || '').toString().trim().replace(/^✗\s*/, '');
  E(msg || 'content 与 data/glossary.js 不同步 —— 请运行 npm run sync');
}

const D = require(path.join(ROOT, 'data/glossary.js'));
const tax = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/taxonomy.json'), 'utf8'));
const site = fs.readFileSync(SITE_MD, 'utf8');

/* 2. frontmatter 与受控词表 */
const up = site.match(/^updated:\s*(\S+)/m);
if (!/^---\n[\s\S]*?\n---/.test(site)) E('content/glossary.md 缺少 frontmatter');
if (!up || !/^\d{4}-\d{2}-\d{2}$/.test(up[1])) E('frontmatter 缺少合法的 updated: YYYY-MM-DD');
else if (D.meta.updated !== up[1]) E('frontmatter 的 updated 与生成数据不一致');

const catIds = new Set(), sections = new Set();
for (const c of tax.categories) {
  if (!/^[a-z][a-z0-9-]*$/.test(c.id)) E(`分类 id 非法: ${c.id}`);
  if (catIds.has(c.id)) E(`分类 id 重复: ${c.id}`);
  catIds.add(c.id);
  if (sections.has(c.section)) E(`章节序号重复: ${c.section}`);
  sections.add(c.section);
  if (!c.name || !c.en || !c.desc || !c.section) E(`分类 ${c.id} 字段不完整`);
}
const tagIds = new Set();
for (const t of tax.tags) {
  if (!/^[a-z][a-z0-9-]*$/.test(t.id)) E(`标签 id 非法: ${t.id}`);
  if (tagIds.has(t.id)) E(`标签 id 重复: ${t.id}`);
  tagIds.add(t.id);
  if (!t.name || !t.desc) E(`标签 ${t.id} 字段不完整`);
}
if (D.categories.length !== tax.categories.length || D.tags.length !== tax.tags.length)
  E('生成数据中的词表数量与 taxonomy.json 不一致');

/* 3. 词条质量 */
const names = new Map();
for (const t of D.terms) {
  const where = `${t.cat}/${t.id}.md`;
  if (names.has(t.term)) E(`词条名称重复：「${t.term}」同时出现在 ${names.get(t.term)} 与 ${where}`);
  names.set(t.term, where);
  if (!t.term || !t.def) E(`${where} 缺少 term 或定义正文`);
  if (!catIds.has(t.cat)) E(`${where} 分类 ${t.cat} 不在受控词表中`);
  for (const x of t.tags) if (!tagIds.has(x)) E(`${where} 标签 ${x} 不在受控词表中`);
  if (t.def.length < 8) W(`${where} 定义过短（${t.def.length} 字）`);
  if (/见第[〇一二三四五六七八九十]+节|你说的|大概率/.test(t.def)) E(`${where} 含交叉引用或对话残留`);
  if (/<script|javascript:|onerror=/i.test(t.def + t.term)) E(`${where} 含不安全内容`);
  if (/^\s*---/m.test(t.def)) E(`${where} 正文里出现了意外的分隔线（检查 frontmatter 是否写多了 ---）`);
}

/* 4. 目录整洁：每个分类目录都存在，且没有多余文件 */
for (const c of tax.categories) {
  const dir = path.join(TERMS_DIR, c.id);
  if (!fs.existsSync(dir)) { W(`分类「${c.name}」缺少目录 content/terms/${c.id}/`); continue; }
  if (!D.terms.some(t => t.cat === c.id)) W(`分类「${c.name}」还没有词条`);
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.')) continue;
    if (!f.endsWith('.md')) E(`content/terms/${c.id}/${f} 不是 .md 文件`);
    if (f !== f.toLowerCase()) E(`content/terms/${c.id}/${f} 文件名应全小写`);
  }
}
for (const e of fs.readdirSync(TERMS_DIR, { withFileTypes: true })) {
  if (e.name.startsWith('.')) continue;
  if (!e.isDirectory()) E(`content/terms/${e.name} 不是目录`);
  else if (!catIds.has(e.name)) E(`目录 content/terms/${e.name}/ 不是已注册的分类`);
}
const fileCount = tax.categories.reduce((n, c) => {
  const dir = path.join(TERMS_DIR, c.id);
  return n + (fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')).length : 0);
}, 0);
if (fileCount !== D.terms.length) E(`磁盘上有 ${fileCount} 个词条文件，但解析出 ${D.terms.length} 条，可能有文件被跳过`);

/* 5. 站点级区块 */
if (!D.confusions.length) E('confusions（辨析表）为空');
for (const c of D.confusions) if (!c.pair || !c.note) E('辨析条目字段不完整');
for (const l of D.links) {
  if (!/^https?:\/\//.test(l.url)) E(`参考链接协议非法: ${l.url}`);
  if (!l.name || !l.group) E(`参考链接「${l.url}」字段不完整`);
}
if (!D.lead || !D.lead.lines.length) E('lead（推理辨析提示卡）为空');
if (!D.intro || !D.intro.length) E('intro（首屏导语）为空');
if (!D.usage || !D.usage.lines.length) W('usage（一条使用建议）为空');
for (const k of ['title', 'subtitle', 'description', 'updated', 'license', 'count'])
  if (!D.meta[k]) E(`meta.${k} 缺失`);
if (D.meta.count !== D.terms.length) E(`meta.count (${D.meta.count}) 与实际词条数 (${D.terms.length}) 不一致`);

/* 报告 */
const byCat = {};
for (const t of D.terms) byCat[t.cat] = (byCat[t.cat] || 0) + 1;
console.log(`词条 ${D.terms.length} · 分类 ${tax.categories.length} · 标签 ${tax.tags.length} · 辨析 ${D.confusions.length} · 链接 ${D.links.length}`);
warns.forEach(w => console.log('  ⚠ ' + w));
if (errors.length) {
  errors.forEach(e => console.error('  ✗ ' + e));
  console.error(`\n校验失败：${errors.length} 个错误`);
  process.exit(1);
}
console.log('✓ 校验通过');

#!/usr/bin/env node
/**
 * validate.mjs — 内容与词表合规校验（无第三方依赖）
 *
 * 每次 push / PR 由 CI 运行，检查：
 *   1. content/glossary.md 与 data/glossary.js 是否同步（防止改了源忘记编译）
 *   2. data/taxonomy.json 受控词表本身是否合法
 *   3. 词条字段、分类、标签、辨析、链接是否符合规范
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const D = require(path.join(ROOT, 'data/glossary.js'));
const tax = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/taxonomy.json'), 'utf8'));
const src = fs.readFileSync(path.join(ROOT, 'content/glossary.md'), 'utf8');

const errors = [], warns = [];
const E = m => errors.push(m);
const W = m => warns.push(m);

/* 1. 源与生成物同步 */
try {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/sync.mjs'), '--check'], { stdio: 'pipe' });
  console.log('✓ 源与生成物同步');
} catch (e) {
  E('content/glossary.md 已修改但 data/glossary.js 未重新生成 —— 请运行 npm run sync');
}

/* 2. frontmatter 与受控词表 */
if (!/^---\n[\s\S]*?\n---/.test(src)) E('content/glossary.md 缺少 frontmatter');
const up = src.match(/^updated:\s*(\S+)/m);
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
  if (!new RegExp(`^## ${c.section}、${c.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm').test(src))
    E(`源文件缺少或写错了章节「## ${c.section}、${c.name}」`);
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

/* 3. meta */
for (const k of ['title', 'subtitle', 'description', 'updated', 'license', 'count'])
  if (!D.meta[k]) E(`meta.${k} 缺失`);
if (D.meta.count !== D.terms.length) E(`meta.count (${D.meta.count}) 与实际词条数 (${D.terms.length}) 不一致`);

/* 4. 词条 */
const ids = new Set(), names = new Set();
for (const t of D.terms) {
  const where = `词条「${t.term}」`;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(t.id)) E(`${where} id 格式非法: ${t.id}`);
  if (ids.has(t.id)) E(`${where} id 重复: ${t.id}`);
  ids.add(t.id);
  if (names.has(t.term)) E(`${where} 名称重复，请合并或改名`);
  names.add(t.term);
  if (!t.term || !t.def) E(`${where} 缺少 term 或 def`);
  if (!catIds.has(t.cat)) E(`${where} 分类 ${t.cat} 不在受控词表中`);
  if (!Array.isArray(t.tags)) E(`${where} tags 不是数组`);
  else for (const x of t.tags) if (!tagIds.has(x)) E(`${where} 标签 ${x} 不在受控词表中`);
  if (t.def.length < 8) W(`${where} 定义过短`);
  if (/\s#[a-z][a-z0-9-]*\s*$/.test(t.def)) E(`${where} 定义末尾残留未解析的 #标签`);
  if (/见第[〇一二三四五六七八九十]+节|你说的|大概率/.test(t.def)) E(`${where} 定义含交叉引用或对话残留`);
  if (/<script|javascript:|onerror=/i.test(t.def + t.term)) E(`${where} 含不安全内容`);
}

/* 5. 辨析、链接、正文区块 */
if (!D.confusions.length) E('confusions 为空');
for (const c of D.confusions) if (!c.pair || !c.note) E('辨析条目字段不完整');
for (const l of D.links) {
  if (!/^https?:\/\//.test(l.url)) E(`参考链接协议非法: ${l.url}`);
  if (!l.name || !l.group) E(`参考链接「${l.url}」字段不完整`);
}
if (!D.lead || !D.lead.lines.length) E('lead 为空');
if (!D.intro || !D.intro.length) E('intro 为空');
if (!D.usage || !D.usage.lines.length) W('usage（一条使用建议）为空');

/* 报告 */
const byCat = {};
for (const t of D.terms) byCat[t.cat] = (byCat[t.cat] || 0) + 1;
console.log(`词条 ${D.terms.length} · 分类 ${tax.categories.length} · 标签 ${tax.tags.length} · 辨析 ${D.confusions.length} · 链接 ${D.links.length}`);
for (const c of tax.categories) if (!byCat[c.id]) W(`分类「${c.name}」当前没有词条`);
warns.forEach(w => console.log('  ⚠ ' + w));
if (errors.length) {
  errors.forEach(e => console.error('  ✗ ' + e));
  console.error(`\n校验失败：${errors.length} 个错误`);
  process.exit(1);
}
console.log('✓ 校验通过');

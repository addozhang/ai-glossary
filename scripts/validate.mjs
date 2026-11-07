#!/usr/bin/env node
/**
 * validate.mjs — 数据合规校验（无第三方依赖）
 * CI 会在每次 push / PR 时运行，防止分类、标签、字段失控。
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const D = require(path.join(ROOT, 'data/glossary.js'));
const overrides = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/tag-overrides.json'), 'utf8'));

const errors = [];
const warns = [];
const E = m => errors.push(m);
const W = m => warns.push(m);

/* meta */
for (const k of ['title', 'subtitle', 'description', 'updated', 'license', 'count']) {
  if (!D.meta || !D.meta[k]) E(`meta.${k} 缺失`);
}
if (D.meta && D.meta.count !== D.terms.length) E(`meta.count (${D.meta.count}) 与实际词条数 (${D.terms.length}) 不一致`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(D.meta.updated)) E('meta.updated 必须为 YYYY-MM-DD');

/* 分类受控词表 */
const catIds = new Set();
if (!Array.isArray(D.categories) || D.categories.length === 0) E('categories 为空');
for (const c of D.categories) {
  if (!/^[a-z][a-z0-9-]*$/.test(c.id)) E(`分类 id 非法: ${c.id}`);
  if (catIds.has(c.id)) E(`分类 id 重复: ${c.id}`);
  catIds.add(c.id);
  if (!c.name || !c.en || !c.desc) E(`分类 ${c.id} 字段不完整`);
}

/* 标签受控词表 */
const tagIds = new Set();
for (const t of D.tags) {
  if (!/^[a-z][a-z0-9-]*$/.test(t.id)) E(`标签 id 非法: ${t.id}`);
  if (tagIds.has(t.id)) E(`标签 id 重复: ${t.id}`);
  tagIds.add(t.id);
  if (!t.name || !t.desc) E(`标签 ${t.id} 字段不完整`);
}

/* 词条 */
const ids = new Set();
const termNames = new Set();
for (const t of D.terms) {
  const where = `词条「${t.term}」`;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(t.id)) E(`${where} id 格式非法: ${t.id}`);
  if (ids.has(t.id)) E(`${where} id 重复: ${t.id}`);
  ids.add(t.id);
  if (termNames.has(t.term)) W(`${where} 名称重复，请确认是否为同义词条目`);
  termNames.add(t.term);
  if (!t.term || !t.def) E(`${where} 缺少 term 或 def`);
  if (!catIds.has(t.cat)) E(`${where} 分类 ${t.cat} 不在受控词表中`);
  if (!Array.isArray(t.tags)) E(`${where} tags 不是数组`);
  else for (const x of t.tags) if (!tagIds.has(x)) E(`${where} 标签 ${x} 不在受控词表中`);
  if (t.def.length < 8) W(`${where} 定义过短`);
  if (/见第[〇一二三四五六七八九十]+节|你说的|大概率/.test(t.def)) E(`${where} 定义含源笔记的交叉引用或对话残留，站点上无法自洽`);
  if (/<script|javascript:|onerror=/i.test(t.def + t.term)) E(`${where} 含不安全内容`);
}

/* overrides 的 key 必须对应真实词条 */
for (const k of Object.keys(overrides)) {
  if (!termNames.has(k)) E(`tag-overrides.json 里的「${k}」没有对应词条（key 必须等于 term 字段）`);
  for (const x of overrides[k]) if (!tagIds.has(x)) E(`tag-overrides.json 里「${k}」用了非法标签 ${x}`);
}

/* 辨析与链接 */
if (!D.confusions.length) E('confusions 为空');
for (const c of D.confusions) if (!c.pair || !c.note) E('辨析条目字段不完整');
for (const l of D.links) {
  if (!/^https?:\/\//.test(l.url)) E(`参考链接协议非法: ${l.url}`);
  if (!l.name || !l.group) E(`参考链接「${l.url}」字段不完整`);
}
if (!D.lead || !D.lead.lines.length) E('lead 为空');

/* 报告 */
const byCat = {};
for (const t of D.terms) byCat[t.cat] = (byCat[t.cat] || 0) + 1;
console.log(`词条 ${D.terms.length} · 分类 ${D.categories.length} · 标签 ${D.tags.length} · 辨析 ${D.confusions.length} · 链接 ${D.links.length}`);
for (const c of D.categories) if (!byCat[c.id]) W(`分类「${c.name}」当前没有词条`);
warns.forEach(w => console.log('  ⚠ ' + w));
if (errors.length) {
  errors.forEach(e => console.error('  ✗ ' + e));
  console.error(`\n校验失败：${errors.length} 个错误`);
  process.exit(1);
}
console.log('✓ 校验通过');

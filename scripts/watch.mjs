#!/usr/bin/env node
/**
 * watch.mjs — 本地写作时的自动编译
 *
 * 监听 content/terms（递归）、content/glossary.md、data/taxonomy.json，
 * 保存即重新生成并校验。配合 npm run serve 使用时，刷新浏览器即可看到改动。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function rebuild() {
  console.log('\n[' + new Date().toLocaleTimeString('zh-CN') + '] 检测到改动，重新编译…');
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/sync.mjs')], { stdio: 'inherit', cwd: ROOT });
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/validate.mjs')], { stdio: 'inherit', cwd: ROOT });
    console.log('✓ 已更新 data/glossary.js，刷新浏览器即可');
  } catch (e) {
    console.error('✗ 编译或校验失败，按上面的提示修正后重新保存');
  }
}

let timer = null;
function onChange() {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 180);
}

const targets = [
  ['content/terms', { recursive: true }],
  ['content/glossary.md', {}],
  ['data/taxonomy.json', {}],
];
let count = 0;
for (const [rel, opts] of targets) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.warn('跳过不存在的路径：' + rel); continue; }
  fs.watch(p, opts, onChange);
  count++;
}
console.log(`监听中（${count} 个目标）：` + targets.map(t => t[0]).join('、'));
console.log('另开一个终端运行 npm run serve，然后打开 http://localhost:8080');
rebuild();

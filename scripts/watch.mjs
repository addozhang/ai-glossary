#!/usr/bin/env node
/**
 * watch.mjs — 本地写作时的自动编译
 *
 * 监听 content/glossary.md 与 data/taxonomy.json，保存即重新生成并校验。
 * 配合 npm run serve 使用时，刷新浏览器即可看到改动。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const watched = ['content/glossary.md', 'data/taxonomy.json'];

function rebuild() {
  console.log('\n[' + new Date().toLocaleTimeString('zh-CN') + '] 检测到改动，重新编译…');
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/sync.mjs')], { stdio: 'inherit', cwd: ROOT });
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/validate.mjs')], { stdio: 'inherit', cwd: ROOT });
    console.log('✓ 已更新 data/glossary.js，刷新浏览器即可');
  } catch (e) {
    console.error('✗ 编译或校验失败，请按上面的提示修正后重新保存');
  }
}

let timer = null;
for (const f of watched) {
  const p = path.join(ROOT, f);
  fs.watch(p, () => { clearTimeout(timer); timer = setTimeout(rebuild, 180); });
}
console.log('监听中：' + watched.join('、'));
console.log('另开一个终端运行 npm run serve，然后打开 http://localhost:8080');
rebuild();

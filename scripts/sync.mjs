#!/usr/bin/env node
/**
 * sync.mjs — 把 Obsidian 里的 Markdown 词典同步成站点数据
 *
 * 用法：
 *   node scripts/sync.mjs
 *   node scripts/sync.mjs /path/to/AI 黑话词典：LLM 时代的术语速查表.md
 *
 * 唯一权威数据源是 Markdown 源文件。生成物是 data/glossary.js，
 * 不要手改生成物；手工标签写在 data/tag-overrides.json 里，同步时会保留。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_MD = '/Users/addo/iCloud Drive/Obsidian/atbug/笔记/AI/AI 黑话词典：LLM 时代的术语速查表.md';
const MD_PATH = process.argv[2] || DEFAULT_MD;
const OUT = path.join(ROOT, 'data/glossary.js');
const OVERRIDES = path.join(ROOT, 'data/tag-overrides.json');

/* ---------- 受控词表：分类 ---------- */
const CATEGORIES = [
  { id: 'architecture', name: '模型与架构', en: 'Architecture', desc: '模型本体：参数、注意力、位置编码、稀疏结构' },
  { id: 'training',     name: '训练与对齐', en: 'Training & Alignment', desc: '怎么把模型训出来、怎么让它听话' },
  { id: 'reasoning',    name: '推理与生成', en: 'Reasoning & Decoding', desc: '从思考链到采样策略' },
  { id: 'prompting',    name: '提示与上下文', en: 'Prompt & Context', desc: '决定什么信息进入上下文窗口' },
  { id: 'rag',          name: '检索与知识', en: 'Retrieval & RAG', desc: '让回答绑定到外部事实' },
  { id: 'agent',        name: 'Agent 与工具', en: 'Agents & Tools', desc: '让模型能规划、调用、迭代' },
  { id: 'evaluation',   name: '评测与基准', en: 'Evaluation', desc: '怎么判断"真的更好"' },
  { id: 'serving',      name: '部署与推理工程', en: 'Serving & Infra', desc: '吞吐、延迟、显存、成本' },
  { id: 'multimodal',   name: '多模态与生成', en: 'Multimodal', desc: '图像、语音、视频、世界模型' },
  { id: 'safety',       name: '安全与伦理', en: 'Safety & Ethics', desc: '攻击面、对齐、可解释性' },
  { id: 'ecosystem',    name: '生态与产品', en: 'Ecosystem', desc: '框架、平台、工程组织' },
  { id: 'business',     name: '行业叙事', en: 'Narratives', desc: '营销词、造词、行业黑话' },
];

const SECTION_MAP = {
  '一': 'architecture', '二': 'training', '三': 'reasoning', '四': 'prompting',
  '五': 'rag', '六': 'agent', '七': 'evaluation', '八': 'serving',
  '九': 'multimodal', '十': 'safety', '十一': 'ecosystem', '十二': 'business',
};

/* ---------- 受控词表：标签（横向维度，与分类正交） ---------- */
const TAGS = [
  { id: 'core',    name: '核心', desc: '理解其它词条的地基' },
  { id: 'pitfall', name: '易混淆', desc: '名称相近但含义不同，或常被误用' },
  { id: 'eng',     name: '工程', desc: '落地时会真实碰到' },
  { id: 'cost',    name: '成本', desc: '直接影响钱、显存或延迟' },
  { id: 'new',     name: '新词', desc: '2024 年后出现或流行' },
  { id: 'hype',    name: '营销', desc: '来自发布会或社媒的叙事词' },
  { id: 'debate',  name: '有争议', desc: '定义或有效性存在争论' },
  { id: 'sec',     name: '安全', desc: '涉及攻击面、风险或对齐' },
];

/* ---------- 自动打标签规则 ---------- */
const CORE = new Set([
  'LLM','Transformer','Attention','Token','Embedding','Context Window','Parameter','MoE','KV Cache',
  'Pretraining','Scaling Law','SFT','RLHF','DPO','Fine-tuning','LoRA','Distillation','Alignment',
  'Inference（推理/推断）','Hallucination','CoT','ICL','Test-Time Compute','Temperature',
  'Prompt','Context Engineering','RAG','Chunking','Embedding Model','Vector Database','Reranker',
  'Agent','Tool Use / Function Calling','MCP','Memory','Benchmark','SWE-bench','LLM-as-a-Judge',
  'TTFT','Quantization','vLLM / SGLang / TensorRT-LLM','Diffusion Model','Prompt Injection','AGI',
]);

const NEW_WORDS = new Set([
  'GRPO','MCP','A2A','Sub-agent','Harness','Loop Engineering','Skill','GraphRAG','Agentic RAG',
  'Context Engineering','Context Rot / Context Overflow','Extended Thinking / Thinking Budget',
  'Test-Time Compute','Reasoning Model','HLE','SWE-bench','Vibes-based Eval','SGLang',
  'Speculative Decoding','PagedAttention','Flow Matching','DiT','World Model','VLA','SAE',
  'Vibe Coding','Software 3.0','Prompt-to-App','Agent 元年','Scaling Wall','Feature Steering',
  'Model Router','Omni Model','Genie / Generative Environment','A2A（Agent to Agent）',
]);

const HYPE_WORDS = new Set([
  'Vibe Coding','Software 3.0','Prompt-to-App','Agent 元年','推理成本曲线',
  'Context 是新的内存 / 检索是新的磁盘','数字员工 / 硅基员工','六小虎','参数通货膨胀',
  '榜单刷分（Benchmark Gaming）','Wrapper / 套壳','AI Native（AI 原生）','AI Infra',
  'Vibes-based Eval','Frontier Model（前沿模型）','Data Flywheel（数据飞轮）',
]);

const PITFALL_RE = /区别|混淆|两回事|不等于|不是替代|与.*不同|注意：|争议|受到质疑|相对概念|是两回事|容易被|误用|别把|不是.*而是/;
const COST_RE = /成本|计费|价格|省钱|更省|更贵|显存|算力|降本|价格|吞吐|延迟|按.*计价|省一大截|便宜/;
const ENG_RE = /生产环境|工程|部署|服务|框架|索引|缓存|批处理|调度|运行时|流水线|监控|回归|线上|落地|实现|工具|协议|平台/;
const DEBATE_RE = /争议|受到质疑|假象|不必然|有争议|不等于|没有硬门槛|被半开玩笑|更像一个立场/;

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
  const term = m[1].trim();
  const inner = m[2].trim();
  const parts = inner.split('，').map(x => x.trim());
  let en = '', zh = '';
  if (parts.length >= 2 && /[\u4e00-\u9fa5]/.test(parts[parts.length - 1])) {
    zh = parts.pop();
    en = parts.join('，');
  } else if (/[\u4e00-\u9fa5]/.test(inner)) {
    zh = inner;
  } else {
    en = inner;
  }
  return { term, en, zh };
}
function autoTags(name, def, cat) {
  const tags = new Set();
  const raw = name.replace(/（.*）$/, '');
  if (CORE.has(name) || CORE.has(raw)) tags.add('core');
  if (NEW_WORDS.has(name) || NEW_WORDS.has(raw)) tags.add('new');
  if (HYPE_WORDS.has(name) || HYPE_WORDS.has(raw) || cat === 'business') tags.add('hype');
  if (PITFALL_RE.test(def)) tags.add('pitfall');
  if (DEBATE_RE.test(def)) tags.add('debate');
  if (COST_RE.test(def)) tags.add('cost');
  if (ENG_RE.test(def) && ['rag','agent','prompting','serving','ecosystem','evaluation'].includes(cat)) tags.add('eng');
  if (cat === 'safety') tags.add('sec');
  return [...tags];
}

/* ---------- 解析 Markdown ---------- */
const md = fs.readFileSync(MD_PATH, 'utf8');
const lines = md.split('\n');

const terms = [];
const confusions = [];
const links = [];
const lead = { title: '先分清那个「推理」', lines: [] };
const usedIds = new Set();
let cat = '';
let linkGroup = '';
let section = '';

for (const line of lines) {
  const h = line.match(/^## (.+)$/);
  if (h) {
    const title = h[1].trim();
    if (title.startsWith('附二')) { section = 'links'; cat = ''; continue; }
    if (title.startsWith('附')) { section = 'confusions'; cat = ''; continue; }
    const m = title.match(/^([〇一二三四五六七八九十]+)、/);
    if (m && m[1] === '〇') { section = 'lead'; cat = ''; continue; }
    if (m) { cat = SECTION_MAP[m[1]] || ''; section = cat ? 'terms' : ''; }
    else { section = ''; cat = ''; }
    continue;
  }
  if (/^---\s*$/.test(line)) continue;

  if (section === 'lead') {
    if (line.trim()) lead.lines.push(line.trim());
    continue;
  }

  if (section === 'terms' && cat) {
    const m = line.match(/^- \*\*(.*?)\*\* — (.*)$/);
    if (!m) continue;
    const name = m[1].trim();
    const def = m[2].trim();
    const { term, en, zh } = parseName(name);
    let id = slug(term), n = 2;
    while (usedIds.has(id)) id = slug(term) + '-' + (n++);
    usedIds.add(id);
    terms.push({ id, term, en, zh, cat, tags: autoTags(name, def, cat), def });
    continue;
  }

  if (section === 'confusions') {
    const m = line.match(/^\| \*\*(.*?)\*\* \| (.*?) \|$/);
    if (m && !m[1].includes('容易混')) confusions.push({ pair: m[1], note: m[2] });
    continue;
  }

  if (section === 'links') {
    const g = line.match(/^\*\*(.+?)\*\*$/);
    if (g) { linkGroup = g[1]; continue; }
    const m = line.match(/^- \[(.*?)\]\((.*?)\)/);
    if (m) links.push({ group: linkGroup, name: m[1], url: m[2] });
  }
}

/* ---------- 合并手工标签覆盖 ---------- */
let overrides = {};
if (fs.existsSync(OVERRIDES)) overrides = JSON.parse(fs.readFileSync(OVERRIDES, 'utf8'));
for (const t of terms) {
  if (overrides[t.term]) t.tags = overrides[t.term];
  t.tags = [...new Set(t.tags)].filter(x => TAGS.some(v => v.id === x)).sort();
}

/* ---------- 输出 ---------- */
const data = {
  meta: {
    title: 'AI 黑话词典',
    subtitle: 'LLM 时代的术语速查表',
    description: '把 AI / LLM 圈的黑话按十二条脉络整理成可查的词典：从 Transformer 到 Agent，从幻觉到 Vibe Coding。',
    source: 'https://github.com/addozhang/ai-glossary',
    license: 'CC BY 4.0',
    updated: new Date().toISOString().slice(0, 10),
    count: terms.length,
  },
  categories: CATEGORIES,
  tags: TAGS,
  lead,
  terms,
  confusions,
  links,
};

const banner = `/* 本文件由 scripts/sync.mjs 自动生成，请勿直接编辑。\n * 修改词条请编辑 Markdown 源文件后重新运行 node scripts/sync.mjs\n * 生成时间：${new Date().toISOString()}\n */\n`;
fs.writeFileSync(OUT, banner + 'const GLOSSARY = ' + JSON.stringify(data, null, 2) + ';\n'
  + "if (typeof window !== 'undefined') window.GLOSSARY = GLOSSARY;\n"
  + "if (typeof module !== 'undefined' && module.exports) module.exports = GLOSSARY;\n", 'utf8');

const byCat = {};
for (const t of terms) byCat[t.cat] = (byCat[t.cat] || 0) + 1;
console.log(`✓ ${terms.length} 词条 / ${confusions.length} 组辨析 / ${links.length} 条参考链接`);
console.log('  分类：' + CATEGORIES.map(c => `${c.name} ${byCat[c.id] || 0}`).join(' · '));
console.log(`  输出：${OUT}`);

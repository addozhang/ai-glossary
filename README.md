# AI 黑话词典

**在线站点**：https://addozhang.github.io/ai-glossary/

LLM 时代术语速查表。纯静态、零依赖、无构建步骤，支持全文检索、分类筛选、标签筛选、深链接和深浅色主题。

## 特性

| 能力 | 说明 |
|---|---|
| 全文检索 | 同时匹配英文术语、英文全称、中文名、定义正文、分类名、标签名；空格分隔多个关键词取交集；结果高亮 |
| 分类筛选 | 12 个按知识层级划分的分类，侧栏实时显示每个分类在当前条件下的命中数 |
| 标签筛选 | 8 个跨分类的横向标签，多选取交集；受控词表，不允许随意新增 |
| 深链接 | 每条卡片右上角的 `#` 复制独立链接；搜索与筛选状态写进 URL hash，可分享、可前进后退 |
| 键盘 | `⌘K` / `Ctrl+K` 聚焦搜索，`Esc` 清空，输入框内直接打字即筛 |
| 主题 | 跟随系统偏好，可手动切换并记住选择；也可用 `?theme=light` / `?theme=dark` 强制指定 |
| 部署 | GitHub Pages 直接从 `main` 根目录提供，push 即生效，无需 Actions 构建 |

隐私：无 CDN、无 Cookie、无追踪脚本、无第三方字体，可离线打开（`data/glossary.js` 用普通 `<script>` 引入，不受 `file://` 的 CORS 限制）。

## 目录结构

```
index.html                 页面骨架
assets/style.css           样式（含深浅色变量）
assets/app.js              筛选 / 渲染 / 交互，零依赖
assets/favicon.svg
data/glossary.js           ← 站点唯一数据源（自动生成，勿手改）
data/tag-overrides.json    ← 手工标签覆盖（唯一需要手改的数据文件）
scripts/sync.mjs           从 Markdown 笔记生成 data/glossary.js
scripts/validate.mjs       数据合规校验
.github/workflows/ci.yml   push / PR 时自动跑校验
```

## 怎么更新

**权威数据源是 Obsidian 笔记库里的 Markdown 源文件**（默认路径写在 `scripts/sync.mjs` 顶部）：

```
/Users/addo/iCloud Drive/Obsidian/atbug/笔记/AI/AI 黑话词典：LLM 时代的术语速查表.md
```

### 新增或修改一个词条

1. 在源 Markdown 对应章节加一行：

   ```markdown
   - **Term（English Full Name，中文名）** — 一句话定义，可用 **加粗** 强调。
   ```

2. 重新生成并校验：

   ```bash
   node scripts/sync.mjs          # 也可传入别的 Markdown 路径
   node scripts/validate.mjs
   ```

3. `git commit && git push` —— Pages 几十秒内自动更新，无需任何构建。

源 Markdown 的路径如果变了，用参数指定：`node scripts/sync.mjs /path/to/glossary.md`，或改 `scripts/sync.mjs` 里的 `DEFAULT_MD`。

### 手工指定标签

自动打标签基于关键词规则，需要精确控制时编辑 `data/tag-overrides.json`：

```json
{
  "RAG": ["core", "eng"],
  "AGI": ["debate", "hype"]
}
```

key 必须等于词条的 `term` 字段（**不含括号里的中文名**）。`sync.mjs` 每次都会重新读取这个文件，覆盖规则的结果不会被冲掉。`validate.mjs` 会检查 key 是否对应真实词条、标签是否在受控词表内。

### 本地预览

```bash
python3 -m http.server 8080
# 打开 http://localhost:8080
```

直接双击 `index.html` 也能看（`file://` 下同样可用）。

## 分类与标签（受控词表）

分类是**纵向的知识层级**，一个词条只属于一个分类；标签是**横向的观察维度**，可取多个。两者都由 `scripts/sync.mjs` 里的常量定义，`validate.mjs` 强制校验，避免标签泛滥。

### 12 个分类

| id | 名称 | 覆盖范围 |
|---|---|---|
| `architecture` | 模型与架构 | 参数、注意力、位置编码、稀疏结构 |
| `training` | 训练与对齐 | 预训练、微调、偏好优化、数据 |
| `reasoning` | 推理与生成 | 思维链、测试时计算、采样策略 |
| `prompting` | 提示与上下文 | 决定什么信息进入上下文窗口 |
| `rag` | 检索与知识 | 让回答绑定到外部事实 |
| `agent` | Agent 与工具 | 规划、调用、迭代、协议 |
| `evaluation` | 评测与基准 | 榜单、指标、污染与饱和 |
| `serving` | 部署与推理工程 | 吞吐、延迟、显存、成本 |
| `multimodal` | 多模态与生成 | 图像、语音、视频、世界模型 |
| `safety` | 安全与伦理 | 攻击面、对齐、可解释性 |
| `ecosystem` | 生态与产品 | 框架、平台、工程组织 |
| `business` | 行业叙事 | 营销词、造词、行业黑话 |

### 8 个标签

| id | 名称 | 用途 |
|---|---|---|
| `core` | 核心 | 理解其它词条的地基 |
| `pitfall` | 易混淆 | 名称相近但含义不同，或常被误用 |
| `eng` | 工程 | 落地时会真实碰到 |
| `cost` | 成本 | 直接影响钱、显存或延迟 |
| `new` | 新词 | 2024 年后出现或流行 |
| `hype` | 营销 | 来自发布会或社媒的叙事词 |
| `debate` | 有争议 | 定义或有效性存在争论 |
| `sec` | 安全 | 涉及攻击面、风险或对齐 |

要新增分类或标签，请同时修改 `scripts/sync.mjs` 里的常量，并在本表登记——CI 会阻止使用未登记的词表项。

## 数据字段

`data/glossary.js` 中的 `terms[]`：

| 字段 | 说明 |
|---|---|
| `id` | URL 安全的唯一标识，由 `term` 生成，中文名会附加短哈希；用作深链接锚点 |
| `term` | 主名称，通常是英文缩写或英文词 |
| `en` | 英文全称 |
| `zh` | 中文名 |
| `cat` | 分类 id |
| `tags` | 标签 id 数组 |
| `def` | 一句话定义，支持 `**加粗**` 与 `` `代码` `` |

另有 `meta` / `categories` / `tags` / `lead` / `confusions` / `links` 六个顶层字段，均由 Markdown 同步生成。

## 校验规则

`node scripts/validate.mjs` 检查：meta 完整性、词条数与 meta.count 一致、分类与标签 id 合法且唯一、每条词条的 `cat` / `tags` 都在受控词表内、id 唯一、`def` 不含"见第 X 节"这类源笔记交叉引用或对话残留、不含不安全内容、`tag-overrides.json` 的 key 与标签合法、参考链接只允许 http/https。

## GitHub Pages 配置

仓库 Settings → Pages → Build and deployment：

- **Source**: Deploy from a branch
- **Branch**: `main` / `/ (root)`

不需要 Actions 构建，不需要 Jekyll（`_config.yml` 未使用，也没有 `.nojekyll` 的必要，因为所有文件名都不以下划线开头）。

## 内容与协议

- 全部词条由作者整理并原创撰写，源自 Obsidian 笔记库中的《AI 黑话词典》。
- 参考项目**仅列出链接与一句评价，未复制其正文**。特别地，`mattpocock/dictionary-of-ai-coding` 未附带 LICENSE，法律上默认保留所有权利，本站不引用其内容文本。
- 正文（词条、定义、辨析）：[CC BY 4.0](LICENSE)，转载请署名「张晓辉 (Addo) / atbug.com」。
- 站点代码（HTML / CSS / JS / 脚本）：[MIT](LICENSE-CODE)。

站内不设评论区、不收集任何数据、不加载任何外部资源。

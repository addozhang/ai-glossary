# AI 黑话词典

**在线站点**：https://atbug.com/ai-glossary/

LLM 时代术语速查表。纯静态、零依赖、无构建工具链，**内容与词表全部存放在本仓库内**，不依赖 Obsidian、不依赖任何本机路径。

## 特性

| 能力 | 说明 |
|---|---|
| 全文检索 | 同时匹配英文术语、英文全称、中文名、定义正文、分类名、标签名；空格分隔多个关键词取交集；结果高亮 |
| 分类筛选 | 12 个按知识层级划分的分类，侧栏实时显示每个分类在当前条件下的命中数 |
| 标签筛选 | 8 个跨分类的横向标签，多选取交集；受控词表，写错会在编译时报错 |
| 深链接 | 每条卡片右上角的 `#` 复制独立链接；搜索与筛选状态写进 URL hash，可分享、可前进后退 |
| 键盘 | `⌘K` / `Ctrl+K` 聚焦搜索，`Esc` 清空 |
| 主题 | 跟随系统偏好，可手动切换并记住；也可用 `?theme=light` / `?theme=dark` 强制指定 |
| 部署 | GitHub Pages 直接从 `main` 根目录提供，push 即生效，无需 Actions 构建 |

隐私：无 CDN、无 Cookie、无追踪脚本、无第三方字体，可离线打开。

## 内容在哪里

只有三个文件需要关心：

```
content/glossary.md     ← 唯一内容源：词条、辨析、参考链接、正文散文
data/taxonomy.json      ← 受控词表：12 个分类 + 8 个标签的定义
data/glossary.js        ← 自动生成，前端直接读取（勿手改）
```

`content/glossary.md` 是普通 Markdown，用任何编辑器都能写。`npm run sync` 把它编译成 `data/glossary.js`——编译只是把 Markdown 转成 JS 对象，好让浏览器不依赖任何 Markdown 解析库就能渲染。

站点代码本身在 `index.html`、`assets/`、`scripts/`。

### 目录结构

```
content/glossary.md          内容源（写这里）
data/taxonomy.json           分类与标签受控词表
data/glossary.js             生成物
index.html                   页面骨架
assets/style.css             样式
assets/app.js                筛选 / 渲染 / 交互
assets/favicon.svg
scripts/sync.mjs             编译：Markdown → JS
scripts/validate.mjs         合规校验
scripts/watch.mjs            本地写作时自动编译
.github/workflows/ci.yml     push / PR 时自动校验
```

## 怎么写

### 词条

一行一条，放在对应分类的 `## ` 章节下：

```markdown
- **RAG（Retrieval-Augmented Generation，检索增强生成）** — 先从外部知识库检索相关片段，再把片段拼进上下文让模型作答。 #core #eng
```

格式拆解：

| 部分 | 规则 |
|---|---|
| `- **名称**` | 主名称，通常是英文缩写或英文词 |
| `（英文全称，中文名）` | 括号内可只写中文名、只写英文全称，或两者用中文逗号分隔；也可完全省略 |
| ` — 定义` | 全角破折号 + 空格分隔；定义支持 `**加粗**` 和 `` `代码` `` |
| ` #core #eng` | 行尾标签，可写多个、可省略；**必须来自 `data/taxonomy.json`** |

不需要写 id——锚点由名称自动生成（中文名会附加短哈希避免冲突）。不需要写分类——由所在的 `## ` 章节决定。

### 分类

章节标题格式固定为 `## 一、模型与架构`，其中中文序号和名称都登记在 `data/taxonomy.json`：

```json
{ "id": "rag", "section": "五", "name": "检索与知识", "en": "Retrieval & RAG", "desc": "让回答绑定到外部事实" }
```

改章节名称必须同时改 `taxonomy.json`，否则 `sync.mjs` 会报错——这是有意的防呆，防止分类名和 id 悄悄脱节。新增分类也是改这一个文件，站点侧栏、颜色、分组会自动跟上。

### 标签

8 个标签登记在 `data/taxonomy.json` 的 `tags` 数组：

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

写 `#unknown` 会直接编译报错；想新增标签，先在 `taxonomy.json` 登记并补上说明。

### 其它区块

源文件里还有几段会被一起编译进站点：

- `## 〇、先分清那个「推理」` → 首屏的辨析提示卡
- `## 附：最容易混淆的十组` → 底部对照表（Markdown 表格）
- `## 附二：同类开源项目与权威来源` → 底部链接分组（`- [名称](URL)` + `**分组名**`）
- `## 一条使用建议` → 「关于」区的提示卡
- frontmatter 之后的开头段落 → 首屏导语
- `<!-- ... -->` 注释会被跳过，可以放心写维护说明

frontmatter 目前有三个字段：

```yaml
---
title: "AI 黑话词典：LLM 时代的术语速查表"
updated: 2026-11-07
license: CC BY 4.0
---
```

`updated` 会显示在页脚，改动内容时顺手改一下。

## 怎么更新

```bash
# 改 content/glossary.md（或 data/taxonomy.json）
npm run check        # 编译 + 校验，等价于 sync && validate
git commit -am "词条：新增 XXX"
git push             # Pages 几十秒内自动更新
```

写作时想实时预览：

```bash
npm run watch        # 另一个终端
npm run serve        # 打开 http://localhost:8080
```

`watch` 监听源文件和词表，保存即自动编译并校验；刷新浏览器就能看到结果。直接双击 `index.html` 也能离线浏览。

> `content/glossary.md` 是普通 Markdown，用任意编辑器打开即可；也可以把 `content/` 软链进你常用的笔记库里写。站点只认仓库里的这个文件，不读取任何外部路径。

## 校验规则

`npm run validate` 会检查：

1. **`content/glossary.md` 与 `data/glossary.js` 是否同步** —— 改了源忘记编译会被 CI 拦下（用 `sync.mjs --check` 实现，不改动文件）。
2. frontmatter 的 `updated` 合法且与生成数据一致。
3. `taxonomy.json` 里分类 id、章节序号、标签 id 合法且唯一；源文件里每个登记过的章节标题都存在且写法一致。
4. 每条词条的 id 唯一、名称不重复、必填字段齐全、`cat` 与 `tags` 都在受控词表内、定义末尾没有残留的 `#标签`、不含交叉引用占位或对话残留、不含不安全内容。
5. 辨析、参考链接、导语、提示卡区块都非空；链接只允许 http/https。

## GitHub Pages 配置

仓库 Settings → Pages → Build and deployment：

- **Source**: Deploy from a branch
- **Branch**: `main` / `/ (root)`

不需要 Actions 构建，不需要 Jekyll——仓库里有 `.nojekyll`，所有文件（包括 `content/glossary.md` 源文件）都会原样发布，可以直接在线查看内容源。

仓库所在账号的用户站点绑定了 `atbug.com`，因此项目页的规范地址是 `https://atbug.com/ai-glossary/`；`addozhang.github.io/ai-glossary/` 会重定向过去。

## 内容与协议

- 词条与正文全部原创，内容源文件是 `content/glossary.md`。
- 参考项目**仅列出链接与一句评价，未复制其正文**。特别是 `mattpocock/dictionary-of-ai-coding` 未附带 LICENSE，法律上默认保留所有权利，本站不引用其内容文本。
- 内容（词条、定义、辨析、词表）：[CC BY 4.0](LICENSE)，转载请署名「张晓辉 (Addo) / atbug.com」。
- 站点代码（HTML / CSS / JS / 脚本）：[MIT](LICENSE-CODE)。

站内不设评论区、不收集任何数据、不加载任何外部资源。

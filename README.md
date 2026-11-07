# AI 黑话词典

**在线站点**：https://atbug.com/ai-glossary/

LLM 时代术语速查表。纯静态、零依赖、无构建工具链，**内容全部以「一条一个 Markdown 文件」的形式存放在本仓库内**，不依赖 Obsidian、不依赖任何外部路径。

## 特性

| 能力 | 说明 |
|---|---|
| 全文检索 | 同时匹配英文术语、英文全称、中文名、定义正文、分类名、标签名；空格分隔多个关键词取交集；结果高亮 |
| 分类筛选 | 12 个按知识层级划分的分类，侧栏实时显示每个分类在当前条件下的命中数 |
| 标签筛选 | 8 个跨分类的横向标签，多选取交集；受控词表，写错会在编译时报错 |
| 深链接 | 每条卡片右上角的 `#` 复制独立链接；搜索与筛选状态写进 URL hash，可分享、可前进后退 |
| 键盘 | `⌘K` / `Ctrl+K` 聚焦搜索，`Esc` 清空 |
| 主题 | 跟随系统偏好，可手动切换并记住；也可用 `?theme=light` / `?theme=dark` 强制指定 |
| 部署 | GitHub Pages 从 `main` 根目录提供，push 即生效，无需 Actions 构建 |

隐私：无 CDN、无 Cookie、无追踪脚本、无第三方字体，可离线打开。

## 内容在哪里

```
content/terms/<分类>/<id>.md    一条一个文件：frontmatter 存字段，正文存定义
content/glossary.md             站点级文本：导语、辨析表、参考链接、使用建议
data/taxonomy.json              受控词表：12 个分类 + 8 个标签的定义
data/glossary.js                自动生成的聚合数据，前端直接读取（勿手改）
```

`npm run sync` 把前三者编译成 `data/glossary.js`。编译只是把散落的 Markdown 聚合成一个 JS 对象，好让浏览器不依赖任何 Markdown 解析库就能渲染。

**为什么不用一个大 Markdown 文件？** 因为词典的每个条目字段是固定的（术语、英文全称、中文名、分类、标签、定义），而 Markdown 是自由排版格式——用一行文本塞六个字段，只能靠「全角括号 + 破折号 + 行尾 #标签」这类约定来编码，解析器全靠正则去猜，定义也没法写成多段。一条一个文件后，字段有名字、正文有自由、diff 只影响一条、id 和锚点由文件名直接决定。

### 目录结构

```
content/
  glossary.md                 站点级文本（导语、辨析、链接、使用建议）
  terms/
    architecture/llm.md       词条：目录名 = 分类 id，文件名 = 词条 id
    training/lora.md
    rag/rag.md
    ...
data/
  taxonomy.json               分类与标签受控词表
  glossary.js                 生成物
index.html                    页面骨架
assets/                       样式、脚本、图标
scripts/
  sync.mjs                    编译：Markdown → JS
  validate.mjs                合规与质量校验
  watch.mjs                   本地写作时自动编译
_config.yml                   只发布站点运行所需文件
```

## 怎么写一个词条

在对应分类目录下新建一个文件，文件名就是词条 id（小写字母、数字、连字符；会变成 URL 锚点，如 `#t-rag`）。

`content/terms/rag/rag.md`：

```markdown
---
term: RAG
en: Retrieval-Augmented Generation
zh: 检索增强生成
tags: [core, eng]
order: 10
---

先从外部知识库检索相关片段，再把片段拼进上下文让模型作答。

解决两个问题：模型不知道新知识、以及编造引用。
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `term` | 是 | 主名称，通常是英文缩写或英文词 |
| `en` | 否 | 英文全称，显示在术语右侧 |
| `zh` | 否 | 中文名，显示在术语右侧 |
| `tags` | 否 | 标签数组，取值必须在 `data/taxonomy.json` 的 `tags` 里 |
| `order` | 否 | 分类内排序，步长建议 10；不写则排在该分类末尾 |

`---` 之间的内容之外，全部是定义正文，支持：

- 多段（空行分段）
- `-` 无序列表、`1.` 有序列表
- 三个反引号包起来的代码块
- 行内 `**加粗**` 与 `` `代码` ``

分类**不写在 frontmatter 里**——由所在目录决定，移动文件就是换分类，不会出现「字段说 A、目录说 B」的不一致。

### 新增一个词条的最快路径

```bash
cp content/terms/rag/rag.md content/terms/rag/hybrid-search.md
# 改 frontmatter 和正文，再 npm run check
```

### 分类与标签

两者都是受控词表，定义在 `data/taxonomy.json`，由 CI 校验。想新增分类：在 `taxonomy.json` 加一项，并建同名目录 `content/terms/<新分类id>/`。想新增标签：在 `tags` 数组里加 id、name、desc 三项。

现有 8 个标签：

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

### 站点级文本

`content/glossary.md` 里放不属于单个词条的内容，按固定标题识别：

| 区块 | 去向 |
|---|---|
| frontmatter 之后的开头段落 | 首屏导语 |
| `## 〇、先分清那个「推理」` | 首屏辨析提示卡 |
| `## 附：最容易混淆的十组` | 底部对照表（Markdown 表格） |
| `## 附二：同类开源项目与权威来源` | 底部链接（`**分组名**` + `- [名称](URL)`） |
| `## 一条使用建议` | 「关于」区的提示卡 |
| `<!-- ... -->` | 跳过，可放心写维护说明 |

frontmatter 三个字段：`title`（会按中文冒号拆成站点标题和副标题）、`updated`（显示在页脚）、`license`。改动内容时顺手改一下 `updated`。

## 本地预览

```bash
npm run watch     # 一个终端：监听 content/ 与 taxonomy，保存即编译 + 校验
npm run serve     # 另一个终端：http://localhost:8080
```

直接双击 `index.html` 也能离线浏览（`data/glossary.js` 用普通 `<script>` 引入，不受 `file://` 的 CORS 限制），但改了内容仍需 `npm run sync`。

## 更新流程

```bash
# 改 content/terms/... 或 content/glossary.md 或 data/taxonomy.json
npm run check     # 编译 + 校验，等价于 sync && validate
git add -A && git commit -m "词条：新增 XXX"
git push          # Pages 几十秒内自动更新
```

## 校验规则

`sync.mjs` 负责「能不能解析」，任何一条不满足都会直接失败并指出文件：

- 目录名必须是已注册的分类
- 文件名必须是合法 id，且全局唯一
- 每个文件必须有 frontmatter 和 `term`
- 正文不能为空
- 标签必须在受控词表内
- `order` 必须是数字

`validate.mjs` 负责「内容对不对」：

- 源与 `data/glossary.js` 是否同步（`sync --check`，改了源忘记编译会被拦下）
- 词条名称不重复、定义有最低长度、不含「见第 X 节」这类交叉引用残留、不含不安全内容
- 磁盘文件数与解析出的词条数一致（防止有文件被静默跳过）
- 辨析表、参考链接、导语非空；链接只允许 http/https
- 分类目录存在、没有多余文件和非法扩展名

## GitHub Pages 配置

仓库 Settings → Pages → Build and deployment：

- **Source**: Deploy from a branch
- **Branch**: `main` / `/ (root)`

不需要 Actions 构建。`_config.yml` 做白名单式排除：只发布 `index.html`、`assets/`、`data/glossary.js`，内容源、脚本、许可文件都不会出现在站点上（`/content/...` 返回 404）。

仓库所在账号的用户站点绑定了 `atbug.com`，因此项目页的规范地址是 `https://atbug.com/ai-glossary/`；`addozhang.github.io/ai-glossary/` 会重定向过去。

## 内容与协议

- 词条与正文全部原创，内容源是 `content/terms/` 与 `content/glossary.md`。
- 参考项目**仅列出链接与一句评价，未复制其正文**。特别是 `mattpocock/dictionary-of-ai-coding` 未附带 LICENSE，法律上默认保留所有权利，本站不引用其内容文本。
- 内容（词条、定义、辨析、词表）：[CC BY 4.0](LICENSE)，转载请署名「张晓辉 (Addo) / atbug.com」。
- 站点代码（HTML / CSS / JS / 脚本）：[MIT](LICENSE-CODE)。

站内不设评论区、不收集任何数据、不加载任何外部资源。

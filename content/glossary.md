---
title: "AI 黑话词典：LLM 时代的术语速查表"
updated: 2026-11-07
license: CC BY 4.0
---

每个行业都会长出自己的黑话。AI 这一轮的特殊之处在于：它的黑话不是从实践中慢慢沉淀的，而是**先由论文造词、再由产品营销放大、最后被社交媒体压缩成标签**。结果是同一个东西有三个名字，不同东西共用一个名字。

<!-- 维护说明（不会出现在站点上）：
  本文件只放站点级文本：导语、辨析表、参考链接、使用建议。
  词条在 content/terms/<分类>/<id>.md，一条一个文件：
    frontmatter 写 term / en / zh / tags / order，空一行之后写定义正文（支持多段 Markdown）。
    <分类> 目录名必须是 data/taxonomy.json 里登记过的 id；<id> 由文件名决定，用作锚点。
    order 可选，步长 10，不写则排在该分类末尾。
  改完运行 npm run sync（或 npm run watch 自动编译），再 commit & push。
-->

## 〇、先分清那个「推理」

在中文里，"推理"对应两个完全不同的英文词，用错会让整句话失去意义：

- **Inference（推理/推断）** — 模型跑一次前向计算、生成输出的过程。是动词性的工程词，对应"推理成本""推理芯片""推理延迟"。
- **Reasoning（推理/思考）** — 模型做多步逻辑推导的能力或行为。是能力词，对应"推理模型""推理链""推理能力"。

"推理模型推理一次要花多少推理成本"——这句话里三个"推理"分别是 Reasoning、Inference、Inference。中文没有区分，英文有。

## 附：最容易混淆的十组

| 容易混 | 差别在哪 |
|---|---|
| **Inference vs Reasoning** | 前者是"跑计算"，后者是"做思考" |
| **Fine-tuning vs RAG** | 微调改**行为与风格**，RAG 补**知识与事实**。想让模型记住新知识优先 RAG |
| **RAG vs 长上下文** | 长上下文是"看得多"，RAG 是"挑得准"。数据大时 RAG 更省，全局理解时上下文更强 |
| **Prompt Engineering vs Context Engineering** | 前者优化"怎么说"，后者决定"给什么看" |
| **Agent vs Workflow** | 路径谁定：人定 = workflow，模型定 = agent |
| **Guardrails vs Alignment** | 护栏在运行时拦截，对齐在训练时塑造 |
| **Jailbreak vs Prompt Injection** | 越狱针对模型规则，注入针对应用逻辑 |
| **Open-weight vs Open-source** | 前者只给权重，后者给全套（含数据与代码） |
| **TTFT vs TPOT** | 首字快但吐字慢，体验依然差；两个指标必须一起看 |
| **Hallucination vs 错误** | 幻觉是"自信地编"，普通错误是"算错了"。修法完全不同：前者靠 grounding，后者靠更强的推理 |

## 附二：同类开源项目与权威来源

写这份词典时查过一圈，按"和这份的相似度"排。

**最接近的：以黑话祛魅为目标**

- [mattpocock/dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding)（约 5.3k star）— 前 Vercel 工程师 Matt Pocock 做的 AI 编程术语词典，约 62 条，分七节：模型 / 会话与上下文 / 工具与环境 / 失败模式 / 交接 / 记忆与引导 / 工作模式。每条给"机制解释 + Avoid（别这么说）+ Usage（真实对话示例）"，视角是**工程师日常调试**，不是学术定义。
  - 亮点：把幻觉拆成 factuality（知识缺失→补上下文）和 faithfulness（注意力涣散→压缩上下文），强调对症下药。这个区分比多数中文材料清楚。
  - 坑：仓库里**没有 LICENSE 文件**，法律上默认保留所有权利。可以读，不能直接翻译搬运。
  - 局限：只覆盖 AI 编程，没有训练、评测、部署、安全、行业叙事。

**大而全的资料清单（术语藏在里面，不是词典）**

- [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM)（约 26k star）— 论文 + 框架 + 部署工具 + 课程的大合集，按里程碑论文排序。查某个概念"出自哪篇论文"最快。
- [mlabonne/llm-course](https://github.com/mlabonne/llm-course) — LLM 学习路线图，分 Fundamentals / Scientist / Engineer 三段 19 个主题，配可运行的 Colab。**没有独立术语表**，但章节名本身就是一份术语骨架。

**课程类，自带 glossary**

- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) — 21 课，根目录有 `glossary.md`，且有 50+ 语言的官方翻译（含简体中文）。想找"某个术语的标准译法"时，[中文版](https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-CN/README.md)是现成参照。

**中文语境**

- [wdndev/llm_interview_note](https://github.com/wdndev/llm_interview_note) — 大模型面试笔记，覆盖面最广的中文单仓。术语是按面试题组织的，读起来像"每个概念会被怎么问"，适合准备面试或做内部分享。
- [datawhalechina/happy-llm](https://github.com/datawhalechina/happy-llm)（[在线阅读](https://datawhalechina.github.io/happy-llm/)）— 《从零开始构建大模型》，8 章从 Transformer 一路到 Agentic RL（GRPO / Search-R1 / ReTool）。术语总量不如面试笔记，但每个都讲透，且配代码。

**小但专门做术语表**

- [freetoolsarebest/llm-glossary](https://github.com/freetoolsarebest/llm-glossary)（约 17 star）— 按 general / training / model-compression / RAG / benchmarking / evaluation-metrics 分文件的纯术语表，结构最接近这份词典。维护停在 2024 年。
- [odisha-ml/AI-Glossary](https://github.com/odisha-ml/AI-Glossary)（约 5 star，[在线版](https://glossary.odishaai.org)）— 每条术语附对应论文链接，这是它唯一但很实在的价值。

**非 GitHub 的权威兜底**

- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course) 各章术语框
- [Google Machine Learning Glossary](https://developers.google.com/machine-learning/glossary)
- [Wikipedia: Glossary of artificial intelligence](https://en.wikipedia.org/wiki/Glossary_of_artificial_intelligence)

查"公认定义"用这三个，比任何个人仓库可靠。

**一个判断**：AI 术语表这类内容有个结构性难题——**只做术语的地方更新慢，更新快的地方不做术语**。所以最实用的方案不是找一份完美的，而是拿一份骨架（上面任意一个）当底，遇到新词自己往里补。这份词典就是按这个思路写的。

## 一条使用建议

黑话的价值在于**降低沟通成本**，滥用时则变成**挡箭牌**。判断一个词是不是在装神弄鬼，有个简单测试：**让对方用一句不含这个行业术语的话，把这件事讲给我听。** 讲得出来，那是术语；讲不出来，那是暗号。

同理，写文档和做分享时，第一次出现术语就顺手给一句解释——这份词典本身，就是为这个习惯准备的。

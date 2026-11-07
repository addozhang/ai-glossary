---
title: "AI 黑话词典：LLM 时代的术语速查表"
updated: 2026-11-07
license: CC BY 4.0
---

每个行业都会长出自己的黑话。AI 这一轮的特殊之处在于：它的黑话不是从实践中慢慢沉淀的，而是**先由论文造词、再由产品营销放大、最后被社交媒体压缩成标签**。结果是同一个东西有三个名字，不同东西共用一个名字。

<!-- 维护说明（不会出现在站点上）：
  词条格式：- **名称（英文全称，中文名）** — 一句话定义 #标签
  行尾 #标签 可写多个、可省略，必须来自 data/taxonomy.json。
  分类章节标题「## 一、模型与架构」也叫受控词表，改名需同步 taxonomy.json。
  改完运行 npm run sync（或 npm run watch 自动编译），再 commit & push。
-->

## 〇、先分清那个「推理」

在中文里，"推理"对应两个完全不同的英文词，用错会让整句话失去意义：

- **Inference（推理/推断）** — 模型跑一次前向计算、生成输出的过程。是动词性的工程词，对应"推理成本""推理芯片""推理延迟"。
- **Reasoning（推理/思考）** — 模型做多步逻辑推导的能力或行为。是能力词，对应"推理模型""推理链""推理能力"。

"推理模型推理一次要花多少推理成本"——这句话里三个"推理"分别是 Reasoning、Inference、Inference。中文没有区分，英文有。

## 一、模型与架构

- **LLM（Large Language Model，大语言模型）** — 参数规模大到能涌现出泛化能力的语言模型。规模没有硬门槛，习惯上 10B 以上叫大。 #core #debate
- **Foundation Model（基座模型）** — 未经特定任务微调、可作为各类下游应用起点的通用模型。强调"可被派生"，不是强调"大"。
- **Frontier Model（前沿模型）** — 当前能力最强的那一批，通常只有少数几家能训练。是个相对概念，每年换人。 #hype #pitfall
- **Transformer** — 2017 年《Attention Is All You Need》提出的架构，用自注意力替代循环结构，是当下几乎所有大模型的底座。 #core
- **Attention（注意力）** — 让每个 token 根据相关性从其他 token 聚合信息的机制。**Self-Attention** 是自己内部互看，**Cross-Attention** 是跨序列（如编码器到解码器）看。 #core
- **Multi-Head Attention（多头注意力）** — 并行跑多组注意力，各组学不同的关注模式。
- **Token（词元）** — 模型处理的最小单位，介于字和词之间。中文一个 token 约对应 1-2 个汉字，英文约 0.75 个单词。计费、上下文长度都按它算。 #core #cost
- **Tokenization（分词）** — 把文本切成 token 的过程。分词器（tokenizer）是模型自带的，换模型就换分词，**token 数会变，账单也会变**。
- **Embedding（嵌入/向量化）** — 把文本映射成高维向量，语义相近的向量距离近。检索、聚类、去重全靠它。 #core
- **Context Window（上下文窗口）** — 一次请求里模型能"看见"的最大 token 数（输入+输出）。也叫 context length。 #core
- **Parameter（参数/权重）** — 模型里可学习的数值。**7B / 70B / 405B** 指十亿级参数量。 #core
- **Dense Model（稠密模型）** — 每次前向都激活全部参数。与 MoE 相对。
- **MoE（Mixture of Experts，混合专家）** — 把 FFN 拆成多个"专家"，每个 token 只路由到其中几个。**总参数**和**激活参数**是两回事：DeepSeek-V3 是 671B 总参 / 37B 激活，成本按激活算，显存按总参算。 #core #cost #pitfall
- **Router（路由器）** — MoE 里决定 token 去哪几个专家的那个小网络。路由不均会导致专家饿死或过载。
- **Decoder-only（仅解码器）** — 只有解码器堆叠、自回归生成的架构。GPT 系、Llama 系、Qwen 系都是，当下主流。
- **Encoder-Decoder** — 编码器读全输入、解码器再生成。T5、原始 Transformer 是这类，翻译类任务上仍常见。
- **Autoregressive（自回归）** — 一个 token 一个 token 往后接。所有主流 LLM 的生成方式。
- **KV Cache** — 缓存已算过的 Key/Value，避免重复计算。它是长上下文推理显存占用的主要来源。 #core #cost
- **GQA / MQA（分组/多查询注意力）** — 让多个 Query 头共享一组 KV 头，大幅压缩 KV Cache。Llama 2 之后基本标配。
- **RoPE（旋转位置编码）** — 用旋转矩阵编码位置信息，便于外推到更长上下文。上下文扩展技术（YaRN、NTK）多在它上面做文章。
- **FlashAttention** — 通过分块和重计算降低显存访问的注意力实现。是"算法让硬件跑得更快"的经典案例，已迭代到 v3/v4。 #cost
- **SSM（State Space Model，状态空间模型）** — 用线性递推替代注意力的序列建模路线，Mamba 是其代表。理论优势是长序列下计算线性增长。
- **Hybrid Architecture（混合架构）** — 注意力层与线性/SSM 层交替堆叠，兼顾效果与长上下文成本。 #cost

## 二、训练与对齐

- **Pretraining（预训练）** — 在海量无标注语料上做下一个 token 预测，得到基座模型。占全部算力的大头。 #core #cost
- **Scaling Law（缩放定律）** — 损失随参数量、数据量、算力呈幂律下降的经验规律。2020 年 Kaplan 版本 vs 2022 年 Chinchilla 版本的差别在于"参数和数据该怎么分配"。 #core #cost #debate
- **Chinchilla Optimal（计算最优）** — 给定算力预算，参数与训练 token 应按约 1:20 配比。催生了"小模型喂更多数据"的路线。 #cost
- **Data Wall（数据墙）** — 高质量公开文本接近耗尽，继续扩规模缺乏燃料。是 2024 年后"合成数据"热的直接原因。
- **SFT（Supervised Fine-Tuning，监督微调）** — 用"指令-回答"对训练模型学会听话。是 RLHF 之前的必经步骤。 #core
- **Instruction Tuning（指令微调）** — SFT 的一种，专指让模型遵循指令格式。
- **RLHF（Reinforcement Learning from Human Feedback）** — 用人类偏好训练奖励模型，再用强化学习优化策略。ChatGPT 的关键配方。 #core
- **RLAIF** — 用 AI 替代人类标注偏好，降本版本。争议在于"用 AI 教 AI"会不会放大偏差。 #cost #debate #pitfall
- **Reward Model（奖励模型）** — 学习"人类更喜欢哪个回答"的打分器，是 RLHF 的中介。
- **PPO（近端策略优化）** — RLHF 里常用的强化学习算法。工程复杂，需要四个模型同时在显存里。 #cost
- **DPO（Direct Preference Optimization，直接偏好优化）** — 跳过奖励模型，直接用偏好对优化策略。简单稳定，已成主流替代方案。 #core
- **GRPO（Group Relative Policy Optimization）** — 用组内相对得分替代价值网络，省掉 critic 模型。DeepSeek-R1 用它做纯 RL 推理训练，是 2025 年的关键配方。 #new
- **KTO / ORPO** — 偏好优化的变体。KTO 只需"好/坏"二元标注，ORPO 把 SFT 和偏好优化合并成一步。
- **Reward Hacking（奖励黑客）** — 模型找到奖励模型的漏洞、刷高分数但答得更差。对齐里的经典失败模式。
- **Alignment（对齐）** — 让模型行为符合人类意图与价值观的总称。包含有用性、诚实性、无害性三个维度（**HHH**）。 #core
- **Constitutional AI（宪法 AI）** — Anthropic 提出，用一套明文原则让模型自我批评和修正，减少人工标注依赖。
- **Jailbreak（越狱）** — 用特殊措辞绕过安全限制。与提示注入的区别见「安全与伦理」一节。 #pitfall
- **Red Teaming（红队测试）** — 组织人主动攻击模型找漏洞，是发布前的标准动作。
- **Fine-tuning（微调）** — 在预训练模型上继续训练以适配特定任务或风格。**全参微调**改所有权重，**参数高效微调**只改一小部分。 #core
- **PEFT（Parameter-Efficient Fine-Tuning）** — 参数高效微调的统称，LoRA、Adapter、Prefix Tuning 都属此类。
- **LoRA（低秩适配）** — 冻结原权重，旁挂两个小矩阵做低秩修正。显存占用降一个量级，可插拔切换。 #core #cost
- **QLoRA** — 把基座量化到 4bit 再挂 LoRA，单卡可微调大模型。
- **Adapter** — 在层间插入小模块的 PEFT 方案，比 LoRA 早，推理时有额外延迟。 #cost
- **CPT（Continual Pretraining，继续预训练）** — 在基座模型上用领域语料再训一轮，注入知识而非改变风格。与微调的目的不同。 #pitfall
- **Distillation（蒸馏）** — 用大模型（教师）的输出训练小模型（学生）。2025 年后还多了一层含义：**把推理模型的思维链蒸给小模型**。 #core
- **Catastrophic Forgetting（灾难性遗忘）** — 学新任务把旧能力忘掉。微调过度时的典型病症。
- **Emergent Ability（涌现能力）** — 规模跨过某阈值后突然出现的能力。**注意：这个说法近年受到质疑**，很多"涌现"被证明是评测指标不连续造成的假象。 #debate
- **Synthetic Data（合成数据）** — 用模型生成训练数据。成本低，但会**模型崩溃（model collapse）**——反复用自己的输出训练自己会退化。 #cost
- **Data Curation（数据清洗/配比）** — 去重、去毒、质量打分、领域配比。业内公认它比架构更能决定效果。
- **Data Contamination（数据污染）** — 评测集泄漏进训练集，分数虚高。详见「评测与基准」一节。

## 三、推理与生成

- **Inference（推理/推断）** — 模型前向计算、产出结果的过程。是动词性的工程词，对应"推理成本""推理芯片""推理延迟"。 #core #pitfall
- **Hallucination（幻觉）** — 模型生成看似合理但与事实不符的内容。分**事实性幻觉**（说错事实）和**忠实性幻觉**（偏离给定材料）。根因是它优化的是"下一个 token 的概率"，不是"真实性"。 #core #pitfall
- **Reasoning（推理/思考）** — 模型做多步逻辑推导的能力或行为。是能力词，对应"推理模型""推理链""推理能力"。 #core #pitfall
- **Reasoning Model（推理模型）** — 生成答案前先产出长思维链的模型，如 o 系列、R1 系列。特点是**用推理时间换准确率**。 #new
- **CoT（Chain of Thought，思维链）** — 让模型"先写步骤再给答案"。2022 年发现，一句"Let's think step by step"就能显著提升数学题正确率。 #core
- **Zero-shot CoT** — 不加示例，只加一句引导语触发思维链。
- **Few-shot / One-shot** — 给几个（或一个）示例再让模型做。属于最原始的"提示工程"。
- **ICL（In-Context Learning，上下文学习）** — 不更新权重，仅靠上下文中的示例让模型学会新任务。是 LLM 最反直觉的能力之一。 #core
- **Self-Consistency（自洽性）** — 采样多条推理路径，投票选最多数的答案。用算力换稳定性。 #cost
- **ReAct（Reason + Act）** — 交替进行"思考一步、调用一次工具"的范式。Agent 的基础循环。
- **ToT（Tree of Thoughts，思维树）** — 把推理展开成树，多分支探索并回溯。代价高，适合难题。
- **Reflexion / Self-Refine** — 让模型检查自己的输出并迭代改进。单靠"自我批评"提升有限，配外部验证器才有效。
- **Test-Time Compute（测试时计算）** — 推理阶段多花算力（多想、多采样、多搜索）来提升质量。与"训练时堆参数"是两条不同的规模化路线。 #core #cost #new #pitfall
- **Extended Thinking / Thinking Budget（思考预算）** — 产品层面对 Test-Time Compute 的封装：给模型分配多少"思考 token"。 #new
- **System 1 / System 2** — 借自心理学：System 1 是快速直觉（普通模型直接出答案），System 2 是慢速深思（推理模型先想再答）。
- **Decoding（解码/采样）** — 从概率分布里选下一个 token 的策略。
- **Greedy Decoding（贪心解码）** — 每次选概率最高的。确定性强，容易重复。
- **Beam Search（束搜索）** — 同时保留多条候选路径。翻译常用，开放生成少用（太死板）。
- **Temperature（温度）** — 采样随机性。0 近乎确定，1 以上发散。**它不是"创造力旋钮"，是分布锐化/平坦化。** #core
- **Top-p（核采样）/ Top-k** — 只在累计概率前 p（或前 k 个）候选里采样，截掉长尾怪词。
- **Repetition Penalty / Frequency Penalty** — 压制重复 token 的惩罚项。
- **Structured Output / JSON Mode（结构化输出）** — 强制模型按给定 schema 输出。靠**约束解码**实现，不是靠"求它好好输出"。
- **Constrained Decoding（约束解码）** — 在每步采样时屏蔽不符合语法的 token，从机制上保证格式合法。

## 四、提示与上下文

- **Prompt（提示词）** — 给模型的输入。包含 **System Prompt**（角色与规则，优先级最高）、**User Prompt**（本次任务）、**Assistant**（历史回复）。 #core
- **Prompt Engineering（提示工程）** — 通过改写输入来提升输出质量的技艺。边界正在被"上下文工程"吞并。 #core #pitfall
- **Context Engineering（上下文工程）** — 比提示工程更大的范畴：决定**什么信息、以什么顺序、占多少 token** 进入上下文窗口。包含检索、记忆、压缩、工具结果管理。 #core #eng #new
- **Prompt Template（提示模板）** — 带变量占位的提示词，工程化的基本单位。 #eng
- **Prompt Chaining（提示链）** — 把复杂任务拆成多步、上一步输出喂给下一步。比单次长提示更可控。
- **Lost in the Middle（中间遗忘）** — 长上下文里位于中段的信息最容易被忽略，首尾的信息利用得最好。**"支持 1M 上下文"不等于"能用好 1M 上下文"。** #core #eng #pitfall
- **Context Rot / Context Overflow（上下文腐化/溢出）** — 上下文塞太满导致注意力分散、指令被淹没、成本飙升。Agent 长跑失败的主因之一。 #cost #new
- **Prompt Compression（提示压缩）** — 把长上下文摘要或裁剪后再喂给模型。
- **Prompt Caching（提示缓存）** — 服务端缓存重复的前缀（系统提示、长文档），命中后按更低价格计费。工程上省钱的第一手段。 #cost #eng
- **Negative Prompt（负向提示）** — 主要用在图像生成，告诉模型"不要什么"。文本模型里作用有限。

## 五、检索与知识

- **RAG（Retrieval-Augmented Generation，检索增强生成）** — 先从外部知识库检索相关片段，再把片段拼进上下文让模型作答。解决"模型不知道新知识"和"编造引用"两个问题。 #core #eng
- **Chunking（分块）** — 把文档切成适合检索的片段。块太大检索不准，太小丢上下文。**按语义/标题切优于按固定字数切**。 #core
- **Embedding Model（向量模型）** — 专门把文本转成向量的模型，如 BGE、E5、text-embedding-3。与生成模型是两套东西，选错向量模型比选错 LLM 影响更大。 #core
- **Vector Database（向量数据库）** — 存向量并做近似最近邻检索（**ANN**）的数据库，如 Milvus、Qdrant、Weaviate、pgvector。 #core
- **ANN（Approximate Nearest Neighbor）** — 近似最近邻搜索，用少量精度换数量级的速度。**HNSW** 是最常用的索引结构。 #eng
- **Semantic Search（语义检索）** — 按向量相似度找，能命中"换了说法但意思相同"的内容。
- **Sparse Retrieval（稀疏检索）** — 基于词频的传统检索，**BM25** 是代表。对专有名词、型号、代码符号特别准。
- **Hybrid Search（混合检索）** — 稠密+稀疏两路召回再融合。**生产环境几乎都该用这个**，纯向量检索对精确关键词很弱。 #eng
- **Reranker（重排序）** — 对召回结果做二次精排（通常用 cross-encoder 逐对打分）。召回靠粗，排序靠精。 #core
- **Recall / Precision（召回率/精确率）** — 召回=该找到的找到了多少，精确=找到的里面有多少是对的。检索链路先保召回，再靠 rerank 提精确。
- **Top-K** — 取相似度最高的 K 条。K 太大引入噪音，太小漏信息。
- **Query Rewrite（查询改写）** — 把用户口语化的问题改写成检索友好的形式，多轮对话里还要补全指代。
- **HyDE（Hypothetical Document Embeddings）** — 先让模型编一个"假答案"，用假答案的向量去检索。听着离谱但有效，因为假答案和真文档在同一语义空间。
- **Multi-hop QA（多跳问答）** — 需要连续检索多次、串起多个事实才能回答的问题。单轮 RAG 的典型短板。
- **GraphRAG** — 把知识建成实体关系图再检索，适合"跨文档总结"和"全局性问题"。成本高，索引构建慢。 #cost #eng #new
- **Agentic RAG** — 让 Agent 自主决定检索什么、检索几轮、要不要换查询。比固定流水线灵活。 #eng #new
- **Grounding（接地/落地）** — 让回答绑定到可验证的外部来源，减少幻觉。**Grounded Answer** 指每个论断都能追到出处。
- **Citation（引用）** — 输出里标注来源。注意：**模型能生成看起来很像的假引用**，必须由系统层校验。 #pitfall
- **Knowledge Base（知识库）** — 泛指供检索的结构化/非结构化资料集合。
- **Long Context vs RAG** — 不是替代关系。长上下文解决"一次能看多少"，RAG 解决"哪些值得看"。**数据量大时 RAG 省钱，需要全局理解时长上下文更强**。 #core #pitfall
- **Context Stuffing（上下文硬塞）** — 不管相关性把整份文档全塞进去。省事，但贵且容易迷失。

## 六、Agent 与工具

- **Agent（智能体/代理）** — 能自主规划、调用工具、根据反馈迭代直到完成目标的系统。判定标准不是"接了 LLM"，而是**有没有闭环**。 #core
- **Agentic（代理式的）** — 形容具备自主决策与多步执行的特性。**Agentic Workflow** 指按预设流程编排多个 LLM 步骤。
- **Workflow vs Agent** — Workflow 的路径是人定的，Agent 的路径是模型现场决定的。**能用 workflow 解决就别上 agent**，前者可调试、可计费、可预测。 #core #pitfall
- **Tool Use / Function Calling（工具调用/函数调用）** — 模型输出结构化的调用意图，由外部执行并回填结果。模型本身不执行任何东西。 #core
- **MCP（Model Context Protocol）** — Anthropic 2024 年底提出的开放协议，统一模型与外部工具/数据源的接入方式。类比"AI 界的 USB-C"。 #core #eng #new
- **A2A（Agent to Agent）** — 让不同 Agent 之间互相通信协作的协议，由 Google 主导。 #eng #new
- **Multi-Agent（多智能体）** — 多个角色分工协作，如 **Orchestrator**（编排者）+ **Worker**（执行者）、**Planner** + **Executor**、**Critic**（批评者）。
- **Sub-agent（子代理）** — 主代理派生出的专职代理，用来隔离上下文、并行处理子任务。 #new
- **Planning（规划）** — 把目标拆成可执行步骤。分**先规划后执行**和**边做边规划（interleaved）** 两类。
- **Memory（记忆）** — 跨轮次保留信息。**短期记忆**=上下文窗口内的对话；**长期记忆**=外部存储+检索。业界黑话"上下文是新的内存，检索是新的磁盘"。 #core
- **Scratchpad（草稿纸）** — 模型用来写中间推导的临时区域，不暴露给用户。
- **Reflection（反思）** — 执行后回看结果、发现错误、修正计划。Agent 从"跑一遍"升级到"跑得对"的关键。
- **HITL（Human-in-the-Loop，人在回路）** — 关键节点插入人工确认。高风险操作（转账、删除、发布）的必备设计。
- **Guardrails（护栏）** — 对输入输出做规则/模型检查，拦截越权、敏感、格式错误。与"对齐"不同：对齐在训练时做，护栏在运行时做。 #eng #pitfall
- **Sandbox（沙箱）** — 隔离执行环境，限制文件、网络、权限。让 Agent 跑代码的前提。
- **Computer Use / Browser Use（操作电脑/浏览器）** — 模型通过截图+点击操作真实界面。通用但慢且脆。
- **Code Interpreter（代码解释器）** — 让模型写代码并执行，用代码算数、处理文件。**比让模型心算可靠得多**。
- **Skill（技能）** — 打包好的可复用能力单元（提示+脚本+资源），按需加载。 #new
- **Harness（外架/工程壳）** — 围绕模型的工程基础设施：工具、循环、校验、上下文管理。同一个模型换个 harness，效果能差一倍。 #core #eng #new
- **Loop Engineering（循环工程）** — 设计"模型→行动→验证→再行动"这个循环的工程学。核心难点是**验证器写不写得出来**。 #debate #eng #new
- **Orchestration（编排）** — 调度多个模型/工具/子任务的顶层逻辑。 #eng

## 七、评测与基准

- **Benchmark（基准测试）** — 标准化题库。看榜单要记住：**厂商只报自己赢的那几个**。 #core
- **MMLU / MMLU-Pro** — 57 学科的选择题，考通用知识。已基本饱和，Pro 版加了难度。
- **GPQA** — 研究生/博士级理科题，防搜索引擎作弊设计。**GPQA Diamond** 是其中最难子集。 #eng
- **GSM8K / MATH** — 小学数学应用题 / 竞赛数学。GSM8K 早被刷爆，MATH 也接近饱和。
- **HumanEval / MBPP** — 基础代码生成题。**已严重饱和，不再有区分度**。
- **SWE-bench** — 真实 GitHub issue 修复任务，是目前最能反映"工程能力"的榜单。**SWE-bench Verified** 是人工筛过的可靠子集。 #eng #new
- **ARC-AGI** — 抽象推理谜题，考"没见过的新规则能不能现场学会"。人类轻松，模型吃力。
- **HLE（Humanity's Last Exam）** — 专家级跨学科难题集，为"下一代评测"设计，防止快速饱和。 #new
- **Chatbot Arena / LMArena** — 盲测对战、人类投票、算 **Elo** 分。优点是不依赖标准答案，缺点是偏向"讨喜"而非"正确"。
- **LLM-as-a-Judge（模型当裁判）** — 用强模型给弱模型打分。成本低、可扩展，但有**位置偏好、长度偏好、自我偏好**三类系统性偏差。 #core #cost
- **Golden Set（黄金集）** — 人工标注过的高质量评测集，用于回归测试。**做产品比追榜单更需要它**。 #eng
- **Pass@k** — k 次尝试里至少有一次正确的概率，代码评测常用。**Pass@1** 更接近真实体验。
- **Perplexity（困惑度/PPL）** — 模型对文本的"惊讶程度"，越低越好。是预训练指标，**与人喜欢的回答质量不是一回事**。
- **BLEU / ROUGE** — 机器翻译/摘要的 n-gram 重叠度指标。便宜但对语义不敏感，已被 LLM 评审取代。 #cost
- **Contamination（数据污染）** — 评测题混进了训练集，分数不可信。检测靠 n-gram 重合、改写扰动。
- **Saturation（饱和/刷榜）** — 榜单分数被追平到失去区分度。每个基准都有保质期。
- **Eval Harness** — 批量跑评测的框架，如 lm-evaluation-harness。 #eng
- **Vibes-based Eval（感觉评测）** — 没有指标，靠人试用后"感觉行不行"。被半开玩笑地当成真实标准，因为**离线指标和线上体验经常不一致**。 #debate #hype
- **A/B Test（线上分流实验）** — 唯一能证明"真的更好"的方法。

## 八、部署与推理工程

- **Model Serving（模型服务/推理服务）** — 把模型包装成 API 对外提供。核心指标是吞吐、延迟、成本三者取舍。 #cost
- **TTFT（Time To First Token，首字延迟）** — 从发请求到收到第一个 token 的时间。**流式体验的生死线**，用户感知的是它。 #cost #eng
- **TPOT / ITL（Time Per Output Token / Inter-Token Latency，每字延迟）** — 后续每个 token 的间隔，决定"读起来顺不顺"。
- **Throughput（吞吐）** — 单位时间处理的 token 数。**吞吐和延迟是对立的**：大批量能提吞吐但抬高单请求延迟。 #cost
- **Prefill / Decode（预填充/解码）** — 推理的两个阶段。Prefill 并行处理输入（**算力瓶颈**），Decode 逐个吐字（**显存带宽瓶颈**）。两者优化手段完全不同。 #cost
- **Batching（批处理）** — 多个请求一起算以提升 GPU 利用率。
- **Continuous Batching（连续批处理）** — 请求完成即退出、新请求立即可插入，不用等整批跑完。vLLM 的核心贡献之一。
- **PagedAttention** — 把 KV Cache 按页管理，像操作系统管理虚拟内存，大幅减少碎片浪费。 #new
- **Speculative Decoding（投机解码）** — 小模型先草拟几个 token，大模型一次并行验证，接受对的、丢弃错的。**输出分布不变，速度提升 2-3 倍**。 #new
- **Prefix Caching（前缀缓存）** — 相同前缀的 KV Cache 复用，长系统提示场景省一大截。 #cost
- **Quantization（量化）** — 把权重/激活从 FP16 降到 INT8/INT4/FP8。省显存、提速度，质量损失取决于方法。 #core #cost
- **GPTQ / AWQ / GGUF** — 三种主流量化方案。GPTQ/AWQ 偏 GPU 部署，**GGUF** 是 llama.cpp 生态的格式，偏本地 CPU/混合推理。 #eng
- **Pruning（剪枝）** — 删掉不重要的权重或整层。硬件友好度不如量化，实际落地较少。 #eng
- **VRAM / HBM（显存/高带宽内存）** — 模型跑不跑得起来的第一约束。**显存带宽**往往比算力更早成为瓶颈。 #cost
- **CUDA / ROCm** — NVIDIA / AMD 的 GPU 计算平台。**CUDA 生态壁垒**是英伟达最深的护城河。 #eng
- **TPU / NPU / Trainium** — 各家自研加速器。推理侧还有 Groq（LPU）、Cerebras（晶圆级）等专用路线。
- **NVLink / InfiniBand** — GPU 间互联。大模型训练里**通信常常比计算更耗时**。
- **vLLM / SGLang / TensorRT-LLM** — 三大主流推理引擎。vLLM 生态最广，SGLang 在复杂前缀与结构化输出上强，TensorRT-LLM 在 NVIDIA 卡上极限性能最好。 #core
- **llama.cpp / Ollama / LM Studio** — 本地推理三件套，从底层到开箱即用。
- **OOM（Out of Memory）** — 显存爆了。长上下文、大 batch、量化不足都会触发。 #cost
- **Rate Limit / TPM / RPM** — 云端 API 的限流单位：每分钟 token 数、每分钟请求数。
- **Token 计费 / Token Economics** — 按输入输出 token 分别计价，输出通常贵 3-5 倍。**模型选型的实际决策常常就是这道算术题**。 #cost #eng
- **Model Router（模型路由）** — 按任务难度自动分发到不同价位模型。简单问题用小模型，是降本最直接的手段。 #cost #new
- **On-Device / Edge AI（端侧/边缘 AI）** — 模型跑在手机、PC 本地。隐私好、无网可用，受显存和功耗限制。 #cost
- **SLM（Small Language Model，小模型）** — 参数量小（通常 <10B）、可本地跑、特定任务够用的模型。

## 九、多模态与生成

- **Multimodal（多模态）** — 能处理文本之外（图像、音频、视频）的输入或输出。
- **VLM（Vision-Language Model，视觉语言模型）** — 能"看图说话"的模型。
- **CLIP / SigLIP** — 把图像和文本对齐到同一向量空间的模型，是"以文搜图"和文生图提示理解的基础组件。
- **Omni Model（全模态模型）** — 原生统一处理多种模态的单一模型，而非拼接多个专用模型。 #new
- **Diffusion Model（扩散模型）** — 从噪声逐步去噪生成图像/视频，是当前图像生成主流。 #core
- **DiT（Diffusion Transformer）** — 用 Transformer 替代 U-Net 的扩散架构，Sora 级视频模型的基础。 #new
- **Flow Matching（流匹配）** — 比扩散更直接的生成路径建模，训练更稳、采样更少步。新一代图像模型常用。 #new
- **Latent Space（潜空间）** — 压缩后的特征空间，扩散在潜空间做以省算力。 #cost
- **ASR（自动语音识别）** — 语音转文字。Whisper 是开源标杆。
- **TTS（文本转语音）** — 文字转语音。当前已能做到带情感和韵律的**零样本音色克隆**。
- **World Model（世界模型）** — 学习环境动态、能预测"下一步会发生什么"的模型。被视为视频生成与具身智能的交汇点。 #new
- **Genie / Generative Environment（生成式环境）** — 由模型实时生成的、可交互的虚拟场景。 #new
- **VLA（Vision-Language-Action）** — 视觉+语言直接输出动作，具身智能/机器人的主流范式。 #new
- **Embodied AI（具身智能）** — 有物理身体、能与环境交互的 AI。

## 十、安全与伦理

- **AI Safety（AI 安全）** — 防止 AI 系统造成意外或恶意伤害的总体领域。分** misuse**（被人滥用）、**misalignment**（目标跑偏）、**systemic**（社会系统性风险）三层。 #sec
- **Prompt Injection（提示注入）** — 把恶意指令藏在输入内容里，劫持模型行为。**直接注入**来自用户，**间接注入**藏在网页/文档/邮件里——**后者才是 Agent 时代的真正威胁**。 #core #pitfall #sec
- **Jailbreak vs Prompt Injection** — 越狱是"让模型违反自己的规则"，注入是"让模型执行攻击者的指令"。前者针对模型，后者针对应用。 #pitfall #sec
- **Data Poisoning（数据投毒）** — 在训练数据里埋后门或偏见，让模型在特定触发词下行为异常。 #sec
- **Alignment Tax（对齐税）** — 做安全对齐会牺牲一部分能力。这个 trade-off 是真实存在的，只是大小有争议。 #debate #pitfall #sec
- **Interpretability（可解释性）** — 理解模型内部在做什么。**Mechanistic Interpretability（机制可解释性）** 试图把网络逆向成可读的特征与回路。 #sec
- **SAE（Sparse Autoencoder，稀疏自编码器）** — 从激活里提取可解释特征的主流工具，用于找"概念方向"。 #new #sec
- **Feature Steering（特征引导）** — 找到某个语义方向后直接加减激活来改变行为，比如"减少谄媚"。 #new #sec
- **Refusal（拒答）** — 模型拒绝执行不安全请求。**过度拒答（over-refusal）** 本身也是缺陷。 #sec
- **Sycophancy（谄媚）** — 模型倾向于迎合用户而非说真话。RLHF 的副作用之一。 #sec
- **Bias（偏见）** — 训练数据带来的系统性倾向，涉及性别、种族、地域等。 #sec
- **Toxicity（毒性）** — 侮辱、仇恨、暴力等有害内容。 #sec
- **PII Leakage（隐私泄漏）** — 模型吐出训练数据中的个人信息。**Membership Inference** 是反推"某条数据是否在训练集里"的攻击。 #sec
- **Watermarking（水印）** — 在生成内容里嵌入可检测标记。**C2PA** 是内容来源与真实性的行业标准。 #sec
- **AGI（通用人工智能）** — 能在多数认知任务上达到或超过人类水平的系统。**定义本身就有争议，所以它更像一个立场而非一个指标**。 #debate #hype
- **ASI（超级智能）** — 全面超越人类的假想系统。 #sec
- **Superalignment（超级对齐）** — 研究如何对齐"比人聪明得多"的系统。 #sec
- **x-risk（存在性风险）** — AI 导致人类文明级灾难的可能性。是安全阵营内部最分裂的话题。 #sec

## 十一、生态与产品

- **Open-weight vs Open-source（开放权重 vs 开源）** — Llama、Qwen 多是**开放权重**：能下载能跑能微调，但训练数据与流程不公开。严格意义的开源模型（如 OLMo）才给全套。 #debate #pitfall
- **Model Hub** — 模型托管平台，Hugging Face 是事实标准。 #eng
- **Model Card（模型卡）** — 模型的说明书：训练数据、评测结果、已知限制。
- **Safetensors** — 安全的权重存储格式，替代 pickle 以防反序列化攻击。
- **Checkpoint（检查点）** — 训练中途保存的权重快照。
- **LangChain / LlamaIndex** — 早期两大应用框架。LangChain 偏通用编排，LlamaIndex 偏 RAG 与数据接入。 #eng
- **LangGraph / CrewAI / AutoGen** — 新一代 Agent 编排框架，共同点是**把 Agent 表达成图或有状态流程**，而非线性链。 #eng
- **Semantic Kernel** — 微软的 .NET/Python 侧 Agent 框架，企业环境常见。 #eng
- **Dify / Coze / n8n** — 低代码 AI 应用平台，把提示、知识库、工作流可视化拼装。 #eng
- **LLMOps** — 面向 LLM 应用的运维：提示版本管理、评测回归、成本监控、线上追踪。 #cost #eng
- **Tracing / Observability（追踪/可观测）** — 记录每次调用的完整链路（提示、工具、耗时、成本），LangSmith、Langfuse 是代表工具。 #cost #eng
- **AI Native（AI 原生）** — 从设计之初就把模型能力当核心构件的产品，而不是给旧产品加个聊天框。 #hype
- **Copilot vs Agent** — Copilot 是"你主导、它补全"，Agent 是"你给目标、它执行"。产品定位的分水岭。
- **Wrapper / 套壳（Thin Wrapper）** — 只在 API 外面包一层界面、没有自有壁垒的产品。**批评者的说法；实际上护城河可以建在分发、数据、工作流上**。 #debate #hype
- **Data Flywheel（数据飞轮）** — 用户使用产生数据、数据改进模型、模型吸引更多用户的正循环。 #hype

## 十二、行业叙事

- **Vibe Coding（氛围编程）** — Karpathy 2025 年提出：不看代码、只看效果，用自然语言让 AI 写程序。**从"写代码"转向"描述想要什么"**。 #hype #new
- **Software 3.0** — Karpathy 的说法：1.0 是手写规则，2.0 是神经网络学规则，3.0 是用自然语言给 LLM 编程。 #hype #new
- **Prompt-to-App** — 一句话生成可运行应用，是 Vibe Coding 的产品化形态。 #hype #new
- **Agent 元年** — 营销词，2025 年被反复使用。真实含义是"Agent 从 demo 走进了生产的部分环节"。 #hype #new
- **Scaling Wall（规模墙）** — 单纯堆参数与数据收益递减。分**Data Wall**（数据不够）和 **Power Wall**（电力不够）。 #hype #new
- **推理成本曲线** — 同等能力的推理价格大约每 12 个月降一个数量级（类似"莱特定律"）。**做产品规划时必须假设今天的贵，明年会便宜**。 #cost #hype
- **Context 是新的内存 / 检索是新的磁盘** — 一句比喻，解释了长上下文与 RAG 的分工。 #hype
- **数字员工 / 硅基员工** — 企业采购话术，指可被"雇佣"来完成流程性工作的 Agent。 #hype
- **AI Infra** — 围绕训练与推理的基础设施层：算力、调度、框架、引擎。是当下最赚钱的一层。 #cost #hype
- **六小虎** — 中国大模型创业公司的旧称（智谱、月之暗面、MiniMax、百川、零一万物、阶跃星辰）。**这个称呼已经过时了**，格局早已分化。 #debate #hype
- **参数通货膨胀** — 新模型必须比上一个大，成了发布会叙事的一部分，与能力提升不必然相关。 #debate #hype
- **榜单刷分（Benchmark Gaming）** — 针对公开榜单做优化，而非提升真实能力。 #hype

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

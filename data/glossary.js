/* 本文件由 scripts/sync.mjs 自动生成，请勿直接编辑。
 * 修改词条请编辑 Markdown 源文件后重新运行 node scripts/sync.mjs
 * 生成时间：2026-11-07T05:57:24.772Z
 */
const GLOSSARY = {
  "meta": {
    "title": "AI 黑话词典",
    "subtitle": "LLM 时代的术语速查表",
    "description": "把 AI / LLM 圈的黑话按十二条脉络整理成可查的词典：从 Transformer 到 Agent，从幻觉到 Vibe Coding。",
    "source": "https://github.com/addozhang/ai-glossary",
    "license": "CC BY 4.0",
    "updated": "2026-11-07",
    "count": 231
  },
  "categories": [
    {
      "id": "architecture",
      "name": "模型与架构",
      "en": "Architecture",
      "desc": "模型本体：参数、注意力、位置编码、稀疏结构"
    },
    {
      "id": "training",
      "name": "训练与对齐",
      "en": "Training & Alignment",
      "desc": "怎么把模型训出来、怎么让它听话"
    },
    {
      "id": "reasoning",
      "name": "推理与生成",
      "en": "Reasoning & Decoding",
      "desc": "从思考链到采样策略"
    },
    {
      "id": "prompting",
      "name": "提示与上下文",
      "en": "Prompt & Context",
      "desc": "决定什么信息进入上下文窗口"
    },
    {
      "id": "rag",
      "name": "检索与知识",
      "en": "Retrieval & RAG",
      "desc": "让回答绑定到外部事实"
    },
    {
      "id": "agent",
      "name": "Agent 与工具",
      "en": "Agents & Tools",
      "desc": "让模型能规划、调用、迭代"
    },
    {
      "id": "evaluation",
      "name": "评测与基准",
      "en": "Evaluation",
      "desc": "怎么判断\"真的更好\""
    },
    {
      "id": "serving",
      "name": "部署与推理工程",
      "en": "Serving & Infra",
      "desc": "吞吐、延迟、显存、成本"
    },
    {
      "id": "multimodal",
      "name": "多模态与生成",
      "en": "Multimodal",
      "desc": "图像、语音、视频、世界模型"
    },
    {
      "id": "safety",
      "name": "安全与伦理",
      "en": "Safety & Ethics",
      "desc": "攻击面、对齐、可解释性"
    },
    {
      "id": "ecosystem",
      "name": "生态与产品",
      "en": "Ecosystem",
      "desc": "框架、平台、工程组织"
    },
    {
      "id": "business",
      "name": "行业叙事",
      "en": "Narratives",
      "desc": "营销词、造词、行业黑话"
    }
  ],
  "tags": [
    {
      "id": "core",
      "name": "核心",
      "desc": "理解其它词条的地基"
    },
    {
      "id": "pitfall",
      "name": "易混淆",
      "desc": "名称相近但含义不同，或常被误用"
    },
    {
      "id": "eng",
      "name": "工程",
      "desc": "落地时会真实碰到"
    },
    {
      "id": "cost",
      "name": "成本",
      "desc": "直接影响钱、显存或延迟"
    },
    {
      "id": "new",
      "name": "新词",
      "desc": "2024 年后出现或流行"
    },
    {
      "id": "hype",
      "name": "营销",
      "desc": "来自发布会或社媒的叙事词"
    },
    {
      "id": "debate",
      "name": "有争议",
      "desc": "定义或有效性存在争论"
    },
    {
      "id": "sec",
      "name": "安全",
      "desc": "涉及攻击面、风险或对齐"
    }
  ],
  "lead": {
    "title": "先分清那个「推理」",
    "lines": [
      "在中文里，\"推理\"对应两个完全不同的英文词，用错会让整句话失去意义：",
      "- **Inference（推理/推断）** — 模型跑一次前向计算、生成输出的过程。是动词性的工程词，对应\"推理成本\"\"推理芯片\"\"推理延迟\"。",
      "- **Reasoning（推理/思考）** — 模型做多步逻辑推导的能力或行为。是能力词，对应\"推理模型\"\"推理链\"\"推理能力\"。",
      "\"推理模型推理一次要花多少推理成本\"——这句话里三个\"推理\"分别是 Reasoning、Inference、Inference。中文没有区分，英文有。"
    ]
  },
  "terms": [
    {
      "id": "llm",
      "term": "LLM",
      "en": "Large Language Model",
      "zh": "大语言模型",
      "cat": "architecture",
      "tags": [
        "core",
        "debate"
      ],
      "def": "参数规模大到能涌现出泛化能力的语言模型。规模没有硬门槛，习惯上 10B 以上叫大。"
    },
    {
      "id": "foundation-model",
      "term": "Foundation Model",
      "en": "",
      "zh": "基座模型",
      "cat": "architecture",
      "tags": [],
      "def": "未经特定任务微调、可作为各类下游应用起点的通用模型。强调\"可被派生\"，不是强调\"大\"。"
    },
    {
      "id": "frontier-model",
      "term": "Frontier Model",
      "en": "",
      "zh": "前沿模型",
      "cat": "architecture",
      "tags": [
        "hype",
        "pitfall"
      ],
      "def": "当前能力最强的那一批，通常只有少数几家能训练。是个相对概念，每年换人。"
    },
    {
      "id": "transformer",
      "term": "Transformer",
      "en": "",
      "zh": "",
      "cat": "architecture",
      "tags": [
        "core"
      ],
      "def": "2017 年《Attention Is All You Need》提出的架构，用自注意力替代循环结构，是当下几乎所有大模型的底座。"
    },
    {
      "id": "attention",
      "term": "Attention",
      "en": "",
      "zh": "注意力",
      "cat": "architecture",
      "tags": [
        "core"
      ],
      "def": "让每个 token 根据相关性从其他 token 聚合信息的机制。**Self-Attention** 是自己内部互看，**Cross-Attention** 是跨序列（如编码器到解码器）看。"
    },
    {
      "id": "multi-head-attention",
      "term": "Multi-Head Attention",
      "en": "",
      "zh": "多头注意力",
      "cat": "architecture",
      "tags": [],
      "def": "并行跑多组注意力，各组学不同的关注模式。"
    },
    {
      "id": "token",
      "term": "Token",
      "en": "",
      "zh": "词元",
      "cat": "architecture",
      "tags": [
        "core",
        "cost"
      ],
      "def": "模型处理的最小单位，介于字和词之间。中文一个 token 约对应 1-2 个汉字，英文约 0.75 个单词。计费、上下文长度都按它算。"
    },
    {
      "id": "tokenization",
      "term": "Tokenization",
      "en": "",
      "zh": "分词",
      "cat": "architecture",
      "tags": [],
      "def": "把文本切成 token 的过程。分词器（tokenizer）是模型自带的，换模型就换分词，**token 数会变，账单也会变**。"
    },
    {
      "id": "embedding",
      "term": "Embedding",
      "en": "",
      "zh": "嵌入/向量化",
      "cat": "architecture",
      "tags": [
        "core"
      ],
      "def": "把文本映射成高维向量，语义相近的向量距离近。检索、聚类、去重全靠它。"
    },
    {
      "id": "context-window",
      "term": "Context Window",
      "en": "",
      "zh": "上下文窗口",
      "cat": "architecture",
      "tags": [
        "core"
      ],
      "def": "一次请求里模型能\"看见\"的最大 token 数（输入+输出）。也叫 context length。"
    },
    {
      "id": "parameter",
      "term": "Parameter",
      "en": "",
      "zh": "参数/权重",
      "cat": "architecture",
      "tags": [
        "core"
      ],
      "def": "模型里可学习的数值。**7B / 70B / 405B** 指十亿级参数量。"
    },
    {
      "id": "dense-model",
      "term": "Dense Model",
      "en": "",
      "zh": "稠密模型",
      "cat": "architecture",
      "tags": [],
      "def": "每次前向都激活全部参数。与 MoE 相对。"
    },
    {
      "id": "moe",
      "term": "MoE",
      "en": "Mixture of Experts",
      "zh": "混合专家",
      "cat": "architecture",
      "tags": [
        "core",
        "cost",
        "pitfall"
      ],
      "def": "把 FFN 拆成多个\"专家\"，每个 token 只路由到其中几个。**总参数**和**激活参数**是两回事：DeepSeek-V3 是 671B 总参 / 37B 激活，成本按激活算，显存按总参算。"
    },
    {
      "id": "router",
      "term": "Router",
      "en": "",
      "zh": "路由器",
      "cat": "architecture",
      "tags": [],
      "def": "MoE 里决定 token 去哪几个专家的那个小网络。路由不均会导致专家饿死或过载。"
    },
    {
      "id": "decoder-only",
      "term": "Decoder-only",
      "en": "",
      "zh": "仅解码器",
      "cat": "architecture",
      "tags": [],
      "def": "只有解码器堆叠、自回归生成的架构。GPT 系、Llama 系、Qwen 系都是，当下主流。"
    },
    {
      "id": "encoder-decoder",
      "term": "Encoder-Decoder",
      "en": "",
      "zh": "",
      "cat": "architecture",
      "tags": [],
      "def": "编码器读全输入、解码器再生成。T5、原始 Transformer 是这类，翻译类任务上仍常见。"
    },
    {
      "id": "autoregressive",
      "term": "Autoregressive",
      "en": "",
      "zh": "自回归",
      "cat": "architecture",
      "tags": [],
      "def": "一个 token 一个 token 往后接。所有主流 LLM 的生成方式。"
    },
    {
      "id": "kv-cache",
      "term": "KV Cache",
      "en": "",
      "zh": "",
      "cat": "architecture",
      "tags": [
        "core",
        "cost"
      ],
      "def": "缓存已算过的 Key/Value，避免重复计算。它是长上下文推理显存占用的主要来源。"
    },
    {
      "id": "gqa-mqa",
      "term": "GQA / MQA",
      "en": "",
      "zh": "分组/多查询注意力",
      "cat": "architecture",
      "tags": [],
      "def": "让多个 Query 头共享一组 KV 头，大幅压缩 KV Cache。Llama 2 之后基本标配。"
    },
    {
      "id": "rope",
      "term": "RoPE",
      "en": "",
      "zh": "旋转位置编码",
      "cat": "architecture",
      "tags": [],
      "def": "用旋转矩阵编码位置信息，便于外推到更长上下文。上下文扩展技术（YaRN、NTK）多在它上面做文章。"
    },
    {
      "id": "flashattention",
      "term": "FlashAttention",
      "en": "",
      "zh": "",
      "cat": "architecture",
      "tags": [
        "cost"
      ],
      "def": "通过分块和重计算降低显存访问的注意力实现。是\"算法让硬件跑得更快\"的经典案例，已迭代到 v3/v4。"
    },
    {
      "id": "ssm",
      "term": "SSM",
      "en": "State Space Model",
      "zh": "状态空间模型",
      "cat": "architecture",
      "tags": [],
      "def": "用线性递推替代注意力的序列建模路线，Mamba 是其代表。理论优势是长序列下计算线性增长。"
    },
    {
      "id": "hybrid-architecture",
      "term": "Hybrid Architecture",
      "en": "",
      "zh": "混合架构",
      "cat": "architecture",
      "tags": [
        "cost"
      ],
      "def": "注意力层与线性/SSM 层交替堆叠，兼顾效果与长上下文成本。"
    },
    {
      "id": "pretraining",
      "term": "Pretraining",
      "en": "",
      "zh": "预训练",
      "cat": "training",
      "tags": [
        "core",
        "cost"
      ],
      "def": "在海量无标注语料上做下一个 token 预测，得到基座模型。占全部算力的大头。"
    },
    {
      "id": "scaling-law",
      "term": "Scaling Law",
      "en": "",
      "zh": "缩放定律",
      "cat": "training",
      "tags": [
        "core",
        "cost",
        "debate"
      ],
      "def": "损失随参数量、数据量、算力呈幂律下降的经验规律。2020 年 Kaplan 版本 vs 2022 年 Chinchilla 版本的差别在于\"参数和数据该怎么分配\"。"
    },
    {
      "id": "chinchilla-optimal",
      "term": "Chinchilla Optimal",
      "en": "",
      "zh": "计算最优",
      "cat": "training",
      "tags": [
        "cost"
      ],
      "def": "给定算力预算，参数与训练 token 应按约 1:20 配比。催生了\"小模型喂更多数据\"的路线。"
    },
    {
      "id": "data-wall",
      "term": "Data Wall",
      "en": "",
      "zh": "数据墙",
      "cat": "training",
      "tags": [],
      "def": "高质量公开文本接近耗尽，继续扩规模缺乏燃料。是 2024 年后\"合成数据\"热的直接原因。"
    },
    {
      "id": "sft",
      "term": "SFT",
      "en": "Supervised Fine-Tuning",
      "zh": "监督微调",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "用\"指令-回答\"对训练模型学会听话。是 RLHF 之前的必经步骤。"
    },
    {
      "id": "instruction-tuning",
      "term": "Instruction Tuning",
      "en": "",
      "zh": "指令微调",
      "cat": "training",
      "tags": [],
      "def": "SFT 的一种，专指让模型遵循指令格式。"
    },
    {
      "id": "rlhf",
      "term": "RLHF",
      "en": "Reinforcement Learning from Human Feedback",
      "zh": "",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "用人类偏好训练奖励模型，再用强化学习优化策略。ChatGPT 的关键配方。"
    },
    {
      "id": "rlaif",
      "term": "RLAIF",
      "en": "",
      "zh": "",
      "cat": "training",
      "tags": [
        "cost",
        "debate",
        "pitfall"
      ],
      "def": "用 AI 替代人类标注偏好，降本版本。争议在于\"用 AI 教 AI\"会不会放大偏差。"
    },
    {
      "id": "reward-model",
      "term": "Reward Model",
      "en": "",
      "zh": "奖励模型",
      "cat": "training",
      "tags": [],
      "def": "学习\"人类更喜欢哪个回答\"的打分器，是 RLHF 的中介。"
    },
    {
      "id": "ppo",
      "term": "PPO",
      "en": "",
      "zh": "近端策略优化",
      "cat": "training",
      "tags": [
        "cost"
      ],
      "def": "RLHF 里常用的强化学习算法。工程复杂，需要四个模型同时在显存里。"
    },
    {
      "id": "dpo",
      "term": "DPO",
      "en": "Direct Preference Optimization",
      "zh": "直接偏好优化",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "跳过奖励模型，直接用偏好对优化策略。简单稳定，已成主流替代方案。"
    },
    {
      "id": "grpo",
      "term": "GRPO",
      "en": "Group Relative Policy Optimization",
      "zh": "",
      "cat": "training",
      "tags": [
        "new"
      ],
      "def": "用组内相对得分替代价值网络，省掉 critic 模型。DeepSeek-R1 用它做纯 RL 推理训练，是 2025 年的关键配方。"
    },
    {
      "id": "kto-orpo",
      "term": "KTO / ORPO",
      "en": "",
      "zh": "",
      "cat": "training",
      "tags": [],
      "def": "偏好优化的变体。KTO 只需\"好/坏\"二元标注，ORPO 把 SFT 和偏好优化合并成一步。"
    },
    {
      "id": "reward-hacking",
      "term": "Reward Hacking",
      "en": "",
      "zh": "奖励黑客",
      "cat": "training",
      "tags": [],
      "def": "模型找到奖励模型的漏洞、刷高分数但答得更差。对齐里的经典失败模式。"
    },
    {
      "id": "alignment",
      "term": "Alignment",
      "en": "",
      "zh": "对齐",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "让模型行为符合人类意图与价值观的总称。包含有用性、诚实性、无害性三个维度（**HHH**）。"
    },
    {
      "id": "constitutional-ai",
      "term": "Constitutional AI",
      "en": "",
      "zh": "宪法 AI",
      "cat": "training",
      "tags": [],
      "def": "Anthropic 提出，用一套明文原则让模型自我批评和修正，减少人工标注依赖。"
    },
    {
      "id": "jailbreak",
      "term": "Jailbreak",
      "en": "",
      "zh": "越狱",
      "cat": "training",
      "tags": [
        "pitfall"
      ],
      "def": "用特殊措辞绕过安全限制。与提示注入的区别见「安全与伦理」一节。"
    },
    {
      "id": "red-teaming",
      "term": "Red Teaming",
      "en": "",
      "zh": "红队测试",
      "cat": "training",
      "tags": [],
      "def": "组织人主动攻击模型找漏洞，是发布前的标准动作。"
    },
    {
      "id": "fine-tuning",
      "term": "Fine-tuning",
      "en": "",
      "zh": "微调",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "在预训练模型上继续训练以适配特定任务或风格。**全参微调**改所有权重，**参数高效微调**只改一小部分。"
    },
    {
      "id": "peft",
      "term": "PEFT",
      "en": "Parameter-Efficient Fine-Tuning",
      "zh": "",
      "cat": "training",
      "tags": [],
      "def": "参数高效微调的统称，LoRA、Adapter、Prefix Tuning 都属此类。"
    },
    {
      "id": "lora",
      "term": "LoRA",
      "en": "",
      "zh": "低秩适配",
      "cat": "training",
      "tags": [
        "core",
        "cost"
      ],
      "def": "冻结原权重，旁挂两个小矩阵做低秩修正。显存占用降一个量级，可插拔切换。"
    },
    {
      "id": "qlora",
      "term": "QLoRA",
      "en": "",
      "zh": "",
      "cat": "training",
      "tags": [],
      "def": "把基座量化到 4bit 再挂 LoRA，单卡可微调大模型。"
    },
    {
      "id": "adapter",
      "term": "Adapter",
      "en": "",
      "zh": "",
      "cat": "training",
      "tags": [
        "cost"
      ],
      "def": "在层间插入小模块的 PEFT 方案，比 LoRA 早，推理时有额外延迟。"
    },
    {
      "id": "cpt",
      "term": "CPT",
      "en": "Continual Pretraining",
      "zh": "继续预训练",
      "cat": "training",
      "tags": [
        "pitfall"
      ],
      "def": "在基座模型上用领域语料再训一轮，注入知识而非改变风格。与微调的目的不同。"
    },
    {
      "id": "distillation",
      "term": "Distillation",
      "en": "",
      "zh": "蒸馏",
      "cat": "training",
      "tags": [
        "core"
      ],
      "def": "用大模型（教师）的输出训练小模型（学生）。2025 年后还多了一层含义：**把推理模型的思维链蒸给小模型**。"
    },
    {
      "id": "catastrophic-forgetting",
      "term": "Catastrophic Forgetting",
      "en": "",
      "zh": "灾难性遗忘",
      "cat": "training",
      "tags": [],
      "def": "学新任务把旧能力忘掉。微调过度时的典型病症。"
    },
    {
      "id": "emergent-ability",
      "term": "Emergent Ability",
      "en": "",
      "zh": "涌现能力",
      "cat": "training",
      "tags": [
        "debate"
      ],
      "def": "规模跨过某阈值后突然出现的能力。**注意：这个说法近年受到质疑**，很多\"涌现\"被证明是评测指标不连续造成的假象。"
    },
    {
      "id": "synthetic-data",
      "term": "Synthetic Data",
      "en": "",
      "zh": "合成数据",
      "cat": "training",
      "tags": [
        "cost"
      ],
      "def": "用模型生成训练数据。成本低，但会**模型崩溃（model collapse）**——反复用自己的输出训练自己会退化。"
    },
    {
      "id": "data-curation",
      "term": "Data Curation",
      "en": "",
      "zh": "数据清洗/配比",
      "cat": "training",
      "tags": [],
      "def": "去重、去毒、质量打分、领域配比。业内公认它比架构更能决定效果。"
    },
    {
      "id": "data-contamination",
      "term": "Data Contamination",
      "en": "",
      "zh": "数据污染",
      "cat": "training",
      "tags": [],
      "def": "评测集泄漏进训练集，分数虚高。详见「评测与基准」一节。"
    },
    {
      "id": "inference",
      "term": "Inference",
      "en": "",
      "zh": "推理/推断",
      "cat": "reasoning",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "模型前向计算、产出结果的过程。是动词性的工程词，对应\"推理成本\"\"推理芯片\"\"推理延迟\"。"
    },
    {
      "id": "hallucination",
      "term": "Hallucination",
      "en": "",
      "zh": "幻觉",
      "cat": "reasoning",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "模型生成看似合理但与事实不符的内容。分**事实性幻觉**（说错事实）和**忠实性幻觉**（偏离给定材料）。根因是它优化的是\"下一个 token 的概率\"，不是\"真实性\"。"
    },
    {
      "id": "reasoning",
      "term": "Reasoning",
      "en": "",
      "zh": "推理/思考",
      "cat": "reasoning",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "模型做多步逻辑推导的能力或行为。是能力词，对应\"推理模型\"\"推理链\"\"推理能力\"。"
    },
    {
      "id": "reasoning-model",
      "term": "Reasoning Model",
      "en": "",
      "zh": "推理模型",
      "cat": "reasoning",
      "tags": [
        "new"
      ],
      "def": "生成答案前先产出长思维链的模型，如 o 系列、R1 系列。特点是**用推理时间换准确率**。"
    },
    {
      "id": "cot",
      "term": "CoT",
      "en": "Chain of Thought",
      "zh": "思维链",
      "cat": "reasoning",
      "tags": [
        "core"
      ],
      "def": "让模型\"先写步骤再给答案\"。2022 年发现，一句\"Let's think step by step\"就能显著提升数学题正确率。"
    },
    {
      "id": "zero-shot-cot",
      "term": "Zero-shot CoT",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "不加示例，只加一句引导语触发思维链。"
    },
    {
      "id": "few-shot-one-shot",
      "term": "Few-shot / One-shot",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "给几个（或一个）示例再让模型做。属于最原始的\"提示工程\"。"
    },
    {
      "id": "icl",
      "term": "ICL",
      "en": "In-Context Learning",
      "zh": "上下文学习",
      "cat": "reasoning",
      "tags": [
        "core"
      ],
      "def": "不更新权重，仅靠上下文中的示例让模型学会新任务。是 LLM 最反直觉的能力之一。"
    },
    {
      "id": "self-consistency",
      "term": "Self-Consistency",
      "en": "",
      "zh": "自洽性",
      "cat": "reasoning",
      "tags": [
        "cost"
      ],
      "def": "采样多条推理路径，投票选最多数的答案。用算力换稳定性。"
    },
    {
      "id": "react",
      "term": "ReAct",
      "en": "Reason + Act",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "交替进行\"思考一步、调用一次工具\"的范式。Agent 的基础循环。"
    },
    {
      "id": "tot",
      "term": "ToT",
      "en": "Tree of Thoughts",
      "zh": "思维树",
      "cat": "reasoning",
      "tags": [],
      "def": "把推理展开成树，多分支探索并回溯。代价高，适合难题。"
    },
    {
      "id": "reflexion-self-refine",
      "term": "Reflexion / Self-Refine",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "让模型检查自己的输出并迭代改进。单靠\"自我批评\"提升有限，配外部验证器才有效。"
    },
    {
      "id": "test-time-compute",
      "term": "Test-Time Compute",
      "en": "",
      "zh": "测试时计算",
      "cat": "reasoning",
      "tags": [
        "core",
        "cost",
        "new",
        "pitfall"
      ],
      "def": "推理阶段多花算力（多想、多采样、多搜索）来提升质量。与\"训练时堆参数\"是两条不同的规模化路线。"
    },
    {
      "id": "extended-thinking-thinking-budget",
      "term": "Extended Thinking / Thinking Budget",
      "en": "",
      "zh": "思考预算",
      "cat": "reasoning",
      "tags": [
        "new"
      ],
      "def": "产品层面对 Test-Time Compute 的封装：给模型分配多少\"思考 token\"。"
    },
    {
      "id": "system-1-system-2",
      "term": "System 1 / System 2",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "借自心理学：System 1 是快速直觉（普通模型直接出答案），System 2 是慢速深思（推理模型先想再答）。"
    },
    {
      "id": "decoding",
      "term": "Decoding",
      "en": "",
      "zh": "解码/采样",
      "cat": "reasoning",
      "tags": [],
      "def": "从概率分布里选下一个 token 的策略。"
    },
    {
      "id": "greedy-decoding",
      "term": "Greedy Decoding",
      "en": "",
      "zh": "贪心解码",
      "cat": "reasoning",
      "tags": [],
      "def": "每次选概率最高的。确定性强，容易重复。"
    },
    {
      "id": "beam-search",
      "term": "Beam Search",
      "en": "",
      "zh": "束搜索",
      "cat": "reasoning",
      "tags": [],
      "def": "同时保留多条候选路径。翻译常用，开放生成少用（太死板）。"
    },
    {
      "id": "temperature",
      "term": "Temperature",
      "en": "",
      "zh": "温度",
      "cat": "reasoning",
      "tags": [
        "core"
      ],
      "def": "采样随机性。0 近乎确定，1 以上发散。**它不是\"创造力旋钮\"，是分布锐化/平坦化。**"
    },
    {
      "id": "top-p-top-k-nr5kd",
      "term": "Top-p（核采样）/ Top-k",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "只在累计概率前 p（或前 k 个）候选里采样，截掉长尾怪词。"
    },
    {
      "id": "repetition-penalty-frequency-penalty",
      "term": "Repetition Penalty / Frequency Penalty",
      "en": "",
      "zh": "",
      "cat": "reasoning",
      "tags": [],
      "def": "压制重复 token 的惩罚项。"
    },
    {
      "id": "structured-output-json-mode",
      "term": "Structured Output / JSON Mode",
      "en": "",
      "zh": "结构化输出",
      "cat": "reasoning",
      "tags": [],
      "def": "强制模型按给定 schema 输出。靠**约束解码**实现，不是靠\"求它好好输出\"。"
    },
    {
      "id": "constrained-decoding",
      "term": "Constrained Decoding",
      "en": "",
      "zh": "约束解码",
      "cat": "reasoning",
      "tags": [],
      "def": "在每步采样时屏蔽不符合语法的 token，从机制上保证格式合法。"
    },
    {
      "id": "prompt",
      "term": "Prompt",
      "en": "",
      "zh": "提示词",
      "cat": "prompting",
      "tags": [
        "core"
      ],
      "def": "给模型的输入。包含 **System Prompt**（角色与规则，优先级最高）、**User Prompt**（本次任务）、**Assistant**（历史回复）。"
    },
    {
      "id": "prompt-engineering",
      "term": "Prompt Engineering",
      "en": "",
      "zh": "提示工程",
      "cat": "prompting",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "通过改写输入来提升输出质量的技艺。边界正在被\"上下文工程\"吞并。"
    },
    {
      "id": "context-engineering",
      "term": "Context Engineering",
      "en": "",
      "zh": "上下文工程",
      "cat": "prompting",
      "tags": [
        "core",
        "eng",
        "new"
      ],
      "def": "比提示工程更大的范畴：决定**什么信息、以什么顺序、占多少 token** 进入上下文窗口。包含检索、记忆、压缩、工具结果管理。"
    },
    {
      "id": "prompt-template",
      "term": "Prompt Template",
      "en": "",
      "zh": "提示模板",
      "cat": "prompting",
      "tags": [
        "eng"
      ],
      "def": "带变量占位的提示词，工程化的基本单位。"
    },
    {
      "id": "prompt-chaining",
      "term": "Prompt Chaining",
      "en": "",
      "zh": "提示链",
      "cat": "prompting",
      "tags": [],
      "def": "把复杂任务拆成多步、上一步输出喂给下一步。比单次长提示更可控。"
    },
    {
      "id": "lost-in-the-middle",
      "term": "Lost in the Middle",
      "en": "",
      "zh": "中间遗忘",
      "cat": "prompting",
      "tags": [
        "core",
        "eng",
        "pitfall"
      ],
      "def": "长上下文里位于中段的信息最容易被忽略，首尾的信息利用得最好。**\"支持 1M 上下文\"不等于\"能用好 1M 上下文\"。**"
    },
    {
      "id": "context-rot-context-overflow",
      "term": "Context Rot / Context Overflow",
      "en": "",
      "zh": "上下文腐化/溢出",
      "cat": "prompting",
      "tags": [
        "cost",
        "new"
      ],
      "def": "上下文塞太满导致注意力分散、指令被淹没、成本飙升。Agent 长跑失败的主因之一。"
    },
    {
      "id": "prompt-compression",
      "term": "Prompt Compression",
      "en": "",
      "zh": "提示压缩",
      "cat": "prompting",
      "tags": [],
      "def": "把长上下文摘要或裁剪后再喂给模型。"
    },
    {
      "id": "prompt-caching",
      "term": "Prompt Caching",
      "en": "",
      "zh": "提示缓存",
      "cat": "prompting",
      "tags": [
        "cost",
        "eng"
      ],
      "def": "服务端缓存重复的前缀（系统提示、长文档），命中后按更低价格计费。工程上省钱的第一手段。"
    },
    {
      "id": "negative-prompt",
      "term": "Negative Prompt",
      "en": "",
      "zh": "负向提示",
      "cat": "prompting",
      "tags": [],
      "def": "主要用在图像生成，告诉模型\"不要什么\"。文本模型里作用有限。"
    },
    {
      "id": "rag",
      "term": "RAG",
      "en": "Retrieval-Augmented Generation",
      "zh": "检索增强生成",
      "cat": "rag",
      "tags": [
        "core",
        "eng"
      ],
      "def": "先从外部知识库检索相关片段，再把片段拼进上下文让模型作答。解决\"模型不知道新知识\"和\"编造引用\"两个问题。"
    },
    {
      "id": "chunking",
      "term": "Chunking",
      "en": "",
      "zh": "分块",
      "cat": "rag",
      "tags": [
        "core"
      ],
      "def": "把文档切成适合检索的片段。块太大检索不准，太小丢上下文。**按语义/标题切优于按固定字数切**。"
    },
    {
      "id": "embedding-model",
      "term": "Embedding Model",
      "en": "",
      "zh": "向量模型",
      "cat": "rag",
      "tags": [
        "core"
      ],
      "def": "专门把文本转成向量的模型，如 BGE、E5、text-embedding-3。与生成模型是两套东西，选错向量模型比选错 LLM 影响更大。"
    },
    {
      "id": "vector-database",
      "term": "Vector Database",
      "en": "",
      "zh": "向量数据库",
      "cat": "rag",
      "tags": [
        "core"
      ],
      "def": "存向量并做近似最近邻检索（**ANN**）的数据库，如 Milvus、Qdrant、Weaviate、pgvector。"
    },
    {
      "id": "ann",
      "term": "ANN",
      "en": "Approximate Nearest Neighbor",
      "zh": "",
      "cat": "rag",
      "tags": [
        "eng"
      ],
      "def": "近似最近邻搜索，用少量精度换数量级的速度。**HNSW** 是最常用的索引结构。"
    },
    {
      "id": "semantic-search",
      "term": "Semantic Search",
      "en": "",
      "zh": "语义检索",
      "cat": "rag",
      "tags": [],
      "def": "按向量相似度找，能命中\"换了说法但意思相同\"的内容。"
    },
    {
      "id": "sparse-retrieval",
      "term": "Sparse Retrieval",
      "en": "",
      "zh": "稀疏检索",
      "cat": "rag",
      "tags": [],
      "def": "基于词频的传统检索，**BM25** 是代表。对专有名词、型号、代码符号特别准。"
    },
    {
      "id": "hybrid-search",
      "term": "Hybrid Search",
      "en": "",
      "zh": "混合检索",
      "cat": "rag",
      "tags": [
        "eng"
      ],
      "def": "稠密+稀疏两路召回再融合。**生产环境几乎都该用这个**，纯向量检索对精确关键词很弱。"
    },
    {
      "id": "reranker",
      "term": "Reranker",
      "en": "",
      "zh": "重排序",
      "cat": "rag",
      "tags": [
        "core"
      ],
      "def": "对召回结果做二次精排（通常用 cross-encoder 逐对打分）。召回靠粗，排序靠精。"
    },
    {
      "id": "recall-precision",
      "term": "Recall / Precision",
      "en": "",
      "zh": "召回率/精确率",
      "cat": "rag",
      "tags": [],
      "def": "召回=该找到的找到了多少，精确=找到的里面有多少是对的。检索链路先保召回，再靠 rerank 提精确。"
    },
    {
      "id": "top-k",
      "term": "Top-K",
      "en": "",
      "zh": "",
      "cat": "rag",
      "tags": [],
      "def": "取相似度最高的 K 条。K 太大引入噪音，太小漏信息。"
    },
    {
      "id": "query-rewrite",
      "term": "Query Rewrite",
      "en": "",
      "zh": "查询改写",
      "cat": "rag",
      "tags": [],
      "def": "把用户口语化的问题改写成检索友好的形式，多轮对话里还要补全指代。"
    },
    {
      "id": "hyde",
      "term": "HyDE",
      "en": "Hypothetical Document Embeddings",
      "zh": "",
      "cat": "rag",
      "tags": [],
      "def": "先让模型编一个\"假答案\"，用假答案的向量去检索。听着离谱但有效，因为假答案和真文档在同一语义空间。"
    },
    {
      "id": "multi-hop-qa",
      "term": "Multi-hop QA",
      "en": "",
      "zh": "多跳问答",
      "cat": "rag",
      "tags": [],
      "def": "需要连续检索多次、串起多个事实才能回答的问题。单轮 RAG 的典型短板。"
    },
    {
      "id": "graphrag",
      "term": "GraphRAG",
      "en": "",
      "zh": "",
      "cat": "rag",
      "tags": [
        "cost",
        "eng",
        "new"
      ],
      "def": "把知识建成实体关系图再检索，适合\"跨文档总结\"和\"全局性问题\"。成本高，索引构建慢。"
    },
    {
      "id": "agentic-rag",
      "term": "Agentic RAG",
      "en": "",
      "zh": "",
      "cat": "rag",
      "tags": [
        "eng",
        "new"
      ],
      "def": "让 Agent 自主决定检索什么、检索几轮、要不要换查询。比固定流水线灵活。"
    },
    {
      "id": "grounding",
      "term": "Grounding",
      "en": "",
      "zh": "接地/落地",
      "cat": "rag",
      "tags": [],
      "def": "让回答绑定到可验证的外部来源，减少幻觉。**Grounded Answer** 指每个论断都能追到出处。"
    },
    {
      "id": "citation",
      "term": "Citation",
      "en": "",
      "zh": "引用",
      "cat": "rag",
      "tags": [
        "pitfall"
      ],
      "def": "输出里标注来源。注意：**模型能生成看起来很像的假引用**，必须由系统层校验。"
    },
    {
      "id": "knowledge-base",
      "term": "Knowledge Base",
      "en": "",
      "zh": "知识库",
      "cat": "rag",
      "tags": [],
      "def": "泛指供检索的结构化/非结构化资料集合。"
    },
    {
      "id": "long-context-vs-rag",
      "term": "Long Context vs RAG",
      "en": "",
      "zh": "",
      "cat": "rag",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "不是替代关系。长上下文解决\"一次能看多少\"，RAG 解决\"哪些值得看\"。**数据量大时 RAG 省钱，需要全局理解时长上下文更强**。"
    },
    {
      "id": "context-stuffing",
      "term": "Context Stuffing",
      "en": "",
      "zh": "上下文硬塞",
      "cat": "rag",
      "tags": [],
      "def": "不管相关性把整份文档全塞进去。省事，但贵且容易迷失。"
    },
    {
      "id": "agent",
      "term": "Agent",
      "en": "",
      "zh": "智能体/代理",
      "cat": "agent",
      "tags": [
        "core"
      ],
      "def": "能自主规划、调用工具、根据反馈迭代直到完成目标的系统。判定标准不是\"接了 LLM\"，而是**有没有闭环**。"
    },
    {
      "id": "agentic",
      "term": "Agentic",
      "en": "",
      "zh": "代理式的",
      "cat": "agent",
      "tags": [],
      "def": "形容具备自主决策与多步执行的特性。**Agentic Workflow** 指按预设流程编排多个 LLM 步骤。"
    },
    {
      "id": "workflow-vs-agent",
      "term": "Workflow vs Agent",
      "en": "",
      "zh": "",
      "cat": "agent",
      "tags": [
        "core",
        "pitfall"
      ],
      "def": "Workflow 的路径是人定的，Agent 的路径是模型现场决定的。**能用 workflow 解决就别上 agent**，前者可调试、可计费、可预测。"
    },
    {
      "id": "tool-use-function-calling",
      "term": "Tool Use / Function Calling",
      "en": "",
      "zh": "工具调用/函数调用",
      "cat": "agent",
      "tags": [
        "core"
      ],
      "def": "模型输出结构化的调用意图，由外部执行并回填结果。模型本身不执行任何东西。"
    },
    {
      "id": "mcp",
      "term": "MCP",
      "en": "Model Context Protocol",
      "zh": "",
      "cat": "agent",
      "tags": [
        "core",
        "eng",
        "new"
      ],
      "def": "Anthropic 2024 年底提出的开放协议，统一模型与外部工具/数据源的接入方式。类比\"AI 界的 USB-C\"。"
    },
    {
      "id": "a2a",
      "term": "A2A",
      "en": "Agent to Agent",
      "zh": "",
      "cat": "agent",
      "tags": [
        "eng",
        "new"
      ],
      "def": "让不同 Agent 之间互相通信协作的协议，由 Google 主导。"
    },
    {
      "id": "multi-agent",
      "term": "Multi-Agent",
      "en": "",
      "zh": "多智能体",
      "cat": "agent",
      "tags": [],
      "def": "多个角色分工协作，如 **Orchestrator**（编排者）+ **Worker**（执行者）、**Planner** + **Executor**、**Critic**（批评者）。"
    },
    {
      "id": "sub-agent",
      "term": "Sub-agent",
      "en": "",
      "zh": "子代理",
      "cat": "agent",
      "tags": [
        "new"
      ],
      "def": "主代理派生出的专职代理，用来隔离上下文、并行处理子任务。"
    },
    {
      "id": "planning",
      "term": "Planning",
      "en": "",
      "zh": "规划",
      "cat": "agent",
      "tags": [],
      "def": "把目标拆成可执行步骤。分**先规划后执行**和**边做边规划（interleaved）** 两类。"
    },
    {
      "id": "memory",
      "term": "Memory",
      "en": "",
      "zh": "记忆",
      "cat": "agent",
      "tags": [
        "core"
      ],
      "def": "跨轮次保留信息。**短期记忆**=上下文窗口内的对话；**长期记忆**=外部存储+检索。业界黑话\"上下文是新的内存，检索是新的磁盘\"。"
    },
    {
      "id": "scratchpad",
      "term": "Scratchpad",
      "en": "",
      "zh": "草稿纸",
      "cat": "agent",
      "tags": [],
      "def": "模型用来写中间推导的临时区域，不暴露给用户。"
    },
    {
      "id": "reflection",
      "term": "Reflection",
      "en": "",
      "zh": "反思",
      "cat": "agent",
      "tags": [],
      "def": "执行后回看结果、发现错误、修正计划。Agent 从\"跑一遍\"升级到\"跑得对\"的关键。"
    },
    {
      "id": "hitl",
      "term": "HITL",
      "en": "Human-in-the-Loop",
      "zh": "人在回路",
      "cat": "agent",
      "tags": [],
      "def": "关键节点插入人工确认。高风险操作（转账、删除、发布）的必备设计。"
    },
    {
      "id": "guardrails",
      "term": "Guardrails",
      "en": "",
      "zh": "护栏",
      "cat": "agent",
      "tags": [
        "eng",
        "pitfall"
      ],
      "def": "对输入输出做规则/模型检查，拦截越权、敏感、格式错误。与\"对齐\"不同：对齐在训练时做，护栏在运行时做。"
    },
    {
      "id": "sandbox",
      "term": "Sandbox",
      "en": "",
      "zh": "沙箱",
      "cat": "agent",
      "tags": [],
      "def": "隔离执行环境，限制文件、网络、权限。让 Agent 跑代码的前提。"
    },
    {
      "id": "computer-use-browser-use",
      "term": "Computer Use / Browser Use",
      "en": "",
      "zh": "操作电脑/浏览器",
      "cat": "agent",
      "tags": [],
      "def": "模型通过截图+点击操作真实界面。通用但慢且脆。"
    },
    {
      "id": "code-interpreter",
      "term": "Code Interpreter",
      "en": "",
      "zh": "代码解释器",
      "cat": "agent",
      "tags": [],
      "def": "让模型写代码并执行，用代码算数、处理文件。**比让模型心算可靠得多**。"
    },
    {
      "id": "skill",
      "term": "Skill",
      "en": "",
      "zh": "技能",
      "cat": "agent",
      "tags": [
        "new"
      ],
      "def": "打包好的可复用能力单元（提示+脚本+资源），按需加载。"
    },
    {
      "id": "harness",
      "term": "Harness",
      "en": "",
      "zh": "外架/工程壳",
      "cat": "agent",
      "tags": [
        "core",
        "eng",
        "new"
      ],
      "def": "围绕模型的工程基础设施：工具、循环、校验、上下文管理。同一个模型换个 harness，效果能差一倍。"
    },
    {
      "id": "loop-engineering",
      "term": "Loop Engineering",
      "en": "",
      "zh": "循环工程",
      "cat": "agent",
      "tags": [
        "debate",
        "eng",
        "new"
      ],
      "def": "设计\"模型→行动→验证→再行动\"这个循环的工程学。核心难点是**验证器写不写得出来**。"
    },
    {
      "id": "orchestration",
      "term": "Orchestration",
      "en": "",
      "zh": "编排",
      "cat": "agent",
      "tags": [
        "eng"
      ],
      "def": "调度多个模型/工具/子任务的顶层逻辑。"
    },
    {
      "id": "benchmark",
      "term": "Benchmark",
      "en": "",
      "zh": "基准测试",
      "cat": "evaluation",
      "tags": [
        "core"
      ],
      "def": "标准化题库。看榜单要记住：**厂商只报自己赢的那几个**。"
    },
    {
      "id": "mmlu-mmlu-pro",
      "term": "MMLU / MMLU-Pro",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "57 学科的选择题，考通用知识。已基本饱和，Pro 版加了难度。"
    },
    {
      "id": "gpqa",
      "term": "GPQA",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [
        "eng"
      ],
      "def": "研究生/博士级理科题，防搜索引擎作弊设计。**GPQA Diamond** 是其中最难子集。"
    },
    {
      "id": "gsm8k-math",
      "term": "GSM8K / MATH",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "小学数学应用题 / 竞赛数学。GSM8K 早被刷爆，MATH 也接近饱和。"
    },
    {
      "id": "humaneval-mbpp",
      "term": "HumanEval / MBPP",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "基础代码生成题。**已严重饱和，不再有区分度**。"
    },
    {
      "id": "swe-bench",
      "term": "SWE-bench",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [
        "eng",
        "new"
      ],
      "def": "真实 GitHub issue 修复任务，是目前最能反映\"工程能力\"的榜单。**SWE-bench Verified** 是人工筛过的可靠子集。"
    },
    {
      "id": "arc-agi",
      "term": "ARC-AGI",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "抽象推理谜题，考\"没见过的新规则能不能现场学会\"。人类轻松，模型吃力。"
    },
    {
      "id": "hle",
      "term": "HLE",
      "en": "Humanity's Last Exam",
      "zh": "",
      "cat": "evaluation",
      "tags": [
        "new"
      ],
      "def": "专家级跨学科难题集，为\"下一代评测\"设计，防止快速饱和。"
    },
    {
      "id": "chatbot-arena-lmarena",
      "term": "Chatbot Arena / LMArena",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "盲测对战、人类投票、算 **Elo** 分。优点是不依赖标准答案，缺点是偏向\"讨喜\"而非\"正确\"。"
    },
    {
      "id": "llm-as-a-judge",
      "term": "LLM-as-a-Judge",
      "en": "",
      "zh": "模型当裁判",
      "cat": "evaluation",
      "tags": [
        "core",
        "cost"
      ],
      "def": "用强模型给弱模型打分。成本低、可扩展，但有**位置偏好、长度偏好、自我偏好**三类系统性偏差。"
    },
    {
      "id": "golden-set",
      "term": "Golden Set",
      "en": "",
      "zh": "黄金集",
      "cat": "evaluation",
      "tags": [
        "eng"
      ],
      "def": "人工标注过的高质量评测集，用于回归测试。**做产品比追榜单更需要它**。"
    },
    {
      "id": "pass-k",
      "term": "Pass@k",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [],
      "def": "k 次尝试里至少有一次正确的概率，代码评测常用。**Pass@1** 更接近真实体验。"
    },
    {
      "id": "perplexity",
      "term": "Perplexity",
      "en": "",
      "zh": "困惑度/PPL",
      "cat": "evaluation",
      "tags": [],
      "def": "模型对文本的\"惊讶程度\"，越低越好。是预训练指标，**与人喜欢的回答质量不是一回事**。"
    },
    {
      "id": "bleu-rouge",
      "term": "BLEU / ROUGE",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [
        "cost"
      ],
      "def": "机器翻译/摘要的 n-gram 重叠度指标。便宜但对语义不敏感，已被 LLM 评审取代。"
    },
    {
      "id": "contamination",
      "term": "Contamination",
      "en": "",
      "zh": "数据污染",
      "cat": "evaluation",
      "tags": [],
      "def": "评测题混进了训练集，分数不可信。检测靠 n-gram 重合、改写扰动。"
    },
    {
      "id": "saturation",
      "term": "Saturation",
      "en": "",
      "zh": "饱和/刷榜",
      "cat": "evaluation",
      "tags": [],
      "def": "榜单分数被追平到失去区分度。每个基准都有保质期。"
    },
    {
      "id": "eval-harness",
      "term": "Eval Harness",
      "en": "",
      "zh": "",
      "cat": "evaluation",
      "tags": [
        "eng"
      ],
      "def": "批量跑评测的框架，如 lm-evaluation-harness。"
    },
    {
      "id": "vibes-based-eval",
      "term": "Vibes-based Eval",
      "en": "",
      "zh": "感觉评测",
      "cat": "evaluation",
      "tags": [
        "debate",
        "hype"
      ],
      "def": "没有指标，靠人试用后\"感觉行不行\"。被半开玩笑地当成真实标准，因为**离线指标和线上体验经常不一致**。"
    },
    {
      "id": "a-b-test",
      "term": "A/B Test",
      "en": "",
      "zh": "线上分流实验",
      "cat": "evaluation",
      "tags": [],
      "def": "唯一能证明\"真的更好\"的方法。"
    },
    {
      "id": "model-serving",
      "term": "Model Serving",
      "en": "",
      "zh": "模型服务/推理服务",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "把模型包装成 API 对外提供。核心指标是吞吐、延迟、成本三者取舍。"
    },
    {
      "id": "ttft",
      "term": "TTFT",
      "en": "Time To First Token",
      "zh": "首字延迟",
      "cat": "serving",
      "tags": [
        "cost",
        "eng"
      ],
      "def": "从发请求到收到第一个 token 的时间。**流式体验的生死线**，用户感知的是它。"
    },
    {
      "id": "tpot-itl",
      "term": "TPOT / ITL",
      "en": "Time Per Output Token / Inter-Token Latency",
      "zh": "每字延迟",
      "cat": "serving",
      "tags": [],
      "def": "后续每个 token 的间隔，决定\"读起来顺不顺\"。"
    },
    {
      "id": "throughput",
      "term": "Throughput",
      "en": "",
      "zh": "吞吐",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "单位时间处理的 token 数。**吞吐和延迟是对立的**：大批量能提吞吐但抬高单请求延迟。"
    },
    {
      "id": "prefill-decode",
      "term": "Prefill / Decode",
      "en": "",
      "zh": "预填充/解码",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "推理的两个阶段。Prefill 并行处理输入（**算力瓶颈**），Decode 逐个吐字（**显存带宽瓶颈**）。两者优化手段完全不同。"
    },
    {
      "id": "batching",
      "term": "Batching",
      "en": "",
      "zh": "批处理",
      "cat": "serving",
      "tags": [],
      "def": "多个请求一起算以提升 GPU 利用率。"
    },
    {
      "id": "continuous-batching",
      "term": "Continuous Batching",
      "en": "",
      "zh": "连续批处理",
      "cat": "serving",
      "tags": [],
      "def": "请求完成即退出、新请求立即可插入，不用等整批跑完。vLLM 的核心贡献之一。"
    },
    {
      "id": "pagedattention",
      "term": "PagedAttention",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [
        "new"
      ],
      "def": "把 KV Cache 按页管理，像操作系统管理虚拟内存，大幅减少碎片浪费。"
    },
    {
      "id": "speculative-decoding",
      "term": "Speculative Decoding",
      "en": "",
      "zh": "投机解码",
      "cat": "serving",
      "tags": [
        "new"
      ],
      "def": "小模型先草拟几个 token，大模型一次并行验证，接受对的、丢弃错的。**输出分布不变，速度提升 2-3 倍**。"
    },
    {
      "id": "prefix-caching",
      "term": "Prefix Caching",
      "en": "",
      "zh": "前缀缓存",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "相同前缀的 KV Cache 复用，长系统提示场景省一大截。"
    },
    {
      "id": "quantization",
      "term": "Quantization",
      "en": "",
      "zh": "量化",
      "cat": "serving",
      "tags": [
        "core",
        "cost"
      ],
      "def": "把权重/激活从 FP16 降到 INT8/INT4/FP8。省显存、提速度，质量损失取决于方法。"
    },
    {
      "id": "gptq-awq-gguf",
      "term": "GPTQ / AWQ / GGUF",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [
        "eng"
      ],
      "def": "三种主流量化方案。GPTQ/AWQ 偏 GPU 部署，**GGUF** 是 llama.cpp 生态的格式，偏本地 CPU/混合推理。"
    },
    {
      "id": "pruning",
      "term": "Pruning",
      "en": "",
      "zh": "剪枝",
      "cat": "serving",
      "tags": [
        "eng"
      ],
      "def": "删掉不重要的权重或整层。硬件友好度不如量化，实际落地较少。"
    },
    {
      "id": "vram-hbm",
      "term": "VRAM / HBM",
      "en": "",
      "zh": "显存/高带宽内存",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "模型跑不跑得起来的第一约束。**显存带宽**往往比算力更早成为瓶颈。"
    },
    {
      "id": "cuda-rocm",
      "term": "CUDA / ROCm",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [
        "eng"
      ],
      "def": "NVIDIA / AMD 的 GPU 计算平台。**CUDA 生态壁垒**是英伟达最深的护城河。"
    },
    {
      "id": "tpu-npu-trainium",
      "term": "TPU / NPU / Trainium",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [],
      "def": "各家自研加速器。推理侧还有 Groq（LPU）、Cerebras（晶圆级）等专用路线。"
    },
    {
      "id": "nvlink-infiniband",
      "term": "NVLink / InfiniBand",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [],
      "def": "GPU 间互联。大模型训练里**通信常常比计算更耗时**。"
    },
    {
      "id": "vllm-sglang-tensorrt-llm",
      "term": "vLLM / SGLang / TensorRT-LLM",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [
        "core"
      ],
      "def": "三大主流推理引擎。vLLM 生态最广，SGLang 在复杂前缀与结构化输出上强，TensorRT-LLM 在 NVIDIA 卡上极限性能最好。"
    },
    {
      "id": "llama-cpp-ollama-lm-studio",
      "term": "llama.cpp / Ollama / LM Studio",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [],
      "def": "本地推理三件套，从底层到开箱即用。"
    },
    {
      "id": "oom",
      "term": "OOM",
      "en": "Out of Memory",
      "zh": "",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "显存爆了。长上下文、大 batch、量化不足都会触发。"
    },
    {
      "id": "rate-limit-tpm-rpm",
      "term": "Rate Limit / TPM / RPM",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [],
      "def": "云端 API 的限流单位：每分钟 token 数、每分钟请求数。"
    },
    {
      "id": "token-token-economics-167n4",
      "term": "Token 计费 / Token Economics",
      "en": "",
      "zh": "",
      "cat": "serving",
      "tags": [
        "cost",
        "eng"
      ],
      "def": "按输入输出 token 分别计价，输出通常贵 3-5 倍。**模型选型的实际决策常常就是这道算术题**。"
    },
    {
      "id": "model-router",
      "term": "Model Router",
      "en": "",
      "zh": "模型路由",
      "cat": "serving",
      "tags": [
        "cost",
        "new"
      ],
      "def": "按任务难度自动分发到不同价位模型。简单问题用小模型，是降本最直接的手段。"
    },
    {
      "id": "on-device-edge-ai",
      "term": "On-Device / Edge AI",
      "en": "",
      "zh": "端侧/边缘 AI",
      "cat": "serving",
      "tags": [
        "cost"
      ],
      "def": "模型跑在手机、PC 本地。隐私好、无网可用，受显存和功耗限制。"
    },
    {
      "id": "slm",
      "term": "SLM",
      "en": "Small Language Model",
      "zh": "小模型",
      "cat": "serving",
      "tags": [],
      "def": "参数量小（通常 <10B）、可本地跑、特定任务够用的模型。"
    },
    {
      "id": "multimodal",
      "term": "Multimodal",
      "en": "",
      "zh": "多模态",
      "cat": "multimodal",
      "tags": [],
      "def": "能处理文本之外（图像、音频、视频）的输入或输出。"
    },
    {
      "id": "vlm",
      "term": "VLM",
      "en": "Vision-Language Model",
      "zh": "视觉语言模型",
      "cat": "multimodal",
      "tags": [],
      "def": "能\"看图说话\"的模型。"
    },
    {
      "id": "clip-siglip",
      "term": "CLIP / SigLIP",
      "en": "",
      "zh": "",
      "cat": "multimodal",
      "tags": [],
      "def": "把图像和文本对齐到同一向量空间的模型，是\"以文搜图\"和文生图提示理解的基础组件。"
    },
    {
      "id": "omni-model",
      "term": "Omni Model",
      "en": "",
      "zh": "全模态模型",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "原生统一处理多种模态的单一模型，而非拼接多个专用模型。"
    },
    {
      "id": "diffusion-model",
      "term": "Diffusion Model",
      "en": "",
      "zh": "扩散模型",
      "cat": "multimodal",
      "tags": [
        "core"
      ],
      "def": "从噪声逐步去噪生成图像/视频，是当前图像生成主流。"
    },
    {
      "id": "dit",
      "term": "DiT",
      "en": "Diffusion Transformer",
      "zh": "",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "用 Transformer 替代 U-Net 的扩散架构，Sora 级视频模型的基础。"
    },
    {
      "id": "flow-matching",
      "term": "Flow Matching",
      "en": "",
      "zh": "流匹配",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "比扩散更直接的生成路径建模，训练更稳、采样更少步。新一代图像模型常用。"
    },
    {
      "id": "latent-space",
      "term": "Latent Space",
      "en": "",
      "zh": "潜空间",
      "cat": "multimodal",
      "tags": [
        "cost"
      ],
      "def": "压缩后的特征空间，扩散在潜空间做以省算力。"
    },
    {
      "id": "asr",
      "term": "ASR",
      "en": "",
      "zh": "自动语音识别",
      "cat": "multimodal",
      "tags": [],
      "def": "语音转文字。Whisper 是开源标杆。"
    },
    {
      "id": "tts",
      "term": "TTS",
      "en": "",
      "zh": "文本转语音",
      "cat": "multimodal",
      "tags": [],
      "def": "文字转语音。当前已能做到带情感和韵律的**零样本音色克隆**。"
    },
    {
      "id": "world-model",
      "term": "World Model",
      "en": "",
      "zh": "世界模型",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "学习环境动态、能预测\"下一步会发生什么\"的模型。被视为视频生成与具身智能的交汇点。"
    },
    {
      "id": "genie-generative-environment",
      "term": "Genie / Generative Environment",
      "en": "",
      "zh": "生成式环境",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "由模型实时生成的、可交互的虚拟场景。"
    },
    {
      "id": "vla",
      "term": "VLA",
      "en": "Vision-Language-Action",
      "zh": "",
      "cat": "multimodal",
      "tags": [
        "new"
      ],
      "def": "视觉+语言直接输出动作，具身智能/机器人的主流范式。"
    },
    {
      "id": "embodied-ai",
      "term": "Embodied AI",
      "en": "",
      "zh": "具身智能",
      "cat": "multimodal",
      "tags": [],
      "def": "有物理身体、能与环境交互的 AI。"
    },
    {
      "id": "ai-safety",
      "term": "AI Safety",
      "en": "",
      "zh": "AI 安全",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "防止 AI 系统造成意外或恶意伤害的总体领域。分** misuse**（被人滥用）、**misalignment**（目标跑偏）、**systemic**（社会系统性风险）三层。"
    },
    {
      "id": "prompt-injection",
      "term": "Prompt Injection",
      "en": "",
      "zh": "提示注入",
      "cat": "safety",
      "tags": [
        "core",
        "pitfall",
        "sec"
      ],
      "def": "把恶意指令藏在输入内容里，劫持模型行为。**直接注入**来自用户，**间接注入**藏在网页/文档/邮件里——**后者才是 Agent 时代的真正威胁**。"
    },
    {
      "id": "jailbreak-vs-prompt-injection",
      "term": "Jailbreak vs Prompt Injection",
      "en": "",
      "zh": "",
      "cat": "safety",
      "tags": [
        "pitfall",
        "sec"
      ],
      "def": "越狱是\"让模型违反自己的规则\"，注入是\"让模型执行攻击者的指令\"。前者针对模型，后者针对应用。"
    },
    {
      "id": "data-poisoning",
      "term": "Data Poisoning",
      "en": "",
      "zh": "数据投毒",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "在训练数据里埋后门或偏见，让模型在特定触发词下行为异常。"
    },
    {
      "id": "alignment-tax",
      "term": "Alignment Tax",
      "en": "",
      "zh": "对齐税",
      "cat": "safety",
      "tags": [
        "debate",
        "pitfall",
        "sec"
      ],
      "def": "做安全对齐会牺牲一部分能力。这个 trade-off 是真实存在的，只是大小有争议。"
    },
    {
      "id": "interpretability",
      "term": "Interpretability",
      "en": "",
      "zh": "可解释性",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "理解模型内部在做什么。**Mechanistic Interpretability（机制可解释性）** 试图把网络逆向成可读的特征与回路。"
    },
    {
      "id": "sae",
      "term": "SAE",
      "en": "Sparse Autoencoder",
      "zh": "稀疏自编码器",
      "cat": "safety",
      "tags": [
        "new",
        "sec"
      ],
      "def": "从激活里提取可解释特征的主流工具，用于找\"概念方向\"。"
    },
    {
      "id": "feature-steering",
      "term": "Feature Steering",
      "en": "",
      "zh": "特征引导",
      "cat": "safety",
      "tags": [
        "new",
        "sec"
      ],
      "def": "找到某个语义方向后直接加减激活来改变行为，比如\"减少谄媚\"。"
    },
    {
      "id": "refusal",
      "term": "Refusal",
      "en": "",
      "zh": "拒答",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "模型拒绝执行不安全请求。**过度拒答（over-refusal）** 本身也是缺陷。"
    },
    {
      "id": "sycophancy",
      "term": "Sycophancy",
      "en": "",
      "zh": "谄媚",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "模型倾向于迎合用户而非说真话。RLHF 的副作用之一。"
    },
    {
      "id": "bias",
      "term": "Bias",
      "en": "",
      "zh": "偏见",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "训练数据带来的系统性倾向，涉及性别、种族、地域等。"
    },
    {
      "id": "toxicity",
      "term": "Toxicity",
      "en": "",
      "zh": "毒性",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "侮辱、仇恨、暴力等有害内容。"
    },
    {
      "id": "pii-leakage",
      "term": "PII Leakage",
      "en": "",
      "zh": "隐私泄漏",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "模型吐出训练数据中的个人信息。**Membership Inference** 是反推\"某条数据是否在训练集里\"的攻击。"
    },
    {
      "id": "watermarking",
      "term": "Watermarking",
      "en": "",
      "zh": "水印",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "在生成内容里嵌入可检测标记。**C2PA** 是内容来源与真实性的行业标准。"
    },
    {
      "id": "agi",
      "term": "AGI",
      "en": "",
      "zh": "通用人工智能",
      "cat": "safety",
      "tags": [
        "debate",
        "hype"
      ],
      "def": "能在多数认知任务上达到或超过人类水平的系统。**定义本身就有争议，所以它更像一个立场而非一个指标**。"
    },
    {
      "id": "asi",
      "term": "ASI",
      "en": "",
      "zh": "超级智能",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "全面超越人类的假想系统。"
    },
    {
      "id": "superalignment",
      "term": "Superalignment",
      "en": "",
      "zh": "超级对齐",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "研究如何对齐\"比人聪明得多\"的系统。"
    },
    {
      "id": "x-risk",
      "term": "x-risk",
      "en": "",
      "zh": "存在性风险",
      "cat": "safety",
      "tags": [
        "sec"
      ],
      "def": "AI 导致人类文明级灾难的可能性。是安全阵营内部最分裂的话题。"
    },
    {
      "id": "open-weight-vs-open-source",
      "term": "Open-weight vs Open-source",
      "en": "",
      "zh": "开放权重 vs 开源",
      "cat": "ecosystem",
      "tags": [
        "debate",
        "pitfall"
      ],
      "def": "Llama、Qwen 多是**开放权重**：能下载能跑能微调，但训练数据与流程不公开。严格意义的开源模型（如 OLMo）才给全套。"
    },
    {
      "id": "model-hub",
      "term": "Model Hub",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "eng"
      ],
      "def": "模型托管平台，Hugging Face 是事实标准。"
    },
    {
      "id": "model-card",
      "term": "Model Card",
      "en": "",
      "zh": "模型卡",
      "cat": "ecosystem",
      "tags": [],
      "def": "模型的说明书：训练数据、评测结果、已知限制。"
    },
    {
      "id": "safetensors",
      "term": "Safetensors",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [],
      "def": "安全的权重存储格式，替代 pickle 以防反序列化攻击。"
    },
    {
      "id": "checkpoint",
      "term": "Checkpoint",
      "en": "",
      "zh": "检查点",
      "cat": "ecosystem",
      "tags": [],
      "def": "训练中途保存的权重快照。"
    },
    {
      "id": "langchain-llamaindex",
      "term": "LangChain / LlamaIndex",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "eng"
      ],
      "def": "早期两大应用框架。LangChain 偏通用编排，LlamaIndex 偏 RAG 与数据接入。"
    },
    {
      "id": "langgraph-crewai-autogen",
      "term": "LangGraph / CrewAI / AutoGen",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "eng"
      ],
      "def": "新一代 Agent 编排框架，共同点是**把 Agent 表达成图或有状态流程**，而非线性链。"
    },
    {
      "id": "semantic-kernel",
      "term": "Semantic Kernel",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "eng"
      ],
      "def": "微软的 .NET/Python 侧 Agent 框架，企业环境常见。"
    },
    {
      "id": "dify-coze-n8n",
      "term": "Dify / Coze / n8n",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "eng"
      ],
      "def": "低代码 AI 应用平台，把提示、知识库、工作流可视化拼装。"
    },
    {
      "id": "llmops",
      "term": "LLMOps",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "cost",
        "eng"
      ],
      "def": "面向 LLM 应用的运维：提示版本管理、评测回归、成本监控、线上追踪。"
    },
    {
      "id": "tracing-observability",
      "term": "Tracing / Observability",
      "en": "",
      "zh": "追踪/可观测",
      "cat": "ecosystem",
      "tags": [
        "cost",
        "eng"
      ],
      "def": "记录每次调用的完整链路（提示、工具、耗时、成本），LangSmith、Langfuse 是代表工具。"
    },
    {
      "id": "ai-native",
      "term": "AI Native",
      "en": "",
      "zh": "AI 原生",
      "cat": "ecosystem",
      "tags": [
        "hype"
      ],
      "def": "从设计之初就把模型能力当核心构件的产品，而不是给旧产品加个聊天框。"
    },
    {
      "id": "copilot-vs-agent",
      "term": "Copilot vs Agent",
      "en": "",
      "zh": "",
      "cat": "ecosystem",
      "tags": [],
      "def": "Copilot 是\"你主导、它补全\"，Agent 是\"你给目标、它执行\"。产品定位的分水岭。"
    },
    {
      "id": "wrapper-19rh8",
      "term": "Wrapper / 套壳",
      "en": "Thin Wrapper",
      "zh": "",
      "cat": "ecosystem",
      "tags": [
        "debate",
        "hype"
      ],
      "def": "只在 API 外面包一层界面、没有自有壁垒的产品。**批评者的说法；实际上护城河可以建在分发、数据、工作流上**。"
    },
    {
      "id": "data-flywheel",
      "term": "Data Flywheel",
      "en": "",
      "zh": "数据飞轮",
      "cat": "ecosystem",
      "tags": [
        "hype"
      ],
      "def": "用户使用产生数据、数据改进模型、模型吸引更多用户的正循环。"
    },
    {
      "id": "vibe-coding",
      "term": "Vibe Coding",
      "en": "",
      "zh": "氛围编程",
      "cat": "business",
      "tags": [
        "hype",
        "new"
      ],
      "def": "Karpathy 2025 年提出：不看代码、只看效果，用自然语言让 AI 写程序。**从\"写代码\"转向\"描述想要什么\"**。"
    },
    {
      "id": "software-3-0",
      "term": "Software 3.0",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype",
        "new"
      ],
      "def": "Karpathy 的说法：1.0 是手写规则，2.0 是神经网络学规则，3.0 是用自然语言给 LLM 编程。"
    },
    {
      "id": "prompt-to-app",
      "term": "Prompt-to-App",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype",
        "new"
      ],
      "def": "一句话生成可运行应用，是 Vibe Coding 的产品化形态。"
    },
    {
      "id": "agent-ryhrl",
      "term": "Agent 元年",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype",
        "new"
      ],
      "def": "营销词，2025 年被反复使用。真实含义是\"Agent 从 demo 走进了生产的部分环节\"。"
    },
    {
      "id": "scaling-wall",
      "term": "Scaling Wall",
      "en": "",
      "zh": "规模墙",
      "cat": "business",
      "tags": [
        "hype",
        "new"
      ],
      "def": "单纯堆参数与数据收益递减。分**Data Wall**（数据不够）和 **Power Wall**（电力不够）。"
    },
    {
      "id": "term-1ssqk",
      "term": "推理成本曲线",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "cost",
        "hype"
      ],
      "def": "同等能力的推理价格大约每 12 个月降一个数量级（类似\"莱特定律\"）。**做产品规划时必须假设今天的贵，明年会便宜**。"
    },
    {
      "id": "context-1f6np",
      "term": "Context 是新的内存 / 检索是新的磁盘",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype"
      ],
      "def": "一句比喻，解释了长上下文与 RAG 的分工。"
    },
    {
      "id": "term-u2j0t",
      "term": "数字员工 / 硅基员工",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype"
      ],
      "def": "企业采购话术，指可被\"雇佣\"来完成流程性工作的 Agent。"
    },
    {
      "id": "ai-infra",
      "term": "AI Infra",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "cost",
        "hype"
      ],
      "def": "围绕训练与推理的基础设施层：算力、调度、框架、引擎。是当下最赚钱的一层。"
    },
    {
      "id": "term-3l4ou",
      "term": "六小虎",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "debate",
        "hype"
      ],
      "def": "中国大模型创业公司的旧称（智谱、月之暗面、MiniMax、百川、零一万物、阶跃星辰）。**这个称呼已经过时了**，格局早已分化。"
    },
    {
      "id": "term-1rpco",
      "term": "参数通货膨胀",
      "en": "",
      "zh": "",
      "cat": "business",
      "tags": [
        "debate",
        "hype"
      ],
      "def": "新模型必须比上一个大，成了发布会叙事的一部分，与能力提升不必然相关。"
    },
    {
      "id": "term-1eyy8",
      "term": "榜单刷分",
      "en": "Benchmark Gaming",
      "zh": "",
      "cat": "business",
      "tags": [
        "hype"
      ],
      "def": "针对公开榜单做优化，而非提升真实能力。"
    }
  ],
  "confusions": [
    {
      "pair": "Inference vs Reasoning",
      "note": "前者是\"跑计算\"，后者是\"做思考\""
    },
    {
      "pair": "Fine-tuning vs RAG",
      "note": "微调改**行为与风格**，RAG 补**知识与事实**。想让模型记住新知识优先 RAG"
    },
    {
      "pair": "RAG vs 长上下文",
      "note": "长上下文是\"看得多\"，RAG 是\"挑得准\"。数据大时 RAG 更省，全局理解时上下文更强"
    },
    {
      "pair": "Prompt Engineering vs Context Engineering",
      "note": "前者优化\"怎么说\"，后者决定\"给什么看\""
    },
    {
      "pair": "Agent vs Workflow",
      "note": "路径谁定：人定 = workflow，模型定 = agent"
    },
    {
      "pair": "Guardrails vs Alignment",
      "note": "护栏在运行时拦截，对齐在训练时塑造"
    },
    {
      "pair": "Jailbreak vs Prompt Injection",
      "note": "越狱针对模型规则，注入针对应用逻辑"
    },
    {
      "pair": "Open-weight vs Open-source",
      "note": "前者只给权重，后者给全套（含数据与代码）"
    },
    {
      "pair": "TTFT vs TPOT",
      "note": "首字快但吐字慢，体验依然差；两个指标必须一起看"
    },
    {
      "pair": "Hallucination vs 错误",
      "note": "幻觉是\"自信地编\"，普通错误是\"算错了\"。修法完全不同：前者靠 grounding，后者靠更强的推理"
    }
  ],
  "links": [
    {
      "group": "最接近的：以黑话祛魅为目标",
      "name": "mattpocock/dictionary-of-ai-coding",
      "url": "https://github.com/mattpocock/dictionary-of-ai-coding"
    },
    {
      "group": "大而全的资料清单（术语藏在里面，不是词典）",
      "name": "Hannibal046/Awesome-LLM",
      "url": "https://github.com/Hannibal046/Awesome-LLM"
    },
    {
      "group": "大而全的资料清单（术语藏在里面，不是词典）",
      "name": "mlabonne/llm-course",
      "url": "https://github.com/mlabonne/llm-course"
    },
    {
      "group": "课程类，自带 glossary",
      "name": "microsoft/generative-ai-for-beginners",
      "url": "https://github.com/microsoft/generative-ai-for-beginners"
    },
    {
      "group": "中文语境",
      "name": "wdndev/llm_interview_note",
      "url": "https://github.com/wdndev/llm_interview_note"
    },
    {
      "group": "中文语境",
      "name": "datawhalechina/happy-llm",
      "url": "https://github.com/datawhalechina/happy-llm"
    },
    {
      "group": "小但专门做术语表",
      "name": "freetoolsarebest/llm-glossary",
      "url": "https://github.com/freetoolsarebest/llm-glossary"
    },
    {
      "group": "小但专门做术语表",
      "name": "odisha-ml/AI-Glossary",
      "url": "https://github.com/odisha-ml/AI-Glossary"
    },
    {
      "group": "非 GitHub 的权威兜底",
      "name": "Hugging Face NLP Course",
      "url": "https://huggingface.co/learn/nlp-course"
    },
    {
      "group": "非 GitHub 的权威兜底",
      "name": "Google Machine Learning Glossary",
      "url": "https://developers.google.com/machine-learning/glossary"
    },
    {
      "group": "非 GitHub 的权威兜底",
      "name": "Wikipedia: Glossary of artificial intelligence",
      "url": "https://en.wikipedia.org/wiki/Glossary_of_artificial_intelligence"
    }
  ]
};
if (typeof window !== 'undefined') window.GLOSSARY = GLOSSARY;
if (typeof module !== 'undefined' && module.exports) module.exports = GLOSSARY;

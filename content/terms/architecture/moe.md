---
term: MoE
en: Mixture of Experts
zh: 混合专家
tags: [core, cost, pitfall]
order: 130
---

把 FFN 拆成多个"专家"，每个 token 只路由到其中几个。**总参数**和**激活参数**是两回事：DeepSeek-V3 是 671B 总参 / 37B 激活，成本按激活算，显存按总参算。

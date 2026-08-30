export const coreConcepts = [
  { slug: 'model', title: '模型在做什么', summary: '模型根据已经看到的内容，预测接下来最合适的内容。', bridge: '所以它很会生成，但并不天然知道事实是否正确。' },
  { slug: 'prompt', title: 'Prompt 是任务说明', summary: '好的 Prompt 会说明目标、材料、限制和交付格式。', bridge: '它更像一份工作 Brief，而不是一句神奇口令。' },
  { slug: 'context-window', title: '上下文是工作记忆', summary: '模型只能根据当前上下文窗口里看得到的信息工作。', bridge: '材料太多或指令太早，都可能被忽略。' },
  { slug: 'hallucination', title: '生成不等于事实', summary: '模型会生成听起来合理、实际没有依据的内容。', bridge: '重要事实、数字和来源必须建立核验步骤。' },
  { slug: 'tool-calling', title: '工具扩展模型能力', summary: '搜索、代码和数据库让模型获得外部信息与行动能力。', bridge: '工具结果仍然需要规则和人工检查。' },
  { slug: 'workflow', title: '工作流组织协作过程', summary: '复杂任务应拆成有顺序、有中间结果的多个步骤。', bridge: '每一步都能确认和重做，结果才更可靠。' },
];

export const learningPaths = [
  { id: 'use-ai', label: '我想用好 AI', outcome: '把模糊需求变成清楚任务，并判断结果是否可信。', concepts: ['model', 'prompt', 'context-window', 'system-prompt', 'hallucination', 'evaluation', 'feedback-loop'] },
  { id: 'build-tool', label: '我想做 AI 工具', outcome: '理解一个网页如何接收输入、调用模型并展示结果。', concepts: ['html', 'javascript', 'state', 'api', 'json', 'server', 'deployment'] },
  { id: 'build-workflow', label: '我想做 AI 工作流', outcome: '把研究或业务任务拆成可以检查和人工确认的流程。', concepts: ['workflow', 'tool-calling', 'citation', 'human-approval', 'partial-regeneration', 'evaluation'] },
  { id: 'go-deeper', label: '我想进一步深入', outcome: '理解知识库、Agent 和可靠性设计的关键边界。', concepts: ['embedding', 'rag', 'agent', 'fine-tuning', 'guardrail', 'observability'] },
];

export function validateConceptLearning(knownSlugs) {
  const known = new Set(knownSlugs);
  const referenced = [...coreConcepts.map((item) => item.slug), ...learningPaths.flatMap((path) => path.concepts)];
  return [...new Set(referenced.filter((slug) => !known.has(slug)))];
}

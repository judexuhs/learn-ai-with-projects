export const evidenceLevels = [
  { id: 'chat', label: '主要在普通聊天框里使用 AI', description: '用过豆包、DeepSeek 或 ChatGPT，但没有让 AI 打开本地项目文件夹。' },
  { id: 'coding-tool', label: '用 WorkBuddy 或 Codex 打开过文件夹', description: '让 AI 创建或修改过文件，但还没有完整做完并分享一个产品。' },
  { id: 'web-product', label: '做出过可以运行或分享的网页', description: '已经经历过生成、运行和修改，但没有接入过真实 AI API。' },
  { id: 'ai-api', label: '接入过真实 AI API', description: '做过包含输入、加载、结果或错误状态的 AI 功能。' },
];

export const goalOptions = [
  { id: 'small-product', label: '一个可以分享的小产品', description: '先把想法做成完整、可运行的网页。' },
  { id: 'ai-tool', label: '一个真正调用模型的 AI 工具', description: '处理真实输入，并返回可以继续使用的结果。' },
  { id: 'research-workflow', label: '一套研究、分析或汇报工作流', description: '让搜索、证据、判断和交付连成流程。' },
  { id: 'content-system', label: '一个可以长期积累的个人系统', description: '保存资料、版本和经过确认的个人偏好。' },
];

export const projectProfiles = {
  'book-of-answers': { number: '01', title: '答案之书', time: '约 90 分钟', api: '无需 API', output: '一个可以点击并分享的互动网页' },
  'image-to-prompt': { number: '02', title: '图片反推 Prompt', time: '约半天', api: '一次视觉 API', output: '一个能上传图片、调用模型并编辑结果的 AI 工具' },
  'research-to-deck': { number: '03', title: '研究到报告与 HTML Deck', time: '1 到 2 天', api: '搜索与多步工作流', output: '一份有证据的报告和可以汇报的 HTML Deck' },
  'content-workbench': { number: '04', title: '个人内容工作台', time: '2 到 3 天', api: '内容库与多步工作流', output: '一个保存资料、辅助写作并保留人工判断的内容系统' },
};

const knownEvidence = new Set(evidenceLevels.map((item) => item.id));
const knownGoals = new Set(goalOptions.map((item) => item.id));

const routeFrom = (projectSlug, goal) => {
  if (projectSlug === 'book-of-answers') {
    if (goal === 'research-workflow') return ['book-of-answers', 'image-to-prompt', 'research-to-deck'];
    if (goal === 'content-system') return ['book-of-answers', 'image-to-prompt', 'content-workbench'];
    if (goal === 'ai-tool') return ['book-of-answers', 'image-to-prompt'];
    return ['book-of-answers'];
  }
  if (projectSlug === 'image-to-prompt') {
    if (goal === 'research-workflow') return ['image-to-prompt', 'research-to-deck'];
    if (goal === 'content-system') return ['image-to-prompt', 'content-workbench'];
    return ['image-to-prompt'];
  }
  return [projectSlug];
};

export function recommendProject(evidence, goal) {
  if (!knownEvidence.has(evidence) || !knownGoals.has(goal)) throw new Error('Unknown project routing answer');

  let projectSlug;
  let entry;
  let stageLabel;
  let reason;

  if (evidence === 'chat') {
    projectSlug = 'book-of-answers';
    entry = 'setup';
    stageLabel = '你现在在对话阶段';
    reason = '你已经会向 AI 表达需求，下一步是让它真正操作文件，并经历运行、修改和发布。';
  } else if (evidence === 'coding-tool') {
    projectSlug = 'book-of-answers';
    entry = 'define';
    stageLabel = '你已经进入 Coding 工具阶段';
    reason = '你已经跨过工具门槛，下一步是完整做完并分享一个产品。工具准备部分可以快速跳过。';
  } else if (evidence === 'web-product') {
    projectSlug = 'image-to-prompt';
    entry = 'prototype';
    stageLabel = '你已经进入小产品阶段';
    reason = '你已经能把网页跑起来，下一步是安全接入真实模型，并处理输入、加载、结果和错误。';
  } else {
    projectSlug = goal === 'research-workflow' ? 'research-to-deck' : goal === 'content-system' ? 'content-workbench' : 'image-to-prompt';
    entry = projectSlug === 'image-to-prompt' ? 'schema' : 'goal';
    stageLabel = '你已经进入 AI 工具阶段';
    reason = projectSlug === 'image-to-prompt'
      ? '你已经完成过真实模型调用，可以直接练习结构化输出、异常处理和上线边界。'
      : '你已经会完成单次 AI 调用，下一步是把中间结果、人工判断和失败处理组织成完整系统。';
  }

  return { evidence, goal, projectSlug, entry, stageLabel, reason, route: routeFrom(projectSlug, goal), project: projectProfiles[projectSlug] };
}

export const evidenceLevels = [
  { id: 'chat', label: '主要还是在对话框里问 AI', description: '用豆包、DeepSeek 或 ChatGPT 问问题、写东西，还没有让 AI 直接操作文件。' },
  { id: 'coding-tool', label: '用 WorkBuddy 或 Codex 这类 Agent 来执行任务', description: '让 Agent 打开文件夹、创建或修改文件，但还没完整做完并分享一个产品。' },
  { id: 'web-product', label: '用 Agent 做出过能运行或分享的网页', description: '网页能打开，也改过功能和样式，但还没有接入真实 AI API。' },
  { id: 'ai-api', label: '做过接入真实 AI API 的功能', description: '页面里已经有真实的模型调用，也处理过加载、结果或报错。' },
];

export const goalOptions = [
  { id: 'small-product', label: '一个能发给别人玩的网页', description: '别人点开链接就能直接使用。' },
  { id: 'ai-tool', label: '一个真的会调用模型的 AI 工具', description: '上传图片或文字以后，模型会返回可以继续用的结果。' },
  { id: 'research-workflow', label: '一套能做研究和汇报的流程', description: '从找资料一直做到报告和演示。' },
  { id: 'content-system', label: '一个能长期存资料、帮我写作的工作台', description: '资料存得下来，下次回来还能接着用。' },
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
    stageLabel = '目前主要在对话框里用 AI';
    reason = '你已经会在对话框里给 AI 任务。接下来用 Agent 直接改文件，做出第一个能打开、能分享的网页。';
  } else if (evidence === 'coding-tool') {
    projectSlug = 'book-of-answers';
    entry = 'define';
    stageLabel = '已经会用 Agent 执行任务';
    reason = '你已经会让 Agent 改文件。接下来把一个小产品从想法做到发布，工具准备可以直接跳过。';
  } else if (evidence === 'web-product') {
    projectSlug = 'image-to-prompt';
    entry = 'prototype';
    stageLabel = '已经做出过能运行的网页';
    reason = '网页已经能跑起来了。接下来接一次真实模型，顺手把加载、报错和结果编辑补齐。';
  } else {
    projectSlug = goal === 'research-workflow' ? 'research-to-deck' : goal === 'content-system' ? 'content-workbench' : 'image-to-prompt';
    entry = projectSlug === 'image-to-prompt' ? 'schema' : 'goal';
    stageLabel = '已经做过真实的模型调用';
    reason = projectSlug === 'image-to-prompt'
      ? '你接过真实模型，可以从结构化输出和异常处理开始，把这个工具做完整。'
      : '你已经做过单次模型调用。接下来把材料、中间结果和人工确认串成一套能反复用的流程。';
  }

  return { evidence, goal, projectSlug, entry, stageLabel, reason, route: routeFrom(projectSlug, goal), project: projectProfiles[projectSlug] };
}

const answers = [
  '先完成那个最小、可验证的动作。',
  '把问题缩小一半，答案会更清楚。',
  '现在适合试一次，但先写下退出条件。',
  '你已经知道答案，只是还没接受它的代价。',
  '暂时不要增加选项，先排除一个。',
  '去问那个会被结果直接影响的人。',
  '等一晚，再看你仍然不愿删掉的部分。',
  '值得继续，但下一步应该可逆。',
];

export function buildAnswerResult(question, random = Math.random) {
  const cleanQuestion = String(question ?? '').trim();
  const index = Math.min(answers.length - 1, Math.floor(random() * answers.length));
  return {
    id: `${Date.now()}-${index}`,
    question: cleanQuestion,
    answer: answers[index],
  };
}

export function buildImagePromptResult({ name = 'uploaded-image', width = 0, height = 0 } = {}) {
  const baseName = String(name).replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
  const orientation = width > height ? '横向画幅' : width < height ? '纵向画幅' : '方形画幅';
  return {
    subject: `以“${baseName || '上传图片'}”为核心主体，保留清楚的前后景关系`,
    composition: `${orientation}，主体位于视觉重心，使用层次明确的景深`,
    lighting: '柔和侧光与自然环境光，保留高光和阴影细节',
    color: '低饱和主色配少量高明度点缀，色温保持统一',
    style: '写实摄影质感，细节清楚，避免过度锐化和塑料感',
    prompt: `${baseName || 'main subject'}, ${orientation}, clear visual hierarchy, soft directional light, restrained color palette, realistic photographic texture, detailed, natural depth of field`,
    negativePrompt: 'blurry, oversaturated, distorted anatomy, duplicated objects, plastic texture, watermark, text artifacts',
  };
}

/** @param {{ topic: string, audience: string, questions?: string[] }} input */
export function buildResearchWorkspace({ topic, audience, questions = [] }) {
  const cleanTopic = String(topic || '待研究主题').trim();
  const cleanAudience = String(audience || '决策者').trim();
  const defaultQuestions = [
    `这个变化的核心机制是什么？`,
    `哪些环节已经出现可验证的影响？`,
    `${cleanAudience}现在应该采取什么行动？`,
  ];
  const researchQuestions = questions.filter(Boolean).length ? questions.filter(Boolean) : defaultQuestions;
  const evidence = [
    ['行业概览', '官方或行业组织', '定义范围、参与者与公开口径', '高'],
    ['产品发布资料', '一手资料', '确认产品能力、发布时间与限制', '高'],
    ['企业实践访谈', '一手访谈', '观察真实流程与采用阻力', '中'],
    ['市场分析报告', '研究机构', '补充规模、分类与竞争结构', '中'],
    ['从业者讨论', '公开社区', '发现待验证的问题与反例', '低'],
    ['方法与风险指南', '专业机构', '检查安全、治理与人工责任', '高'],
  ].map((item, index) => ({
    id: `S${index + 1}`,
    title: `${cleanTopic}：${item[0]}`,
    sourceType: item[1],
    note: item[2],
    strength: item[3],
    url: `https://example.com/demo-source-${index + 1}`,
    selected: index !== 4,
    demo: true,
  }));
  const outline = [
    `给 ${cleanAudience} 的执行摘要`,
    '问题边界与当前变化',
    '证据支持的三项判断',
    '风险、冲突与仍不确定之处',
    '接下来 30 天的行动建议',
  ];
  const report = `# ${cleanTopic}\n\n## 执行摘要\n${cleanTopic} 的价值不在于单个工具，而在于流程中哪些判断可以被加速、哪些责任必须由人保留。[1]\n\n## 已确认的信号\n公开产品资料显示，能力正在从单次生成扩展到可复查的多阶段任务。[2] 实践材料同时说明，采用速度取决于输入质量、审核责任与现有协作方式。[3]\n\n## 风险与未知\n市场报告可用于建立分类，但不同报告的统计口径未必一致。[4] 从业者讨论提供问题线索，不能独立支撑结论。[5]\n\n## 行动建议\n建议 ${cleanAudience} 先选择一个低风险、高频流程，记录当前耗时与错误，再进行两周受控试验。试验必须保留人工确认与退出机制。[6]`;
  return { topic: cleanTopic, audience: cleanAudience, questions: researchQuestions, evidence, outline, report };
}

export function buildDeck(report, title) {
  const paragraphs = String(report).split(/\n\s*\n/).map((part) => part.replace(/^#+\s*/gm, '').trim()).filter(Boolean);
  const body = paragraphs.filter((part) => !part.startsWith(String(title))).slice(0, 5);
  return [
    { id: 'cover', title: String(title || '研究汇报'), body: '从问题、证据到下一步行动', type: 'cover' },
    ...body.map((paragraph, index) => ({
      id: `slide-${index + 1}`,
      title: ['我们正在回答什么', '证据告诉了我们什么', '需要保留的判断', '行动建议', '下一步验证'][index] || `关键发现 ${index + 1}`,
      body: paragraph.slice(0, 260),
      type: index === body.length - 1 ? 'action' : 'content',
    })),
  ];
}

const ideaKinds = ['更深一层', '迁移场景', '反方问题', '交叉新问题', '操作教程'];

export function buildContentIdeas(articles) {
  const safeArticles = articles.length ? articles : [{ id: 'demo', title: '尚未保存资料', body: '先保存一篇材料，再从来源生成选题。' }];
  const primary = safeArticles[0];
  const secondary = safeArticles[1] || primary;
  return ideaKinds.map((kind, index) => ({
    id: `idea-${index + 1}`,
    kind,
    title: [
      `为什么“${primary.title}”还需要追问一层？`,
      `把 ${primary.title} 的方法迁移到个人工作流`,
      `反过来看：${primary.title} 可能在哪些地方失效？`,
      `${primary.title} × ${secondary.title}：一个被忽略的新问题`,
      `用 5 个步骤实践 ${primary.title}`,
    ][index],
    why: `来自内容库中“${primary.title}”的核心问题，适合继续形成一个可验证的判断。`,
    difference: ['补充底层机制', '更换应用场景', '主动寻找反例', '连接两份资料', '转化为可执行步骤'][index],
    sourceIds: [...new Set([primary.id, secondary.id])],
  }));
}

export function compareDrafts(aiDraft, userDraft) {
  const before = String(aiDraft || '').trim();
  const after = String(userDraft || '').trim();
  const observations = [];
  if (after.length < before.length) observations.push('你压缩了篇幅，删除了部分铺垫。');
  if (after.length > before.length) observations.push('你补充了更多限定、证据或个人判断。');
  if (/充分利用|赋能|全面提升|值得注意/.test(before) && !/充分利用|赋能|全面提升|值得注意/.test(after)) observations.push('你删除了笼统的 AI 常用表达。');
  if (/先|再|如果|只有/.test(after)) observations.push('你增加了动作顺序或判断条件。');
  if (!observations.length && before !== after) observations.push('你调整了措辞，但需要更多样本才能判断是否属于长期偏好。');
  if (before === after) observations.push('两个版本相同，本次不建议更新任何写作偏好。');
  return { confirmed: false, observations };
}

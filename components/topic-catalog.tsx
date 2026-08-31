import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronDown, Clock3, FlaskConical } from 'lucide-react';

type Topic = { slug: string; title: string; question: string; category: string };

const starterSlugs = ['how-llms-generate', 'clarify-the-task', 'verify-ai-output'];

const questionGroups = [
  { title: '我想先把 AI 用好', description: '适合日常写作、研究和分析任务', slugs: ['clarify-the-task', 'write-a-good-prompt', 'provide-context', 'iterate-with-ai', 'verify-ai-output'] },
  { title: '我想看懂 AI 为什么这样回答', description: '理解生成、记忆、上下文和幻觉', slugs: ['how-llms-generate', 'token-and-context', 'ai-memory', 'hallucination'] },
  { title: '我想搭建工作流或 Agent', description: '理解工具调用、流程和知识库', slugs: ['tool-use', 'workflow-and-agent', 'conversation-to-workflow', 'rag-knowledge-base'] },
  { title: '我想把 AI 做成一个产品', description: '进入 API、结构化输出、成本和权限', slugs: ['api-and-server', 'structured-output', 'multimodal-input', 'model-cost-latency', 'privacy-and-permissions'] },
];

export function TopicCatalog({ topics }: { topics: Topic[] }) {
  const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const starterTopics = starterSlugs.map((slug) => bySlug.get(slug)).filter((topic): topic is Topic => Boolean(topic));

  return <>
    <section className="topic-starter" aria-labelledby="starter-heading">
      <div className="topic-section-heading">
        <div><span>第一次来</span><h2 id="starter-heading">先读这 3 篇就够了</h2></div>
        <p>三篇读完，你会知道 AI 怎么回答、怎样把任务说清楚，以及最后怎么检查结果。</p>
      </div>
      <ol className="starter-list">
        {starterTopics.map((topic, index) => <li key={topic.slug}>
          <Link prefetch={false} href={`/concepts/${topic.slug}`}>
            <span className="starter-index">{index + 1}</span>
            <div><span>约 10 分钟</span><h3>{topic.title}</h3><p>{topic.question}</p></div>
            <span className="starter-action">阅读这篇<ArrowRight /></span>
          </Link>
        </li>)}
      </ol>
    </section>

    <section className="topic-picker" aria-labelledby="picker-heading">
      <div className="topic-section-heading">
        <div><span>有具体问题时</span><h2 id="picker-heading">按你现在想做的事来找</h2></div>
        <p>不用按顺序读，也不用把所有专题学完。打开最接近你当前问题的一组即可。</p>
      </div>
      <div className="topic-groups">
        {questionGroups.map((group, index) => {
          const groupTopics = group.slugs.map((slug) => bySlug.get(slug)).filter((topic): topic is Topic => Boolean(topic));
          return <details key={group.title} className="topic-group">
            <summary>
              <span className="group-index">{String(index + 1).padStart(2, '0')}</span>
              <span><strong>{group.title}</strong><small>{group.description}</small></span>
              <span className="group-count">{groupTopics.length} 篇</span>
              <ChevronDown />
            </summary>
            <div className="group-topics">
              {groupTopics.map((topic) => <Link prefetch={false} key={topic.slug} href={`/concepts/${topic.slug}`}>
                <span><BookOpen /></span>
                <div><h3>{topic.title}</h3><p>{topic.question}</p></div>
                <span className="topic-time"><Clock3 />10 分钟</span>
                <ArrowRight />
              </Link>)}
            </div>
          </details>;
        })}
      </div>
      <p className="topic-experiment-note"><FlaskConical />每篇专题最后都有一个几分钟的小实验，读完就能马上验证。</p>
    </section>
  </>;
}

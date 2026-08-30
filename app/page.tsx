import Link from 'next/link';
import { ArrowRight, BookOpen, Check, FlaskConical, Layers3, Sparkles, Wrench } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const learningSteps = [
  { title: '弄懂一个问题', description: '从完整专题建立直觉，不背术语。' },
  { title: '马上试一次', description: '打开常用 AI，完成几分钟实验。' },
  { title: '做出一个作品', description: '把理解用进真实项目，获得反馈。' },
];

const advancedPaths = [
  { title: '我想做一个 AI 工具', description: '适合想把图片、文字或文件处理做成网页功能的人。', href: '/methods/build-tool', action: '进入工具路径', icon: Wrench, tone: 'coral' },
  { title: '我想做一个 AI 工作流', description: '适合想把研究、内容或业务过程拆成可复用步骤的人。', href: '/methods/build-workflow', action: '进入工作流路径', icon: Layers3, tone: 'mint' },
];

export default function Home() {
  return <main className="consumer-home">
    <SiteHeader />
    <section className="welcome-stage">
      <div className="welcome-copy">
        <h1>只用过豆包，<br /><span>也可以从这里开始</span></h1>
        <p>先学会说清任务、修改结果和检查答案，再决定要不要做工具。</p>
        <div className="welcome-actions">
          <Link prefetch={false} href="/start" className={cn(buttonVariants({ size: 'lg' }), 'consumer-primary')}>从这里开始<ArrowRight /></Link>
          <span>不知道怎么选，直接点这个就可以。</span>
        </div>
        <span className="welcome-for"><Sparkles />给第一次系统学习 AI 的人</span>
      </div>
      <div className="learning-map" aria-label="推荐学习路线">
        <div className="map-heading"><span>你的第一条路线</span><strong>3 个小目标</strong></div>
        <ol>{learningSteps.map((step, index) => <li key={step.title}>
          <span className="map-dot">{index + 1}</span>
          <div><h2>{step.title}</h2><p>{step.description}</p></div>
          {index === learningSteps.length - 1 && <Check className="map-finish" />}
        </li>)}</ol>
        <p className="map-note">慢一点没关系，每次只做眼前这一步。</p>
      </div>
    </section>
    <section className="goal-section">
      <div className="section-heading">
        <div><h2>已经有明确目标？</h2><p>只有在你已经知道想做什么时，才需要选择下面两条路径。</p></div>
        <Link prefetch={false} href="/methods">查看三条路径的完整对比<ArrowRight /></Link>
      </div>
      <div className="goal-lanes">
        {advancedPaths.map((path) => { const Icon = path.icon; return <Link prefetch={false} key={path.href} href={path.href} className={`goal-lane ${path.tone}`}>
          <span className="goal-icon"><Icon /></span>
          <div><h3>{path.title}</h3><p>{path.description}</p></div>
          <span className="goal-action">{path.action}<ArrowRight /></span>
        </Link>; })}
      </div>
    </section>
    <section className="first-project">
      <div className="project-invite">
        <span className="project-symbol"><FlaskConical /></span>
        <div><h2>不想先学，也可以直接做</h2><h3>先做一个不用 AI 的答案之书</h3><p>从一个 HTML 文件开始。你会先经历定义、生成、运行和修改，再决定是否继续学习 AI 调用。</p></div>
      </div>
      <div className="project-ticket">
        <div className="ticket-top"><BookOpen /><span>第一个跟做项目</span></div>
        <h3>答案之书</h3>
        <ul>{['不需要 API', '约 90 分钟', '最终得到可分享网页'].map((item) => <li key={item}><Check />{item}</li>)}</ul>
        <Link prefetch={false} href="/projects/book-of-answers" className={cn(buttonVariants({ size: 'lg' }), 'consumer-primary')}>开始做答案之书<ArrowRight /></Link>
      </div>
      <div className="project-links"><Link prefetch={false} href="/projects">查看全部四个项目<ArrowRight /></Link><Link prefetch={false} href="/demos">先体验成品 Demo<ArrowRight /></Link></div>
    </section>
    <SiteFooter />
  </main>;
}

import Link from 'next/link';
import { ArrowRight, BookOpen, Check, Compass, Layers3, Sparkles, Wrench } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const beginnerRoute = [
  { meta: '第 1 步 · 约 10 分钟', title: '先完成一次最小练习', description: '学会说清任务、修改结果和检查答案。', href: '/start', action: '现在开始', icon: Sparkles, current: true },
  { meta: '第 2 步 · 约 90 分钟', title: '做出答案之书', description: '不需要 API，从一个 HTML 文件做到可分享网页。', href: '/projects/book-of-answers', action: '查看项目', icon: BookOpen },
  { meta: '第 3 步 · 做完再决定', title: '按目标继续学习', description: '到这里，再选择做 AI 工具或搭建 AI 工作流。', href: '/methods', action: '查看方向', icon: Compass },
];

const advancedPaths = [
  { title: '我想做一个 AI 工具', description: '适合想把图片、文字或文件处理做成网页功能的人。', href: '/methods/build-tool', action: '进入工具路径', icon: Wrench, tone: 'coral' },
  { title: '我想做一个 AI 工作流', description: '适合想把研究、内容或业务过程拆成可复用步骤的人。', href: '/methods/build-workflow', action: '进入工作流路径', icon: Layers3, tone: 'blue' },
];

export default function Home() {
  return <main className="consumer-home">
    <SiteHeader />
    <section className="welcome-stage">
      <div className="welcome-copy">
        <span className="welcome-for"><Sparkles />第一次系统学习 AI</span>
        <h1>不用选，<br /><span>按这三步开始</span></h1>
        <p>先花 10 分钟熟悉和 AI 协作，再做完答案之书。等你有了真实体验，再决定下一步学什么。</p>
        <div className="welcome-actions">
          <Link prefetch={false} href="/start" className={cn(buttonVariants({ size: 'lg' }), 'consumer-primary')}>开始第 1 步<ArrowRight /></Link>
          <span>第一次来，只需要点这里。</span>
        </div>
      </div>

      <div className="learning-map" aria-label="新手推荐学习顺序">
        <div className="map-heading"><span>新手推荐顺序</span><strong>一步一步来</strong></div>
        <ol>{beginnerRoute.map((step) => {
          const Icon = step.icon;
          return <li key={step.href} className={step.current ? 'is-current' : undefined}>
            <span className="map-dot"><Icon /></span>
            <div className="map-step-copy"><span>{step.meta}</span><h2>{step.title}</h2><p>{step.description}</p></div>
            <Link prefetch={false} href={step.href}>{step.action}<ArrowRight /></Link>
          </li>;
        })}</ol>
        <p className="map-note"><Check />现在只做第 1 步，后面的暂时不用考虑。</p>
      </div>
    </section>

    <section className="goal-section">
      <div className="section-heading">
        <div><span className="section-kicker">给已经有经验的人</span><h2>已经知道自己要做什么？</h2><p>如果你做过类似练习，可以跳过上面的新手路线，直接按目标继续。</p></div>
        <Link prefetch={false} href="/methods">查看学习路径说明<ArrowRight /></Link>
      </div>
      <div className="goal-lanes">
        {advancedPaths.map((path) => { const Icon = path.icon; return <Link prefetch={false} key={path.href} href={path.href} className={`goal-lane ${path.tone}`}>
          <span className="goal-icon"><Icon /></span>
          <div><h3>{path.title}</h3><p>{path.description}</p></div>
          <span className="goal-action">{path.action}<ArrowRight /></span>
        </Link>; })}
      </div>
      <div className="goal-shortcuts">
        <span>只是想随便看看？</span>
        <Link prefetch={false} href="/demos">先体验成品 Demo<ArrowRight /></Link>
        <Link prefetch={false} href="/projects">查看全部四个项目<ArrowRight /></Link>
      </div>
    </section>
    <SiteFooter />
  </main>;
}

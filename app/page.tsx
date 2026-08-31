import Link from 'next/link';
import { ArrowRight, BookOpen, Check, FileSearch, ImageUp, LibraryBig, Sparkles } from 'lucide-react';

import { ProjectLevelFinder } from '@/components/project-level-finder';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const projectRoute = [
  { number: '01', title: '答案之书', from: '普通对话', to: '做出第一个网页', description: '学会让 Coding 工具操作文件，并走完定义、运行、修改和发布。', href: '/projects/book-of-answers', icon: BookOpen },
  { number: '02', title: '图片反推 Prompt', from: '普通网页', to: '接入真实 AI 模型', description: '完成图片上传、服务端调用、结构化结果和异常处理。', href: '/projects/image-to-prompt', icon: ImageUp },
  { number: '03', title: '研究到报告与 HTML Deck', from: '单次回答', to: '多阶段业务工作流', description: '把搜索、证据、人工确认、报告和演示连成完整流程。', href: '/projects/research-to-deck', icon: FileSearch },
  { number: '04', title: '个人内容工作台', from: '一次任务', to: '可长期积累的系统', description: '保存资料、选题、版本差异和经过确认的个人偏好。', href: '/projects/content-workbench', icon: LibraryBig },
];

export default function Home() {
  return <main className="consumer-home">
    <SiteHeader />
    <section className="level-hero">
      <div className="level-intro">
        <span><Sparkles />先选项目，再边做边学</span>
        <h1>先看看，<br />你该做哪个项目</h1>
        <p>选一下你现在用 AI 做到哪了。我会直接给你一个项目，先做起来，遇到问题再看说明。</p>
        <ul><li><Check />只问两个问题</li><li><Check />不用登录</li><li><Check />选完直接开始</li></ul>
      </div>
      <ProjectLevelFinder />
    </section>

    <section className="project-route-section">
      <div className="project-route-heading">
        <div><span>四个跟做项目</span><h2>每做完一个，就多会一件事</h2></div>
        <p>项目从简单网页排到完整工作流。你可以直接从刚才选出的项目开始，不用从第一个重做。</p>
      </div>
      <div className="project-route-list">
        {projectRoute.map(({ icon: Icon, ...project }) => <Link prefetch={false} key={project.number} href={project.href}>
          <span className="route-number">{project.number}</span>
          <span className="route-icon"><Icon /></span>
          <div><span>{project.from}<ArrowRight />{project.to}</span><h3>{project.title}</h3><p>{project.description}</p></div>
          <span className="route-action">查看项目<ArrowRight /></span>
        </Link>)}
      </div>
      <div className="route-demo-link"><span>想先看看做出来是什么样？</span><Link prefetch={false} href="/demos">打开四个成品<ArrowRight /></Link></div>
    </section>
    <SiteFooter />
  </main>;
}

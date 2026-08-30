import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function SiteFooter() {
  return <footer className="consumer-footer"><div className="consumer-footer-inner">
    <div className="footer-promise"><span><Sparkles /></span><div><strong>AI 项目实验室</strong><p>让第一个作品真正跑起来。</p></div></div>
    <div className="footer-links"><Link prefetch={false} href="/start">开始这里</Link><Link prefetch={false} href="/concepts">知识专题</Link><Link prefetch={false} href="/methods">学习路径</Link><Link prefetch={false} href="/projects">跟做项目</Link><Link prefetch={false} href="/demos">成品 Demo</Link><a href="https://github.com/judexuhs/learn-ai-with-projects" target="_blank" rel="noreferrer">GitHub<ArrowUpRight /></a><a href="https://github.com/judexuhs/learn-ai-with-projects/issues/new" target="_blank" rel="noreferrer">反馈问题<ArrowUpRight /></a></div>
  </div></footer>;
}

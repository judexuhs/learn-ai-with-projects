import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { BrandWordmark } from '@/components/brand-wordmark';

export function SiteFooter() {
  return <footer className="consumer-footer"><div className="consumer-footer-inner">
    <div className="footer-promise"><BrandWordmark inverse /><p>和 AI 一起，把想法做成能用的产品。</p></div>
    <div className="footer-links"><Link prefetch={false} href="/">先选项目</Link><Link prefetch={false} href="/projects">所有项目</Link><Link prefetch={false} href="/demos">看看成品</Link><Link prefetch={false} href="/concepts">遇到问题时查概念</Link><a href="https://github.com/judexuhs/learn-ai-with-projects" target="_blank" rel="noreferrer">GitHub<ArrowUpRight /></a><a href="https://github.com/judexuhs/learn-ai-with-projects/issues/new" target="_blank" rel="noreferrer">反馈问题<ArrowUpRight /></a></div>
  </div></footer>;
}

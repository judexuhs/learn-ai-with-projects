'use client';

import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const nav = [['开始这里', '/start'], ['知识专题', '/concepts'], ['学习路径', '/methods'], ['跟做项目', '/projects'], ['成品 Demo', '/demos']];

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="consumer-header"><div className="consumer-header-inner">
    <Link prefetch={false} href="/" className="consumer-brand"><span><Sparkles /></span><strong>AI 项目实验室</strong></Link>
    <nav className="consumer-nav" aria-label="主导航">{nav.map(([label, href]) => {
      const active = pathname === href || pathname.startsWith(`${href}/`);
      return <Link prefetch={false} key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</Link>;
    })}</nav>
    <Link prefetch={false} href="/start" className="header-start">从这里开始</Link>
    <details className="consumer-menu"><summary aria-label="打开导航菜单"><Menu /></summary><nav aria-label="移动端导航">{nav.map(([label, href]) => <Link prefetch={false} key={href} href={href}>{label}</Link>)}<Link prefetch={false} href="/start" className="mobile-start">从这里开始</Link></nav></details>
  </div></header>;
}

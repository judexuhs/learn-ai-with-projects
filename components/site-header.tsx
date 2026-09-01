'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { BrandWordmark } from '@/components/brand-wordmark';

const nav = [['先选项目', '/'], ['所有项目', '/projects'], ['看看成品', '/demos']];

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="consumer-header"><div className="consumer-header-inner">
    <Link prefetch={false} href="/" className="consumer-brand" aria-label="造物间首页"><BrandWordmark /></Link>
    <nav className="consumer-nav" aria-label="主导航">{nav.map(([label, href]) => {
      const active = pathname === href || pathname.startsWith(`${href}/`);
      return <Link prefetch={false} key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</Link>;
    })}</nav>
    <Link prefetch={false} href="/" className="header-start">帮我选一个</Link>
    <details className="consumer-menu"><summary aria-label="打开导航菜单"><Menu /></summary><nav aria-label="移动端导航">{nav.map(([label, href]) => <Link prefetch={false} key={href} href={href}>{label}</Link>)}</nav></details>
  </div></header>;
}

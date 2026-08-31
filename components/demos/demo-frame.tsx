'use client';

import { NativeLink as Link } from '@/components/native-link';
import {
  ArrowLeft,
  BookOpenText,
  FileSearch,
  ImageUp,
  LibraryBig,
  Menu,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const products = [
  { slug: 'book', label: '答案之书', icon: BookOpenText, accent: 'book' },
  { slug: 'image-prompt', label: '图片反推', icon: ImageUp, accent: 'image' },
  {
    slug: 'research-deck',
    label: '研究汇报',
    icon: FileSearch,
    accent: 'research',
  },
  {
    slug: 'content-studio',
    label: '内容工作台',
    icon: LibraryBig,
    accent: 'content',
  },
];

export function DemoFrame({
  current,
  title,
  description,
  children,
  status = '演示模式',
}: {
  current: string;
  title: string;
  description: string;
  children: ReactNode;
  status?: string;
}) {
  return (
    <main className={cn('demo-surface min-h-dvh', `demo-${current}`)}>
      <header className="demo-header">
        <div className="demo-header-inner">
          <Link href="/demos" className="demo-back">
            <ArrowLeft />
            四个 Demo
          </Link>
          <nav className="demo-nav" aria-label="Demo 产品导航">
            {products.map(({ slug, label, icon: Icon }) => (
              <Link
                key={slug}
                href={`/demos/${slug}`}
                className={cn('demo-nav-link', slug === current && 'is-active')}
                aria-current={slug === current ? 'page' : undefined}
              >
                <Icon /> <span>{label}</span>
              </Link>
            ))}
          </nav>
          <details className="demo-mobile-menu">
            <summary aria-label="打开产品导航">
              <Menu />
            </summary>
            <nav>
              {products.map(({ slug, label }) => (
                <Link key={slug} href={`/demos/${slug}`}>
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <div className="demo-titlebar">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <span className="demo-status">
          <ShieldCheck />
          {status}
        </span>
      </div>
      {children}
    </main>
  );
}

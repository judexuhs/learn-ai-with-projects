'use client';

import Link from 'next/link';
import { Brackets, Menu } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  ['知识专题', '/concepts'],
  ['学习路径', '/methods'],
  ['跟做项目', '/projects'],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/[.08] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between border-x border-black/[.06] px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 font-medium tracking-[-0.01em]">
          <span className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,.04)]">
            <Brackets className="size-4" strokeWidth={1.8} />
          </span>
          <span className="text-sm">AI 项目实验室</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-neutral-500 md:flex" aria-label="主导航">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-black">
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/projects/book-of-answers"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'hidden md:inline-flex',
          )}
        >
          开始跟做
        </Link>

        <details className="group relative md:hidden">
          <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-black/10 text-neutral-700 [&::-webkit-details-marker]:hidden" aria-label="打开导航菜单">
            <Menu className="size-4" />
          </summary>
          <nav className="absolute top-12 right-0 z-30 w-56 rounded-lg border border-black/10 bg-white p-2 shadow-[0_16px_32px_rgba(0,0,0,.08)]" aria-label="移动端导航">
            {nav.map(([label, href]) => <Link key={href} href={href} className="block rounded-md px-3 py-2.5 text-sm text-neutral-700 hover:bg-black/[.04]">{label}</Link>)}
            <Link href="/projects/book-of-answers" className="mt-1 block rounded-md bg-[#1d1d1f] px-3 py-2.5 text-center text-sm font-medium text-white">开始第一个项目</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProjectList } from '@/components/project-list';
import { projects } from '@/lib/site-content';

export const metadata: Metadata = { title: '跟做项目', description: '从普通网页到 AI 调用，再到完整业务工作流。' };

export default function ProjectsPage() {
  return (
    <main className="consumer-page min-h-dvh">
      <SiteHeader />
      <section className="friendly-page-hero mx-auto w-full min-w-0 max-w-5xl overflow-hidden px-5 pt-16 pb-20 md:px-8 md:pt-24">
        <div className="max-w-2xl">
          <h1 className="mt-4 max-w-full break-words text-4xl font-semibold tracking-[-0.04em] md:text-6xl">选一个作品，照着步骤做出来</h1>
          <p className="mt-6 max-w-full break-words text-lg leading-8 text-slate-600">第一次建议从答案之书开始。你不需要先学会编程，每一步都会告诉你现在做什么、做完得到什么。</p>
          <p className="mt-5 text-sm font-medium text-[#1d5fd1]">跟做项目</p>
        </div>

        <Link prefetch={false} href="/demos" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1d5fd1] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_18px_rgba(29,95,209,.2)] hover:bg-[#174ea6]">先体验四个成品 Demo<ArrowRight className="size-4" /></Link>

        <div className="mt-14"><ProjectList projects={projects} /></div>
      </section>
      <SiteFooter />
    </main>
  );
}

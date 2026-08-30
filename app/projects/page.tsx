import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { projects } from '@/lib/site-content';

export const metadata: Metadata = { title: '三个跟做项目', description: '从普通网页到 AI 调用，再到完整业务工作流。' };

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader />
      <section className="mx-auto w-full min-w-0 max-w-5xl overflow-hidden px-5 pt-16 pb-20 md:px-8 md:pt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-700">跟做项目</p>
          <h1 className="mt-4 max-w-full break-words text-4xl font-semibold tracking-[-0.04em] md:text-6xl">选一个作品，照着步骤做出来</h1>
          <p className="mt-6 max-w-full break-words text-lg leading-8 text-slate-600">第一次建议从答案之书开始。你不需要先学会编程，每一步都会告诉你现在做什么、做完得到什么。</p>
        </div>

        <div className="mt-14 min-w-0 divide-y divide-black/[.08] border-y border-black/[.08]">
          {projects.map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group grid min-w-0 gap-4 py-7 transition-colors hover:bg-slate-50/70 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-center sm:px-4">
                <span className="text-sm font-medium tabular-nums text-sky-700">0{index + 1}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-xl font-semibold tracking-[-0.025em]">{project.title}</h2>
                    <span className="text-xs text-slate-400">{project.level} · {project.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{project.subtitle}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">最终做出：{project.outputs[0]}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-slate-500 group-hover:text-sky-700">开始跟做<ArrowRight className="size-4" /></span>
              </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

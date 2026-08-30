import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Route, Sparkles } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { learningPaths, topics } from '@/lib/learning-content.mjs';

export const metadata: Metadata = { title: 'AI 学习路径', description: '按照用好 AI、做 AI 工具或做 AI 工作流三个目标，选择真正需要的知识与项目。' };

export default function MethodsPage() {
  return <main className="min-h-dvh bg-white text-[#1d1d1f]">
    <SiteHeader />
    <section className="mx-auto max-w-6xl border-x border-black/[.06] px-5 pt-20 pb-16 md:px-8 md:pt-24 md:pb-20">
      <p className="text-sm font-medium text-[hsl(212_100%_41%)]">学习路径</p>
      <h1 className="mt-5 max-w-4xl text-5xl leading-[1.07] font-semibold tracking-[-0.05em] text-balance md:text-7xl">不用先学完 AI，从你的目标开始</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-500">选择现在最想做到的事情。我们只安排这条路真正需要的专题，并在合适的位置带你进入项目。</p>
    </section>

    <section className="border-y border-black/[.08] bg-[#fafafa]">
      <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-12 md:px-8 md:py-16">
        <div className="overflow-hidden rounded-xl border border-black/[.08] bg-white">
          {learningPaths.map((path, index) => {
            const first = topics.find((topic) => topic.slug === path.steps[0].topic);
            return <Link key={path.slug} href={`/methods/${path.slug}`} className="group grid gap-5 border-black/[.08] p-5 transition hover:bg-black/[.015] md:grid-cols-[54px_220px_1fr_auto] md:items-center md:p-7 [&:not(:last-child)]:border-b">
              <span className="flex size-11 items-center justify-center rounded-lg border border-black/[.08] bg-[#fafafa] text-[hsl(212_100%_41%)]"><Route className="size-5" /></span>
              <div><p className="font-mono text-xs text-neutral-400">路径 {index + 1}</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">{path.title}</h2></div>
              <div><p className="text-sm leading-6 text-neutral-600">{path.description}</p><p className="mt-2 text-xs text-neutral-400">{path.steps.length} 个专题，第一篇：{first?.shortTitle}</p></div>
              <ArrowRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
            </Link>;
          })}
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-10 border-x border-black/[.06] px-5 py-16 md:grid-cols-[.8fr_1.2fr] md:px-8 md:py-20">
      <div><Sparkles className="size-5 text-[hsl(212_100%_41%)]" /><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">路径只是推荐顺序</h2><p className="mt-4 max-w-md leading-7 text-neutral-500">不考试，也不要求背概念。读懂一篇、完成实验、用进任务，然后继续下一篇。</p></div>
      <ul className="grid gap-4 sm:grid-cols-2">{['每篇只解决一个完整问题', '每篇都有几分钟动手实验', '重要概念会在项目中再次出现', '遇到陌生词再打开完整词典'].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-black/[.08] p-4 text-sm leading-6 text-neutral-600"><span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[hsl(212_100%_97%)] text-[hsl(212_100%_41%)]"><Check className="size-3.5" /></span>{item}</li>)}</ul>
    </section>
    <SiteFooter />
  </main>;
}

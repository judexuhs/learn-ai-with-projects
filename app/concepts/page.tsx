import type { Metadata } from 'next';
import { Braces } from 'lucide-react';

import { ConceptBrowser } from '@/components/concept-browser';
import { TopicCatalog } from '@/components/topic-catalog';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { topics } from '@/lib/learning-content.mjs';
import { concepts } from '@/lib/site-content';

export const metadata: Metadata = { title: 'AI 知识专题', description: '用完整文章和动手实验，理解真正影响 AI 使用与项目制作的核心概念。' };

export default function ConceptsPage() {
  return (
    <main className="consumer-page min-h-dvh">
      <SiteHeader />
      <section className="friendly-page-hero mx-auto max-w-6xl px-5 pt-20 pb-16 md:px-8 md:pt-24 md:pb-20">
        <div>
          <p className="text-sm font-semibold text-[#1d5fd1]">知识专题 · 按需要学习</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.07] font-semibold tracking-[-0.05em] text-balance md:text-7xl">不用学完所有概念，<br />先解决眼前的问题</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-500">第一次来只读推荐的 3 篇；以后遇到具体问题，再回来查对应专题。每篇都包含解释和一个几分钟的小实验。</p>
        </div>
      </section>

      <section className="friendly-catalog"><div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"><TopicCatalog topics={topics} /></div></section>

      <section className="friendly-dictionary">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex max-w-2xl items-start gap-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-black/[.08] bg-white text-[#1d5fd1]"><Braces className="size-4" /></span><div><h2 className="text-2xl font-semibold tracking-[-0.03em]">遇到陌生词，再查完整词典</h2><p className="mt-3 leading-7 text-neutral-500">词典只用于快速查询，不是需要从头背完的学习清单。</p></div></div>
          <details className="group mt-8 rounded-xl border border-black/[.08] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5 font-medium [&::-webkit-details-marker]:hidden sm:px-6"><span>打开概念词典</span><span className="text-sm font-normal text-neutral-400">{concepts.length} 个词条</span></summary>
            <div className="border-t border-black/[.08] p-5 sm:p-6"><ConceptBrowser concepts={concepts} /></div>
          </details>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

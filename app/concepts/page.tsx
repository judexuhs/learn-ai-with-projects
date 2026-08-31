import type { Metadata } from 'next';
import { NativeLink as Link } from '@/components/native-link';
import { ArrowRight, Braces } from 'lucide-react';

import { ConceptBrowser } from '@/components/concept-browser';
import { TopicCatalog } from '@/components/topic-catalog';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { topics } from '@/lib/learning-content.mjs';
import { concepts } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'AI 知识专题',
  description:
    '用完整文章和动手实验，理解真正影响 AI 使用与项目制作的核心概念。',
};

export default function ConceptsPage() {
  return (
    <main className="min-h-dvh bg-white text-[#1d1d1f]">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-10 border-x border-black/[.06] px-5 pt-20 pb-16 md:grid-cols-[1fr_280px] md:px-8 md:pt-24 md:pb-20">
        <div>
          <p className="text-sm font-medium text-[hsl(212_100%_41%)]">
            知识专题
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.07] font-semibold tracking-[-0.05em] text-balance md:text-7xl">
            每次弄懂一个问题，再亲手验证一次
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-500">
            这里不是术语目录。每篇专题都会从一个真实例子开始，用图解说清机制，最后带你亲手验证一次。
          </p>
        </div>
        <div className="self-end border-l-2 border-[hsl(212_100%_48%)] pl-5">
          <p className="text-sm font-semibold">第一次来，从这里开始</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            先理解大模型怎样生成答案，再选择与你目标相关的内容。
          </p>
          <Link
            href="/concepts/how-llms-generate"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[hsl(212_100%_41%)]"
          >
            阅读第一篇
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-black/[.08] bg-[#fafafa]">
        <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-16 md:px-8 md:py-20">
          <TopicCatalog topics={topics} />
        </div>
      </section>

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-16 md:px-8 md:py-20">
          <div className="flex max-w-2xl items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-black/[.08] bg-white text-[hsl(212_100%_41%)]">
              <Braces className="size-4" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                遇到陌生词，再查完整词典
              </h2>
              <p className="mt-3 leading-7 text-neutral-500">
                词典保留网页与 AI
                项目中的全部术语。它用于快速查询，不是需要从头背完的学习清单。
              </p>
            </div>
          </div>
          <details className="group mt-8 rounded-xl border border-black/[.08] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5 font-medium [&::-webkit-details-marker]:hidden sm:px-6">
              <span>打开概念词典</span>
              <span className="text-sm font-normal text-neutral-400">
                {concepts.length} 个词条
              </span>
            </summary>
            <div className="border-t border-black/[.08] p-5 sm:p-6">
              <ConceptBrowser concepts={concepts} />
            </div>
          </details>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

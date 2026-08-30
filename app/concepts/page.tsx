import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Braces, Clock3, FlaskConical } from 'lucide-react';

import { ConceptBrowser } from '@/components/concept-browser';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { topics } from '@/lib/learning-content.mjs';
import { concepts } from '@/lib/site-content';

export const metadata: Metadata = { title: 'AI 知识专题', description: '用完整文章和动手实验，理解真正影响 AI 使用与项目制作的核心概念。' };

const groups = [
  { name: '原理层', title: '先看懂 AI 为什么这样工作', description: '理解生成、上下文、记忆、幻觉、工具和工作流。' },
  { name: '应用层', title: '再把原理用进真实任务', description: '从说清需求到反复修改，再把成功对话沉淀成流程。' },
  { name: '项目层', title: '准备做项目时，再补这些知识', description: '理解 API、结构化输出、多模态、知识库、成本和数据边界。' },
] as const;

export default function ConceptsPage() {
  return (
    <main className="min-h-dvh bg-white text-[#1d1d1f]">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-10 border-x border-black/[.06] px-5 pt-20 pb-16 md:grid-cols-[1fr_280px] md:px-8 md:pt-24 md:pb-20">
        <div>
          <p className="text-sm font-medium text-[hsl(212_100%_41%)]">知识专题</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.07] font-semibold tracking-[-0.05em] text-balance md:text-7xl">每次弄懂一个问题，再亲手验证一次</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-500">这里不是术语目录。每篇专题都会解释原理、常见误解和真实用途，并带你完成一个几分钟的小实验。</p>
        </div>
        <div className="self-end border-l-2 border-[hsl(212_100%_48%)] pl-5">
          <p className="text-sm font-semibold">第一次来，从这里开始</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">先理解大模型怎样生成答案，再选择与你目标相关的内容。</p>
          <Link href="/concepts/how-llms-generate" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[hsl(212_100%_41%)]">阅读第一篇<ArrowRight className="size-4" /></Link>
        </div>
      </section>

      {groups.map((group, groupIndex) => {
        const items = topics.filter((topic) => topic.category === group.name);
        return <section key={group.name} className={groupIndex % 2 === 0 ? 'border-y border-black/[.08] bg-[#fafafa]' : 'border-b border-black/[.08] bg-white'}>
          <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-16 md:px-8 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[hsl(212_100%_41%)]">{group.name}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{group.title}</h2>
              <p className="mt-4 leading-7 text-neutral-500">{group.description}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {items.map((topic) => <Link key={topic.slug} href={`/concepts/${topic.slug}`} className="group rounded-xl border border-black/[.08] bg-white p-5 transition hover:border-black/20 hover:bg-black/[.012] sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-9 items-center justify-center rounded-md border border-black/[.08] bg-[#fafafa] text-[hsl(212_100%_41%)]"><BookOpen className="size-4" /></span>
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400"><Clock3 className="size-3.5" />约 10 分钟</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em]">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{topic.question}</p>
                <div className="mt-5 flex items-center justify-between border-t border-black/[.06] pt-4 text-xs">
                  <span className="flex items-center gap-1.5 text-neutral-500"><FlaskConical className="size-3.5" />包含动手实验</span>
                  <ArrowRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
                </div>
              </Link>)}
            </div>
          </div>
        </section>;
      })}

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-16 md:px-8 md:py-20">
          <div className="flex max-w-2xl items-start gap-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-black/[.08] bg-white text-[hsl(212_100%_41%)]"><Braces className="size-4" /></span><div><h2 className="text-2xl font-semibold tracking-[-0.03em]">遇到陌生词，再查完整词典</h2><p className="mt-3 leading-7 text-neutral-500">词典保留网页与 AI 项目中的全部术语。它用于快速查询，不是需要从头背完的学习清单。</p></div></div>
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

import type { Metadata } from 'next';
import { ArrowRight, Bot, CircleUserRound, FileInput, Scale, Sparkles } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { cases } from '@/lib/site-content';

export const metadata: Metadata = { title: 'AI 案例拆解', description: '看懂 AI 在真实业务中的分工，而不是只看结果截图。' };
const stages = [
  { key: 'input', label: '输入', icon: FileInput },
  { key: 'ai', label: 'AI 负责', icon: Bot },
  { key: 'rules', label: '规则负责', icon: Scale },
  { key: 'human', label: '人负责', icon: CircleUserRound },
  { key: 'output', label: '输出', icon: Sparkles },
] as const;

export default function CasesPage() {
  return <main className="consumer-page min-h-dvh"><SiteHeader />
    <section className="mx-auto max-w-7xl px-5 pt-16 pb-20 md:px-8 md:pt-24 lg:px-10">
      <div className="w-full max-w-3xl min-w-0 overflow-hidden"><p className="text-sm font-medium text-sky-700">案例拆解</p><h1 className="mt-4 break-all text-4xl font-semibold tracking-[-0.04em] md:text-6xl">先看懂分工，再决定是否值得做</h1><p className="mt-6 max-w-2xl break-all text-lg leading-8 text-slate-600">这些不是待售产品，也不是个人项目展示。它们用同一套结构说明：什么交给 AI，什么交给规则，哪些判断必须由人完成。</p></div>
      <div className="mt-16 space-y-6">
        {cases.map((item, index) => <article key={item.title} className="w-full max-w-full overflow-hidden rounded-xl border border-black/[.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,.03)] sm:p-8">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="min-w-0"><p className="text-xs font-medium text-sky-700">案例 {String(index + 1).padStart(2, '0')}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{item.title}</h2><p className="mt-3 leading-7 text-slate-600">{item.summary}</p></div>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {stages.map((stage, stageIndex) => { const Icon = stage.icon; return <div key={stage.key} className="relative min-w-0 overflow-hidden rounded-2xl bg-slate-50 p-4">{stageIndex < stages.length - 1 && <ArrowRight className="absolute top-5 -right-2.5 z-10 hidden size-4 text-sky-300 xl:block" />}<Icon className="size-4 text-sky-600" /><p className="mt-4 text-xs font-medium text-slate-400">{stage.label}</p><p className="mt-2 break-all text-sm leading-6 text-slate-700">{item[stage.key]}</p></div>; })}
            </div>
          </div>
        </article>)}
      </div>
    </section><SiteFooter /></main>;
}

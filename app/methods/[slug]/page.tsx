import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, FlaskConical, PackageCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getLearningPath, getTopic, learningPaths } from '@/lib/learning-content.mjs';
import { getProject } from '@/lib/site-content';

export function generateStaticParams() { return learningPaths.map((path) => ({ slug: path.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const path = getLearningPath((await params).slug); return path ? { title: path.title, description: path.outcome } : {}; }

export default async function LearningPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const path = getLearningPath((await params).slug);
  if (!path) notFound();
  const project = getProject(path.project);

  return <main className="consumer-page min-h-dvh">
    <SiteHeader />
    <section className="border-b border-black/[.08] bg-[#fafafa]"><div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-12 md:px-8 md:py-16">
      <Link href="/methods" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"><ArrowLeft className="size-4" />返回学习路径</Link>
      <div className="mt-10 grid gap-9 md:grid-cols-[1fr_300px] md:items-end"><div><p className="text-sm font-medium text-[hsl(212_100%_41%)]">目标学习路径</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">{path.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-500">{path.description}</p></div><div className="rounded-xl border border-black/[.08] bg-white p-5"><p className="text-xs text-neutral-400">适合谁</p><p className="mt-2 text-sm leading-6 text-neutral-700">{path.forWhom}</p></div></div>
      <div className="mt-10 flex gap-3 rounded-xl border border-[hsl(212_100%_88%)] bg-[hsl(212_100%_97%)] p-5"><Check className="mt-1 size-4 shrink-0 text-[hsl(212_100%_41%)]" /><p className="text-sm leading-6 text-neutral-700"><strong>完成后的结果：</strong>{path.outcome}</p></div>
    </div></section>

    <section className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-14 md:px-8 md:py-20">
      <div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-[-0.04em]">按这个顺序开始</h2><p className="mt-4 leading-7 text-neutral-500">不用连续读完。每完成一个实验，就把它用进当天的一次真实任务。</p></div>
      <ol className="mt-10 grid gap-4">{path.steps.map((step, index) => { const topic = getTopic(step.topic); if (!topic) return null; return <li key={step.topic}><Link href={`/concepts/${topic.slug}`} className="group grid gap-5 rounded-xl border border-black/[.08] p-5 transition hover:border-black/20 hover:bg-black/[.012] md:grid-cols-[44px_220px_1fr_150px] md:items-center md:p-6">
        <span className="flex size-9 items-center justify-center rounded-md bg-[#fafafa] font-mono text-xs text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
        <div><p className="text-xs text-[hsl(212_100%_41%)]">{topic.category}</p><h3 className="mt-2 font-semibold">{topic.title}</h3></div>
        <p className="text-sm leading-6 text-neutral-500">{step.reason}</p>
        <span className="flex items-center justify-between gap-3 text-xs text-neutral-500"><span className="flex items-center gap-1.5"><FlaskConical className="size-3.5" />{step.action}</span><ArrowRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" /></span>
      </Link></li>; })}</ol>
    </section>

    {project && <section className="border-t border-black/[.08] bg-[#fafafa]"><div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-14 md:px-8 md:py-16"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="flex items-center gap-2 text-sm font-medium text-[hsl(212_100%_41%)]"><PackageCheck className="size-4" />对应跟做项目</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{project.title}</h2><p className="mt-3 max-w-2xl leading-7 text-neutral-500">{project.summary}</p></div><Link href={`/projects/${project.slug}`} className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-[#1d1d1f] px-4 text-sm font-medium whitespace-nowrap text-white hover:bg-black">进入项目<ArrowRight className="size-4" /></Link></div></div></section>}
    <SiteFooter />
  </main>;
}

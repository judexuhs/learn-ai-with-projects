import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

import { ProjectGuide } from '@/components/project-guide';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getProject, projects } from '@/lib/site-content';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <main className="consumer-page min-h-dvh">
      <SiteHeader />
      <section className="project-page-intro">
        <div className="project-page-intro-inner">
          <Link href="/projects" className="project-page-back"><ArrowLeft />所有项目</Link>
          <div className="project-page-title">
            <div>
              <p>项目 {project.number} · {project.level} · {project.time}</p>
              <h1>{project.title}</h1>
              <span>{project.subtitle}</span>
            </div>
            <aside><small>完成后你会有</small><strong>{project.outputs[0]}</strong></aside>
          </div>
        </div>
      </section>
      <section className="project-guide-section mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12 lg:px-10"><ProjectGuide project={project} /></section>
      <section className="mx-auto max-w-5xl px-5 pb-20 md:px-8">
        <div className="rounded-xl border border-black/[.08] bg-[#fafafa] p-7 sm:p-10">
          <p className="text-sm font-medium text-sky-700">做完之后</p><h2 className="mt-3 text-2xl font-semibold">把作品发给一个真实的人</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">请对方实际操作，再记录他在哪里犹豫、问了什么、是否愿意再用一次。MVP 最有价值的结果不是“做完”，而是得到第一条真实反馈。</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

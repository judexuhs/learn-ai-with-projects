import type { Metadata } from 'next';
import { NativeLink as Link } from '@/components/native-link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  FlaskConical,
  Link2,
  TriangleAlert,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { ConceptExample, ConceptVisual } from '@/components/concept-visual';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getTopic, topics } from '@/lib/learning-content.mjs';

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return topic ? { title: topic.title, description: topic.takeaway } : {};
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();
  const nextTopic = getTopic(topic.next);

  return (
    <main className="min-h-dvh bg-white text-[#1d1d1f]">
      <SiteHeader />
      <article>
        <header className="border-b border-black/[.08] bg-[#fafafa]">
          <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-12 md:px-8 md:py-16">
            <Link
              href="/concepts"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
            >
              <ArrowLeft className="size-4" />
              返回知识专题
            </Link>
            <div className="mt-10 grid gap-9 md:grid-cols-[1fr_240px] md:items-end">
              <div>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span className="font-medium text-[hsl(212_100%_41%)]">
                    {topic.category}
                  </span>
                  <span className="text-neutral-300">/</span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />约 10 分钟
                  </span>
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-balance md:text-6xl">
                  {topic.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-500">
                  {topic.question}
                </p>
              </div>
              <div className="rounded-xl border border-black/[.08] bg-white p-5">
                <BookOpen className="size-4 text-[hsl(212_100%_41%)]" />
                <p className="mt-4 text-xs text-neutral-400">读完你会知道</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  {topic.intro}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl border-x border-black/[.06] md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden border-r border-black/[.06] px-6 py-14 md:block">
            <nav className="sticky top-24 text-sm" aria-label="本页目录">
              <p className="font-medium">这篇会讲</p>
              <ol className="mt-4 space-y-3 text-neutral-500">
                <li>
                  <a href="#example" className="leading-5 hover:text-black">
                    先看一个真实例子
                  </a>
                </li>
                {topic.sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="leading-5 hover:text-black"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#visual" className="leading-5 hover:text-black">
                    用一张图看懂
                  </a>
                </li>
              </ol>
              <a
                href="#experiment"
                className="mt-5 block border-t border-black/[.08] pt-5 font-medium text-[hsl(212_100%_41%)]"
              >
                马上试一下
              </a>
            </nav>
          </aside>
          <div className="min-w-0 px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
            <section className="rounded-xl border border-[hsl(212_100%_88%)] bg-[hsl(212_100%_97%)] p-5 sm:p-6">
              <p className="text-sm font-semibold text-[hsl(211_100%_32%)]">
                先记住这一句话
              </p>
              <p className="mt-3 text-lg leading-8 text-neutral-800">
                {topic.takeaway}
              </p>
            </section>
            <div id="example" className="scroll-mt-24">
              <ConceptExample example={topic.example} />
            </div>
            <div className="mt-14 space-y-14">
              {topic.sections.map((section, index) => (
                <div key={section.title}>
                  <section id={`section-${index + 1}`} className="scroll-mt-24">
                    <p className="font-mono text-xs text-neutral-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-[70ch] text-base leading-8 text-neutral-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                  {index === 0 && (
                    <div id="visual" className="scroll-mt-24">
                      <ConceptVisual visual={topic.visual} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <section
              id="experiment"
              className="mt-16 scroll-mt-24 rounded-xl border border-[hsl(212_100%_86%)] bg-white p-5 shadow-[0_8px_30px_rgba(15,70,130,.06)] sm:p-8"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-[hsl(212_100%_41%)]">
                    <FlaskConical className="size-4" />
                    马上试一下
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    {topic.experiment.title}
                  </h2>
                </div>
                <span className="flex w-fit items-center gap-1.5 rounded-md bg-[#fafafa] px-2.5 py-1.5 text-xs text-neutral-500">
                  <Clock3 className="size-3.5" />
                  {topic.experiment.time}
                </span>
              </div>
              <p className="mt-5 text-sm leading-6 text-neutral-500">
                准备：{topic.experiment.setup}
              </p>
              <ol className="mt-7 space-y-4">
                {topic.experiment.steps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-7 text-neutral-700"
                  >
                    <span className="flex size-7 items-center justify-center rounded-md bg-[hsl(212_100%_97%)] font-mono text-xs text-[hsl(212_100%_41%)]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-t border-black/[.08] pt-6">
                <p className="text-sm font-semibold">观察什么</p>
                <ul className="mt-3 space-y-2">
                  {topic.experiment.observe.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-6 text-neutral-600"
                    >
                      <Check className="mt-1 size-4 shrink-0 text-[hsl(212_100%_41%)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-lg bg-[#fafafa] p-4 text-sm leading-6 text-neutral-700">
                  <strong>实验结论：</strong>
                  {topic.experiment.conclusion}
                </p>
              </div>
            </section>

            <section className="mt-16">
              <p className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                <TriangleAlert className="size-4" />
                常见误解
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {topic.misconceptions.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-black/[.08] p-5"
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-14 border-t border-black/[.08] pt-10">
              <h2 className="text-xl font-semibold">什么时候真正需要它</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {topic.situations.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-[hsl(212_100%_80%)] pl-3 text-sm leading-6 text-neutral-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <Link
                href={`/projects/${topic.relatedProject.slug}`}
                className="group rounded-xl border border-black/[.08] p-5 hover:border-black/20"
              >
                <p className="flex items-center gap-2 text-xs text-neutral-400">
                  <Link2 className="size-3.5" />
                  放进真实项目
                </p>
                <h3 className="mt-3 font-semibold">
                  {topic.relatedProject.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  对应步骤：{topic.relatedProject.step}
                </p>
              </Link>
              {nextTopic && (
                <Link
                  href={`/concepts/${nextTopic.slug}`}
                  className="group rounded-xl border border-black/[.08] p-5 hover:border-black/20"
                >
                  <p className="text-xs text-neutral-400">下一篇专题</p>
                  <h3 className="mt-3 flex items-center justify-between gap-4 font-semibold">
                    {nextTopic.title}
                    <ArrowRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {nextTopic.question}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}

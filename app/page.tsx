import { NativeLink as Link } from '@/components/native-link';
import {
  ArrowRight,
  BookOpen,
  Check,
  FlaskConical,
  Layers3,
  Wrench,
} from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const learningSteps = [
  { title: '弄懂一个问题', description: '从完整专题建立直觉，不背术语。' },
  { title: '马上试一次', description: '打开常用 AI，完成几分钟实验。' },
  { title: '做出一个作品', description: '把理解用进真实项目，获得反馈。' },
];

const advancedPaths = [
  {
    title: '我想做一个 AI 工具',
    description: '适合想把图片、文字或文件处理做成网页功能的人。',
    href: '/methods/build-tool',
    action: '进入工具路径',
    icon: Wrench,
  },
  {
    title: '我想做一个 AI 工作流',
    description: '适合想把研究、内容或业务过程拆成可复用步骤的人。',
    href: '/methods/build-workflow',
    action: '进入工作流路径',
    icon: Layers3,
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-white text-[#1d1d1f]">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl gap-12 border-x border-black/[.06] px-5 pt-16 pb-16 md:grid-cols-[1.08fr_.92fr] md:px-8 md:pt-20 md:pb-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-[hsl(212_100%_41%)]">
            给第一次系统学习 AI 的人
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-balance sm:text-5xl md:text-6xl">
            只用过豆包，也可以从这里开始
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-500">
            先学会说清任务、修改结果和检查答案，再决定要不要做工具。
          </p>
          <Link
            href="/start"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-8 w-fit')}
          >
            从这里开始
            <ArrowRight />
          </Link>
          <p className="mt-4 text-sm text-neutral-400">
            不知道怎么选，直接点这个就可以。
          </p>
        </div>

        <div className="self-center rounded-xl border border-black/[.08] bg-[#fafafa] p-5 sm:p-6">
          <p className="text-sm font-semibold">这条路径会带你完成三件事</p>
          <ol className="mt-5 space-y-5">
            {learningSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[32px_1fr] gap-3">
                <span className="flex size-8 items-center justify-center rounded-md border border-black/[.08] bg-white font-mono text-xs text-neutral-500">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold">{step.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-black/[.08] bg-[#fafafa]">
        <div className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-14 md:px-8 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              已经有明确目标？
            </h2>
            <p className="mt-4 leading-7 text-neutral-500">
              只有在你已经知道想做什么时，才需要选择下面两条路径。
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {advancedPaths.map((path) => {
              const Icon = path.icon;
              return (
                <article
                  key={path.href}
                  className="rounded-xl border border-black/[.08] bg-white p-5 sm:p-6"
                >
                  <span className="flex size-9 items-center justify-center rounded-md bg-[hsl(212_100%_97%)] text-[hsl(212_100%_41%)]">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
                    {path.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                    {path.description}
                  </p>
                  <Link
                    href={path.href}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'mt-6',
                    )}
                  >
                    {path.action}
                    <ArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>

          <Link
            href="/methods"
            className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
          >
            查看三条路径的完整对比
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-x border-black/[.06] px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_360px] md:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-[hsl(212_100%_41%)]">
              <FlaskConical className="size-4" />
              不想先学，也可以直接做
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              先做一个不用 AI 的答案之书
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
              从一个 HTML
              文件开始。你会先经历定义、生成、运行和修改，再决定是否继续学习 AI
              调用。
            </p>
          </div>
          <div className="rounded-xl border border-black/[.08] bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,.04)]">
            <BookOpen className="size-5 text-[hsl(212_100%_41%)]" />
            <p className="mt-5 text-xs text-neutral-400">第一个跟做项目</p>
            <h3 className="mt-2 text-xl font-semibold">答案之书</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-500">
              {['不需要 API', '约 90 分钟', '最终得到可分享网页'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="size-4 text-[hsl(212_100%_41%)]" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Link
              href="/projects/book-of-answers"
              className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full')}
            >
              开始做答案之书
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
          >
            查看全部四个项目
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
          >
            先体验成品 Demo
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

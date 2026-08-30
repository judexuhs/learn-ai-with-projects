import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Copy, FolderOpen, KeyRound, MessageSquareWarning, MonitorCog } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: '开始这里', description: '用 10 分钟准备好 Coding 工具、项目文件夹和第一个网页。' };

const steps = [
  { icon: MonitorCog, title: '1. 选一个 Coding 工具', result: '你有一个能直接创建和修改本地文件的 AI 助手。', body: '国内网络环境优先选择 WorkBuddy；如果你能稳定使用 Codex，也可以使用 Codex。不要只在普通聊天框里问代码，你需要能“打开文件夹”的 Coding 工具。', check: '工具首页能看到 Open Folder、打开文件夹或打开本地项目。' },
  { icon: FolderOpen, title: '2. 建立并打开项目文件夹', result: 'AI 知道代码应该写到哪里。', body: '在桌面新建文件夹，命名为 book-of-answers。在 Coding 工具里选择“打开文件夹”，打开它；然后让工具创建一个 index.html。', check: '左侧文件列表里能看到 book-of-answers 和 index.html。' },
  { icon: Copy, title: '3. 发出第一条可执行任务', result: '你得到一个能在浏览器打开的网页。', body: '把下面任务完整发给 Coding 工具：', prompt: '请在当前文件夹的 index.html 中做一个最小网页，页面只显示标题“我的第一个网页”和一句“它已经运行起来了”。使用原生 HTML 和 CSS，不安装任何依赖。完成后告诉我怎样在浏览器打开。', check: '双击 index.html 后，浏览器能看见标题和正文。' },
  { icon: MessageSquareWarning, title: '4. 学会把报错说清楚', result: '遇到问题时，你知道怎样让 AI 定位，而不是反复重做。', body: '报错时不要只说“不能用”。告诉 AI：你做了什么、期待看到什么、实际发生了什么，并粘贴完整报错。', prompt: '我刚才做了：____。我期待看到：____。实际发生了：____。报错原文是：____。请先判断最可能的原因，只做最小修改，不要重写整个项目。', check: 'AI 能复述问题，并说明它改了哪个文件、为什么。' },
];

export default function StartPage() {
  return <main className="min-h-dvh bg-white text-[#1d1d1f]">
    <SiteHeader />
    <section className="mx-auto max-w-5xl px-5 pt-16 pb-12 md:px-8 md:pt-24">
      <p className="text-sm font-medium text-[#2259a8]">从这里开始 · 约 10 分钟</p>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] md:text-6xl">先让第一个网页在你的电脑上跑起来</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500">不用先学编程，也不用注册 API。你现在只完成四件事：选工具、建文件夹、创建网页、学会描述报错。</p>
    </section>

    <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
      <div className="divide-y divide-black/[.08] border-y border-black/[.08]">
        {steps.map(({ icon: Icon, title, result, body, prompt, check }) => <article key={title} className="grid gap-5 py-8 md:grid-cols-[52px_minmax(0,1fr)] md:py-10">
          <span className="flex size-10 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2259a8]"><Icon className="size-5" /></span>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
            <p className="mt-2 text-sm font-medium text-[#2259a8]">做完得到：{result}</p>
            <p className="mt-4 leading-7 text-neutral-600">{body}</p>
            {prompt && <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-lg border border-black/[.08] bg-[#fafafa] p-4 font-sans text-sm leading-6 text-neutral-700">{prompt}</pre>}
            <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-neutral-500"><Check className="mt-1 size-4 shrink-0 text-[#2259a8]" />完成检查：{check}</p>
          </div>
        </article>)}
      </div>

      <aside className="mt-10 flex gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
        <KeyRound className="mt-0.5 size-5 shrink-0 text-amber-700" />
        <div><h2 className="font-semibold">现在不要把 API Key 发给任何聊天框</h2><p className="mt-2 text-sm leading-6 text-neutral-600">第二个项目才会用到 Key。到那时会把它放进服务端环境变量，而不是写进网页代码或上传到 GitHub。</p></div>
      </aside>

      <div className="mt-12 border-t border-black/[.08] pt-10">
        <p className="text-sm text-neutral-500">四项都完成了，下一步只做最简单的项目。</p>
        <Link href="/projects/book-of-answers" className={cn(buttonVariants({ size: 'lg' }), 'mt-4')}>开始做答案之书<ArrowRight /></Link>
      </div>
    </section>
    <SiteFooter />
  </main>;
}

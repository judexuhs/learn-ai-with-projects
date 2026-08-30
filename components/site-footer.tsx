import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[.08] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-x border-black/[.06] px-5 py-10 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>AI 项目实验室，让第一个作品真正跑起来。</p>
        <div className="flex flex-wrap gap-5">
          <Link href="/start" className="hover:text-slate-900">开始这里</Link>
          <Link href="/concepts" className="hover:text-slate-900">知识专题</Link>
          <Link href="/methods" className="hover:text-slate-900">学习路径</Link>
          <Link href="/projects" className="hover:text-slate-900">跟做项目</Link>
          <Link href="/demos" className="hover:text-slate-900">成品 Demo</Link>
          <a href="https://github.com/judexuhs/learn-ai-with-projects" target="_blank" rel="noreferrer" className="hover:text-slate-900">GitHub</a>
          <a href="https://github.com/judexuhs/learn-ai-with-projects/issues/new" target="_blank" rel="noreferrer" className="hover:text-slate-900">反馈问题</a>
        </div>
      </div>
    </footer>
  );
}

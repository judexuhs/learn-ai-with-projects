'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Project } from '@/lib/site-content';
import { completionCount, progressKey } from '@/lib/progress.mjs';

export function ProjectList({ projects }: { projects: Project[] }) {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const next: Record<string, number> = {};
    for (const project of projects) {
      try {
        const stored = JSON.parse(localStorage.getItem(progressKey(project.slug)) ?? '[]');
        next[project.slug] = completionCount(stored, project.steps.map((step) => step.id));
      } catch { next[project.slug] = 0; }
    }
    const timer = window.setTimeout(() => setProgress(next), 0);
    return () => window.clearTimeout(timer);
  }, [projects]);

  return <div className="min-w-0 divide-y divide-black/[.08] border-y border-black/[.08]">
    {projects.map((project) => {
      const done = progress[project.slug] ?? 0;
      const complete = done === project.steps.length;
      return <Link key={project.slug} href={`/projects/${project.slug}`} className="group grid min-w-0 gap-4 py-7 transition-colors hover:bg-slate-50/70 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-center sm:px-4">
        <span className="text-sm font-medium tabular-nums text-[#2259a8]">{project.number}</span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">{project.title}</h2>
            <span className="text-xs text-slate-400">{project.level} · {project.time}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{project.subtitle}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">最终做出：{project.outputs[0]}</p>
        </div>
        <span className="flex min-w-28 flex-col items-start gap-1 sm:items-end">
          {done > 0 && <span className="text-xs text-slate-400">{complete ? '已完成' : `完成 ${done} / ${project.steps.length}`}</span>}
          <span className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-[#2259a8]">{complete ? <><Check className="size-4" />再次查看</> : <>{done ? '继续跟做' : '开始跟做'}<ArrowRight className="size-4" /></>}</span>
        </span>
      </Link>;
    })}
  </div>;
}

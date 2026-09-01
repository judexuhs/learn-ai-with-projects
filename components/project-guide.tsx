'use client';

/* oxlint-disable react/react-compiler */

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, Clipboard, RotateCcw } from 'lucide-react';
import Link from 'next/link';

import type { Project } from '@/lib/site-content';
import { getStepTodos } from '@/lib/project-todos.mjs';
import type { ProjectTodo } from '@/lib/project-todos';
import { completionCount, nextStepId, normalizeProgress, progressKey } from '@/lib/progress.mjs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { topicHrefForConcept } from '@/lib/topic-links';

const todoProgressKey = (slug: string) => `ai-roadmap:project-todos:${slug}`;

export function ProjectGuide({ project }: { project: Project }) {
  const stepIds = useMemo(() => project.steps.map((step) => step.id), [project.steps]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [todoProgress, setTodoProgress] = useState<Record<string, string[]>>({});
  const [selected, setSelected] = useState(stepIds[0]);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(progressKey(project.slug)) ?? '[]');
      const valid = normalizeProgress(stored, stepIds);
      setCompleted(valid);
      setSelected(nextStepId(valid, stepIds) ?? stepIds[0]);
      setTodoProgress(JSON.parse(localStorage.getItem(todoProgressKey(project.slug)) ?? '{}'));
    } catch {
      setCompleted([]);
      setTodoProgress({});
    } finally {
      setReady(true);
    }
  }, [project.slug, stepIds]);

  const updateStep = (stepId: string, checked: boolean) => {
    const next = checked
      ? normalizeProgress([...completed, stepId], stepIds)
      : completed.filter((id) => id !== stepId);
    setCompleted(next);
    localStorage.setItem(progressKey(project.slug), JSON.stringify(next));
  };

  const updateTodo = (stepId: string, todoTitle: string, checked: boolean) => {
    const currentTodos = todoProgress[stepId] ?? [];
    const nextTodos = checked
      ? [...new Set([...currentTodos, todoTitle])]
      : currentTodos.filter((title) => title !== todoTitle);
    const next = { ...todoProgress, [stepId]: nextTodos };
    setTodoProgress(next);
    localStorage.setItem(todoProgressKey(project.slug), JSON.stringify(next));
  };

  const current = project.steps.find((step) => step.id === selected) ?? project.steps[0];
  const currentIndex = project.steps.indexOf(current);
  const todos: ProjectTodo[] = getStepTodos(project.slug, current.id);
  const currentTodoProgress = todoProgress[current.id] ?? [];
  const count = completionCount(completed, stepIds);
  const nextStep = project.steps[currentIndex + 1];

  const copyTask = async () => {
    await navigator.clipboard.writeText(current.task);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,760px)] lg:justify-center lg:items-start">
      <aside className="lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-4 border-b border-black/[.08] pb-4 lg:px-1">
          <div>
            <p className="text-xs text-slate-500">项目进度</p>
            <p className="mt-1 text-sm font-medium" aria-live="polite">
              {ready ? `${count} / ${stepIds.length} 步已完成` : '正在读取'}
            </p>
          </div>
          {count > 0 && (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="清除本项目进度"
              onClick={() => {
                setCompleted([]);
                setTodoProgress({});
                localStorage.removeItem(progressKey(project.slug));
                localStorage.removeItem(todoProgressKey(project.slug));
              }}
            >
              <RotateCcw />
            </Button>
          )}
        </div>

        <label className="mt-4 block text-xs font-medium text-slate-500 lg:hidden" htmlFor="project-step-select">选择步骤</label>
        <select
          id="project-step-select"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 lg:hidden"
        >
          {project.steps.map((step, index) => <option key={step.id} value={step.id}>第 {index + 1} 步：{step.title}</option>)}
        </select>

        <nav className="mt-4 hidden space-y-0.5 lg:block" aria-label="项目步骤">
          {project.steps.map((step, index) => {
            const isSelected = selected === step.id;
            const isDone = completed.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelected(step.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                  isSelected ? 'bg-sky-50 text-sky-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                <span className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
                  isDone ? 'border-sky-700 bg-sky-700 text-white' : isSelected ? 'border-sky-300 bg-white text-sky-700' : 'border-slate-200 bg-white text-slate-400',
                )}>
                  {isDone ? <Check className="size-3" /> : index + 1}
                </span>
                <span className="leading-5">{step.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <article key={current.id} className="min-w-0">
        <header className="pb-6">
          <p className="text-sm font-medium text-sky-700">第 {currentIndex + 1} 步，共 {project.steps.length} 步</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{current.title}</h2>
          <div className="mt-5 rounded-lg bg-sky-50 px-4 py-3.5 sm:px-5">
            <p className="text-xs font-medium text-sky-700">做完这一步，你会得到</p>
            <p className="mt-1.5 text-base font-medium leading-7 text-sky-950">{current.outcome}</p>
          </div>
        </header>

        <section className="project-agent-task" aria-labelledby="agent-task-heading">
          <div className="project-agent-task-heading">
            <div>
              <p>先做这个</p>
              <h3 id="agent-task-heading">把下面这段话发给 Agent</h3>
            </div>
            <Button onClick={copyTask}>
              {copied ? <Check /> : <Clipboard />}{copied ? '已经复制' : '复制任务'}
            </Button>
          </div>
          <p className="project-agent-task-copy">{current.task}</p>
          <small>复制后，打开 WorkBuddy、Codex 或你正在用的 Agent，粘贴并发送。</small>
        </section>

        <section className="py-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em]">现在照着做</h3>
              <p className="mt-1 text-sm text-slate-500">完成一项，就勾掉一项。</p>
            </div>
            <span className="shrink-0 text-xs tabular-nums text-slate-400">{currentTodoProgress.length} / {todos.length}</span>
          </div>

          <ol className="mt-6 space-y-3">
            {todos.map((item, index) => {
              const checked = currentTodoProgress.includes(item.title);
              return (
                <li key={item.title} className={cn('rounded-xl border p-4 transition-colors sm:p-5', checked ? 'border-slate-200 bg-slate-50/70' : 'border-black/[.08] bg-white')}>
                  <label className="flex cursor-pointer items-start gap-3.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => updateTodo(current.id, item.title, event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className={cn(
                      'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-medium transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-sky-300 peer-focus-visible:ring-offset-2',
                      checked ? 'border-sky-700 bg-sky-700 text-white' : 'border-slate-300 bg-white text-slate-500',
                    )}>
                      {checked ? <Check className="size-4" /> : index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={cn('block text-[15px] font-semibold', checked && 'text-slate-500 line-through')}>{item.title}</span>
                      <span className="mt-1.5 block text-sm leading-6 text-slate-600">{item.instruction}</span>
                      {item.recommendation && <span className="mt-2 block text-xs leading-5 text-sky-700">建议：{item.recommendation}</span>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="border-t border-black/[.08] py-7">
          <h3 className="text-sm font-semibold">完成前检查</h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600">
            {current.checks.map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-sky-700" />{item}</li>)}
          </ul>
        </section>

        <div className="border-t border-black/[.08] py-2">
          <details className="group border-b border-black/[.08] py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium marker:content-none">
              想知道为什么这样做
              <ChevronRight className="size-4 text-slate-400 transition-transform group-open:rotate-90" />
            </summary>
            <p className="pb-5 text-sm leading-7 text-slate-600">{current.why}</p>
          </details>
          {current.trouble && (
            <details className="group border-b border-black/[.08] py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium marker:content-none">
                卡住了怎么办
                <ChevronRight className="size-4 text-slate-400 transition-transform group-open:rotate-90" />
              </summary>
              <p className="pb-5 text-sm leading-7 text-slate-600">{current.trouble}</p>
            </details>
          )}
        </div>

        <footer className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={completed.includes(current.id)}
              onChange={(event) => updateStep(current.id, event.target.checked)}
              className="size-5 rounded border-slate-300 accent-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            />
            我已经完成这一步
          </label>
          {nextStep ? (
            <Button onClick={() => setSelected(nextStep.id)} className="sm:min-w-36">
              下一步<ChevronRight />
            </Button>
          ) : (
            <span className="text-sm font-medium text-sky-700">你已经走到最后一步</span>
          )}
        </footer>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
          <span>这一步涉及</span>
          {current.concepts.map((concept) => {
            const href = topicHrefForConcept(concept);
            return href
              ? <Link key={concept} href={href} className="underline decoration-slate-300 underline-offset-4 hover:text-sky-700">{concept}</Link>
              : <span key={concept}>{concept}</span>;
          })}
        </div>
      </article>
    </div>
  );
}

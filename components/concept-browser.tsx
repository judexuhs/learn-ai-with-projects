'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import type { Concept } from '@/lib/site-content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const groups: Concept['group'][] = ['网页基础', 'AI 工具基础', '工作流基础'];

export function ConceptBrowser({ concepts }: { concepts: Concept[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return concepts;
    return concepts.filter((concept) => [concept.title, concept.definition, concept.project].join(' ').toLowerCase().includes(keyword));
  }, [concepts, query]);

  return (
    <div>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 API、状态、引用..." aria-label="搜索概念" className="h-11 w-full rounded-lg border border-black/10 bg-white pr-4 pl-11 text-sm shadow-[0_1px_2px_rgba(0,0,0,.04)] outline-none transition focus:border-black/30 focus:ring-3 focus:ring-black/[.06]" />
      </div>
      <p className="mt-3 text-sm text-slate-500" aria-live="polite">找到 {filtered.length} 个概念</p>

      <div className="mt-10 space-y-12">
        {groups.map((group) => {
          const items = filtered.filter((concept) => concept.group === group);
          if (!items.length) return null;
          return (
            <section key={group}>
              <div className="mb-4 flex items-center gap-3"><h2 className="text-xl font-semibold">{group}</h2><span className="rounded-lg bg-sky-50 px-2 py-1 text-xs text-sky-700">{items.length}</span></div>
              <Accordion className="overflow-hidden rounded-xl border border-black/[.08] bg-white px-5 shadow-[0_2px_8px_rgba(0,0,0,.03)]">
                {items.map((concept) => (
                  <AccordionItem key={concept.slug} value={concept.slug}>
                    <AccordionTrigger className="py-5 text-base hover:no-underline">
                      <span><span className="font-medium">{concept.title}</span><span className="mt-1.5 block max-w-2xl text-sm leading-6 font-normal text-neutral-500">{concept.definition}</span></span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Fact label="什么时候需要" value={concept.why} />
                        <Fact label="动手试一下" value={concept.experiment} />
                      </div>
                      <details className="mt-4 rounded-lg border border-black/[.06] bg-[#fafafa] px-4 py-3 text-sm text-neutral-500">
                        <summary className="cursor-pointer font-medium text-neutral-700">查看类比与常见误解</summary>
                        <p className="mt-3 leading-6"><span className="text-neutral-400">可以类比为：</span>{concept.analogy}</p>
                        <p className="mt-2 leading-6"><span className="text-neutral-400">常见误解：</span>{concept.misconception}</p>
                      </details>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          );
        })}
      </div>
      {!filtered.length && <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-medium">没有找到这个概念</p><button type="button" onClick={() => setQuery('')} className="mt-3 text-sm text-sky-700 hover:underline">清除搜索</button></div>}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-medium text-sky-700">{label}</p><p className="mt-2 leading-6 text-slate-600">{value}</p></div>;
}

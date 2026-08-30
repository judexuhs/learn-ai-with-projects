'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

import type { Concept } from '@/lib/site-content';
import { learningPaths } from '@/lib/concept-learning.mjs';
import { cn } from '@/lib/utils';

export function ConceptLearningPaths({ concepts }: { concepts: Concept[] }) {
  const [selectedId, setSelectedId] = useState(learningPaths[0].id);
  const selected = learningPaths.find((path) => path.id === selectedId) ?? learningPaths[0];
  const items = useMemo(() => selected.concepts.map((slug) => concepts.find((concept) => concept.slug === slug)).filter(Boolean) as Concept[], [concepts, selected]);

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="选择学习目标">
        {learningPaths.map((path) => (
          <button
            key={path.id}
            type="button"
            role="tab"
            aria-selected={selectedId === path.id}
            onClick={() => setSelectedId(path.id)}
            className={cn(
              'rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors',
              selectedId === path.id
                ? 'border-[hsl(212_100%_80%)] bg-[hsl(212_100%_97%)] text-[hsl(212_100%_32%)]'
                : 'border-black/[.08] bg-white text-neutral-600 hover:border-black/20 hover:text-black',
            )}
          >
            {path.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-black/[.08] bg-white" role="tabpanel">
        <div className="border-b border-black/[.08] bg-[#fafafa] px-5 py-4">
          <p className="text-sm leading-6 text-neutral-600"><span className="font-medium text-black">学完能做到：</span>{selected.outcome}</p>
        </div>
        <ol>
          {items.map((concept, index) => (
            <li key={concept.slug} className="grid gap-3 border-black/[.08] px-5 py-5 sm:grid-cols-[36px_180px_1fr] sm:items-start [&:not(:last-child)]:border-b">
              <span className="flex size-7 items-center justify-center rounded-full border border-black/[.08] bg-[#fafafa] font-mono text-[11px] text-neutral-500">{index + 1}</span>
              <p className="pt-0.5 font-medium">{concept.title}</p>
              <div>
                <p className="text-sm leading-6 text-neutral-600">{concept.definition}</p>
                <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-neutral-400"><Check className="mt-0.5 size-3.5 shrink-0 text-[hsl(212_100%_41%)]" />{concept.experiment}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex items-center justify-end border-t border-black/[.08] px-5 py-3 text-xs text-neutral-400">按顺序学习<ArrowRight className="ml-2 size-3.5" /></div>
      </div>
    </div>
  );
}

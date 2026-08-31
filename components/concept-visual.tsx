import { ArrowDown, ArrowRight, Check, CircleDot } from 'lucide-react';

import type {
  TopicExample,
  TopicVisual as TopicVisualData,
} from '@/lib/learning-content.mjs';

export function ConceptExample({ example }: { example: TopicExample }) {
  return (
    <section
      className="mt-12 overflow-hidden rounded-xl bg-[#f5f7fa]"
      aria-labelledby="example-title"
    >
      <div className="grid md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <div className="border-b border-black/[.08] p-6 md:border-r md:border-b-0 md:p-8">
          <h2
            id="example-title"
            className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
          >
            {example.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            {example.setup}
          </p>
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-[#2259a8]">
            <CircleDot className="mt-1 size-4 shrink-0" />
            {example.insight}
          </p>
        </div>
        <div className="bg-white p-6 md:p-8">
          <div className="grid gap-5">
            <div>
              <p className="text-xs font-medium text-neutral-400">
                原来的输入或做法
              </p>
              <p className="mt-2 border-l border-neutral-300 pl-4 text-sm leading-7 text-neutral-600">
                {example.before}
              </p>
            </div>
            <div
              className="flex items-center gap-3 text-neutral-300"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-black/[.08]" />
              <ArrowDown className="size-4" />
              <span className="h-px flex-1 bg-black/[.08]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#2259a8]">更具体的结果</p>
              <p className="mt-2 rounded-lg bg-[#f4f8ff] p-4 text-sm leading-7 text-neutral-800">
                {example.after}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowVisual({ visual }: { visual: TopicVisualData }) {
  return (
    <ol className="grid gap-3 lg:grid-cols-4">
      {visual.items.map((item, index) => (
        <li
          key={item.label}
          className="relative grid grid-cols-[30px_1fr] gap-3 lg:block lg:pr-6"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-[#2259a8] text-xs font-semibold text-white">
            {index + 1}
          </span>
          <div className="lg:mt-4">
            <p className="text-sm font-semibold text-neutral-900">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              {item.detail}
            </p>
          </div>
          {index < visual.items.length - 1 && (
            <ArrowRight
              className="absolute top-1 right-0 hidden size-4 text-neutral-300 lg:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function LayersVisual({ visual }: { visual: TopicVisualData }) {
  return (
    <ol className="space-y-2">
      {visual.items.map((item, index) => (
        <li
          key={item.label}
          className="grid items-start gap-2 border-t border-black/[.08] py-4 first:border-t-0 sm:grid-cols-[120px_1fr]"
          style={{ marginInline: `${index * 12}px` }}
        >
          <p className="text-sm font-semibold text-[#2259a8]">{item.label}</p>
          <p className="text-sm leading-6 text-neutral-600">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function CompareVisual({ visual }: { visual: TopicVisualData }) {
  return (
    <dl className="divide-y divide-black/[.08]">
      {visual.items.map((item) => (
        <div
          key={item.label}
          className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr] sm:gap-5"
        >
          <dt className="text-sm font-semibold text-neutral-900">
            {item.label}
          </dt>
          <dd className="text-sm leading-6 text-neutral-600">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function BarsVisual({ visual }: { visual: TopicVisualData }) {
  return (
    <div className="space-y-5">
      {visual.items.map((item) => (
        <div key={item.label}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                {item.detail}
              </p>
            </div>
            <span className="font-mono text-xs tabular-nums text-neutral-400">
              {item.value}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-sm bg-neutral-100">
            <div
              className="h-full rounded-sm bg-[#4f78b8]"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConceptVisual({ visual }: { visual: TopicVisualData }) {
  return (
    <figure className="my-14 overflow-hidden rounded-xl border border-black/[.08] bg-[#fbfcfd]">
      <figcaption className="border-b border-black/[.08] bg-white px-5 py-5 sm:px-7">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#eef4ff] text-[#2259a8]">
            <Check className="size-4" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-neutral-900">
              {visual.title}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-neutral-500">
              {visual.caption}
            </p>
          </div>
        </div>
      </figcaption>
      <div className="p-5 sm:p-7">
        {visual.type === 'flow' && <FlowVisual visual={visual} />}
        {visual.type === 'layers' && <LayersVisual visual={visual} />}
        {visual.type === 'compare' && <CompareVisual visual={visual} />}
        {visual.type === 'bars' && <BarsVisual visual={visual} />}
      </div>
    </figure>
  );
}

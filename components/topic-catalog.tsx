'use client';

import { NativeLink as Link } from '@/components/native-link';
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  Clock3,
} from 'lucide-react';
import { useState } from 'react';

type Topic = {
  slug: string;
  title: string;
  question: string;
  category: string;
};

const layers = [
  {
    name: '原理层',
    label: '先看懂 AI',
    description: '生成、上下文、记忆、幻觉、工具与工作流',
  },
  {
    name: '应用层',
    label: '把 AI 用好',
    description: '说清任务、检查结果、反复修改并沉淀方法',
  },
  {
    name: '项目层',
    label: '开始做工具',
    description: 'API、数据、评估、成本与上线边界',
  },
];

export function TopicCatalog({ topics }: { topics: Topic[] }) {
  const [active, setActive] = useState('原理层');
  const current = layers.find((item) => item.name === active) ?? layers[0];
  const items = topics.filter((topic) => topic.category === active);

  return (
    <>
      <div
        className="grid border-y border-black/[.08] md:grid-cols-3"
        role="tablist"
        aria-label="知识层级"
      >
        {layers.map((layer) => (
          <button
            key={layer.name}
            type="button"
            role="tab"
            aria-selected={active === layer.name}
            onClick={() => setActive(layer.name)}
            className={`min-h-28 border-b border-black/[.08] px-5 py-5 text-left transition last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 ${active === layer.name ? 'bg-[#f4f8ff]' : 'bg-white hover:bg-[#fafafa]'}`}
          >
            <span
              className={`text-sm font-semibold ${active === layer.name ? 'text-[#2259a8]' : 'text-neutral-900'}`}
            >
              {layer.label}
            </span>
            <span className="mt-2 block text-xs leading-5 text-neutral-500">
              {layer.description}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="text-sm font-medium text-[#2259a8]">{current.name}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {current.label}
        </h2>
        <p className="mt-3 leading-7 text-neutral-500">
          不用一次读完。按顺序选一篇，读完立即做文章里的小实验。
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((topic, index) => (
          <Link
            key={topic.slug}
            href={`/concepts/${topic.slug}`}
            className="group rounded-xl border border-black/[.08] bg-white p-5 transition hover:border-black/20 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                <BookOpen className="size-4 text-[#2259a8]" />第 {index + 1} 篇
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock3 className="size-3.5" />约 10 分钟
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em]">
              {topic.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {topic.question}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-black/[.06] pt-4 text-xs">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <ChartNoAxesColumnIncreasing className="size-3.5" />
                真实例子 · 机制图解 · 动手实验
              </span>
              <ArrowRight className="size-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

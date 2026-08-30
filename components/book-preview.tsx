'use client';

import { useState } from 'react';
import { BookOpenText, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

const answers = [
  '先把最小的一步做完。',
  '换一个更具体的问题。',
  '现在值得试一次。',
  '把它交给明天的你再判断。',
  '答案藏在你不愿删掉的部分里。',
];

export function BookPreview() {
  const [answer, setAnswer] = useState('心里想一个问题，然后翻开。');
  const [opened, setOpened] = useState(false);

  function reveal() {
    setAnswer(answers[Math.floor(Math.random() * answers.length)]);
    setOpened(true);
  }

  function reset() {
    setAnswer('心里想一个问题，然后翻开。');
    setOpened(false);
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="rounded-xl border border-black/[.08] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,.04)] sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md border border-black/[.08] bg-[#fafafa] text-[hsl(212_100%_41%)]">
              <BookOpenText className="size-4.5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-medium">答案之书</p>
              <p className="text-xs text-slate-500">第一个跟做项目</p>
            </div>
          </div>
          {opened ? (
            <Button variant="ghost" size="icon-sm" aria-label="重新提问" onClick={reset} className="text-neutral-500">
              <RotateCcw />
            </Button>
          ) : null}
        </div>

        <div className="flex min-h-[300px] items-center justify-center px-5 py-10 text-center">
          <div>
            <p className="mx-auto max-w-[300px] text-2xl leading-10 font-medium tracking-[-0.025em] text-slate-800">
              {answer}
            </p>
            <Button onClick={reveal} className="mt-8">
              {opened ? '再看一个答案' : '翻开答案'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-md border border-black/[.06] bg-[#fafafa] px-3 py-2.5 text-xs text-neutral-500">
          <span>这是可以真实操作的成品</span>
          <span className="text-right">HTML + CSS + JavaScript</span>
        </div>
      </div>
    </div>
  );
}

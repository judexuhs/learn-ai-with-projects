'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';

import { buildAnswerResult } from '@/lib/demo-workflows.mjs';

type Result = { id: string; question: string; answer: string };

export function BookDemo() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [state, setState] = useState<'idle' | 'thinking' | 'answer'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function ask() {
    if (!question.trim() || state === 'thinking') return;
    setState('thinking');
    setResult(null);
    timer.current = setTimeout(() => {
      setResult(buildAnswerResult(question));
      setState('answer');
    }, 850);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setQuestion('');
    setResult(null);
    setState('idle');
  }

  return (
    <section className="book-stage">
      <div className="book-spine" aria-hidden="true"><span>THE BOOK OF ANSWERS</span><span>2026</span></div>
      <div className="book-page">
        <div className="book-folio"><span>答案之书</span><span>{state === 'idle' ? '等待问题' : state === 'thinking' ? '正在翻页' : '一条回答'}</span></div>
        <div className="book-content" aria-live="polite">
          {state === 'idle' && <>
            <p className="book-instruction">把那个在你脑中盘旋的问题写下来。</p>
            <label htmlFor="book-question">你的问题</label>
            <textarea id="book-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：我应该先做哪一步？" maxLength={120} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') ask(); }} />
            <div className="book-actions"><span>{question.length} / 120</span><button onClick={ask} disabled={!question.trim()}>翻开答案<ArrowUpRight /></button></div>
          </>}
          {state === 'thinking' && <div className="book-thinking"><span className="book-orbit" /><p>先让问题安静一会儿。</p><small>正在从 8 条受控答案中抽取</small></div>}
          {state === 'answer' && result && <div className="book-answer">
            <p className="book-question-echo">“{result.question}”</p>
            <blockquote>{result.answer}</blockquote>
            <button onClick={reset}><RotateCcw />再问一个问题</button>
          </div>}
        </div>
        <div className="book-footnote"><span>无需 API · 不保存问题</span><span>⌘ + Enter 提交</span></div>
      </div>
    </section>
  );
}

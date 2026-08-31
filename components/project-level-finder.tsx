'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import {
  evidenceLevels,
  goalOptions,
  projectProfiles,
  recommendProject,
} from '@/lib/project-routing.mjs';
import type { EvidenceId, GoalId, ProjectRecommendation } from '@/lib/project-routing';

const entryLabels: Record<string, string> = {
  setup: '从工具和项目文件夹准备开始',
  define: '工具准备可以跳过，从写清产品说明开始',
  prototype: '从固定结果原型开始',
  schema: '基础调用可以跳过，从结构化输出开始',
  goal: '从项目目标和真实使用场景开始',
};

export function ProjectLevelFinder() {
  const finderRef = useRef<HTMLDivElement>(null);
  const [evidence, setEvidence] = useState<EvidenceId | null>(null);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const recommendation = evidence && goal ? recommendProject(evidence, goal) as ProjectRecommendation : null;

  useEffect(() => {
    if (goal) finderRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [goal]);

  const reset = () => {
    setEvidence(null);
    setGoal(null);
  };

  if (recommendation) {
    const { project } = recommendation;
    return <div ref={finderRef} className="level-finder result-state" aria-live="polite">
      <div className="finder-progress"><span>分级完成</span><strong>{recommendation.stageLabel}</strong></div>
      <div className="result-main">
        <span className="result-number">项目 {project.number}</span>
        <h2>推荐你从<br />「{project.title}」开始</h2>
        <p>{recommendation.reason}</p>
      </div>
      <dl className="result-facts">
        <div><dt>需要时间</dt><dd>{project.time}</dd></div>
        <div><dt>模型调用</dt><dd>{project.api}</dd></div>
        <div><dt>最后得到</dt><dd>{project.output}</dd></div>
      </dl>
      <div className="result-entry"><Check /><span><strong>你的起点：</strong>{entryLabels[recommendation.entry]}</span></div>
      <div className="result-route">
        <span>通往目标的路线</span>
        <ol>{recommendation.route.map((slug, index) => <li key={slug}>
          <span>{projectProfiles[slug].number}</span><strong>{projectProfiles[slug].title}</strong>{index < recommendation.route.length - 1 && <ArrowRight />}
        </li>)}</ol>
      </div>
      <Link prefetch={false} href={`/projects/${recommendation.projectSlug}`} className="finder-primary">开始做{project.title}<ArrowRight /></Link>
      <button type="button" className="finder-reset" onClick={reset}><RotateCcw />重新分级</button>
    </div>;
  }

  const options = evidence ? goalOptions : evidenceLevels;
  const step = evidence ? 2 : 1;

  return <div ref={finderRef} className="level-finder">
    <div className="finder-progress"><span>第 {step} 步，共 2 步</span><strong>{evidence ? '你最终想做什么？' : '你现在已经做到哪一步？'}</strong></div>
    <p className="finder-help">{evidence ? '目标可以远一点，系统会先给你当前够得着的项目。' : '选择你确实完成过的最高一项，不需要评价自己会不会编程。'}</p>
    <div className="finder-options">
      {options.map((option, index) => <button
        type="button"
        key={option.id}
        onClick={() => evidence ? setGoal(option.id as GoalId) : setEvidence(option.id as EvidenceId)}
      >
        <span className="option-index">{index + 1}</span>
        <span><strong>{option.label}</strong><small>{option.description}</small></span>
        <ArrowRight />
      </button>)}
    </div>
    {evidence && <button type="button" className="finder-back" onClick={() => setEvidence(null)}><ArrowLeft />返回上一步</button>}
  </div>;
}

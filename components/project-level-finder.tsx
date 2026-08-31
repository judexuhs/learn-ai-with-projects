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
  setup: '先装好 Agent，打开项目文件夹',
  define: '直接从写产品说明开始',
  prototype: '先做一个不用 API 的可点击版本',
  schema: '从规定模型返回格式开始',
  goal: '先确定这个工作台要解决什么问题',
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
      <div className="finder-progress"><span>已经选好了</span><strong>2 / 2</strong></div>
      <p className="result-stage">{recommendation.stageLabel}</p>
      <div className="result-main">
        <span className="result-number">项目 {project.number}</span>
        <h2>先做「{project.title}」</h2>
        <p>{recommendation.reason}</p>
      </div>
      <dl className="result-facts">
        <div><dt>需要时间</dt><dd>{project.time}</dd></div>
        <div><dt>模型调用</dt><dd>{project.api}</dd></div>
        <div><dt>最后得到</dt><dd>{project.output}</dd></div>
      </dl>
      <div className="result-entry"><Check /><span><strong>进入项目以后</strong>{entryLabels[recommendation.entry]}</span></div>
      <div className="result-route">
        <span>后面可以这样做</span>
        <ol>{recommendation.route.map((slug, index) => <li key={slug}>
          <span>{projectProfiles[slug].number}</span><strong>{projectProfiles[slug].title}</strong>{index < recommendation.route.length - 1 && <ArrowRight />}
        </li>)}</ol>
      </div>
      <Link prefetch={false} href={`/projects/${recommendation.projectSlug}`} className="finder-primary">去做{project.title}<ArrowRight /></Link>
      <button type="button" className="finder-reset" onClick={reset}><RotateCcw />重新选一次</button>
    </div>;
  }

  const options = evidence ? goalOptions : evidenceLevels;
  const step = evidence ? 2 : 1;

  return <div ref={finderRef} className="level-finder">
    <div className="finder-progress"><span>30 秒帮你选项目</span><strong>{step} / 2</strong></div>
    <h2 className="finder-question">{evidence ? '接下来最想做哪类东西？' : '你现在怎么用 AI？'}</h2>
    <p className="finder-help">{evidence ? '先不用考虑难不难，我会根据上一题给你安排起点。' : '选最接近你现在情况的一项。'}</p>
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

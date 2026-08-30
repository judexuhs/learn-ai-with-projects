'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, FileText, LayoutPanelTop, Search, Sparkles } from 'lucide-react';

import { buildDeck, buildResearchWorkspace } from '@/lib/demo-workflows.mjs';

const stages = ['研究 Brief', '证据卡片', '报告大纲', '报告定稿', 'HTML Deck'];

export function ResearchDeckDemo() {
  const [stage, setStage] = useState(0);
  const [topic, setTopic] = useState('AI 搜索如何改变行业研究');
  const [audience, setAudience] = useState('需要制定 2027 年计划的研究负责人');
  const [questionText, setQuestionText] = useState('哪些研究环节最先改变？\n怎样判断来源是否可靠？\n团队应该先试哪个低风险流程？');
  const [workspace, setWorkspace] = useState<ReturnType<typeof buildResearchWorkspace> | null>(null);
  const [report, setReport] = useState('');
  const [slides, setSlides] = useState<ReturnType<typeof buildDeck>>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const selectedEvidence = useMemo(() => workspace?.evidence.filter((item) => item.selected).length ?? 0, [workspace]);

  function createWorkspace() {
    const next = buildResearchWorkspace({ topic, audience, questions: questionText.split('\n').map((item) => item.trim()).filter(Boolean) });
    setWorkspace(next); setReport(next.report); setStage(1);
  }

  function toggleEvidence(id: string) {
    setWorkspace((current) => current ? { ...current, evidence: current.evidence.map((item) => item.id === id ? { ...item, selected: !item.selected } : item) } : current);
  }

  function makeSlides() {
    const next = buildDeck(report, topic); setSlides(next); setActiveSlide(0); setStage(4);
  }

  return (
    <section className="research-shell">
      <aside className="research-rail">
        <ol>{stages.map((label, index) => <li key={label} className={index === stage ? 'active' : index < stage ? 'done' : ''}>
          <button onClick={() => index <= stage && setStage(index)} disabled={index > stage}><span>{index < stage ? <Check /> : index + 1}</span>{label}</button>
        </li>)}</ol>
        <div className="research-rail-note"><strong>三个确认点</strong><span>来源、结构与故事线都由人决定。</span></div>
      </aside>

      <div className="research-main">
        {stage === 0 && <div className="research-brief research-panel">
          <div className="research-panel-heading"><Search /><div><h2>先把题目改写成研究任务</h2><p>读者、问题与边界越清楚，后面的搜索越不容易跑偏。</p></div></div>
          <label><span>研究题目</span><input value={topic} onChange={(e) => setTopic(e.target.value)} /></label>
          <label><span>最终给谁看</span><input value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
          <label><span>需要回答的问题 <small>每行一个，建议 3 至 5 个</small></span><textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} rows={5} /></label>
          <div className="research-boundaries"><span>时间范围：最近 24 个月</span><span>地区：全球公开资料</span><span>演示来源：6 个</span></div>
          <button className="research-primary" onClick={createWorkspace} disabled={!topic.trim() || !audience.trim()}>生成搜索计划<ArrowRight /></button>
        </div>}

        {stage === 1 && workspace && <div className="research-panel">
          <div className="research-panel-heading"><Search /><div><h2>确认要进入报告的证据</h2><p>当前为演示来源，不代表实时搜索结果。真实产品应保存原始网址、日期与访问时间。</p></div><span className="research-count">{selectedEvidence} / {workspace.evidence.length} 已选</span></div>
          <div className="evidence-list">{workspace.evidence.map((item, index) => <label key={item.id} className={item.selected ? 'selected' : ''}>
            <input type="checkbox" checked={item.selected} onChange={() => toggleEvidence(item.id)} />
            <span className="evidence-index">[{index + 1}]</span>
            <span className="evidence-copy"><strong>{item.title}</strong><span>{item.note}</span><small>{item.sourceType} · 证据强度 {item.strength} · 演示来源</small></span>
            <span className="evidence-demo-mark">演示</span>
          </label>)}</div>
          <div className="research-footer-actions"><button onClick={() => setStage(0)}><ChevronLeft />修改 Brief</button><button className="research-primary" disabled={selectedEvidence < 3} onClick={() => setStage(2)}>确认来源并生成大纲<ArrowRight /></button></div>
        </div>}

        {stage === 2 && workspace && <div className="research-panel">
          <div className="research-panel-heading"><FileText /><div><h2>调整报告的结论顺序</h2><p>大纲决定读者先看到什么。这里确认后，才进入分章节写作。</p></div></div>
          <ol className="outline-list">{workspace.outline.map((item, index) => <li key={index}><span>{index + 1}</span><input value={item} onChange={(e) => setWorkspace({ ...workspace, outline: workspace.outline.map((entry, i) => i === index ? e.target.value : entry) })} /></li>)}</ol>
          <div className="research-footer-actions"><button onClick={() => setStage(1)}><ChevronLeft />返回证据</button><button className="research-primary" onClick={() => setStage(3)}>确认大纲并生成报告<ArrowRight /></button></div>
        </div>}

        {stage === 3 && workspace && <div className="research-panel report-editor">
          <div className="research-panel-heading"><FileText /><div><h2>逐段核对，再由你定稿</h2><p>示例报告保留 [1] 至 [6] 引用。修改观点不会自动改变来源。</p></div><span className="research-count">{report.length} 字符</span></div>
          <div className="report-grid"><textarea value={report} onChange={(e) => setReport(e.target.value)} /><aside><strong>定稿检查</strong><ul><li><Check />关键判断能回到来源</li><li><Check />低强度证据没有单独支撑结论</li><li><Check />未知项被明确保留</li><li><Check />行动建议可被执行</li></ul></aside></div>
          <div className="research-footer-actions"><button onClick={() => setStage(2)}><ChevronLeft />修改大纲</button><button className="research-primary" onClick={makeSlides}>确认报告并生成 Deck<LayoutPanelTop /></button></div>
        </div>}

        {stage === 4 && slides.length > 0 && <div className="deck-workspace">
          <div className="deck-top"><div><h2>HTML Deck 故事线</h2><p>逐页修改，不重新生成整份报告。</p></div><span>{activeSlide + 1} / {slides.length}</span></div>
          <div className="deck-editor-grid">
            <nav aria-label="幻灯片列表">{slides.map((slide, index) => <button key={slide.id} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)}><span>{index + 1}</span><small>{slide.title}</small></button>)}</nav>
            <div className={`deck-slide deck-${slides[activeSlide].type}`}><span className="deck-label">{topic}</span><h3 contentEditable suppressContentEditableWarning>{slides[activeSlide].title}</h3><p contentEditable suppressContentEditableWarning>{slides[activeSlide].body}</p><span className="deck-page">{String(activeSlide + 1).padStart(2, '0')}</span></div>
            <aside className="deck-controls"><Sparkles /><strong>这一页可以直接编辑</strong><p>点击标题或正文修改。局部调整不会推翻其他页面。</p><button onClick={() => setStage(3)}>返回报告</button></aside>
          </div>
        </div>}
      </div>
    </section>
  );
}

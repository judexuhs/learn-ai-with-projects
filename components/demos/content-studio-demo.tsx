'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookMarked, Check, ChevronRight, FileDiff, LibraryBig, Plus, Save, Settings2, Trash2, WandSparkles } from 'lucide-react';

import { buildContentIdeas, compareDrafts } from '@/lib/demo-workflows.mjs';

type Article = { id: string; title: string; body: string; tags: string[]; demo?: boolean };
type Idea = ReturnType<typeof buildContentIdeas>[number];

const initialArticles: Article[] = [
  { id: 'source-1', title: 'AI 写作真正缺的是证据链', body: '内容团队的问题通常不是生成速度，而是来源、判断与审核责任没有被保存。', tags: ['AI 工作流', '内容团队'], demo: true },
  { id: 'source-2', title: '不要让一次修改变成永久规则', body: '单篇文章的改动可能来自特殊读者和场景，长期偏好应该由用户多次确认。', tags: ['可控记忆', '写作'], demo: true },
];

const storageKey = 'ai-project-lab:content-studio:articles';
const preferenceStorageKey = 'ai-project-lab:content-studio:preferences';

export function ContentStudioDemo() {
  const [tab, setTab] = useState<'library' | 'ideas' | 'write' | 'memory'>('library');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [draft, setDraft] = useState('');
  const [editedDraft, setEditedDraft] = useState('');
  const [preferences, setPreferences] = useState<string[]>(['结论先行，但保留必要条件', '引用观点时回到原始来源']);
  const [comparison, setComparison] = useState<ReturnType<typeof compareDrafts> | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Article[];
        const timer = window.setTimeout(() => setArticles(parsed), 0);
        return () => window.clearTimeout(timer);
      } catch { /* ignore corrupt local demo data */ }
    }
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(preferenceStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        const timer = window.setTimeout(() => setPreferences(parsed), 0);
        return () => window.clearTimeout(timer);
      } catch { /* ignore corrupt local demo data */ }
    }
  }, []);

  function persist(next: Article[]) {
    setArticles(next); window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function addArticle() {
    if (!title.trim() || !body.trim()) return;
    persist([{ id: `article-${Date.now()}`, title: title.trim(), body: body.trim(), tags: ['我的资料'] }, ...articles]);
    setTitle(''); setBody('');
  }

  function generateIdeas() {
    const next = buildContentIdeas(articles); setIdeas(next); setSelectedIdea(next[0]); setTab('ideas');
  }

  function startDraft() {
    if (!selectedIdea) return;
    const next = `# ${selectedIdea.title}\n\n很多人先问 AI 能不能写得更快，但更关键的问题是：这篇内容的判断从哪里来？\n\n先回到资料库。与这个选题直接相关的材料提醒我们，来源、判断和审核责任需要被保留下来。只有这样，生成速度才不会放大错误。\n\n接下来可以做一个小实验：选一篇旧稿，标出其中的事实、观点和个人经验，再让 AI 只帮助整理结构。比较前后版本时，不只看字数，还要看哪些限定条件被删除。\n\n最后由人决定什么值得留下。工具可以积累差异，但长期偏好必须经过确认。`;
    setDraft(next); setEditedDraft(next); setComparison(null); setTab('write');
  }

  function compare() { setComparison(compareDrafts(draft, editedDraft)); }

  function confirmPreferences() {
    if (!comparison) return;
    const next = [...new Set([...preferences, ...comparison.observations])];
    setPreferences(next);
    window.localStorage.setItem(preferenceStorageKey, JSON.stringify(next));
    setComparison({ ...comparison, confirmed: true });
  }

  function removePreference(preference: string) {
    const next = preferences.filter((item) => item !== preference);
    setPreferences(next);
    window.localStorage.setItem(preferenceStorageKey, JSON.stringify(next));
  }

  function clearLibrary() { window.localStorage.removeItem(storageKey); setArticles([]); setIdeas([]); setSelectedIdea(null); }

  const sourceNames = useMemo(() => selectedIdea?.sourceIds.map((id) => articles.find((item) => item.id === id)?.title).filter(Boolean) ?? [], [selectedIdea, articles]);

  return (
    <section className="content-shell">
      <aside className="content-sidebar">
        <div className="content-sidebar-title"><LibraryBig /><strong>我的内容循环</strong></div>
        <nav>{[
          ['library', '资料库', BookMarked], ['ideas', '相邻选题', WandSparkles], ['write', '写作与版本', FileDiff], ['memory', '写作偏好', Settings2],
        ].map(([id, label, Icon]) => <button key={String(id)} className={tab === id ? 'active' : ''} onClick={() => setTab(id as typeof tab)}><Icon /><span>{String(label)}</span>{id === 'library' && <small>{articles.length}</small>}</button>)}</nav>
        <div className="content-local-note"><Save /><p><strong>只保存在当前浏览器</strong><span>文章会写入 localStorage，不会上传。你可以随时清空。</span></p></div>
      </aside>

      <div className="content-main">
        {tab === 'library' && <>
          <header className="content-section-head"><div><h2>资料库</h2><p>粘贴自己的材料，保留来源关系，再生成新的问题。</p></div><button onClick={generateIdeas} disabled={!articles.length}>从资料生成选题<ChevronRight /></button></header>
          <div className="content-library-grid">
            <div className="content-add-source"><div className="content-add-heading"><Plus /><div><strong>保存一篇材料</strong><span>MVP 支持粘贴正文；网址抓取和平台同步暂不开放。</span></div></div><label><span>标题</span><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="这篇材料讲什么？" /></label><label><span>正文</span><textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="粘贴你有权保存和使用的正文……" rows={9} /></label><button onClick={addArticle} disabled={!title.trim() || !body.trim()}>保存到资料库</button></div>
            <div className="content-source-list"><div className="content-list-title"><strong>已保存材料</strong><button onClick={clearLibrary} disabled={!articles.length}><Trash2 />清空本地数据</button></div>{articles.length ? articles.map((article) => <article key={article.id}><div><span>{article.demo ? '演示资料' : '我的资料'}</span><small>{article.body.length} 字符</small></div><h3>{article.title}</h3><p>{article.body}</p><footer>{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</footer></article>) : <div className="content-empty"><BookMarked /><strong>资料库是空的</strong><span>保存第一篇材料后，就能生成有来源的选题。</span></div>}</div>
          </div>
        </>}

        {tab === 'ideas' && <>
          <header className="content-section-head"><div><h2>相邻选题</h2><p>不只改标题，而是生成更深、迁移、反方、交叉和教程五类新问题。</p></div><button onClick={generateIdeas} disabled={!articles.length}>重新生成</button></header>
          {!ideas.length ? <div className="content-empty large"><WandSparkles /><strong>还没有选题</strong><span>先在资料库保存材料，再从来源生成。</span><button onClick={() => setTab('library')}>返回资料库</button></div> : <div className="content-idea-layout"><div className="content-idea-list">{ideas.map((idea) => <button key={idea.id} className={selectedIdea?.id === idea.id ? 'active' : ''} onClick={() => setSelectedIdea(idea)}><span>{idea.kind}</span><strong>{idea.title}</strong><small>{idea.difference}</small></button>)}</div>{selectedIdea && <aside className="content-idea-detail"><span>为什么值得写</span><h3>{selectedIdea.title}</h3><p>{selectedIdea.why}</p><dl><div><dt>与已有内容的区别</dt><dd>{selectedIdea.difference}</dd></div><div><dt>来源</dt><dd>{sourceNames.join('、')}</dd></div></dl><button onClick={startDraft}>选这个题，生成大纲和初稿<ChevronRight /></button></aside>}</div>}
        </>}

        {tab === 'write' && <>
          <header className="content-section-head"><div><h2>写作与版本</h2><p>左边保留 AI 初稿，右边由你修改；差异只在确认后进入偏好档案。</p></div><button onClick={compare} disabled={!draft}>比较两个版本<FileDiff /></button></header>
          {!draft ? <div className="content-empty large"><FileDiff /><strong>还没有写作任务</strong><span>先选择一个有来源关系的选题。</span><button onClick={() => setTab('ideas')}>去选题</button></div> : <><div className="content-diff-grid"><label><span>AI 初稿 · 只读</span><textarea value={draft} readOnly /></label><label><span>我的版本 · 可编辑</span><textarea value={editedDraft} onChange={(e) => { setEditedDraft(e.target.value); setComparison(null); }} /></label></div>{comparison && <div className="content-comparison"><div><FileDiff /><strong>本次差异报告</strong><span>这只是候选偏好，不会自动记住。</span></div><ul>{comparison.observations.map((item) => <li key={item}><Check />{item}</li>)}</ul><button onClick={confirmPreferences} disabled={comparison.confirmed}>{comparison.confirmed ? '已加入偏好档案' : '确认并加入偏好档案'}</button></div>}</>}
        </>}

        {tab === 'memory' && <>
          <header className="content-section-head"><div><h2>写作偏好</h2><p>这里是系统可以复用的规则。每一条都能查看、删除和继续修正。</p></div></header>
          <div className="content-memory"><div className="content-memory-status"><Settings2 /><div><strong>可控记忆已开启</strong><span>只有你确认的差异会出现在这里。</span></div></div><ul>{preferences.map((preference) => <li key={preference}><span>{preference}</span><button aria-label={`删除偏好：${preference}`} onClick={() => removePreference(preference)}><Trash2 /></button></li>)}</ul>{!preferences.length && <div className="content-empty"><strong>暂无写作偏好</strong><span>完成一次版本比较并确认后，规则会出现在这里。</span></div>}</div>
        </>}
      </div>
    </section>
  );
}

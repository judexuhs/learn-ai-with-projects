'use client';

import { useRef, useState } from 'react';
import NextImage from 'next/image';
import { Check, Clipboard, ImageIcon, LoaderCircle, RefreshCw, ShieldCheck, UploadCloud } from 'lucide-react';

import { buildImagePromptResult } from '@/lib/demo-workflows.mjs';

type Analysis = ReturnType<typeof buildImagePromptResult>;

const fields: Array<[keyof Analysis, string]> = [
  ['subject', '主体'], ['composition', '构图'], ['lighting', '光线'], ['color', '色彩'], ['style', '风格'],
];

export function ImagePromptDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [status, setStatus] = useState<'idle' | 'reading' | 'done' | 'error'>('idle');
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  function loadFile(nextFile?: File) {
    if (!nextFile) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(nextFile.type)) {
      setStatus('error'); setNotice('请选择 JPG、PNG 或 WebP 图片。'); return;
    }
    if (nextFile.size > 8 * 1024 * 1024) {
      setStatus('error'); setNotice('图片超过 8MB，请压缩后再上传。'); return;
    }
    const url = URL.createObjectURL(nextFile);
    const img = new Image();
    img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = url;
    setFile(nextFile); setPreview(url); setAnalysis(null); setStatus('idle'); setNotice('');
  }

  async function analyze() {
    if (!file) return;
    setStatus('reading'); setNotice('');
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('无法读取图片')); reader.onerror = reject; reader.readAsDataURL(file);
      });
      const response = await fetch('/api/image-to-prompt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: dataUrl }) });
      if (response.ok) {
        const data = await response.json() as { result: Analysis };
        setAnalysis(data.result); setNotice('已使用服务端视觉模型生成。');
      } else {
        setAnalysis(buildImagePromptResult({ name: file.name, ...dimensions }));
        setNotice('当前未配置服务端模型，已切换到结构化演示结果。');
      }
      setStatus('done');
    } catch {
      setAnalysis(buildImagePromptResult({ name: file.name, ...dimensions }));
      setNotice('网络不可用，已切换到结构化演示结果。'); setStatus('done');
    }
  }

  function update(key: keyof Analysis, value: string) {
    setAnalysis((current) => current ? { ...current, [key]: value } : current);
  }

  async function copyPrompt() {
    if (!analysis) return;
    await navigator.clipboard.writeText(`${analysis.prompt}\n\nNegative prompt: ${analysis.negativePrompt}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="image-workbench">
      <aside className="image-input-panel">
        <div className="panel-heading"><span>输入</span><small>JPG · PNG · WebP · 最大 8MB</small></div>
        {!preview ? <button className="image-drop" onClick={() => inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); loadFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}>
          <UploadCloud /><strong>选择一张图片</strong><span>或拖到这里</span>
        </button> : <div className="image-preview-wrap"><NextImage src={preview} alt="待分析的上传图片" fill unoptimized /><button onClick={() => inputRef.current?.click()}><RefreshCw />更换图片</button></div>}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => loadFile(e.target.files?.[0])} />
        {file && <div className="image-file-meta"><ImageIcon /><div><strong>{file.name}</strong><span>{dimensions.width || '—'} × {dimensions.height || '—'} · {(file.size / 1024 / 1024).toFixed(2)} MB</span></div></div>}
        {status === 'error' && <p className="image-error">{notice}</p>}
        <button className="image-analyze" disabled={!file || status === 'reading'} onClick={analyze}>{status === 'reading' ? <><LoaderCircle className="spin" />模型正在观察图片</> : '生成结构化 Prompt'}</button>
        <div className="image-security"><ShieldCheck /><p><strong>密钥不会进入浏览器</strong><span>真实调用只读取部署平台中的服务端环境变量 `OPENAI_API_KEY`，仓库和前端包都不保存 Key。</span></p></div>
      </aside>
      <div className="image-output-panel">
        <div className="panel-heading"><span>结构化输出</span><small>{analysis ? '字段可以直接修改' : '等待图片'}</small></div>
        {!analysis ? <div className="image-empty"><span><ImageIcon /></span><strong>结果会出现在这里</strong><p>先用固定结构稳定界面，再接真实模型。</p></div> : <div className="image-results">
          {notice && <p className="image-notice">{notice}</p>}
          <div className="image-field-grid">{fields.map(([key, label]) => <label key={key}><span>{label}</span><textarea value={analysis[key]} onChange={(e) => update(key, e.target.value)} /></label>)}</div>
          <label className="image-prompt-field"><span>最终 Prompt</span><textarea value={analysis.prompt} onChange={(e) => update('prompt', e.target.value)} /></label>
          <label className="image-negative-field"><span>Negative Prompt</span><textarea value={analysis.negativePrompt} onChange={(e) => update('negativePrompt', e.target.value)} /></label>
          <button className="image-copy" onClick={copyPrompt}>{copied ? <Check /> : <Clipboard />}{copied ? '已复制' : '复制完整 Prompt'}</button>
        </div>}
      </div>
    </section>
  );
}

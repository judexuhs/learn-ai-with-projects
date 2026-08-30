import type { Metadata } from 'next';

import { DemoFrame } from '@/components/demos/demo-frame';
import { ResearchDeckDemo } from '@/components/demos/research-deck-demo';

export const metadata: Metadata = { title: '研究到 HTML Deck Demo', description: '从研究 Brief、证据和报告走到可编辑的 HTML Deck。' };

export default function ResearchDeckPage() {
  return <DemoFrame current="research-deck" title="研究到报告，再到 HTML Deck" description="让搜索、证据、引用、人工确认和视觉交付成为一条可复查的链。"><ResearchDeckDemo /></DemoFrame>;
}

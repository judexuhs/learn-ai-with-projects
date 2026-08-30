import type { Metadata } from 'next';

import { DemoFrame } from '@/components/demos/demo-frame';
import { ImagePromptDemo } from '@/components/demos/image-prompt-demo';

export const metadata: Metadata = { title: '图片反推 Prompt Demo', description: '上传图片，获得结构化且可编辑的生成 Prompt。' };

export default function ImagePromptPage() {
  return <DemoFrame current="image-prompt" title="图片反推 Prompt" description="把视觉观察拆成稳定字段，再组合成可编辑、可复制的生成指令。"><ImagePromptDemo /></DemoFrame>;
}

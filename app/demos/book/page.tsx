import type { Metadata } from 'next';

import { BookDemo } from '@/components/demos/book-demo';
import { DemoFrame } from '@/components/demos/demo-frame';

export const metadata: Metadata = { title: '答案之书 Demo', description: '输入问题，体验一个完整的四状态网页产品。' };

export default function BookDemoPage() {
  return <DemoFrame current="book" title="答案之书" description="一个问题，一次停顿，一条足够你继续行动的回答。" status="无需 API"><BookDemo /></DemoFrame>;
}

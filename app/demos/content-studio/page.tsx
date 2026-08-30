import type { Metadata } from 'next';

import { ContentStudioDemo } from '@/components/demos/content-studio-demo';
import { DemoFrame } from '@/components/demos/demo-frame';

export const metadata: Metadata = { title: '个人内容工作台 Demo', description: '把内容库、相邻选题、版本差异和可控记忆放在同一条写作流程里。' };

export default function ContentStudioPage() {
  return <DemoFrame current="content-studio" title="个人内容工作台" description="资料留下来源，选题说明差异，写作偏好只在你确认后被记住。" status="浏览器本地保存"><ContentStudioDemo /></DemoFrame>;
}

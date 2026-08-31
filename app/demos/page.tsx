import type { Metadata } from 'next';
import { NativeLink as Link } from '@/components/native-link';
import {
  ArrowRight,
  BookOpenText,
  FileSearch,
  ImageUp,
  LibraryBig,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '四个可运行 Demo',
  description: '从网页交互到个人内容记忆，体验四个完整产品。',
};

const demos = [
  {
    slug: 'book',
    title: '答案之书',
    promise: '把一个想法变成有状态、有反馈的网页。',
    detail: '输入问题，等待片刻，得到一句可继续行动的回答。',
    icon: BookOpenText,
    step: '页面与交互',
  },
  {
    slug: 'image-prompt',
    title: '图片反推 Prompt',
    promise: '把一次视觉模型调用变成可用工具。',
    detail: '上传图片，得到结构化拆解和可编辑 Prompt。',
    icon: ImageUp,
    step: '一次模型调用',
  },
  {
    slug: 'research-deck',
    title: '研究到 HTML Deck',
    promise: '让搜索、证据、引用和人工确认连成工作流。',
    detail: '从研究 Brief 走到报告，再生成可逐页修改的 Deck。',
    icon: FileSearch,
    step: '多阶段工作流',
  },
  {
    slug: 'content-studio',
    title: '个人内容工作台',
    promise: '把资料、选题、版本差异和可控记忆放在一起。',
    detail: '保存材料、生成相邻选题，并由你确认写作偏好。',
    icon: LibraryBig,
    step: '可积累系统',
  },
];

export default function DemosPage() {
  return (
    <main className="demo-index min-h-dvh">
      <header className="demo-index-header">
        <Link href="/" className="demo-index-brand">
          AI 项目实验室
        </Link>
        <Link href="/projects" className="demo-index-guide">
          查看跟做教程
          <ArrowRight />
        </Link>
      </header>
      <section className="demo-index-intro">
        <h1>
          四个产品，
          <br />
          四次复杂度升级。
        </h1>
        <p>
          每个 Demo
          都能独立操作。默认使用演示数据，打开就能走完主流程；需要真实模型时，密钥只从服务端环境变量读取。
        </p>
      </section>
      <section className="demo-index-list" aria-label="Demo 列表">
        {demos.map(
          ({ slug, title, promise, detail, icon: Icon, step }, index) => (
            <Link
              key={slug}
              href={`/demos/${slug}`}
              className={`demo-index-row row-${slug}`}
            >
              <span className="demo-index-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="demo-index-icon">
                <Icon />
              </span>
              <span className="demo-index-copy">
                <span className="demo-index-step">{step}</span>
                <strong>{title}</strong>
                <span>{promise}</span>
                <small>{detail}</small>
              </span>
              <span className="demo-index-open">
                打开产品
                <ArrowRight />
              </span>
            </Link>
          ),
        )}
      </section>
    </main>
  );
}

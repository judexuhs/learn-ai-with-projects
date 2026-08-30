import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://learn-ai-with-projects.judexuhs.workers.dev'),
  icons: { icon: '/favicon.svg' },
  title: {
    default: 'AI 项目实验室',
    template: '%s | AI 项目实验室',
  },
  description: '通过四个由浅入深的项目，学会借助 AI 把想法做成可运行作品。',
  openGraph: {
    title: 'AI 项目实验室',
    description: '跟着做出四个真正能运行的 AI 项目。',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { MetadataRoute } from 'next';

import { topics } from '@/lib/learning-content.mjs';
import { projects } from '@/lib/site-content';

const baseUrl = 'https://learn-ai-with-projects.judexuhs.workers.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/start', '/concepts', '/methods', '/methods/use-ai', '/methods/build-tool', '/methods/build-workflow', '/projects', '/demos'];
  return [
    ...paths.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: 'weekly' as const })),
    ...topics.map((topic) => ({ url: `${baseUrl}/concepts/${topic.slug}`, changeFrequency: 'monthly' as const })),
    ...projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, changeFrequency: 'weekly' as const })),
  ];
}

import { CASE_STUDIES } from '@/content/case-studies';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://coetzeecreative.example'; // replace
  const now = new Date().toISOString();

  const staticRoutes = ['', '/portfolio', '/services', '/about', '/contact'].map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const caseRoutes = CASE_STUDIES.map((c) => ({
    url: `${base}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes];
}

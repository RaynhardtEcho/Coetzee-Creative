// app/sitemap.ts
import { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/content/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.coetzeecreative.co.za';
  const now = new Date();

  const staticPages = [
    '', 'services', 'portfolio', 'contact', 'about', 'privacy', 'terms',
  ].map((p) => ({
    url: `${base}/${p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  const studies = CASE_STUDIES.map((s) => ({
    url: `${base}/portfolio/${s.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...studies];
}

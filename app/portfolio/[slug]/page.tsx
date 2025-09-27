// app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseBySlug } from '@/content/case-studies';
import CaseStudyPage from '@/components/organisms/CaseStudyPage';

type Params = { slug: string };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cs = getCaseBySlug(params.slug);
  if (!cs) return {};
  const title = `${cs.title} — Case Study`;
  const description = cs.seo?.description ?? cs.subtitle;
  const ogImage = cs.seo?.image ?? cs.cover;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'article',
    },
    alternates: { canonical: `/portfolio/${cs.slug}` },
  };
}

export default function Page({ params }: { params: Params }) {
  const cs = getCaseBySlug(params.slug);
  if (!cs) return notFound();

  // JSON-LD for a project/CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: cs.title,
    description: cs.seo?.description ?? cs.subtitle,
    image: cs.cover,
    dateCreated: `${cs.year}-01-01`,
    author: { '@type': 'Organization', name: 'Coetzee Creative' },
    url: `https://your-domain.com/portfolio/${cs.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyPage data={cs} />
    </>
  );
}

// app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseBySlug } from '@/content/case-studies';
import CaseStudyPage from '@/components/organisms/CaseStudyPage';
import { toOgImages, resolveImg } from '@/lib/seo/og';

type Params = { slug: string };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const cs = CASE_STUDIES.find(s => s.slug === params.slug);
  if (!cs) return { title: 'Case study not found' };

  const url = `/portfolio/${cs.slug}`;
  const desc = cs.subtitle || 'Case study by Coetzee Creative';

   const ogImages =
    toOgImages(cs.og?.image, cs.og?.title ?? cs.title) ??
    toOgImages(cs.seo?.image ?? cs.cover, cs.title);

  return {
    title: `${cs.title}`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: cs.title,
      description: desc,
    images: ogImages,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: desc,
      images: ogImages?.map(i => i.url),
    },
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

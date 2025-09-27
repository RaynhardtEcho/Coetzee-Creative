import type { Metadata } from 'next';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { CASE_STUDIES } from '@/content/case-studies';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Selected work — Coetzee Creative',
  description:
    'Sophisticated, reliable websites built to earn trust and move people to action. Each project blends strategy, design clarity, and performance.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const studies = CASE_STUDIES;

  return (
    <>
      <section className="container py-12 md:py-16" aria-labelledby="portfolio-title">
        <h1
          id="portfolio-title"
          className="text-3xl md:text-5xl font-semibold leading-tight text-balance"
        >
          Selected work
        </h1>

        {/* Neutral hairline (matches global .rule-neutral) */}
        <div aria-hidden className="rule-neutral mt-4" />

        <p className="mt-4 text-white/70 max-w-[68ch]">
          Sophisticated, reliable websites built to earn trust and move people to action. Each project blends
          strategy, design clarity, and performance.
        </p>
      </section>

      <PortfolioGrid studies={studies} />

      {/* SEO: ItemList of case studies */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: studies.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `/portfolio/${s.slug}`,
            name: s.title,
          })),
        }}
      />
    </>
  );
}

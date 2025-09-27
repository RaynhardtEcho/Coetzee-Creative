'use client';

import TierCard from '@/components/molecules/TierCard';
import JsonLd from '@/components/seo/JsonLd';
import type { Tier } from '@/types/services';
import type { Route } from 'next';

const TIERS: Tier[] = [
  {
    name: 'Professional Business Site',
    price: 'R8,000',
    bullets: [
      '3–5 pages with mobile responsive design',
      'Contact forms & basic SEO',
      'Professional design & development',
    ],
    timeline: '2 weeks',
    href: '/contact' as Route,
  },
  {
    name: 'Premium Business Site',
    price: 'R12,000',
    bullets: [
      '5–8 pages with advanced UI details',
      'Light animations & galleries',
      'Enhanced functionality & integrations',
    ],
    timeline: '3 weeks',
    href: '/contact' as Route,
    featured: true, // "Most popular" highlight handled in TierCard
  },
  {
    name: 'Sophisticated Custom Site',
    price: 'R18,000',
    bullets: [
      'Includes up to ~20 pages (more scoped separately)',
      'Custom integrations (e-commerce, bookings, APIs)',
      'Advanced motion & interaction design',
      'Performance & accessibility pass',
    ],
    timeline: '4–6 weeks',
    href: '/contact' as Route,
  },
];

export default function PricingTiers() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Website design & build',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website packages',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Professional Business Site',
          priceCurrency: 'ZAR',
          price: 8000,
          url: '/contact',
          description:
            '3–5 pages, responsive, contact forms, basic SEO, professional design & development. Delivery: 2 weeks.',
        },
        {
          '@type': 'Offer',
          name: 'Premium Business Site',
          priceCurrency: 'ZAR',
          price: 12000,
          url: '/contact',
          description:
            '5–8 pages, advanced UI details, light animations/galleries, enhanced functionality & integrations. Delivery: 3 weeks.',
        },
        {
          '@type': 'Offer',
          name: 'Sophisticated Custom Site',
          priceCurrency: 'ZAR',
          price: 18000,
          url: '/contact',
          description:
            'Up to ~20 pages (scoped separately), custom integrations, advanced motion/interaction, performance & accessibility pass. Delivery: 4–6 weeks.',
        },
      ],
    },
  };

  return (
    <section
      id="pricing"
      className="container py-10 md:py-14 scroll-mt-[var(--header-h)]"
      aria-labelledby="pricing-heading"
    >
      {/* A11y heading (kept visually hidden to preserve current layout) */}
      <h2 id="pricing-heading" className="sr-only">
        Website packages
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <TierCard key={t.name} {...t} />
        ))}
      </div>

      {/* Payment + timeline stripe — neutral, consistent with global chrome */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-white/60">
        Standard milestones: <span className="text-white">50% / 30% / 20%</span>
        <span className="mx-2">•</span>
        Typical delivery across tiers: <span className="text-white">~2–6 weeks</span>
        <span className="mx-2">•</span>
        E-commerce available as an add-on
      </div>

      {/* Scope note — clarity over “unlimited” misreads */}
      <p className="mt-3 text-center text-xs text-white/55">
        Page counts are guidelines for estimating. Larger sites or extra features (e.g. member areas, multi-language)
        are scoped and quoted separately.
      </p>

      <JsonLd data={jsonLd} />
    </section>
  );
}

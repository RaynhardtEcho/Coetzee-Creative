'use client';

import { useReveal } from '@/components/ux/useReveal';
import TierCard from '@/components/molecules/TierCard';

type TierName = 'Professional' | 'Premium' | 'Sophisticated';
type TierSlug = 'professional' | 'premium' | 'sophisticated';
type PreviewTier = {
  name: TierName;
  slug: TierSlug;
  price: string;
  features: readonly string[]; // keep readonly here if you like
  timeline: string;
  popular?: boolean;
};

const TIERS: ReadonlyArray<PreviewTier> = [
  {
    name: 'Professional',
    slug: 'professional',
    price: 'R8,000',
    timeline: '≈ 2 wks',
    features: ['Up to 5 pages', 'Mobile responsive', 'Basic on-page SEO', 'Contact form + map', '2 revision rounds'],
  },
  {
    name: 'Premium',
    slug: 'premium',
    price: 'R12,000',
    timeline: '≈ 3 wks',
    popular: true,
    features: ['Up to 10 pages', 'Advanced SEO setup', 'Blog + categories', 'Premium animations', '3 revision rounds'],
  },
  {
    name: 'Sophisticated',
    slug: 'sophisticated',
    price: 'R18,000',
    timeline: '≈ 4–6 wks',
    features: ['Custom scope (≈ 12+)', 'Custom integrations', 'Content migration', 'Performance auditing', 'Priority support'],
  },
];

export default function PricingPreview() {
  useReveal('pricing-scope');

  return (
    <section
      id="pricing-scope"
      className="py-20 md:py-28 bg-white/[0.04] border-y border-white/10"
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <div className="mb-8">
          <h2 id="pricing-title" className="text-2xl md:text-3xl font-semibold">Pricing Preview</h2>
          <div className="rule-neutral mt-3" aria-hidden />
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t) => (
            <TierCard
              key={t.slug}
              name={t.name}
              price={t.price}
              bullets={[...t.features]}      // <-- fix: copy readonly -> mutable
              timeline={t.timeline}
              href="/contact"
              featured={t.popular ?? false}
              variant="preview"
              asLink
            />
          ))}
        </div>
      </div>
    </section>
  );
}

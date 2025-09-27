'use client';

import { useReveal } from '@/components/ux/useReveal';

export default function ServicesHeader() {
  useReveal('services-header');

  return (
    <section
      id="services-header"
      className="container py-16 md:py-20 lg:py-24 scroll-mt-[var(--header-h,6rem)]"
    >
      <div data-reveal className="max-w-[68ch]">
        <h1 className="text-balance text-3xl md:text-5xl font-semibold leading-tight">
          Professional web design packages for South African businesses
        </h1>

        {/* Neutral hairline — uses your global .rule-neutral */}
        <div aria-hidden className="rule-neutral mt-3" />

        <p className="mt-4 text-[color:var(--ui-label)] opacity-90 text-lg leading-relaxed">
          We combine strategy, sophisticated design, and reliable development to deliver websites
          that build trust and drive action. Transparent pricing. Clear timelines. Measurable results.
        </p>
      </div>
    </section>
  );
}

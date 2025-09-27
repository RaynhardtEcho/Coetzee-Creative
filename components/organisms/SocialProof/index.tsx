'use client';

import Script from 'next/script';
import TestimonialCardPremium from '@/components/molecules/TestimonialCard/Premium';
import { useReveal } from '@/components/ux/useReveal';

type Testimonial = { quote: string; author: string; role?: string; org?: string };

export default function SocialProof() {
  useReveal('social-scope');

  const testimonials: readonly Testimonial[] = [
    { quote: "Raynhardt's strategic thinking made the difference.", author: 'Sarah', org: 'INTERIO' },
    { quote: 'Professional work that perfectly captured our vision.', author: 'Pieter Lessing' },
    { quote: 'Understood our needs and delivered on time.', author: 'Boundless Client' },
  ] as const;

  const reviewLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Coetzee Creative',
    review: testimonials.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Person', name: t.author },
      ...(t.org ? { itemReviewed: { '@type': 'Organization', name: t.org } } : {}),
    })),
  };

  return (
    <section id="social-scope" className="container py-20 md:py-28" aria-labelledby="social-title">
      <Script id="ld-social-proof" type="application/ld+json">
        {JSON.stringify(reviewLd)}
      </Script>

      <div className="mb-8 md:mb-10">
        <h2 id="social-title" className="text-2xl md:text-3xl font-semibold" data-reveal>
          Trusted by South African businesses
        </h2>
        <div className="rule-neutral mt-3" aria-hidden data-reveal />
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {testimonials.map((t, i) => (
          <div key={i} data-reveal className="h-full">
            <TestimonialCardPremium
              quote={t.quote}
              author={t.org ? `${t.author}, ${t.org}` : t.author}
              className="h-full"
              style={{ ['--quote-accent' as any]: 'var(--ui-accent)' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

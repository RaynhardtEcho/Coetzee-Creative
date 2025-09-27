import PremiumTestimonial from '@/components/molecules/TestimonialCard/Premium';
import JsonLd from '@/components/seo/JsonLd';

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

const ITEMS: Testimonial[] = [
  { quote: 'From brief to launch felt calm and exact. The site finally matches our brand.', author: 'Pieter Lessing' },
  { quote: 'Clear scope, no fluff, and results we can measure in sales.', author: 'Boundless Apparel' },
  { quote: 'Premium without the gimmicks. The details are what sold me.', author: 'Interio Studio' },
];

export default function TierTestimonials() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ITEMS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: t.quote,
        author: { '@type': 'Person', name: t.author },
      },
    })),
  };

  return (
    <section aria-labelledby="tiers-testimonials" className="py-28">
      <div className="container">
        <header className="mb-10" data-reveal>
          <h2
            id="tiers-testimonials"
            className="text-3xl md:text-4xl font-serif leading-tight text-white text-balance"
          >
            What clients notice
          </h2>
          {/* Neutral underline (no gold) */}
          <div aria-hidden className="rule-neutral mt-4" />
        </header>

        <div className="grid gap-6 md:grid-cols-3 auto-rows-fr">
          {ITEMS.map((t, i) => (
            <div key={`${t.author}-${i}`} className="h-full" data-reveal>
              <PremiumTestimonial
                quote={t.quote}
                author={t.author}
                className="h-full"
                // Neutralize any internal gold accent
                style={{ ['--quote-accent' as any]: 'var(--ui-accent)' }}
              />
            </div>
          ))}
        </div>

        {/* Lightweight SEO enrichment */}
        <JsonLd data={jsonLd} />
      </div>
    </section>
  );
}

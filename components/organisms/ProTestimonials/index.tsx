'use client';
import { useReveal } from '@/components/ux/useReveal';

const T = [
  { quote: 'Strategic thinking that aligned our site to business goals.', author: 'INTERIO Client' },
  { quote: 'Captured our creative vision while improving conversions.', author: 'Pieter Lessing' },
  { quote: 'Delivered a professional site that supports lead generation.', author: 'Boundless Client' },
] as const;

export default function ProTestimonials() {
  useReveal('pro-testimonials');

  return (
    <section id="pro-testimonials" className="container py-12 md:py-16" aria-labelledby="pro-testimonials-title">
      <h2 id="pro-testimonials-title" className="sr-only">Client testimonials</h2>

      {/* stretch rows so all cards can be equal height */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {T.map((t) => (
          <figure
            key={t.author}
            data-reveal
            className="
              h-full flex flex-col rounded-2xl p-6 md:p-7
              border border-white/15 bg-white/[0.03]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
              transition-colors hover:border-white/20 hover:bg-white/[0.05]
              focus-within:ring-2 focus-within:ring-[color:var(--ui-border)]/40
            "
          >
            <div aria-hidden className="text-2xl leading-none mb-2" style={{ color: 'var(--ui-accent)' }}>“</div>

            <blockquote className="text-white/90 leading-relaxed text-balance">
              {t.quote}
            </blockquote>

            {/* push caption to bottom if quote grows */}
            <figcaption className="mt-auto pt-3 text-sm text-white/60">
              — {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

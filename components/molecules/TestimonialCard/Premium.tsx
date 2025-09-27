'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';

type Props = {
  quote: string;
  author: string;
  className?: string;
  /** Optional accent override. Defaults to neutral (no gold). */
  accent?: 'neutral' | 'gold';
  /** Pass-through inline styles (e.g., CSS vars from parent). */
  style?: CSSProperties;
};

/**
 * Premium testimonial card
 * - Uniform height with `h-full`
 * - 20px (p-5) internal padding all around
 * - Large opening quote (accent color is configurable)
 * - Attribution pinned bottom-right
 */
export default function TestimonialCardPremium({
  quote,
  author,
  className,
  accent = 'neutral',
  style,
}: Props) {
  // Accent colors (neutral by default; gold on demand)
  const quoteColor =
    accent === 'gold'
      ? 'var(--color-accent)'
      : 'var(--quote-accent, var(--ui-accent, #8A8A8A))';

  const hairlineMid =
    accent === 'gold' ? 'rgba(212,175,55,0.22)' : 'rgba(198,198,198,0.22)';

  return (
    <figure
      className={clsx(
        'relative h-full rounded-2xl border border-white/10 bg-[#141617]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
        'transition-transform duration-300 will-change-transform hover:-translate-y-[2px]',
        className
      )}
      style={style}
    >
      {/* Consistent 20px padding */}
      <div className="relative h-full p-5">
        {/* Large opening quote (accent) */}
        <span
          aria-hidden="true"
          className="absolute left-5 top-5 leading-none select-none"
          style={{ color: quoteColor }}
        >
          <span className="text-[34px] md:text-[38px] lg:text-[40px]">“</span>
        </span>

        {/* Copy block (extra top/bottom space to avoid overlap) */}
        <blockquote className="pt-9 pb-12">
          <p className="text-white/90 text-lg leading-relaxed">{quote}</p>
        </blockquote>

        {/* Bottom-right attribution */}
        <figcaption className="absolute bottom-5 right-5 text-sm text-white/60">
          — {author}
        </figcaption>
      </div>

      {/* Soft hairline across the top (neutral by default) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0), ${hairlineMid}, rgba(0,0,0,0))`,
        }}
      />
    </figure>
  );
}

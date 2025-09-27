'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Check from '@/components/atoms/Icon/Check';
import type { Tier } from '@/types/services';
import type { UrlObject } from 'url';

function btnLabel(name: string) {
  if (name.includes('Professional')) return 'Choose Professional';
  if (name.includes('Premium')) return 'Choose Premium';
  return 'Choose Sophisticated';
}

type Extras = {
  /** Optional visual variant hook if you need it later */
  variant?: 'preview' | 'full';
  /** If true, let the whole card lift as a link-ish card (CTA remains primary action) */
  asLink?: boolean;
};

export default function TierCard({
  name,
  price,
  bullets,
  timeline,
  href = '/contact',
  featured,
  variant = 'full',
}: Tier & Extras) {
  const prefersReduced = useReducedMotion();
  const [focusWithin, setFocusWithin] = useState(false);

  const contactHref: UrlObject = { pathname: href, query: { tier: name, price } };

  // Hover lift only when motion allowed
  const hoverProps = prefersReduced ? {} : ({ whileHover: { y: -8 } as const });

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      // Focus-within lift via animate (no whileFocusWithin in FM)
      animate={!prefersReduced && focusWithin ? { y: -8 } : { y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!e.currentTarget.contains(next)) setFocusWithin(false);
      }}
      className={[
        'group relative h-full rounded-3xl p-6 flex flex-col',
        'border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        'transition-[transform,box-shadow,border-color] duration-300 will-change-transform',
        'focus-within:border-white/20',
        featured ? 'ring-1 ring-white/15' : '',
      ].join(' ')}
      {...hoverProps}
    >
      {featured && (
        <div className="absolute -top-3 right-6 rounded-full bg-[#D4AF37] px-2.5 py-1 text-xs font-semibold text-black shadow-[0_6px_18px_rgba(212,175,55,.28)] float-slow">
          Most popular
        </div>
      )}

      <h3 className="text-lg md:text-xl font-semibold text-white/95">{name}</h3>

      <div
        className="mt-1.5 text-3xl md:text-4xl font-bold transition-colors duration-300"
        style={{ color: 'var(--color-accent)' }}
      >
        {price}
      </div>

      <ul className="mt-4 grid gap-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/85">
            <span aria-hidden className="mt-[3px] transition-transform duration-300 group-hover:translate-x-[1px]">
              <Check className="h-[18px] w-[18px]" style={{ color: 'var(--ui-process)' }} />
            </span>
            <span className="text-sm leading-6 transition-colors duration-300 group-hover:text-white">
              {b}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-white/60">
        Delivery timeline: <span className="text-white">{timeline}</span>
      </div>

      {/* Pinned CTA so all cards align */}
      <div className="mt-auto pt-5">
        <Link href={contactHref} aria-label={`Start ${name}`}>
          <Button as="span" className="min-w-44">
            {btnLabel(name)}
          </Button>
        </Link>
      </div>

      {/* Shine sweep (respects reduced motion) */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
          <div
            className="
              absolute inset-y-0 -left-1 w-1/3 -skew-x-12
              translate-x-[-130%] group-hover:translate-x-[220%]
              transition-transform duration-[900ms] ease-out
              opacity-0 group-hover:opacity-100
            "
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.22) 45%, rgba(255,255,255,0) 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      )}

      {/* Hover chrome brighten */}
      <style jsx>{`
        .group:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 10px 28px rgba(0, 0, 0, 0.45);
        }
      `}</style>
    </motion.article>
  );
}

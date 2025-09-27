'use client';

import { useReveal } from '@/components/ux/useReveal';

export default function PortfolioHeader() {
  useReveal('portfolio-header');

  return (
    <section id="portfolio-header" className="container py-16 md:py-20">
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight" data-reveal>
        Selected work
      </h1>
      <div className="mt-3 h-[2px] w-24 bg-white/40" aria-hidden="true" data-reveal />
      <p className="mt-4 text-white/70 max-w-3xl" data-reveal>
        Sophisticated, reliable websites built to earn trust and move people to action.
        Each project blends strategy, design clarity, and performance.
      </p>
    </section>
  );
}

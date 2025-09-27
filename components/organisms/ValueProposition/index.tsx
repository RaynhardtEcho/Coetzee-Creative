// components/sections/ValueProposition.tsx
'use client';

import { useReveal } from '@/components/ux/useReveal';

export default function ValueProposition() {
  useReveal('value-scope');

  return (
    <section id="value-scope" aria-labelledby="value-heading" className="py-28">
      <div className="container">
        <header className="mb-10" data-reveal>
          <h2
            id="value-heading"
            className="text-3xl md:text-4xl font-heading font-semibold leading-tight text-white text-balance md:max-w-[28ch]"
          >
            Sites that look premium. Systems that behave like partners.
          </h2>
          <div aria-hidden className="rule-neutral mt-5" />
        </header>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm md:text-base leading-7 text-[var(--ui-label)]">
          {[
            {
              title: 'Clarity → Conversion',
              copy:
                'Information hierarchy, 60–68ch line length, and neutral palette keep attention on action.',
            },
            {
              title: 'Performance that holds',
              copy:
                'Static hero fallback for LCP, reduced-motion disables heavy layers, no nested anchors.',
            },
            {
              title: 'Care without chaos',
              copy:
                'Care plans that cover updates, minor content changes, and small SEO lifts—clearly scoped.',
            },
          ].map(({ title, copy }) => (
            <li
              key={title}
              data-reveal
              className="
                rounded-2xl border border-white/10 bg-white/[0.03]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                p-6 md:p-7 transition-colors
                hover:border-white/20 hover:bg-white/[0.05]
              "
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

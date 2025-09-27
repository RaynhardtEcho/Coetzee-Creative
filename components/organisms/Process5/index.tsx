'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { title: 'Discovery',    points: ['Business goals & target market', 'Competitor research', 'Positioning strategy'] },
  { title: 'Strategy',     points: ['Conversion optimization plan', 'UX architecture', 'Technical requirements'] },
  { title: 'Design',       points: ['Brand-aligned visuals', 'Professional aesthetic', 'Mobile-first planning'] },
  { title: 'Development',  points: ['Performance-focused build', 'SEO implementation', 'QA testing'] },
  { title: 'Launch',       points: ['Training & handover', 'Ongoing support', 'Performance monitoring'] },
] as const;

export default function Process5() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: (i % 5) * 0.06,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="container py-14 md:py-20" aria-labelledby="process-title">
      <header className="mb-8">
        <h2 id="process-title" className="text-2xl md:text-3xl font-semibold">
          How we work
        </h2>
        <div aria-hidden className="rule-neutral mt-4" />
      </header>

      <ol className="grid md:grid-cols-5 gap-6">
        {STEPS.map((s, idx) => (
          <li
            key={s.title}
            data-step
            className="
              h-full rounded-2xl border border-white/15 bg-white/[0.03]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
              p-6 md:p-7 transition-[transform,background,border-color]
              hover:border-white/20 hover:bg-white/[0.05]
              motion-safe:hover:-translate-y-1 will-change-transform
              focus-within:outline-none focus-within:ring-2 focus-within:ring-[color:var(--ui-border)]/40
            "
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                aria-hidden
                className="
                  size-7 grid place-items-center rounded-full
                  border border-[color:var(--ui-border)] bg-white/[0.06]
                  text-white/90 text-xs font-bold
                "
              >
                {idx + 1}
              </span>
              <span className="sr-only">Step {idx + 1}:</span>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            </div>

            <ul className="text-sm text-white/80 space-y-2 list-disc list-inside">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

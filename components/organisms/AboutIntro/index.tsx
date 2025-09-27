'use client';

import { useReveal } from '@/components/ux/useReveal';

export default function AboutIntro() {
  useReveal('about-intro');

  return (
    <section
      id="about-intro"
      aria-labelledby="about-intro-title"
      className="container py-16 md:py-20"
    >
      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Copy */}
        <div className="md:col-span-7 space-y-4" data-reveal>
          <h2 id="about-intro-title" className="text-balance text-2xl md:text-3xl font-semibold">
            About Coetzee Creative
          </h2>
          <div aria-hidden className="rule-neutral mt-3" />

          <p className="text-white/80 max-w-[68ch]">
            <span className="font-semibold">Raynhardt Coetzee</span> combines strategic business
            thinking with advanced web development. Every project is approached as a growth
            lever—prioritizing conversion, credibility, and clear user journeys.
          </p>
          <p className="text-white/70 max-w-[68ch]">
            Our work is anchored in business outcomes: stronger lead generation, higher engagement,
            and clear returns. We design for humans, build for performance, and align every
            decision with measurable results.
          </p>
          <p className="text-white/70 max-w-[68ch]">
            <span className="font-semibold">Based in Bloemfontein, serving nationally</span> — we
            partner with teams across South Africa to create sophisticated, trustworthy digital
            experiences.
          </p>
        </div>

        {/* Expertise card (neutral chrome) */}
        <div className="md:col-span-5" data-reveal>
          <div
            className="
              rounded-2xl border border-white/10 bg-white/[0.03]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
              p-6 md:p-7 transition-colors hover:border-white/20 hover:bg-white/[0.05]
              focus-within:ring-2 focus-within:ring-[color:var(--ui-border)]/40
            "
          >
            <h3 className="text-lg font-semibold text-white mb-2">Expertise</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-white/80 marker:text-white/30">
              <li>Conversion strategy & UX architecture</li>
              <li>Advanced React/Next.js development</li>
              <li>Performance optimization & SEO foundations</li>
              <li>GSAP/Framer Motion micro-interactions</li>
              <li>E-commerce & booking integrations</li>
              <li>Brand-aligned design systems</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useReveal } from '@/components/ux/useReveal';
import Check from '@/components/atoms/Icon/Check';

export default function Guarantees() {
  useReveal('guarantees');

  return (
    <section
      id="guarantees"
      className="py-14 md:py-20 bg-white/[0.04] border-y border-white/10"
      aria-labelledby="guarantees-title"
    >
      <div className="container grid md:grid-cols-2 gap-10 items-start">
        {/* Copy column */}
        <div>
          <h2 id="guarantees-title" className="text-2xl md:text-3xl font-semibold" data-reveal>
            Quality Guarantee & Support
          </h2>
          {/* Neutral tapered rule */}
          <div className="rule-neutral mt-3" aria-hidden data-reveal />

          <ul className="mt-4 space-y-3 text-white/85" role="list" data-reveal>
            {[
              'Work delivered to a professional standard of performance, accessibility, and polish.',
              'Structured revision policy focused on clarity and outcomes.',
              'Ongoing support commitment via care plans that match your needs.',
            ].map((text) => (
              <li key={text} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[3px]">
                  <Check className="h-[18px] w-[18px]" style={{ color: 'var(--ui-process, #6B7280)' }} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card column */}
        <div data-reveal>
          <div
            className="
              rounded-3xl border border-white/15 bg-white/[0.03] p-6 md:p-8 text-center
              shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
            "
          >
            <h3 className="text-xl font-semibold">Serving businesses from Bloemfontein to Cape Town</h3>
            <p className="text-white/70 mt-2">
              Nationwide collaboration with clear communication and professional delivery.
            </p>

            {/* Neutral decorative block — no gold */}
            <div
              className="mt-6 h-40 rounded-xl border border-white/10"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(80% 60% at 60% 40%, rgba(220,220,220,0.10) 0%, rgba(220,220,220,0.04) 50%, rgba(220,220,220,0) 85%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

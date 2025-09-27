'use client';

import Link from 'next/link';
import type { UrlObject } from 'url';
import Button from '@/components/atoms/Button';
import { useReveal } from '@/components/ux/useReveal';

function track(name: string, props?: Record<string, any>) {
  try { (window as any)?.dataLayer?.push({ event: name, ...props }); } catch {}
}

export default function AboutCTA() {
  useReveal('about-cta');

  const projectHref: UrlObject = { pathname: '/contact', query: { source: 'about-cta', intent: 'project' } };
  const consultHref: UrlObject = { pathname: '/contact', query: { source: 'about-cta', intent: 'consult' } };

  return (
    <section id="about-cta" className="container py-16 md:py-24" aria-labelledby="about-cta-title">
      <div
        className="
          relative rounded-3xl border border-white/15 bg-white/[0.03]
          p-8 md:p-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
        "
        data-reveal
      >
        <h2 id="about-cta-title" className="text-2xl md:text-3xl font-semibold">Ready to start a conversation?</h2>
        <p id="about-cta-desc" className="text-white/70 mt-2">Tell us about your goals—we’ll recommend the right path.</p>

        {/* Gold tapered CTA rule */}
        <div className="rule-cta mx-auto mt-6" aria-hidden />

        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href={projectHref}
            aria-label="Start your project"
            onClick={() => track('cta_click', { loc: 'about', id: 'start_project' })}
          >
            <Button as="span" size="lg" variant="solid" className="min-w-44">
              Start a Project
            </Button>
          </Link>

          <Link
            href={consultHref}
            aria-label="Schedule a consultation"
            onClick={() => track('cta_click', { loc: 'about', id: 'consultation' })}
          >
            <Button as="span" size="lg" variant="outline" tone="neutral" className="min-w-44">
              Schedule Consultation
            </Button>
          </Link>
        </div>

        <p className="text-xs text-white/50 mt-4">
          We respond promptly with next steps and a clear path forward.
        </p>
      </div>
    </section>
  );
}

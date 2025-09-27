'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { UrlObject } from 'url';
import Button from '@/components/atoms/Button';

type Href = Route | UrlObject;

type CTAButton = {
  href: Href;
  label: string;
  ariaLabel?: string;
};

type FinalCTAProps = {
  variant?: 'final' | 'inline';
  heading?: string;
  sub?: string;
  primary?: CTAButton;
  secondary?: CTAButton | null;
  analytics?: { loc?: string; id?: string };
};

function trackEvent(name: string, props?: Record<string, any>) {
  try { (window as any)?.dataLayer?.push({ event: name, ...props }); } catch {}
}

export default function FinalCTA({
  variant = 'final',
  heading = 'Ready to discuss your project?',
  sub = 'Let’s map a path to measurable results.',
  // Use UrlObject when you need query params
  primary = { href: { pathname: '/contact', query: { source: 'final-cta' } }, label: 'Start a Project' },
  secondary = null,
  analytics = { loc: 'final', id: 'start_project' },
}: FinalCTAProps) {
  const isFinal = variant === 'final';

  return (
    <section
      id="cta-scope"
      role="region"
      aria-labelledby="final-cta-title"
      className={`container ${isFinal ? 'py-28 md:py-36' : 'py-16 md:py-20'}`}
    >
      <div
        className={[
          'relative mx-auto overflow-hidden rounded-3xl border text-center',
          isFinal
            ? 'max-w-[960px] border-white/30 bg-white/[0.04] p-10 md:p-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
            : 'max-w-[980px] border-white/10 bg-white/[0.03] p-8 md:p-12',
        ].join(' ')}
      >
        <h2
          id="final-cta-title"
          className={isFinal ? 'text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white'
                             : 'text-2xl md:text-3xl font-semibold text-white'}
        >
          {heading}
        </h2>

        {sub && <p id="final-cta-desc" className="mt-3 text-white/80">{sub}</p>}

        {/* Gold hairline = same geometry as rule-neutral, gold palette */}
        <div aria-hidden className={`rule-cta ${isFinal ? 'mt-6' : 'mt-4'} mx-auto`} />

        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href={primary.href}
            aria-describedby="final-cta-desc"
            aria-label={primary.ariaLabel ?? primary.label}
            className="inline-block"
            onClick={() => trackEvent('cta_click', { loc: analytics?.loc, id: analytics?.id })}
          >
            <Button as="span" variant="solid" tone="gold" size="lg" className="min-w-44">
              {primary.label}
            </Button>
          </Link>

          {secondary && (
            <Link
              href={secondary.href}
              aria-label={secondary.ariaLabel ?? secondary.label}
              className="inline-block"
              onClick={() =>
                trackEvent('cta_click', { loc: analytics?.loc, id: `${analytics?.id}_secondary` })
              }
            >
              <Button as="span" variant="outline" tone="neutral" size="lg" className="min-w-44">
                {secondary.label}
              </Button>
            </Link>
          )}
        </div>

        {isFinal && (
          <div
            className="pointer-events-none absolute -top-1/3 -right-[18%] h-[420px] w-[720px]"
            style={{
              background:
                'radial-gradient(500px 260px at 70% 30%, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.05) 45%, rgba(212,175,55,0.02) 62%, transparent 65%)',
              filter: 'blur(12px)',
            }}
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}

// components/organisms/CaseStudyPage.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import FinalCTA from '@/components/organisms/FinalCTA';
import type { CaseStudy, ResultStat } from '@/content/case-studies';
import { useState } from 'react';

/* --------- SafeImage (handles missing/failed src) --------- */
function SafeImage({
  src,
  alt,
  priority,
  className,
  sizes = '100vw',
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [errored, setErrored] = useState(false);

  const fallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="rgb(24,24,24)"/>
            <stop offset="1" stop-color="rgb(12,12,12)"/>
          </linearGradient>
          <radialGradient id="r" cx="70%" cy="30%" r="60%">
            <stop offset="0" stop-color="rgba(212,175,55,0.12)"/>
            <stop offset="1" stop-color="rgba(212,175,55,0)"/>
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#g)"/>
        <ellipse cx="1120" cy="260" rx="580" ry="320" fill="url(#r)"/>
      </svg>`
    );

  const safeSrc = !src || errored ? fallback : src;

  return (
    <Image
      src={safeSrc}
      alt={alt ?? ''}
      fill
      sizes={sizes}
      className={className ?? 'object-cover'}
      priority={priority}
      onError={() => setErrored(true)}
    />
  );
}

/* =======================
   Case Study Page (strict-safe)
======================= */
export default function CaseStudyPage({ data }: { data: CaseStudy }) {
  // --------- Safe derivations for optional fields ---------
  const liveHref = data.liveUrl ?? data.websiteUrl;
  const approach: readonly string[] = data.approach ?? [];
  const hasApproach = approach.length > 0;

  const hasProblem =
    typeof data.problem === 'string' && data.problem.trim().length > 0;

  const gallery: readonly string[] = data.gallery ?? [];
  const hasGallery = gallery.length > 0;

  const results: readonly ResultStat[] = data.results ?? [];
  const hasResults = results.length > 0;

  const hasTestimonial =
    !!data.testimonial &&
    typeof data.testimonial.quote === 'string' &&
    data.testimonial.quote.trim().length > 0;

  return (
    <article>
      {/* ============= HERO ============= */}
      <section className="relative isolate" aria-labelledby="cs-hero-title">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <SafeImage
            src={data.cover}
            alt={`${data.title} cover`}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="container -mt-24 md:-mt-32 relative z-10">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-6 md:p-10">
            <div className="text-xs text-white/60">
              {data.year} <span className="mx-1">•</span> {data.industry}
            </div>

            <h1
              id="cs-hero-title"
              className="mt-1 text-3xl md:text-5xl font-semibold tracking-tight text-balance"
            >
              {data.title}
            </h1>

            {/* neutral hairline under the title for consistency */}
            <div aria-hidden className="rule-neutral mt-3" />

            <p className="mt-3 text-white/75 max-w-[68ch]">{data.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80"
                >
                  {s}
                </span>
              ))}
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                Duration: {data.duration}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                Client: {data.client}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {liveHref && (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label="Visit live site"
                >
                  {/* Primary = gold */}
                  <Button as="span" size="lg" variant="solid">
                    Visit live site
                  </Button>
                </a>
              )}

              {/* Secondary = neutral outline */}
              <Link href="/contact" className="inline-block" aria-label="Start a Project">
                <Button as="span" size="lg" variant="outline">
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============= OVERVIEW (quick facts) ============= */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { label: 'Client', val: data.client },
            { label: 'Industry', val: data.industry },
            { label: 'Duration', val: data.duration },
            { label: 'Year', val: data.year },
          ].map(({ label, val }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-xs text-white/60">{label}</div>
              <div className="mt-1 text-white">{val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============= PROBLEM / APPROACH (guarded) ============= */}
      {(hasProblem || hasApproach) && (
        <section className="container py-8 md:py-10">
          <div className={`grid gap-10 ${hasProblem && hasApproach ? 'md:grid-cols-2' : ''}`}>
            {hasProblem && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">The challenge</h2>
                <div aria-hidden className="rule-neutral mt-3" />
                <p className="mt-3 text-white/75 leading-relaxed">{data.problem}</p>
              </div>
            )}

            {hasApproach && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">Our approach</h2>
                <div aria-hidden className="rule-neutral mt-3" />
                <ul className="mt-3 space-y-2 text-white/80 leading-relaxed">
                  {approach.map((a: string, i: number) => (
                    <li key={`${a}-${i}`} className="flex gap-2">
                      <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-white/40" aria-hidden />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============= RESULTS (guarded) ============= */}
      {hasResults && (
        <section className="container py-10 md:py-14" aria-labelledby="results-heading">
          <header className="mb-5">
            <h2 id="results-heading" className="text-xl md:text-2xl font-semibold">
              Outcomes
            </h2>
            <div aria-hidden className="rule-neutral mt-3" />
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {results.map((r: ResultStat) => (
              <div
                key={r.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-2xl font-semibold text-white">{r.value}</div>
                <div className="text-white/70">{r.label}</div>
                {r.note && <div className="mt-1 text-xs text-white/50">{r.note}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============= GALLERY (guarded) ============= */}
      {hasGallery && (
        <section className="container py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((src: string, idx: number) => (
              <div
                key={`${src}-${idx}`}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============= TESTIMONIAL (guarded) ============= */}
      {hasTestimonial && (
        <section className="container py-10 md:py-14" aria-labelledby="testimonial-heading">
          <header className="mb-4">
            <h2 id="testimonial-heading" className="text-xl md:text-2xl font-semibold">
              Client feedback
            </h2>
            <div aria-hidden className="rule-neutral mt-3" />
          </header>

          <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <blockquote className="text-lg text-white/90 leading-relaxed">
              “{data.testimonial?.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-white/60">— {data.testimonial?.author}</figcaption>
          </figure>
        </section>
      )}

      {/* ============= CTA ============= */}
      <FinalCTA />
    </article>
  );
}

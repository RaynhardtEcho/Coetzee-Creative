'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Route } from 'next';
import { useReveal } from '@/components/ux/useReveal';

export type Project = {
  title: string;
  blurb: string;
  year: number;
  tags: readonly string[];
  href: Route;
  image?: string; // optional so we can fall back cleanly
};

const TAG_ORDER = ['Website', 'Brand', 'Motion', 'E-commerce', 'Booking'] as const;

// dark, soft-gradient inline SVG as a data-URL (no file needed)
const FALLBACK_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(24,24,24,1)"/>
          <stop offset="1" stop-color="rgba(10,10,10,1)"/>
        </linearGradient>
        <radialGradient id="r" cx="70%" cy="30%" r="60%">
          <stop offset="0" stop-color="rgba(212,175,55,0.12)"/>
          <stop offset="1" stop-color="rgba(212,175,55,0)"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#g)"/>
      <ellipse cx="820" cy="220" rx="480" ry="280" fill="url(#r)"/>
    </svg>`
  );

// Small helper to make <Image> fail-safe
function CoverImage({
  src,
  priority,
}: {
  src?: string;
  priority?: boolean;
}) {
  const [err, setErr] = useState(false);
  const safeSrc = !src || err ? FALLBACK_SRC : src;

  return (
    <>
      <Image
        src={safeSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] will-change-transform"
        onError={() => setErr(true)}
        priority={priority}
      />
      {/* softened bottom vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
    </>
  );
}

export default function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  useReveal('portfolio-grid');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => set.add(t)));
    return [
      'All',
      ...TAG_ORDER.filter(t => set.has(t)),
      ...[...set].filter(t => !TAG_ORDER.includes(t as any)),
    ];
  }, [projects]);

  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.tags.includes(active));

  return (
    <section id="portfolio-grid" className="container pb-20 md:pb-28" aria-labelledby="portfolio-title">
      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by tag">
        {allTags.map(tag => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                'px-3 py-1.5 rounded-full text-sm border transition-colors',
                isActive
                  ? 'border-white/25 bg-white/[0.06] text-white'
                  : 'border-white/10 text-white/70 hover:text-white hover:border-white/25',
              ].join(' ')}
              onClick={() => setActive(tag)}
            >
              {tag}
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">
          {filtered.length} project{filtered.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, i) => (
          <article
            key={p.title}
            data-reveal
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121314] hover:border-white/20 will-change-transform transition-transform hover:-translate-y-[2px]"
          >
            <Link href={p.href} aria-label={`Open case study: ${p.title}`} className="block focus-visible:outline-none">
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
                <CoverImage src={p.image} priority={i < 2} />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>{p.year}</span>
                  <span aria-hidden>•</span>
                  <span className="truncate">{p.tags.join(' · ')}</span>
                </div>

                <h3 className="mt-1 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-white/70 line-clamp-2">{p.blurb}</p>

                {/* subtle affordance, neutral color (gold discipline) */}
                <span className="mt-3 inline-flex items-center gap-2 text-sm text-white/85 group-hover:text-white transition-colors">
                  View case study
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

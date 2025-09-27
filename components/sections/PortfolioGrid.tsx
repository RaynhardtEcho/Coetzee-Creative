'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type StudyLike = {
  slug: string;
  title: string;
  year: number;
  cover: string | { src: string; alt?: string };
  summary?: string;
  categories?: readonly string[];
  services?: readonly string[];
  tags?: readonly string[];
};

type Props = { studies: ReadonlyArray<StudyLike> };

const normalizeTag = (s: string) => s?.trim().toLowerCase();

/* Collect all tags from categories + services + tags */
function getAllTags(s: StudyLike): string[] {
  return [
    ...(s.categories ?? []),
    ...(s.services ?? []),
    ...(s.tags ?? []),
  ];
}

/** Unique, normalized tag counts across all tag sources */
function buildTagCounts(studies: ReadonlyArray<StudyLike>) {
  const map = new Map<string, number>();
  for (const s of studies) {
    const raw = getAllTags(s).map(normalizeTag).filter(Boolean) as string[];
    for (const t of new Set(raw)) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export function PortfolioGrid({ studies }: Props) {
  const [active, setActive] = useState<string>('');           // normalized tag or ''
  const [sort, setSort] = useState<'recent' | 'az'>('recent');

  const tagCounts = useMemo(() => buildTagCounts(studies), [studies]);

  const filtered = useMemo(() => {
    let list = studies.filter((s) => {
      if (!active) return true;
      const tags = getAllTags(s).map(normalizeTag);
      return tags.includes(active);
    });
    list =
      sort === 'recent'
        ? [...list].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
        : [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [studies, active, sort]);

  return (
    <section className="container pb-20">
      {/* Filters */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActive('')}
          className={[
            'px-3 py-1.5 rounded-full text-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            active === ''
              ? 'bg-white/10 text-white'
              : 'bg-white/[0.06] text-white/80 hover:text-white',
          ].join(' ')}
          aria-pressed={active === ''}
        >
          All · {studies.length}
        </button>

        {tagCounts.map(([tag, count]) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag === active ? '' : tag)}
            className={[
              'px-3 py-1.5 rounded-full text-sm capitalize transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              active === tag
                ? 'bg-white/10 text-white'
                : 'bg-white/[0.06] text-white/80 hover:text-white',
            ].join(' ')}
            aria-pressed={active === tag}
          >
            {tag} · {count}
          </button>
        ))}

        {/* Sort controls */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSort('recent')}
            className={[
              'px-3 py-1.5 rounded-full text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              sort === 'recent'
                ? 'bg-white/10 text-white'
                : 'bg-white/[0.06] text-white/80 hover:text-white',
            ].join(' ')}
            aria-pressed={sort === 'recent'}
          >
            Recent
          </button>
          <button
            type="button"
            onClick={() => setSort('az')}
            className={[
              'px-3 py-1.5 rounded-full text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              sort === 'az'
                ? 'bg-white/10 text-white'
                : 'bg-white/[0.06] text-white/80 hover:text-white',
            ].join(' ')}
            aria-pressed={sort === 'az'}
          >
            A–Z
          </button>
        </div>
      </div>

      {/* Live count */}
      <div className="mb-6 text-sm text-white/60" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        {active && (
          <>
            {' '}in <span className="text-white">{active}</span>
          </>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
          No projects match that filter.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => {
            const src = typeof s.cover === 'string' ? s.cover : s.cover?.src;
            const alt = typeof s.cover === 'string' ? s.title : s.cover?.alt || s.title;

            // display up to 3 tags (prefer categories, then services, then tags)
            const displayTags =
              (s.categories?.length ? s.categories : s.services?.length ? s.services : s.tags) ?? [];

            return (
              <article
                key={s.slug}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
                           transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <Link
                  href={`/portfolio/${s.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-black/40">
                    {src ? (
                      <img
                        src={src}
                        alt={alt}
                        className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-white/50">
                      {s.year} <span className="mx-1">•</span>
                      {displayTags.slice(0, 3).join(' • ')}
                    </div>

                    <h3 className="mt-1 text-xl font-semibold text-white">{s.title}</h3>
                    {s.summary && <p className="mt-1 text-white/70">{s.summary}</p>}

                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/80">
                      View case study
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PortfolioGrid;

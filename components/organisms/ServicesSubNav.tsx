'use client';

import { useEffect, useMemo, useState } from 'react';

type Item = { id: string; label: string };

const ITEMS: readonly Item[] = [
  { id: 'packages', label: 'Packages' },
  { id: 'care',     label: 'Care Plans' },
  { id: 'included', label: 'What’s Included' },
  { id: 'roi',      label: 'ROI' },
  { id: 'contact',  label: 'Contact' },
] as const;

export default function ServicesSubNav() {
  const [active, setActive] = useState<string>('packages');
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const sections = ITEMS.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const headerPx = getHeaderPx();
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const topmost =
          visible[0] ??
          [...entries].sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topmost?.target?.id) setActive(topmost.target.id);
      },
      {
        // Keep the trigger line just under the sticky header
        root: null,
        rootMargin: `${-Math.round(headerPx + 8)}px 0px -45% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start', inline: 'nearest' });
  };

  const items = useMemo(() => ITEMS, []);

  return (
    <div
      className={[
        'sticky top-[var(--header-h)] z-40',
        'border-y border-white/10',
        'backdrop-blur-md bg-black/50',
      ].join(' ')}
      aria-label="Section navigation"
    >
      <nav className="container">
        <ul className="flex gap-2 sm:gap-3 overflow-x-auto py-2 md:py-3 mask-fade">
          {items.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  onClick={onJump(id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm',
                    'transition-colors duration-200 border',
                    isActive
                      ? 'bg-white/[0.08] text-white border-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/[0.06] border-white/10',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6C6C6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                  ].join(' ')}
                >
                  <span>{label}</span>
                  <span
                    aria-hidden
                    className={[
                      'block h-[2px] w-0 transition-all duration-300',
                      isActive ? 'w-4 bg-[rgba(198,198,198,0.9)]' : 'w-0 bg-transparent',
                    ].join(' ')}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/* ---- helpers ---- */

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefers(!!mq?.matches);
    onChange();
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, []);
  return prefers;
}

function getHeaderPx() {
  const doc = document.documentElement;
  const raw = getComputedStyle(doc).getPropertyValue('--header-h').trim();
  if (!raw) return 0;
  if (raw.endsWith('px')) return parseFloat(raw) || 0;
  if (raw.endsWith('rem')) {
    const fs = parseFloat(getComputedStyle(doc).fontSize) || 16;
    return (parseFloat(raw) || 0) * fs;
  }
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

'use client';

import { useEffect, useId, useState, useMemo } from 'react';

type CellValue = boolean | 'na' | string;
type Row = { feature: string; pro: CellValue; prem: CellValue; soph: CellValue };

const ROWS: Row[] = [
  { feature: 'Pages included',    pro: 'Up to 5',      prem: 'Up to 10',                         soph: 'Up to ~20 (more scoped separately)' },
  { feature: 'Responsive design', pro: true,           prem: true,                                soph: true },
  { feature: 'On-page SEO',       pro: 'Basic',        prem: 'Enhanced',                          soph: 'Advanced (tech + on-page)' },
  { feature: 'Contact forms',     pro: true,           prem: true,                                soph: true },
  { feature: 'Blog / categories', pro: false,          prem: true,                                soph: true },
  { feature: 'Integrations',      pro: 'Standard',     prem: 'Expanded',                          soph: 'Custom (e-commerce / bookings / APIs)' },
  { feature: 'Animations',        pro: 'Light',        prem: 'Premium',                           soph: 'Advanced motion' },
  { feature: 'Revisions',         pro: '2 rounds',     prem: '3 rounds',                          soph: 'Flexible within scope' },
  { feature: 'Timeline',          pro: '≈ 2 wks',      prem: '≈ 3 wks',                           soph: '≈ 4–6 wks' },
  { feature: 'Payment',           pro: '50 / 50',      prem: '50 / 50',                           soph: '50 / 50' },
];

type Key = 'pro' | 'prem' | 'soph';
type TierTab = { key: Key; label: string; badge?: string };

const TABS: ReadonlyArray<TierTab> = [
  { key: 'pro',  label: 'Professional' },
  { key: 'prem', label: 'Premium', badge: 'Most popular' },
  { key: 'soph', label: 'Sophisticated' },
];



function valueFor(row: Row, key: Key): CellValue {
  if (key === 'pro') return row.pro;
  if (key === 'prem') return row.prem;
  return row.soph;
}

function BoolCell({ value }: { value: boolean | 'na' }) {
  if (value === 'na' || value === false) return <span className="text-[color:var(--ui-accent)]">—</span>;
  return (
    <span
      role="img"
      aria-label="Included"
      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[color:var(--ui-border)] bg-white/5"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3">
        <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" className="text-[color:var(--ui-label)]" />
      </svg>
    </span>
  );
}

function Cell({ v }: { v: CellValue }) {
  if (typeof v === 'boolean' || v === 'na') return <BoolCell value={v} />;
  return <span className="text-white/85">{v}</span>;
}

export default function TierComparison() {
  // Default to Premium on mobile since it’s the “most popular”
  const [active, setActive] = useState<Key>('prem');
  const panelId = useId();
 
const currentTab = useMemo(
  () => TABS.find(t => t.key === active) ?? TABS[0],
  [active]
);


  // Simple keyboard left/right for the segmented control
 useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    const idx = TABS.findIndex(t => t.key === active);
    const safeIdx = idx === -1 ? 0 : idx; // if somehow not found, fall back to 0

    const nextIdx =
      (e.key === 'ArrowLeft'
        ? (safeIdx - 1 + TABS.length)
        : (safeIdx + 1)) % TABS.length;

    const nextTab = TABS[nextIdx]; // TierTab | undefined
    if (nextTab) setActive(nextTab.key);
  };

  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [active]);

  return (
    <section className="container py-6 md:py-10" aria-labelledby="tier-compare-title">
      <header className="text-center mb-6">
        <h2 id="tier-compare-title" className="text-xl md:text-2xl font-serif text-white">What’s included</h2>
        <div aria-hidden className="rule-neutral mt-5 mx-auto" />
      </header>

      {/* ===== Mobile: segmented control + single panel ===== */}
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label="Choose tier"
          className="mb-4 inline-flex rounded-full border border-white/10 p-1 overflow-x-auto"
        >
          {TABS.map((t) => {
            const selected = t.key === active;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                aria-controls={`${panelId}-${t.key}`}
                onClick={() => setActive(t.key)}
                className={[
                  'px-3.5 py-1.5 rounded-full text-sm transition-colors shrink-0',
                  selected
                    ? 'text-[color:var(--color-accent)] bg-white/[0.06] border border-white/15'
                    : 'text-white/70 hover:text-white'
                ].join(' ')}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Active panel (single card) */}
        <article
          id={`${panelId}-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-base font-medium">
              {TABS.find(t => t.key === active)?.label}
            </h3>
            {TABS.find(t => t.key === active)?.badge && (
              <span
                className="rounded-full px-2 py-[2px] text-[11px] font-medium border"
                style={{
                  color: 'var(--color-accent)',
                  borderColor: 'color-mix(in oklab, var(--color-accent) 40%, transparent)',
                  background: 'color-mix(in oklab, var(--color-accent) 10%, transparent)',
                }}
              >
                {TABS.find(t => t.key === active)?.badge}
              </span>
            )}
          </header>

          <dl className="divide-y divide-white/10">
            {ROWS.map((row) => {
              const v = valueFor(row, active);
              return (
                <div key={`${active}-${row.feature}`} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3">
                  <dt className="text-white/70 text-sm">{row.feature}</dt>
                  <dd className="justify-self-end text-sm"><Cell v={v} /></dd>
                </div>
              );
            })}
          </dl>
        </article>

        <p className="mt-3 text-xs text-[color:var(--ui-accent)]">
          We’ll recommend the right tier during your discovery call.
        </p>
      </div>

      {/* ===== Desktop: full comparison table ===== */}
      <div
        className="relative overflow-x-auto rounded-2xl border border-white/10 hidden md:block"
        tabIndex={0}
      >
        <table className="min-w-[720px] md:min-w-full w-full text-left text-[13px] md:text-sm">
          <caption className="sr-only">
            Package feature comparison across Professional, Premium, and Sophisticated tiers
          </caption>

          <colgroup>
            <col className="w-[42%] md:w-[34%]" />
            <col className="w-[19%] md:w-[22%]" />
            <col className="w-[19%] md:w-[22%]" />
            <col className="w-[20%] md:w-[22%]" />
          </colgroup>

          <thead className="bg-white/[0.04] thead-sticky">
            <tr className="[&>th]:p-3 md:[&>th]:p-4 [&>th]:font-medium [&>th]:text-white/80">
              <th scope="col" className="sticky left-0 z-20 bg-gradient-to-r from-black to-black/90">Feature</th>
              <th scope="col">Professional</th>
              <th scope="col" className="text-white">
                Premium
                <span
                  className="ml-2 rounded-full px-2 py-[2px] text-[11px] font-medium align-middle border"
                  style={{
                    color: 'var(--color-accent)',
                    borderColor: 'color-mix(in oklab, var(--color-accent) 40%, transparent)',
                    background: 'color-mix(in oklab, var(--color-accent) 10%, transparent)',
                  }}
                >
                  Most popular
                </span>
              </th>
              <th scope="col">Sophisticated</th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((r) => (
              <tr key={r.feature} className="odd:bg-white/[0.015] hover:bg-white/[0.028] border-t border-white/10">
                <th scope="row" className="p-3 md:p-4 font-medium text-white/90 sticky left-0 z-10 bg-gradient-to-r from-black to-black/90">
                  {r.feature}
                </th>
                <td className="p-3 md:p-4"><Cell v={r.pro} /></td>
                <td className="p-3 md:p-4"><Cell v={r.prem} /></td>
                <td className="p-3 md:p-4"><Cell v={r.soph} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

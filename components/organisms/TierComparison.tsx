'use client';

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
  { feature: 'Payment',           pro: '50 / 30 / 20', prem: '50 / 30 / 20',                      soph: '50 / 30 / 20' },
];

function BoolCell({ value }: { value: boolean | 'na' }) {
  // Dash for NA or not-included (keeps table crisp)
  if (value === 'na' || value === false) {
    return <span className="text-[color:var(--ui-accent)]">—</span>;
  }
  // Included = neutral checkmark
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
  return (
    <section className="container py-6 md:py-10" aria-labelledby="tier-compare-title">
      <header className="text-center mb-6">
        <h2 id="tier-compare-title" className="text-xl md:text-2xl font-serif text-white">What’s included</h2>
        <div aria-hidden className="rule-neutral mt-5 mx-auto" />
      </header>

      <div className="overflow-x-auto mask-fade rounded-2xl border border-white/10">
        <table className="table-fixed w-full text-left text-sm">
          <caption className="sr-only">Package feature comparison across Professional, Premium, and Sophisticated tiers</caption>

          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
          </colgroup>

          <thead className="bg-white/[0.04] thead-sticky">
            <tr className="[&>th]:p-4 [&>th]:font-medium [&>th]:text-white/80">
              <th
                scope="col"
                className="sticky left-0 z-20 bg-gradient-to-r from-black to-black/90"
              >
                Feature
              </th>
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
              <tr
                key={r.feature}
                className="odd:bg-white/[0.015] hover:bg-white/[0.028] border-t border-white/10"
              >
                <th
                  scope="row"
                  className="p-4 font-medium text-white/90 sticky left-0 z-10 bg-gradient-to-r from-black to-black/90"
                >
                  {r.feature}
                </th>
                <td className="p-4"><Cell v={r.pro} /></td>
                <td className="p-4"><Cell v={r.prem} /></td>
                <td className="p-4"><Cell v={r.soph} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[color:var(--ui-accent)]">
        We’ll recommend the right tier during your discovery call.
      </p>
    </section>
  );
}

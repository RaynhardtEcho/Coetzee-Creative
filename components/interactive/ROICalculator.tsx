'use client';

import { useMemo, useState } from 'react';
// Deterministic formatter (SSR/CSR-safe)
import { formatNumber } from '@/lib/utils/number';

export default function ROICalculator() {
  // Keep as strings; parse for math → avoids locale/hydration surprises.
  const [leads, setLeads] = useState('40');     // leads / month
  const [close, setClose] = useState('25');     // %
  const [value, setValue] = useState('12000');  // ZAR per project
  const [lift,  setLift]  = useState('15');     // % conversion lift

  const result = useMemo(() => {
    const L  = clampInt(leads);               // monthly leads
    const CR = clampPct(close) / 100;         // close rate
    const V  = clampInt(value);               // average deal value (ZAR)
    const U  = clampPct(lift)  / 100;         // expected lift
    const monthly = L * CR * V * U;           // additional revenue / month
    const yearly  = monthly * 12;
    return { monthly, yearly };
  }, [leads, close, value, lift]);

  return (
    <section aria-labelledby="roi-heading" className="py-28">
      <div className="container">
        <header className="mb-10">
          <h2
            id="roi-heading"
            className="text-3xl md:text-4xl font-heading font-semibold leading-tight text-white"
          >
            ROI, not guesswork
          </h2>
          {/* Neutral underline (no gold) */}
          <div aria-hidden className="rule-neutral mt-4" />
          <p className="mt-3 text-sm text-[var(--ui-accent)]">
            Estimates only. We’ll validate numbers together on a call.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Inputs */}
          <form className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <Field
              label="Monthly leads"
              value={leads}
              onChange={setLeads}
              inputMode="numeric"
              placeholder="e.g., 40"
            />
            <Field
              label="Close rate (%)"
              value={close}
              onChange={setClose}
              inputMode="numeric"
              placeholder="e.g., 25"
            />
            <Field
              label="Avg project value (ZAR)"
              value={value}
              onChange={setValue}
              inputMode="numeric"
              placeholder="e.g., 12000"
            />
            <Field
              label="Expected conversion lift (%)"
              value={lift}
              onChange={setLift}
              inputMode="numeric"
              placeholder="e.g., 15"
            />

            <p className="mt-3 text-xs text-[var(--ui-accent)]">
              Tip: keep assumptions conservative; we’d rather beat the number than explain it.
            </p>
          </form>

          {/* Result */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] flex flex-col justify-center">
            <p className="text-sm text-[var(--ui-label)] mb-2">Estimated additional revenue</p>

            <div
              className="text-4xl md:text-5xl font-heading text-white"
              aria-live="polite"
              aria-atomic="true"
            >
              R{formatNumber(Math.round(result.monthly))}
              <span className="text-base text-[var(--ui-accent)]"> / mo</span>
            </div>

            <div className="mt-2 text-lg text-white/90">
              ≈ R{formatNumber(Math.round(result.yearly))} / year
            </div>

            <p className="mt-4 text-xs text-white/60">
              Formula: <span className="text-white/80">Leads × Close rate × Avg value × Expected lift</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ helpers ------------------------------ */

function clampInt(v: string) {
  // keep only digits; clamp at 0..1e9 to avoid accidental huge numbers
  const n = Number((v || '').replace(/\D/g, '')) || 0;
  return Math.max(0, Math.min(n, 1_000_000_000));
}

function clampPct(v: string) {
  const n = Number((v || '').replace(/[^\d.]/g, '')) || 0;
  return Math.max(0, Math.min(n, 100));
}

/* ------------------------------ field ------------------------------- */

function Field({
  label,
  value,
  onChange,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: 'numeric' | 'text';
  placeholder?: string;
}) {
  return (
    <label className="block mb-4">
      <span className="block mb-2 text-sm text-[var(--ui-label)]">{label}</span>
      <input
        inputMode={inputMode ?? 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/15 bg-black/50 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-[#C6C6C6]/40"
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
      />
    </label>
  );
}

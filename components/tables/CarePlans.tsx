'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/atoms/Button';

// ---------- Utils (deterministic ZA formatting) ----------
function formatIntZA(n: number) {
  const sign = n < 0 ? '-' : '';
  const s = Math.trunc(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${sign}${s}`;
}
function formatRandZA(n: number) {
  return `R ${formatIntZA(n)}`;
}

// ---------- Config ----------
type Billing = 'monthly' | 'yearly';
type PlanKey = 'essential' | 'growth' | 'premium';

type Plan = {
  key: PlanKey;
  name: string;
  monthly: number; // ZAR
  features: string[];
  badge?: 'Most popular' | 'Best value';
  bestFor?: string;
};

const PLANS: Plan[] = [
  {
    key: 'essential',
    name: 'Essential Care',
    monthly: 750,
    features: ['Security monitoring', 'Daily backups', 'Basic updates', 'Standard SLA'],
    bestFor: 'Keep site healthy',
  },
  {
    key: 'growth',
    name: 'Growth Care',
    monthly: 1200,
    features: ['Analytics reports', 'On-page SEO', 'Priority support', 'Priority SLA'],
    badge: 'Most popular',
    bestFor: 'Grow traffic & leads',
  },
  {
    key: 'premium',
    name: 'Premium Care',
    monthly: 1800,
    features: ['Monthly strategy call', 'Content updates', 'Conversion optimization', 'Critical SLA'],
    bestFor: 'Hands-on optimization',
  },
];

function WAIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 3.2 18.1L2 22l3.9-1a10.9 10.9 0 0 0 5.3 1.4h.005A11 11 0 0 0 20.5 3.5Zm-8.3 17.1h-.005a9.07 9.07 0 0 1-4.6-1.3l-.33-.19-2.3.6.61-2.25-.21-.34A9.06 9.06 0 1 1 12.2 20.6ZM17 14.2c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.12-.55.12-.16.25-.64.8-.79.97-.15.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.46-1.39-1.71-.15-.25-.02-.38.11-.5.12-.12.25-.29.37-.44.13-.15.17-.25.25-.41.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.83-.2-.5-.41-.43-.55-.44l-.47-.01c-.17 0-.44.06-.67.3-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.28 3.68.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3Z"
      />
    </svg>
  );
}

// Reliable index map to avoid TS “possibly undefined”
const KEY_INDEX: Record<PlanKey, number> = { essential: 0, growth: 1, premium: 2 };

// Tooltips for feature terms
const TOOLTIPS: Record<string, string> = {
  'Security monitoring': 'Automated checks for uptime and vulnerabilities, reviewed weekly.',
  'Daily backups': 'Encrypted daily snapshots with 14-day retention.',
  'Basic updates': 'Theme/plugin updates + minor fixes (≤30 min/mo).',
  'Analytics reports': 'Monthly traffic & conversions summary with insights.',
  'On-page SEO': 'Meta tags, headings, ALT text, XML sitemap, and basic schema.',
  'Priority support': 'Same-business-day response for tickets.',
  'Monthly strategy call': '30–45 min call to review results and plan next steps.',
  'Content updates': 'Editorial/content changes (up to 2 hrs/mo).',
  'Conversion optimization': 'A/B test ideas & iteration on key pages.',
  'Standard SLA': 'Response within 2 business days; critical within 24h.',
  'Priority SLA': 'Response within 1 business day; critical within 8h.',
  'Critical SLA': 'Response within 4h (business hours); incident handling escalated.',
};

function InfoTip({ label }: { label: string }) {
  const id = useId();
  const text = TOOLTIPS[label];
  if (!text) return null;
  return (
    <span className="relative group inline-block align-middle ml-1">
      <button
        type="button"
        aria-describedby={id}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30
                   text-[11px] leading-none text-white/70
                   hover:text-white hover:border-white/60
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        i
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap
                   rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs text-white/90
                   opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

// WhatsApp helper (env override supported)
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_E164 || '27814080806';
function waHref(plan: Plan, billing: Billing) {
  const msg = encodeURIComponent(`Hi Coetzee Creative — I'm interested in ${plan.name} (${billing}).`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function CarePlans() {
  const [active, setActive] = useState<PlanKey>('growth');
  const [billing, setBilling] = useState<Billing>('monthly');

  // Arrow-key navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const idx = KEY_INDEX[active];
      const next = e.key === 'ArrowLeft' ? (idx - 1 + PLANS.length) % PLANS.length : (idx + 1) % PLANS.length;
      const candidate = PLANS[next];
      if (candidate) setActive(candidate.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // Yearly = 2 months free (10× monthly)
  const priceFor = (p: Plan) =>
    billing === 'monthly'
      ? { amount: p.monthly, suffix: '/mo' as const, save: 0 }
      : { amount: p.monthly * 10, suffix: '/yr' as const, save: p.monthly * 2 };

  // ---------- Desktop table ----------
  const DesktopTable = () => (
    <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10">
      <table className="table-fixed w-full text-left text-sm">
        <caption className="sr-only">Care plan comparison and actions</caption>
        <colgroup>
          <col className="w-[28%]" />
          <col className="w-[18%]" />
          <col />
          <col className="w-[24%]" />
        </colgroup>
        <thead className="bg-white/5 thead-sticky">
          <tr>
            <th className="p-4">Plan</th>
            <th className="p-4">Price</th>
            <th className="p-4">Included</th>
            <th className="p-4" />
          </tr>
        </thead>
        <tbody>
          {PLANS.map((p) => {
            const selected = active === p.key;
            const { amount, suffix, save } = priceFor(p);
            return (
              <tr
                key={p.key}
                className={clsx(
                  'border-t border-white/10 odd:bg-white/[0.015] hover:bg-white/[0.028]',
                  selected && 'bg-white/[0.035] ring-1 ring-[color:var(--ui-border)]/20'
                )}
              >
                <td className="p-4">
                  <div className="font-medium">{p.name}</div>
                  {p.bestFor && <div className="text-white/50 text-xs mt-0.5">{p.bestFor}</div>}
                  {p.badge && (
                    <span
                      className="mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: 'color-mix(in oklab, var(--color-accent) 50%, transparent)',
                        color: 'var(--color-accent)',
                        background: 'color-mix(in oklab, var(--color-accent) 12%, transparent)',
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </td>
                <td className="p-4 whitespace-nowrap" style={{ color: 'var(--color-accent)' }}>
                  <span suppressHydrationWarning>{formatRandZA(amount)}</span>
                  <span className="text-white/60">{suffix}</span>
                  {save ? <span className="ml-2 text-xs text-white/60">Save {formatRandZA(save)}</span> : null}
                </td>
                <td className="p-4">
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    {p.features.map((f) => (
                      <li key={f}>
                        {f}
                        <InfoTip label={f} />
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {/* Desktop */}
                    <Link href={`/contact?plan=${p.key}&billing=${billing}`} aria-label={`Choose ${p.name}`}>
                      <Button
                        as="span"
                        variant={selected ? 'solid' : 'outline'}
                        tone={selected ? 'gold' : 'neutral'}
                        event={{ name: 'care_plan_cta', props: { plan: p.key, billing } }}
                      >
                        Choose plan
                      </Button>
                    </Link>

                    <Button
                      as="a"
                      href={waHref(p, billing)}
                      variant="outline"
                      tone="neutral"
                      className="gap-2"
                      event={{ name: 'care_plan_whatsapp', props: { plan: p.key, billing } }}
                      aria-label={`WhatsApp about ${p.name}`}
                    >
                      <WAIcon className="h-4 w-4 text-[#25D366]" />
                      WhatsApp
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // ---------- Mobile cards ----------
  const MobileCards = () => (
    <div className="md:hidden grid gap-4">
      {PLANS.map((p) => {
        const selected = active === p.key;
        const { amount, suffix, save } = priceFor(p);
        return (
          <div
            key={p.key}
            className={clsx(
              'rounded-2xl border p-4',
              selected ? 'border-white/20 bg-white/[0.035]' : 'border-white/10 bg-white/[0.03]'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{p.name}</div>
                {p.bestFor && <div className="text-white/50 text-xs mt-0.5">{p.bestFor}</div>}
                {p.badge && (
                  <span
                    className="mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: 'color-mix(in oklab, var(--color-accent) 50%, transparent)',
                      color: 'var(--color-accent)',
                      background: 'color-mix(in oklab, var(--color-accent) 12%, transparent)',
                    }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold" suppressHydrationWarning style={{ color: 'var(--color-accent)' }}>
                  {formatRandZA(amount)} <span className="text-white/60">{suffix}</span>
                </div>
                {save ? <div className="text-[11px] text-white/60">Save {formatRandZA(save)}</div> : null}
              </div>
            </div>

            <ul className="mt-3 list-disc list-inside space-y-1 text-white/80">
              {p.features.map((f) => (
                <li key={f}>
                  {f}
                  <InfoTip label={f} />
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              <Link href={`/contact?plan=${p.key}&billing=${billing}`} className="flex-1" aria-label={`Choose ${p.name}`}>
                <Button
                  as="span"
                  variant={selected ? 'solid' : 'outline'}
                  tone={selected ? 'gold' : 'neutral'}
                  className="w-full"
                >
                  Choose plan
                </Button>
              </Link>

              <Button
                as="a"
                href={waHref(p, billing)}
                variant="outline"
                tone="neutral"
                className="gap-2 flex-1"
                event={{ name: 'care_plan_whatsapp', props: { plan: p.key, billing } }}
                aria-label={`WhatsApp about ${p.name}`}
              >
                <WAIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="care" className="container py-12 md:py-16">
      {/* Heading */}
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Monthly Care Plans</h2>
        <div aria-hidden className="rule-neutral mt-4" />
        <p className="text-white/60 mt-3">Peace-of-mind maintenance and growth support after launch.</p>
      </header>

      {/* Tabs + Billing toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div role="tablist" aria-label="Care plans" className="flex gap-2">
          {PLANS.map((p) => {
            const selected = active === p.key;
            return (
              <button
                key={p.key}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${p.key}`}
                onClick={() => setActive(p.key)}
                className={clsx(
                  'px-3 py-1 rounded-full text-sm border transition',
                  selected ? 'border-[color:var(--color-accent)] text-white' : 'border-white/10 text-white/70 hover:text-white'
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Monthly / Yearly toggle with caption */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-full border border-white/10 p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm',
                billing === 'monthly' ? 'text-[color:var(--color-accent)] bg-white/[0.06]' : 'text-white/70 hover:text-white'
              )}
              aria-pressed={billing === 'monthly'}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm',
                billing === 'yearly' ? 'text-[color:var(--color-accent)] bg-white/[0.06]' : 'text-white/70 hover:text-white'
              )}
              aria-pressed={billing === 'yearly'}
            >
              Yearly
            </button>
          </div>
          <span className="text-xs text-[color:var(--ui-accent)]">(2 months free)</span>
        </div>
      </div>

      <DesktopTable />
      <MobileCards />

      {/* Trust stripe */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs text-white/60">
        Cancel anytime • Priority support on Growth & Premium • Save <span className="text-white">{formatRandZA(100)}</span>/mo when bundled with a new build
      </div>
    </section>
  );
}

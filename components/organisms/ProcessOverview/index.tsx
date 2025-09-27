// components/organisms/ProcessOverview.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReveal } from '@/components/ux/useReveal';
import { Compass, Target, PenLine, Code2, Rocket, type LucideIcon } from 'lucide-react';

type Step = {
  title: string;
  time: string;
  desc: string;
  Icon: LucideIcon;
};

const STEPS: Step[] = [
  { title: 'Discover',  time: '1–2 days',  desc: 'We learn your goals, audience, and constraints to define success.', Icon: Compass },
  { title: 'Strategy',  time: '1–2 days',  desc: 'Sitemap, priorities, and a plan that aligns brand & business.',     Icon: Target },
  { title: 'Design',    time: '3–5 days',  desc: 'High-fidelity UI with motion and polish—approved before build.',    Icon: PenLine },
  { title: 'Build',     time: '1–3 weeks', desc: 'Clean, performant, responsive implementation with best practices.',  Icon: Code2 },
  { title: 'Launch',    time: '2–3 days',  desc: 'QA, performance pass, deploy, and post-launch support.',            Icon: Rocket },
] as const;

export default function ProcessOverview() {
  useReveal('process-scope');

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [lockedIdx, setLockedIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // reflect breakpoint to decide which progress bar drives the state
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639.98px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Mobile: continuous progress from top→bottom of the section
  const [mobileProgress, setMobileProgress] = useState(0);
  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vpH = window.innerHeight;
      // normalize: 0 when section enters viewport, 1 when it fully passes
      let p = (vpH - r.top) / (vpH + r.height);
      if (!Number.isFinite(p)) p = 0;
      setMobileProgress(Math.max(0, Math.min(1, p)));
    };
    const opts = { passive: true } as const;
    onScroll();
    window.addEventListener('scroll', onScroll, opts);
    window.addEventListener('resize', onScroll, opts);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMobile]);

  const desktopIdx = hoverIdx ?? lockedIdx ?? -1;
  const mobileActiveIdx = useMemo(
    () => Math.round(mobileProgress * (STEPS.length - 1)),
    [mobileProgress]
  );

  const drivingIdx = isMobile ? mobileActiveIdx : desktopIdx; // can be -1 when nothing selected
  const inRange = drivingIdx >= 0 && drivingIdx < STEPS.length;
  const activeStep = inRange ? STEPS[drivingIdx] : undefined;

  // target percentage for fill/pill
  const targetPct = useMemo(() => {
    if (isMobile) return Math.round(mobileProgress * 100);
    if (desktopIdx < 0) return 0;
    const max = STEPS.length - 1;
    return Math.round((desktopIdx / max) * 100);
  }, [isMobile, mobileProgress, desktopIdx]);

  // eased percentage (nicer animation)
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setPct(prev => {
        const diff = targetPct - prev;
        if (Math.abs(diff) < 0.5) return targetPct;
        return prev + diff * 0.15;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetPct]);

  const widthPct = `${isMobile ? Math.round(mobileProgress * 100) : targetPct}%`;
  const heightPct = `${Math.round(mobileProgress * 100)}%`;
  const showPct = Math.round(pct) > 0;
  const pillLabel = activeStep ? `${activeStep.title} — ${Math.round(pct)}%` : `${Math.round(pct)}%`;

  return (
    <section id="process-scope" className="container py-20 md:py-28">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Our Process</h2>
        <div className="rule-neutral mt-3" aria-hidden />
      </header>

      <div ref={wrapRef} className="process-wrap">
        {/* MOBILE: vertical progress bar on the left */}
        <div className="relative sm:pl-0 pl-[5rem]">
          <div className="vbar-area sm:hidden" aria-hidden="true">
            <div className="vbar-track" />
            <div className="vbar-fill" style={{ height: heightPct, top: 0 }} />
            <div className="vticks">
              {STEPS.map((_, i) => {
                const top = `${(i / (STEPS.length - 1)) * 100}%`;
                const done = mobileProgress * (STEPS.length - 1) >= i - 1e-6;
                return (
                  <span
                    key={`vt-${i}`}
                    className={['vtick', done ? 'vtick--done' : ''].join(' ')}
                    style={{ top }}
                  />
                );
              })}
            </div>
            {showPct && (
              <span className="vpct" style={{ top: `calc(${heightPct} - (var(--vpct-h, 26px) / 2))` }}>
                {pillLabel}
              </span>
            )}
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
            {STEPS.map(({ title, time, desc, Icon }, idx) => {
              const isDone = drivingIdx >= idx;
              const isActive = drivingIdx === idx;
              return (
                <button
                  key={title}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  type="button"
                  className="group text-left outline-none"
                  onMouseEnter={() => !isMobile && setHoverIdx(idx)}
                  onMouseLeave={() => !isMobile && setHoverIdx(null)}
                  onFocus={() => !isMobile && setHoverIdx(idx)}
                  onBlur={() => !isMobile && setHoverIdx(null)}
                  onClick={() => !isMobile && setLockedIdx(idx)}
                  aria-label={`${title} (${time}): ${desc}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={[
                        'size-[104px] rounded-full border grid place-items-center',
                        'bg-gradient-to-b from-zinc-900/30 to-zinc-950/40 backdrop-blur-[1px]',
                        isDone
                          ? 'border-[color:var(--ui-border)] shadow-[0_0_0_3px_rgba(200,200,200,0.07),0_0_28px_rgba(200,200,200,0.15)]'
                          : 'border-[color:var(--ui-border-dim)]',
                      ].join(' ')}
                    >
                      <Icon
                        size={32}
                        strokeWidth={1.75}
                        className={[
                          'transition-transform duration-300',
                          isActive ? 'scale-[1.06] text-white' : 'scale-100 text-[color:var(--ui-process)]',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="text-white text-lg font-medium text-center">{title}</div>
                    <div className="text-xs text-white/50 text-center">{time}</div>
                    <p className="text-white/70 text-sm text-center max-w-xs">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP/TABLET: horizontal progress bar */}
        <div className="bar-area mt-10 lg:mt-12 relative hidden sm:block" aria-hidden>
          <div className="bar-track" />
          <div className="ticks">
            {STEPS.map((_, i) => {
              const left = `${(i / (STEPS.length - 1)) * 100}%`;
              const done = drivingIdx >= i;
              return (
                <span
                  key={`ht-${i}`}
                  className={['tick', done ? 'tick--done' : ''].join(' ')}
                  style={{ left }}
                />
              );
            })}
          </div>
          <div className="bar-fill" style={{ width: widthPct }} />
          {showPct && <span className="pct" style={{ left: widthPct }}>{pillLabel}</span>}
        </div>
      </div>

      <div className="mt-10 text-white/60">
        Typical delivery timeline: <span className="text-white">2–6 weeks</span>
      </div>

      <style jsx>{`
        /* Local tokens (use your neutrals as defaults) */
        .process-wrap {
          --ui-accent: var(--ui-accent, #8A8A8A);
          --ui-border: var(--ui-border, #C6C6C6);
          --ui-border-dim: rgba(198,198,198,0.45);
          --ui-process: var(--ui-process, #6B7280);
          --pct-h: 36px;
          --bar-h: 8px;
          --vbar-w: 6px;
          --vpct-w: auto;
          --vpct-h: 26px;
          --v-left: 4.75rem;
        }

        /* Mobile vertical progress */
        .vbar-area { position:absolute; top:0; bottom:0; left:var(--v-left); width:var(--vbar-w); pointer-events:none; }
        .vbar-track {
          position:absolute; left:0; top:0; width:var(--vbar-w); height:100%; border-radius:999px;
          background:linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border:1px solid rgba(255,255,255,0.08);
        }
        .vbar-fill {
          position:absolute; left:0; top:0; width:var(--vbar-w); height:0; border-radius:999px;
          background:linear-gradient(180deg, rgba(210,210,210,0.9) 0%, rgba(238,238,238,0.95) 55%, rgba(210,210,210,0.9) 100%);
          box-shadow:0 0 22px rgba(220,220,220,0.22);
          transition:height 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vticks { position:absolute; inset:0; pointer-events:none; }
        .vtick {
          position:absolute; left:calc(var(--v-left) - 4px); transform:translateX(-100%) translateY(-1px);
          width:10px; height:2px; background:rgba(255,255,255,0.18); border-radius:1px;
        }
        .vtick--done { background:rgba(220,220,220,0.7); box-shadow:0 0 10px rgba(220,220,220,0.28); }
        .vpct {
          position:absolute; left:calc(var(--v-left) - 8px); height:var(--vpct-h); display:inline-flex; align-items:center;
          justify-content:center; padding:0 10px; transform:translateX(-100%); border-radius:999px;
          background:linear-gradient(180deg, rgba(22,22,22,0.92) 0%, rgba(8,8,8,0.92) 100%);
          border:1px solid rgba(220,220,220,0.55); box-shadow:0 2px 12px rgba(220,220,220,0.22), inset 0 0 12px rgba(220,220,220,0.06);
          color:#fff; font-size:12.5px; font-weight:700; letter-spacing:.02em; font-variant-numeric:tabular-nums; pointer-events:none;
          user-select:none; white-space:nowrap; transition:top 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Desktop horizontal progress */
        .bar-area { width:clamp(360px, 70%, 960px); margin-inline:auto; position:relative; }
        @media (min-width: 1024px){ .bar-area{ margin-top:3rem; } }
        .bar-track {
          width:100%; height:var(--bar-h, 8px); border-radius:999px;
          background:linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden;
        }
        .ticks { pointer-events:none; position:absolute; inset:0; }
        .tick { position:absolute; bottom:-7px; transform:translateX(-1px); width:2px; height:12px; background:rgba(255,255,255,0.18); border-radius:1px; }
        .tick--done { background:rgba(220,220,220,0.7); box-shadow:0 0 10px rgba(220,220,220,0.28); }
        .bar-fill {
          height:var(--bar-h, 8px); border-radius:999px;
          background:linear-gradient(90deg, rgba(210,210,210,0.9) 0%, rgba(238,238,238,0.95) 55%, rgba(210,210,210,0.9) 100%);
          box-shadow:0 0 22px rgba(220,220,220,0.22); transition:width 420ms cubic-bezier(0.22, 1, 0.36, 1); overflow:visible;
        }
        .pct {
          position:absolute; top:-28px; height:var(--pct-h, 36px); display:inline-flex; align-items:center; justify-content:center;
          padding:0 12px; border-radius:999px; background:linear-gradient(180deg, rgba(22,22,22,0.92) 0%, rgba(8,8,8,0.92) 100%);
          border:1px solid rgba(220,220,220,0.55); box-shadow:0 2px 12px rgba(220,220,220,0.22), inset 0 0 12px rgba(220,220,220,0.06);
          color:#fff; font-size:14px; font-weight:700; letter-spacing:.02em; font-variant-numeric:tabular-nums; pointer-events:none; user-select:none;
          white-space:nowrap; transform:translateX(-50%); transition:left 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .vbar-fill, .vpct, .bar-fill, .pct { transition:none !important; }
        }
      `}</style>
    </section>
  );
}

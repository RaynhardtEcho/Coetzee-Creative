'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Button from '@/components/atoms/Button';
import { useReveal } from '@/components/ux/useReveal';
import HeroSigil from '@/components/organisms/HeroSigil';
import HeroVignette from '@/components/ux/HeroVignette';
import Typewriter from '@/components/interactive/Typewriter';

const Particles = dynamic(() => import('@/components/three/Particles'), { ssr: false });

function useReducedMotion() {
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
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    const onChange = () => setMatches(!!mq?.matches);
    onChange();
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, [query]);
  return matches;
}

export default function HeroPremium() {
  useReveal('hero-scope');
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const show3D = !reduce && !isMobile;

  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layers = [
      { el: bgRef.current, speed: 0.035 },
      { el: midRef.current, speed: 0.055 },
      { el: fgRef.current, speed: 0.09 },
    ];
    if (reduce) {
      layers.forEach(({ el }) => el && (el.style.transform = 'translate3d(0,0,0)'));
      return;
    }
    let ticking = false;
    const update = () => {
      const y = window.scrollY || 0;
      layers.forEach(({ el, speed }) => {
        if (!el) return;
        el.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`;
      });
      ticking = false;
    };
    update();
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  return (
    <section
      id="hero-scope"
      className="relative bg-black min-h-screen flex items-center overflow-visible"
      style={{ paddingTop: 'max(0px, calc(var(--header-h, 5rem) - 9.25rem))' }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        {show3D ? (
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }} frameloop="demand">
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <Particles count={480} radius={7} />
              </Suspense>
            </Canvas>
          </div>
        ) : (
          <img
            src="/hero-static.webp"
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 z-20">
          <HeroVignette grain={0.05} vignette={0.5} />
        </div>
      </div>

      {/* DEPTH LAYERS (neutralized) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <div
            className="absolute right-[-10%] -top-[22%] w-[72vmax] h-[72vmax] rounded-full blur-[58px] md:blur-[64px]"
            style={{
              mixBlendMode: 'screen',
              opacity: 0.3,
              background:
                'radial-gradient(60% 60% at 70% 33%, rgba(230,230,230,0.16) 0%, rgba(230,230,230,0.06) 46%, rgba(0,0,0,0) 74%)',
              transform: 'translateZ(0)',
            }}
          />
          <div
            className="absolute -top-8 w-[62vmax] h-[62vmax] rounded-full blur-[40px] md:blur-[46px]"
            style={{
              left: 'min(-22vw, -10rem)',
              opacity: 0.82,
              background:
                'radial-gradient(55% 55% at 44% 46%, rgba(255,255,255,0.045) 0%, rgba(26,26,26,1) 58%)',
              transform: 'translateZ(0)',
            }}
          />
        </div>

        <div ref={midRef} className="absolute inset-0 will-change-transform">
          <div
            className="absolute right-[12%] top-[29%] h-[22vmax] w-[22vmax] rounded-full blur-[38px] md:blur-[42px] float-slow"
            style={{
              opacity: 0.22,
              mixBlendMode: 'soft-light',
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)',
              transform: 'translateZ(0)',
            }}
          />
          <div
            className="absolute left-[10%] top-[60%] h-[15vmax] w-[15vmax] rounded-full blur-[32px] md:blur-[36px] float-med"
            style={{
              opacity: 0.18,
              mixBlendMode: 'soft-light',
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 60%)',
              transform: 'translateZ(0)',
            }}
          />
          <div
            className="absolute left-[-12%] bottom-[-12%] h-[58vmax] w-[82vmax] rotate-[10deg] blur-[58px]"
            style={{
              opacity: 0.08,
              mixBlendMode: 'screen',
              background:
                'linear-gradient(102deg, rgba(200,200,200,0.00) 0%, rgba(200,200,200,0.10) 40%, rgba(200,200,200,0.00) 80%)',
              transform: 'translateZ(0)',
            }}
          />
        </div>

        <div ref={fgRef} className="absolute inset-0 will-change-transform">
          {/* small neutral accents */}
          <div
            className="absolute left-[10%] top-[54%] md:left-[14%] md:top-[46%] lg:left-[20%] lg:top-[41%] h-[2px] w-[120px] md:w-[200px] lg:w-[220px] origin-left rotate-[4deg] md:rotate-[6deg] opacity-40"
            style={{
              background: 'var(--ui-accent)',
              filter: 'drop-shadow(0 0 8px rgba(200,200,200,0.15))',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)',
              maskImage:
                'linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)',
              transform: 'translateZ(0)',
            }}
          />
          <div
            className="absolute left-[26%] top-[62%] h-[6px] w-[6px] rounded-full"
            style={{ background: 'var(--ui-accent)', boxShadow: '0 0 10px rgba(200,200,200,0.35)', transform: 'translateZ(0)' }}
          />
          <div
            className="absolute right-[18%] top-[30%] h-[5px] w-[5px] rounded-full"
            style={{ background: 'var(--ui-accent)', boxShadow: '0 0 8px rgba(200,200,200,0.30)', transform: 'translateZ(0)' }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <div className="container pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="relative inline-block" data-reveal>
                <span className="block text-[11px] tracking-[0.38em] text-white/80 mb-3">COETZEE</span>
                <div className="text-3xl lg:text-5xl font-heading font-semibold tracking-wide">CREATIVE</div>
                <div className="absolute -right-10 top-2 h-[2px] w-24" aria-hidden="true" style={{ background: 'var(--ui-accent)', opacity: 0.8 }} />
                <div className="absolute -right-16 top-5 h-[2px] w-12" aria-hidden="true" style={{ background: 'var(--ui-accent)', opacity: 0.3 }} />
              </div>

              <h1 className="typewriter text-balance font-heading font-semibold leading-[1.1] md:leading-[1.12] text-[clamp(2.25rem,4vw,4rem)]" id="hero-title">
                <Typewriter text="Strategic web design for ambitious South African brands" />
              </h1>

              <p className="mt-3 text-white/75 text-lg leading-relaxed md:max-w-[68ch]" id="hero-sub">
                Strategic design and development for growing South African businesses.
              </p>

              {/* Standard neutral rule */}
              <div className="mt-4" aria-hidden>
                <div className="rule-neutral" />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3" aria-label="Primary actions" aria-describedby="hero-title hero-sub">
                <Link href="/contact" className="inline-block" aria-label="Get your quote">
                  <Button as="span" variant="solid" size="lg">
                    Get Your Quote
                  </Button>
                </Link>
                <Link href="/portfolio" className="inline-block" aria-label="View our work">
                  <Button as="span" variant="outline" size="lg" className="btn-outline-neutral">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>

            <div className="spotlight" aria-hidden="true">
              <div
                className="spotlight__beam"
                style={{
                  background:
                    'radial-gradient(45% 90% at 50% 0%, rgba(235,235,235,0.25) 0%, rgba(235,235,235,0.10) 35%, rgba(235,235,235,0.0) 80%)',
                }}
              />
              <div
                className="spotlight__rim"
                style={{
                  background:
                    'radial-gradient(60% 120% at 50% 50%, rgba(220,220,220,0.18) 0%, rgba(220,220,220,0.08) 42%, rgba(220,220,220,0.00) 70%)',
                }}
              />
            </div>

            <div className="lg:col-start-8 lg:col-span-5 w-full">
              <div className="flex justify-center lg:justify-end lg:h-full lg:items-center group">
                <HeroSigil
                  className="
                    w-[240px] sm:w-[300px] md:w-[340px] lg:w-[420px] xl:w-[480px]
                    transition-transform duration-500 ease-out will-change-transform
                    group-hover:rotate-[1.5deg]
                    group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.18)]
                  "
                  spotlight
                  reflection
                  intensity={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Neutral bottom hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(198,198,198,0.30), rgba(0,0,0,0))' }}
      />
    </section>
  );
}

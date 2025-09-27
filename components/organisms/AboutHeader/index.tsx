'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import SubtleStrands from '@/components/three/SubtleStrands';
import { useReveal } from '@/components/ux/useReveal';

export default function AboutHeader() {
  useReveal('about-header');
  const prefersReduced = useReducedMotion();
  const show3D = useMemo(() => !prefersReduced, [prefersReduced]);

  return (
    <section id="about-header" aria-labelledby="about-title" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {show3D ? (
          <>
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 60 }}>
              <ambientLight intensity={0.9} />
              <Suspense fallback={null}>
                <SubtleStrands />
              </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </>
        ) : (
          // Neutral, lightweight fallback (no WebGL)
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 60% at 70% 30%, rgba(230,230,230,0.10) 0%, rgba(230,230,230,0.00) 60%), ' +
                'linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,.6) 100%)',
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Content */}
      <div className="container py-20 md:py-24 lg:py-28">
        <h1
          id="about-title"
          className="text-balance text-3xl md:text-5xl font-semibold leading-tight max-w-[68ch]"
          data-reveal
        >
          Specializing in strategic web design for South African businesses
        </h1>

        {/* Neutral tapered rule (consistent with site) */}
        <div className="rule-neutral mt-3" data-reveal aria-hidden />

        <p className="mt-4 text-white/70 max-w-[68ch]" data-reveal>
          Professional, ROI-focused websites that build trust and drive measurable outcomes.
        </p>
      </div>
    </section>
  );
}

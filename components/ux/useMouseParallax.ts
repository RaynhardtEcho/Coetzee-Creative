'use client';
import { useEffect } from 'react';
import { MotionValue, useMotionValue, useSpring } from 'framer-motion';

type Opts = { stiffness?: number; damping?: number };

export function useMouseParallax(multX = 20, multY = 12, opts: Opts = {}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x: MotionValue<number> = useSpring(rawX, {
    stiffness: opts.stiffness ?? 120,
    damping: opts.damping ?? 20,
    mass: 0.6,
  });
  const y: MotionValue<number> = useSpring(rawY, {
    stiffness: opts.stiffness ?? 120,
    damping: opts.damping ?? 20,
    mass: 0.6,
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // normalize to [-1..1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nx * multX);
      rawY.set(ny * multY);
    };
    // gate to desktop for perf
    const enable = window.matchMedia('(min-width: 1024px)').matches;
    if (enable) window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY, multX, multY]);

  return { x, y };
}

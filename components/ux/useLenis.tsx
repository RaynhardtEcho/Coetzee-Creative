'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import type { LenisOptions } from 'lenis';

export function useLenis(opts?: Partial<LenisOptions>) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false, // newer Lenis option
      ...(opts || {}),
    });

    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy?.();
    };
  }, [opts]);
}

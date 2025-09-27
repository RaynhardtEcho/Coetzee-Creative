// components/ux/LenisWrapper.tsx
'use client';
import { PropsWithChildren, useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisWrapper({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false, // no special touch sync; keeps behavior predictable
    });

    let rafId = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy?.();
    };
  }, []);

  return <div id="lenis-content">{children}</div>;
}

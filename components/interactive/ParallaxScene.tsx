'use client';

import React, { useEffect, useRef } from 'react';

type SceneProps = {
  className?: string;
  children: React.ReactNode;
  /** When true, disables parallax transforms (e.g., reduced motion) */
  disabled?: boolean;
};

type LayerProps = {
  /** Positive numbers move with scroll; smaller = slower background */
  speed?: number; // e.g. 0.04 (bg), 0.06 (mid), 0.1 (fg)
  className?: string;
  children?: React.ReactNode;
  /** Optional extra offset in px */
  offsetY?: number;
};

const join = (...cls: Array<string | undefined | false>) => cls.filter(Boolean).join(' ');

export default function ParallaxScene({ className, children, disabled }: SceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Array<{ el: HTMLElement; speed: number; offset: number }>>([]);
  const visibleRef = useRef(true); // pause when offscreen

  useEffect(() => {
    if (!sceneRef.current) return;
    const root = sceneRef.current;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax-layer="true"]'));
    layersRef.current = els.map((el) => {
      const speed = Number(el.dataset.speed || '0');
      const offset = Number(el.dataset.offsety || '0');
      return { el, speed, offset };
    });

    if (disabled) {
      layersRef.current.forEach(({ el }) => (el.style.transform = 'translate3d(0,0,0)'));
      return;
    }

    // Pause updates when the scene is off-screen (perf)
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { root: null, threshold: 0 }
    );
    io.observe(root);

    let ticking = false;
    const update = () => {
      if (!visibleRef.current) { ticking = false; return; }
      const y = window.scrollY || 0;
      for (const { el, speed, offset } of layersRef.current) {
        const ty = Math.round((y * speed + offset) * 100) / 100;
        el.style.transform = `translate3d(0, ${ty}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [disabled]);

  return (
    <div
      ref={sceneRef}
      className={join(
        // pointer-events none so it never blocks content
        'pointer-events-none',
        // new compositor for smoother transforms
        '[transform:translateZ(0)]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function Layer({ speed = 0, className, children, offsetY = 0 }: LayerProps) {
  return (
    <div
      data-parallax-layer="true"
      data-speed={speed}
      data-offsety={offsetY}
      // Full-bleed layer by default so absolute children anchor here
      className={join('absolute inset-0 will-change-transform', className)}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {children}
    </div>
  );
}

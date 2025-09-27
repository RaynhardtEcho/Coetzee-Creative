'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal(scopeId: string) {
  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) return;

    const els = scope.querySelectorAll<HTMLElement>('[data-reveal]');
    els.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
        delay: (i % 4) * 0.06
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [scopeId]);
}

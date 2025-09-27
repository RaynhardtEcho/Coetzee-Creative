'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

type Props = { images: string[]; start?: number; onClose?: () => void };

export default function Lightbox({ images, start = 0, onClose }: Props) {
  const [i, setI] = useState(start);

  const close = useCallback(() => { onClose?.(); }, [onClose]);
  const next = useCallback(() => setI((v) => (v + 1) % images.length), [images.length]);
  const prev = useCallback(() => setI((v) => (v - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, next, prev]);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm grid place-items-center p-4">
      <button aria-label="Close lightbox" onClick={close} className="absolute top-4 right-4 btn-ghost">✕</button>
      <button aria-label="Previous image" onClick={prev} className="absolute left-4 md:left-8 btn-ghost">‹</button>
      <div className="relative w-full max-w-5xl aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black">
        <Image src={images[i]} alt={`Gallery image ${i+1}`} fill className="object-contain" priority />
      </div>
      <button aria-label="Next image" onClick={next} className="absolute right-4 md:right-8 btn-ghost">›</button>
    </div>
  );
}

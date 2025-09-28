// components/lightbox/Lightbox.tsx
'use client';

import Image, { type StaticImageData } from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ImgSrc = string | StaticImageData;

type Props = {
  images: Array<ImgSrc | undefined>;
  initialIndex?: number; // preferred prop
  start?: number;        // legacy alias supported
  onClose: () => void;
};

export default function Lightbox({ images, initialIndex, start, onClose }: Props) {
  // Sanitize so everything is a valid src for <Image>
  const imgs = useMemo(
    () => (images ?? []).filter((v): v is ImgSrc => Boolean(v)),
    [images]
  );

  // Nothing to show
  if (imgs.length === 0) return null;

  // Resolve starting index and clamp
  const resolvedStart =
    Number.isFinite(start) ? Number(start) :
    Number.isFinite(initialIndex) ? Number(initialIndex) : 0;

  const clamp = (n: number) => (n % imgs.length + imgs.length) % imgs.length;

  const [i, setI] = useState<number>(clamp(Math.max(0, resolvedStart)));

  const prev = useCallback(() => setI(v => clamp(v - 1)), [imgs.length]);
  const next = useCallback(() => setI(v => clamp(v + 1)), [imgs.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // At this point, because we clamp and imgs.length > 0, imgs[i] exists:
  const src: ImgSrc = imgs[i]!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm p-4"
    >
      <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 btn-ghost">✕</button>
      <button aria-label="Previous image" onClick={prev} className="absolute left-4 md:left-8 btn-ghost">‹</button>

      <div className="relative w-full max-w-5xl aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black">
        <Image
          src={src}
          alt={`Gallery image ${i + 1}`}
          fill
          className="object-contain"
          priority
        />
      </div>

      <button aria-label="Next image" onClick={next} className="absolute right-4 md:right-8 btn-ghost">›</button>
    </div>
  );
}

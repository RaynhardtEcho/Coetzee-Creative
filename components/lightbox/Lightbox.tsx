// components/lightbox/Lightbox.tsx
'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect } from 'react';

type Props = {
  images: ReadonlyArray<string | StaticImageData>; // not optional
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
};

export default function Lightbox({ images, index, setIndex, onClose }: Props) {
  // Guard empty inputs
  if (!images || images.length === 0) return null;

  const len = images.length;
  const i = ((index % len) + len) % len; // 0..len-1

  // With noUncheckedIndexedAccess, index access is possibly undefined.
  // Provide a safe fallback and narrow the type to NonNullable.
  const src: NonNullable<(typeof images)[number]> = images[i] ?? images[0]!;

  const prev = () => setIndex((i - 1 + len) % len);
  const next = () => setIndex((i + 1) % len);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, len]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-8 btn-ghost"
      >
        ‹
      </button>

      <div
        className="relative w-full max-w-5xl aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src} // string | StaticImageData (never undefined)
          alt={`Gallery image ${i + 1}`}
          fill
          className="object-contain"
          priority
        />
      </div>

      <button
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 btn-ghost"
      >
        ›
      </button>
    </div>
  );
}

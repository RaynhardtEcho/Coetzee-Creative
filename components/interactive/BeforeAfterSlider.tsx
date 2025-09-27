'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt='Before and after' }: Props) {
  const [pos, setPos] = useState(50);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Image src={beforeSrc} alt={alt} fill className="object-cover select-none" priority={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100-pos}% 0 0)` }}>
        <Image src={afterSrc} alt={alt} fill className="object-cover select-none" />
      </div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="w-0.5 h-full bg-gold shadow-[0_0_8px_#D4AF37]"></div>
      </div>
      {/* Range */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Before after slider"
        onChange={(e) => setPos(parseInt(e.target.value))}
        className="absolute inset-x-6 bottom-4 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

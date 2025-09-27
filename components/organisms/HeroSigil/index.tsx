// components/organisms/HeroSigil/index.tsx
'use client';

import Image from 'next/image';

type HeroSigilProps = {
  className?: string;                 // e.g. "w-[240px] sm:w-[300px] lg:w-[420px]"
  src?: string;                       // path in /public
  spotlight?: boolean;                // show the cinematic downlight (lg+)
  reflection?: boolean;               // show base reflection
  angleDeg?: number;                  // cone tilt
  intensity?: number;                 // 0..1 overall light strength
  glint?: boolean;                    // optional subtle gold kiss on hover (lg+)
};

export default function HeroSigil({
  className = '',
  src = '/brand/sigil.png',
  spotlight = true,
  reflection = true,
  angleDeg = -6,
  intensity = 1,
  glint = false,
}: HeroSigilProps) {
  // scale any alpha via intensity
  const a = (v: number) => (v * intensity).toFixed(3);

  return (
    <div className={`relative aspect-square ${className}`} aria-label="Coetzee Creative sigil" role="img">
      {/* Sigil */}
      <Image
        src={src}
        alt="Coetzee Creative Sigil"
        fill
        priority
        className="object-contain [filter:drop-shadow(0_0_22px_rgba(230,199,106,0.06))]"
        sizes="(min-width:1280px) 480px, (min-width:1024px) 420px, (min-width:768px) 340px, (min-width:640px) 300px, 240px"
      />

      {/* 🎥 Narrow, tapered studio cone (contained; lg+ only) */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ zIndex: 5 }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-[60%] mix-blend-screen"
            style={{
              width: '110%',               // tighter beam
              height: '190%',              // long throw
              transform: `translateX(-50%) rotate(${angleDeg}deg)`,
              background: `
                radial-gradient(ellipse at top,
                  rgba(255,248,220,${a(0.24)}) 0%,
                  rgba(255,248,220,${a(0.12)}) 22%,
                  rgba(255,248,220,${a(0.04)}) 48%,
                  rgba(255,248,220,${a(0.00)}) 72%)
              `,
              filter: 'blur(22px)',        // sharper edge = more “real”
              // taper cone + vertical falloff (source → target)
              maskImage: `
                conic-gradient(from 180deg at 50% 0%,
                  rgba(0,0,0,0) 0deg,
                  rgba(0,0,0,1) 9deg,
                  rgba(0,0,0,1) 171deg,
                  rgba(0,0,0,0) 180deg),
                linear-gradient(to bottom,
                  rgba(0,0,0,1) 0%,
                  rgba(0,0,0,0.88) 38%,
                  rgba(0,0,0,0.35) 66%,
                  rgba(0,0,0,0) 100%)
              `,
              WebkitMaskImage: `
                conic-gradient(from 180deg at 50% 0%,
                  rgba(0,0,0,0) 0deg,
                  rgba(0,0,0,1) 9deg,
                  rgba(0,0,0,1) 171deg,
                  rgba(0,0,0,0) 180deg),
                linear-gradient(to bottom,
                  rgba(0,0,0,1) 0%,
                  rgba(0,0,0,0.88) 38%,
                  rgba(0,0,0,0.35) 66%,
                  rgba(0,0,0,0) 100%)
              `,
            }}
          />
          {/* small lamp hotspot */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-[59%] mix-blend-screen"
            style={{
              width: '9%',
              height: '9%',
              background: `radial-gradient(circle, rgba(255,250,230,${a(0.42)}), rgba(255,250,230,0))`,
              filter: 'blur(7px)',
            }}
          />
        </div>
      )}

      {/* ✨ base reflection (ground the mark) */}
      {reflection && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-4%]"
          style={{
            zIndex: 1,
            width: '58%',
            height: '12%',
            background: `
              radial-gradient(ellipse at center,
                rgba(255,226,150,${a(0.12)}) 0%,
                rgba(255,226,150,${a(0.06)}) 32%,
                rgba(255,226,150,${a(0.00)}) 78%)
            `,
            filter: 'blur(10px)',
            opacity: 0.9,
          }}
        />
      )}

      {/* Optional subtle gold “kiss” on hover along the center line */}
      {glint && (
        <div
          aria-hidden="true"
          className="absolute inset-x-[15%] top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <span className="block h-px w-0 bg-[#E6C76A]/60 transition-[width] duration-700 ease-out hover:w-full" />
        </div>
      )}
    </div>
  );
}

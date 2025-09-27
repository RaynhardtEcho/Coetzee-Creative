// components/ux/HeroVignette.tsx
'use client';

interface HeroVignetteProps {
  /** 0–1: opacity of grain (default 0.06) */
  grain?: number;
  /** 0–1: vignette edge strength (default 0.55) */
  vignette?: number;
}

export default function HeroVignette({
  grain = 0.06,
  vignette = 0.55,
}: HeroVignetteProps) {
  // Tiny SVG noise (feTurbulence) encoded as data URI
  const noise =
    "url(\"data:image/svg+xml;utf8," +
    "<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
    "<rect width='128' height='128' filter='url(%23n)' opacity='0.9'/>" +
    "</svg>\")";

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(120% 80% at 50% -10%, rgba(0,0,0,0.18), transparent 55%),` +
            `radial-gradient(80% 55% at 50% 100%, rgba(0,0,0,${vignette}), transparent 60%)`,
        }}
      />

      {/* Grain — only on md+ and when motion not reduced */}
      <div
        className="absolute inset-0 hidden md:block motion-reduce:hidden mix-blend-soft-light"
        style={{
          opacity: grain,
          backgroundImage: noise,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
}

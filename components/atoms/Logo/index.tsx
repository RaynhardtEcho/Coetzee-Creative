// components/atoms/Logo.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo({
  className = '',
  priority = true,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Coetzee Creative — Home"
      className={`group inline-flex  ${className}`}
    >
      {/* Responsive wordmark box */}
      <span className="relative logo-box">
        <Image
          src="/brand/logo.png"
          alt="Coetzee Creative"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 1200px) 28vw, 520px"
          priority={priority}
          className="object-contain transition-opacity duration-200 group-hover:opacity-90"
          style={{
            filter:
              'contrast(1.06) brightness(1.07) drop-shadow(0 0 10px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(212,175,55,0.18))',
            mixBlendMode: 'normal',
          }}
        />
      </span>

      <style jsx>{`
        /* Default (desktop / tablet) */
        .logo-box {
          width: clamp(220px, 28vw, 520px);
          height: clamp(44px, 6vw, 96px);
        }
        /* Up-size on phones */
        @media (max-width: 640px) {
          .logo-box {
            width: min(72vw, 300px);
            height: clamp(56px, 12vw, 72px);
          }
        }
        /* Tiny phones — a touch more room */
        @media (max-width: 400px) {
          .logo-box {
            width: min(78vw, 320px);
            height: clamp(60px, 14vw, 76px);
          }
        }
      `}</style>
    </Link>
  );
}

// components/atoms/Logo.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo({
  className = '',
  priority = true,
}: { className?: string; priority?: boolean }) {
  /**
   * We give the image its intrinsic ratio with width/height,
   * then control its rendered size with responsive height classes.
   * `w-auto` keeps the aspect ratio; height scales per breakpoint.
   */
  return (
    <Link href="/" aria-label="Coetzee Creative — Home" className={`inline-flex items-center ${className}`}>
      <Image
        src="/brand/logo-navbar-tight-trans.png"
        alt="Coetzee Creative"
        width={160}   // intrinsic (keeps aspect)
        height={48}   // intrinsic (keeps aspect)
        priority={priority}
        sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 200px"
        className="block w-auto h-8 xs:h-9 sm:h-10 md:h-12" // <- responsive heights
      />
    </Link>
  );
}

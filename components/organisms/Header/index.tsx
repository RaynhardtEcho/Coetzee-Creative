'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

import Logo from '@/components/atoms/Logo';
import Button from '@/components/atoms/Button';
import { NAV_ITEMS } from '@/components/molecules/Navigation';

const HEADER_TALL = '6.5rem';
const HEADER_COMPACT = '5.25rem';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  // Shrink threshold
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body + focus restore
  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    if (open) setTimeout(() => firstLinkRef.current?.focus(), 0);
    else triggerRef.current?.focus();
  }, [open]);

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Mirror header height to :root var for hero offset
  useEffect(() => {
    const h = scrolled ? HEADER_COMPACT : HEADER_TALL;
    document.documentElement.style.setProperty('--header-h', h);
  }, [scrolled]);

  return (
    <header
      role="banner"
      className={[
        'sticky top-0 z-[100] overflow-visible relative',
        "before:content-[''] before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-10 before:h-10 before:bg-gradient-to-b before:from-black/55 before:to-transparent",
        'transition-[background,backdrop-filter,border-color,box-shadow,height] duration-300',
        scrolled || open
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10 shadow-[0_2px_0_rgba(198,198,198,0.12)]'
          : 'bg-black/45 backdrop-blur-sm border-b border-transparent',
      ].join(' ')}
      style={{
        ['--header-h' as any]: scrolled ? HEADER_COMPACT : HEADER_TALL,
        height: scrolled ? HEADER_COMPACT : HEADER_TALL,
      }}
    >
      {/* Header row – safe-area aware, tighter gutters */}
      <div className="container-header w-full flex h-full items-center justify-between gap-2 md:gap-3">
        <Logo className=" shrink-0" priority />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Drawer trigger */}
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md px-3 py-3 text-white/90 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--rgb-border))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Primary CTA – uses btn-header for mobile-friendly sizing */}
          <Link href={'/contact' as Route} aria-label="Contact us">
            <Button as="span" variant="solid" className="btn-header">
              Contact
            </Button>
          </Link>
        </div>
      </div>

      {/* bottom hairline (neutral) */}
      <div
        className={[
          'pointer-events-none h-px w-full transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(to right, rgb(var(--rgb-border)/0) 0%, rgb(var(--rgb-border)/.35) 50%, rgb(var(--rgb-border)/0) 100%)',
        }}
        aria-hidden
      />

      <MenuOverlay open={open} onClose={() => setOpen(false)} firstLinkRef={firstLinkRef} />
    </header>
  );
}

/* -------------------- Drawer -------------------- */
function MenuOverlay({
  open,
  onClose,
  firstLinkRef,
}: {
  open: boolean;
  onClose: () => void;
  firstLinkRef: React.RefObject<HTMLAnchorElement>;
}) {
  return (
    <div
      className={['fixed inset-0 z-[60]', open ? 'pointer-events-auto' : 'pointer-events-none'].join(' ')}
      aria-hidden={!open}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className={['absolute inset-0 transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0'].join(' ')}
        style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(2px)' }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        id="site-menu"
        onClick={(e) => e.stopPropagation()}
        className={[
          'absolute right-0 top-0 h-svh w-[min(92vw,420px)]',
          'z-[61] isolate overflow-hidden border-l border-white/10',
          'transition-transform duration-200 will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        style={{ background: 'linear-gradient(180deg, #121212 0%, #0A0A0A 100%)' }}
      >
        {/* Header */}
        <div className="relative z-[1] flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-sm text-white/75">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md px-2.5 py-2 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Primary (overlay)" className="relative z-[1] px-4 py-4 overflow-y-auto">
          <ul className="flex flex-col">
            {NAV_ITEMS.map(({ href, label }, idx) => (
              <li key={href} className="border-b border-white/10">
                <Link
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={href as Route}
                  className="block rounded-md px-4 py-3 text-[15px] text-white/90 hover:text-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-colors"
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-2 pt-5">
            <Link href={'/contact' as Route} aria-label="Contact us">
              <Button as="span" variant="outline" className="w-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="relative z-[1] mt-auto px-6 py-4 border-t border-white/10 text-xs text-white/70 pb-[env(safe-area-inset-bottom)]">
          © {new Date().getFullYear()} Coetzee Creative
        </div>
      </aside>
    </div>
  );
}

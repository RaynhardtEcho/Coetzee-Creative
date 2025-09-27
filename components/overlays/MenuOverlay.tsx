'use client';

import {useEffect, useMemo, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {Route} from 'next';
import Button from '@/components/atoms/Button';
import { NAV_ITEMS } from '@/components/molecules/Navigation';

type Item = { href: Route; label: string };

export default function MenuOverlay({
  open,
  onClose,
  items = NAV_ITEMS as readonly Item[],
  ctaHref = '/contact' as Route,
  ctaLabel = 'Contact Us',
}: {
  open: boolean;
  onClose: () => void;
  items?: readonly Item[];
  ctaHref?: Route;
  ctaLabel?: string;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstInteractiveRef = useRef<HTMLAnchorElement>(null);

  // Close automatically on route change
  useEffect(() => { if (open) onClose(); /* eslint-disable-next-line */ }, [pathname]);

  // Focus management + basic focus trap
  useEffect(() => {
    if (!open) return;

    // Focus first item after mount
    const id = requestAnimationFrame(() => firstInteractiveRef.current?.focus());

    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap focus within panel
      const root = panelRef.current;
      if (!root) return;

      const focusables = Array.from(
  root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

if (focusables.length === 0) return;

const first = focusables[0]!;                           // <- assert not undefined
const last  = focusables[focusables.length - 1]!;       // <- assert not undefined
const current = document.activeElement as HTMLElement | null;

if (!e.shiftKey && current === last) {
  e.preventDefault();
  first.focus();
} else if (e.shiftKey && current === first) {
  e.preventDefault();
  last.focus();
}

    };

    document.addEventListener('keydown', keydown);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('keydown', keydown);
    };
  }, [open, onClose]);

  // Classes (avoid recompute on every render)
  const containerCls = useMemo(
    () =>
      [
        'fixed inset-0 z-[70] flex justify-end transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' '),
    [open]
  );

  const panelCls = useMemo(
    () =>
      [
        // anchor right via flex + ml-auto; slide using transform only
        'relative z-10 ml-auto h-full w-[92vw] max-w-[420px] transform-gpu',
        'flex flex-col overflow-y-auto',
        'bg-neutral-950 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]',
        "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-b after:from-white/[0.03] after:via-transparent after:to-white/[0.03]",
        open ? 'translate-x-0' : 'translate-x-[105%]',
        'transition-transform duration-200 ease-out',
      ].join(' '),
    [open]
  );

  return (
    <div className={containerCls} aria-hidden={!open}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Site menu" className={panelCls}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-sm text-white/80">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md px-2.5 py-2 text-white/90 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6C6C6]/60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Primary (overlay)" className="px-4 py-3">
          <ul className="flex flex-col">
            {items.map(({ href, label }, i) => (
              <li key={href} className="border-b border-white/10">
                <Link
                  ref={i === 0 ? firstInteractiveRef : undefined}
                  href={href}
                  className="block px-3 py-3 text-[17px] rounded-md text-white/92 hover:text-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6C6C6]/60"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-3 pt-4">
            <Link href={ctaHref} aria-label={ctaLabel}>
              <Button as="span" variant="outline" className="w-full">
                {ctaLabel}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-5 py-4 border-t border-white/10 text-xs text-white/65 pb-[env(safe-area-inset-bottom)]">
          © {new Date().getFullYear()} Coetzee Creative
        </div>
      </div>
    </div>
  );
}

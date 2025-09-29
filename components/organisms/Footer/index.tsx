'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Route } from 'next';

// tiny analytics helper (safe no-op if datalayer missing)
function trackEvent(name: string, props?: Record<string, any>) {
  try { (window as any)?.dataLayer?.push({ event: name, ...props }); } catch {}
}

// Minimal inline icons (keeps bundle lean)
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.6a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.2-7.8a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"/>
      <path fill="currentColor" d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6A5.2 5.2 0 0 1 16.8 22H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm9.6 2H7.2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6A3.2 3.2 0 0 0 20 16.8V7.2A3.2 3.2 0 0 0 16.8 4Z"/>
    </svg>
  );
}
function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 3.2 18.1L2 22l3.9-1a10.9 10.9 0 0 0 5.3 1.4h.005A11 11 0 0 0 20.5 3.5Zm-8.3 17.1h-.005a9.07 9.07 0 0 1-4.6-1.3l-.33-.19-2.3.6.61-2.25-.21-.34A9.06 9.06 0 1 1 12.2 20.6ZM17 14.2c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.12-.55.12-.16.25-.64.8-.79.97-.15.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.46-1.39-1.71-.15-.25-.02-.38.11-.5.12-.12.25-.29.37-.44.13-.15.17-.25.25-.41.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.83-.2-.5-.41-.43-.55-.44l-.47-.01c-.17 0-.44.06-.67.3-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.28 3.68.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3Z"/>
    </svg>
  );
}

type FooterProps = {
  instagramUrl?: string;
  whatsappNumberE164?: string; // "27814080806"
  email?: string;
  phoneDisplay?: string;       // "+27 82 123 4567"
};

const PRIVACY: Route = '/privacy';
const TERMS: Route = '/terms';

export default function Footer({
  instagramUrl = 'https://www.instagram.com/coetzee.creative',
  whatsappNumberE164 = '27814080806',
  email = 'raynhardt34@coetzeecreative.co.za',
  phoneDisplay = '+27 81 408 0806',
}: FooterProps) {
  const waHref = useMemo(() => {
    const msg = encodeURIComponent("Hi Coetzee Creative — I'd like a quote.");
    return `https://wa.me/${whatsappNumberE164}?text=${msg}`;
  }, [whatsappNumberE164]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent('Project inquiry — Coetzee Creative');
    return `mailto:${email}?subject=${subject}`;
  }, [email]);

  const telHref = useMemo(() => `tel:${phoneDisplay.replace(/\s+/g, '')}`, [phoneDisplay]);

  return (
    <footer className="relative bg-neutral-950 text-white/80">
      {/* Full-width neutral hairline (uses system neutral) */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, rgb(var(--rgb-border)/0) 0%, rgb(var(--rgb-border)/.35) 50%, rgb(var(--rgb-border)/0) 100%)',
        }}
        aria-hidden
      />

      {/* Top area */}
      <div className="container py-10 md:py-14">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12">
          {/* Brand + microcopy */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-heading tracking-wide text-2xl text-white">Coetzee Creative</div>
            <p className="text-white/60 max-w-prose">
              Strategic web design for ambitious South African brands.
            </p>
            <p className="text-white/40 text-sm">Built in South Africa.</p>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-3">
            <div className="text-white/60 mb-3">Explore</div>
            <ul className="space-y-2">
              <li><Link href={'/services' as Route} className="hover:text-white transition">Services</Link></li>
              <li><Link href={'/portfolio' as Route} className="hover:text-white transition">Portfolio</Link></li>
              <li><Link href={'/contact' as Route} className="hover:text-white transition">Contact</Link></li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="lg:col-span-4">
            <div className="text-white/60 mb-3">Connect</div>
            <div className="flex flex-wrap items-center gap-3">
              {/* WhatsApp — neutral outline (uses your neutral outline helper) */}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('footer_click', { target: 'whatsapp' })}
                className="btn btn-outline-neutral h-12 px-5 rounded-2xl font-semibold inline-flex items-center gap-2"
                aria-label="Chat on WhatsApp (opens in new tab)"
              >
                <IconWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>

              {/* Email — primary CTA (gold) */}
              <a
                href={mailHref}
                onClick={() => trackEvent('footer_click', { target: 'email' })}
                className="btn btn-solid h-12 px-5 rounded-2xl font-semibold inline-flex items-center gap-2 text-black"
                aria-label="Email Coetzee Creative"
              >
                {/* simple mail glyph in black to match solid gold button */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.23l7.4 5.55a1 1 0 0 0 1.2 0L20 8.23V18H4Z"/>
                </svg>
                Email
              </a>

              {/* Instagram — neutral icon button */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('footer_click', { target: 'instagram' })}
                className="inline-flex items-center justify-center rounded-2xl h-12 w-12
                           border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06] transition"
                aria-label="Instagram (opens in new tab)"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-3 text-sm text-white/45">
              Prefer a call?{' '}
              <a href={telHref} className="hover:text-white">{phoneDisplay}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10">
        <div className="container py-5 md:py-6 text-center text-sm text-white/50 pb-[env(safe-area-inset-bottom)]">
          © {new Date().getFullYear()} Coetzee Creative • Built in South Africa
          <span className="mx-2">•</span>
          <Link href={PRIVACY} className="hover:text-white">Privacy</Link>
          <span className="mx-2">/</span>
          <Link href={TERMS} className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

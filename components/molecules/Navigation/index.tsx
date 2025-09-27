'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

export type NavItem = { href: Route; label: string };

export const NAV_ITEMS = [
  { href: '/' as Route,          label: 'Home' },
  { href: '/portfolio' as Route, label: 'Portfolio' },
  { href: '/services'  as Route, label: 'Services' },
  { href: '/about'     as Route, label: 'About' },
  { href: '/contact'   as Route, label: 'Contact' },
] as const satisfies readonly NavItem[];

export default function Navigation({
  className = '',
  items = NAV_ITEMS,
}: {
  className?: string;
  items?: readonly NavItem[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-6 xl:gap-8">
        {items.map(({ href, label }) => {
          const hrefStr = href as unknown as string;
          const isActive = hrefStr === '/' ? pathname === '/' : pathname.startsWith(hrefStr);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'relative px-3 py-2 rounded-md',
                  'text-white/85 hover:text-white transition-colors duration-200',
                  // underline (neutral)
                  'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0',
                  'after:bg-[#8A8A8A] after:opacity-50 after:transition-all after:duration-300',
                  'hover:after:w-full hover:after:opacity-100 focus-visible:after:w-full focus-visible:after:opacity-100',
                  // active (white text + neutral underline)
                  isActive ? 'text-white after:w-full after:opacity-100 after:bg-[#8A8A8A]' : '',
                  // neutral focus ring (no gold)
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6C6C6]/60',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                ].join(' ')}
              >
                <span className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-[1px]">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

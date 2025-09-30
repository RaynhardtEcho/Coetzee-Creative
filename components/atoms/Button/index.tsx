// components/atoms/Button.tsx
'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

type As = 'button' | 'a' | 'span';
type Variant = 'solid' | 'outline';
type Tone = 'gold' | 'neutral';
type Size = 'md' | 'lg';

type Props = {
  as?: As;
  href?: string;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  event?: { name: string; props?: Record<string, any> };
} & React.ComponentPropsWithoutRef<'button'>;

// ↓ Slightly more compact on very small screens; normal from sm: and up
const sizes: Record<Size, string> = {
  md: 'h-9 px-3 text-[13px] sm:h-10 sm:px-4 sm:text-sm',
  lg: 'h-11 px-4 text-[15px] sm:h-12 sm:px-5 sm:text-base',
};

function base(variant: Variant, tone: Tone) {
  if (variant === 'solid') {
    return 'bg-[#D4AF37] text-black shadow-[0_0_0_1px_rgba(212,175,55,.25)] hover:-translate-y-[1px] transition';
  }
  // outline
  return tone === 'neutral'
    ? 'border border-white/20 text-white hover:bg-white/5'
    : 'border border-[#D4AF37]/70 text-white hover:bg-[#D4AF37] hover:text-black';
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      as = 'button',
      href,
      variant = 'outline',
      tone = 'gold',
      size = 'md',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = clsx(
      // prevent shrink so it won’t compress near the screen edge
      'relative inline-flex shrink-0 items-center justify-center rounded-xl font-medium',
      'transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#C6C6C6]/60',
      sizes[size],
      base(variant, tone),
      className
    );

    const content = (
      <>
        {children}
        {variant === 'solid' && (
          <span aria-hidden className="btn-premium__shine absolute inset-0 pointer-events-none" />
        )}
      </>
    );

    if (as === 'a' && href) {
      return (
        <a ref={ref as any} href={href} className={classes} {...(rest as any)} rel="noopener">
          {content}
        </a>
      );
    }
    if (as === 'span') {
      return (
        <span ref={ref as any} className={classes} {...(rest as any)}>
          {content}
        </span>
      );
    }
    return (
      <button ref={ref as any} className={classes} {...rest}>
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;

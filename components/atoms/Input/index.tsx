'use client';
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input = forwardRef<HTMLInputElement, Props>(function Input({ label, className, ...props }, ref) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-white/70">{label}</span>}
      <input
        ref={ref}
        className={cn("w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/60", className)}
        {...props}
      />
    </label>
  );
});

export default Input;

// components/atoms/Icon/Check.tsx
'use client';
import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export default function Check({ className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"   // inherits from parent color
      strokeWidth={2}
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

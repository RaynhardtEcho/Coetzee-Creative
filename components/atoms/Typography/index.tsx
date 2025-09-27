import { ReactNode } from 'react';

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{children}</h1>;
}
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{children}</h2>;
}
export function Text({ children }: { children: ReactNode }) {
  return <p className="text-base/7 text-white/80">{children}</p>;
}

import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[60vh]">
      {children}
    </main>
  );
}

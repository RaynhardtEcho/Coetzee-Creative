// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { inter, playfair } from './fonts';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import LenisWrapper from '@/components/ux/LenisWrapper';

export const metadata: Metadata = { /* … */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header /> {/* <- STAYS OUTSIDE */}
        <LenisWrapper>
          <main id="content">{children}</main>
          <Footer />
        </LenisWrapper>
      </body>
    </html>
  );
}

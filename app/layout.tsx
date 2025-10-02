// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { inter, playfair } from './fonts';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import LenisWrapper from '@/components/ux/LenisWrapper';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.coetzeecreative.co.za'), // ← your prod domain
  title: {
    default: 'Coetzee Creative — Strategic Web Design (South Africa)',
    template: '%s — Coetzee Creative',
  },
  description:
    'Premium, ROI-focused websites for South African businesses. Strategy, design clarity, and reliable development.',
  applicationName: 'Coetzee Creative',
  keywords: ['web design', 'South Africa', 'Bloemfontein', 'Next.js', 'conversion'],
  authors: [{ name: 'Coetzee Creative' }],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: 'Coetzee Creative',
    title: 'Coetzee Creative — Strategic Web Design (South Africa)',
    description:
      'Premium, ROI-focused websites for South African businesses. Strategy, design clarity, and reliable development.',
    images: [{ url: '/og/default-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coetzee Creative — Strategic Web Design',
    description:
      'Premium, ROI-focused websites for South African businesses.',
    images: ['/og/default-og.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#d4af37' }],
  },
  category: 'technology',
  creator: 'Coetzee Creative',
};

export const viewport = {
  themeColor: '#0b0c0d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
      <Analytics/>
        <Header /> {/* <- STAYS OUTSIDE */}
        <LenisWrapper>
          <main id="content">{children}</main>
          <Footer />
        </LenisWrapper>
      </body>
      
    </html>
  );
}

import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MEDPUSH - Effectiveness in Every Action',
  description: 'AI-powered media solutions for the MENA region.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${sora.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

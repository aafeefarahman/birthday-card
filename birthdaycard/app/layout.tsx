import type { Metadata, Viewport } from 'next';
import { IM_Fell_English, Pinyon_Script, Special_Elite, Reenie_Beanie } from 'next/font/google';
import './globals.css';
import { SITE_METADATA } from '@/content';

const imFell = IM_Fell_English({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fell',
});

const pinyon = Pinyon_Script({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pinyon',
});

const specialElite = Special_Elite({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-special',
});

const reenieBeanie = Reenie_Beanie({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handwritten',
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [
      {
        url: SITE_METADATA.coverImage,
        width: 1200,
        height: 630,
        alt: 'Vintage Birthday Card Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.coverImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${imFell.variable} ${pinyon.variable} ${specialElite.variable} ${reenieBeanie.variable}`}
    >
      <body className="font-fell antialiased bg-[#1E140D] text-[#4A3426] min-h-[100dvh] overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}

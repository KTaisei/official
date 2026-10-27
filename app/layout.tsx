import type { Metadata, Viewport } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://ktaisei.github.io';
const shareImage = new URL(`${basePath}/og.png`, siteOrigin).toString();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'TAISEI / Portfolio', description: 'Designing thoughtful digital experiences.',
  openGraph: {
    type: 'website',
    siteName: 'TAISEI / Portfolio',
    locale: 'ja_JP',
    title: 'TAISEI / Portfolio',
    description: 'Designing thoughtful digital experiences.',
    images: [{ url: shareImage, width: 1730, height: 909, alt: 'TAISEI / Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAISEI / Portfolio',
    description: 'Designing thoughtful digital experiences.',
    images: [{ url: shareImage, alt: 'TAISEI / Portfolio' }],
  },
  icons: { icon: `${basePath}/favicon.svg` },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }

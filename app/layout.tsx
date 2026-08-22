import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AOKI / Portfolio', description: 'Designing thoughtful digital experiences.',
  openGraph: { title: 'AOKI / Portfolio', description: 'Designing thoughtful digital experiences.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }

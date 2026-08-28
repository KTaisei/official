import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'TAISEI / Portfolio', description: 'Designing thoughtful digital experiences.',
  openGraph: { title: 'TAISEI / Portfolio', description: 'Designing thoughtful digital experiences.', images: ['/og.png'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}<script type="module" src={`${basePath}/ai-chat/chat-widget.js`} /></body></html>; }

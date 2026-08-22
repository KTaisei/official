import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  // The local preview is accessed through the desktop app's private network.
  allowedDevOrigins: ['172.16.10.3'],
  turbopack: { root: process.cwd() },
};
export default nextConfig;

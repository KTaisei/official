import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // The local preview is accessed through the desktop app's private network.
  allowedDevOrigins: ['172.16.10.3'],
  turbopack: { root: process.cwd() },
};
export default nextConfig;

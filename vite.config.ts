import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  base: '/official/',
  plugins: [
    mdx(),
    react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
      global: true
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
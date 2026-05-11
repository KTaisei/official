import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  base: '/ofifcal/',  // ← "official" から "ofifcal" に修正（リポジトリ名と合わせる）
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    historyApiFallback: {
      index: '/ofifcal/index.html'  // ← こちらも修正
    }
  }
});

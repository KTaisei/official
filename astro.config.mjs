// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://ktaisei.github.io/official',
	integrations: [mdx(), sitemap()],
	base: '/',
});

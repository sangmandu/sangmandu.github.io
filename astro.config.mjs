// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://sangmandu.github.io',
  integrations: [mdx(), react()],
  output: 'static',
});

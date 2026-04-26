// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://sangmandu.github.io',
  integrations: [react()],
  output: 'static',
});

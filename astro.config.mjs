import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://pocolocomarket.com — static build, ready for a free host.
export default defineConfig({
  site: 'https://pocolocomarket.com',
  integrations: [sitemap()],
});

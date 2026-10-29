import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hastBasePlugin, normalizeBase } from './src/lib/root-urls.mjs';

/**
 * Where this build is published. Change these two together.
 *
 * Testing on GitHub Pages (current defaults):
 *   SITE=https://defreezellc.github.io
 *   BASE_PATH=/Poco-Loco
 *   → https://defreezellc.github.io/Poco-Loco/
 *
 * Custom domain later:
 *   SITE=https://pocolocomarket.com
 *   BASE_PATH=/
 *   → https://pocolocomarket.com/
 *
 * You can set the env vars in the shell instead of editing the defaults.
 * BASE_PATH=/ means the domain root. Do not put a trailing slash on either value.
 */
const SITE = (process.env.SITE ?? 'https://defreezellc.github.io').replace(/\/$/, '');
const BASE_PATH = normalizeBase(process.env.BASE_PATH ?? '/Poco-Loco');

export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  markdown: {
    processor: satteri({
      hastPlugins: [hastBasePlugin(BASE_PATH)],
    }),
  },
  integrations: [sitemap()],
});

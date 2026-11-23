// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteUrl } from './brand.config.mjs';

// The live address of the site, from brand.config.mjs. Used for the sitemap, canonical links
// and share previews. Override with SITE_URL for test deployments.
const site = process.env.SITE_URL || siteUrl;

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: { format: 'file' }, // about.html, events.html … so links work on any static host
  trailingSlash: 'never',
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The live address of the site. Set SITE_URL when the domain is connected,
// It is used for the sitemap, canonical links and share previews. Override with SITE_URL for test deployments.
const site = process.env.SITE_URL || 'https://aisafetyhubng.com';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: { format: 'file' }, // about.html, events.html … so links work on any static host
  trailingSlash: 'never',
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The live address of the site. Set SITE_URL when the domain is connected,
// e.g. SITE_URL=https://aisafetyhub.ng — it is used for the sitemap, canonical links and share previews.
const site = process.env.SITE_URL || 'https://aisafetyhubnigeria.org';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: { format: 'file' }, // about.html, events.html … so links work on any static host
  trailingSlash: 'never',
});

import type { APIRoute } from 'astro';
import { brand } from '../../brand.config.mjs';

/** Lets phones show the logo and name when someone adds the site to their home screen. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: brand.name,
      short_name: brand.alternateNames[0] ?? brand.name,
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#063A41',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }, null, 2),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );

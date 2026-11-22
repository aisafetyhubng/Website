# AI Safety Hub Nigeria website

Built with [Astro](https://astro.build). Static site: every page is plain HTML, so it is fast on mobile data and free to host.

## Run it locally

```powershell
npm install
npm run dev
```

Then open http://localhost:4321.

## Where things are

| What | Where |
|---|---|
| All text, events, team, programmes | `src/data/site.ts` (Sanity will replace this) |
| Pages | `src/pages/` (index, programmes, events, about, contact, 404) |
| Header, footer, newsletter and so on | `src/components/` |
| Shared page wrapper, SEO tags | `src/layouts/Base.astro` |
| Styles (teal and cream looks) | `src/styles/global.css` |
| Small behaviours (menu, look switch, timeline) | `src/scripts/site.ts` |
| Images | `public/img/` |

## Live content

- **Newsletter posts** come from the Substack RSS feed each time the site is built.
- **Events calendar** is the Luma embed on `/events` (calendar `cal-781TRaV2ceJrMvj`).

## Build

```powershell
npm run build
```

The site is written to `dist/`. Set `SITE_URL` to the live domain when building for production.

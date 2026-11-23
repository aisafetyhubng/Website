# Renaming the organisation or moving to a new domain

The site is set up so that a new name or a new web address is mostly a one-file change.
Work through the steps in order. Steps marked **(dev)** need someone comfortable with the code;
the rest are done in dashboards.

## 1. Change the name and/or domain in one file (dev)

Edit `brand.config.mjs`:

| Field | What it controls |
|---|---|
| `name` | Page titles, footer, share previews, Google's organisation data, llms.txt, the Studio's title |
| `logoLines` | How the name breaks onto two lines next to the logo |
| `alternateNames` | Other names people search for. **Add the old name here** so Google and AI assistants connect the two |
| `domain` | Canonical links, sitemap, robots.txt, llms.txt, structured data |
| `disambiguation` | The sentence telling search engines which similar-sounding organisations you are not |

Then search the code for any leftover old name (`git grep -i "old name"`). Normally only `README.md`,
`EDITING-GUIDE.md` and `package.json` mention it.

## 2. New logo? Regenerate icons and share image (dev)

1. Put the new logo (on a plain white background) at `tools/source-images/logo-original.jpg`.
   `make-icons.ps1` crops the mark from a fixed square near the top left (the `$crop` line); adjust it to fit the new file.
2. Run, from the `tools` folder (Windows PowerShell):
   ```powershell
   .\make-icons.ps1 -Src (Resolve-Path source-images\logo-original.jpg) -Dst (Resolve-Path ..\public)
   .\make-og-image.ps1 -Out (Join-Path (Resolve-Path ..\public) og-image.png) -Name 'New Name'
   ```
   `make-og-image.ps1` also takes `-Headline` and `-Tagline` if the slogan changes.
3. If the brand colour changes, update `--teal` and `--teal-deep` at the top of `src/styles/global.css`.

## 3. Text in the Studio (anyone on the team)

Most wording lives in Sanity, at the Studio. Open each of these and replace the old name where it appears:
Homepage and site settings, About page text, Programmes, Timeline, Events (titles and details).

## 4. Publish (dev)

Commit and push. Cloudflare rebuilds the site in about a minute. Redeploy the Studio so its title updates:

```powershell
cd studio; npx sanity deploy
```

## 5. Only if the domain changes

1. **Buy/connect the new domain** and add it to Cloudflare (Websites → Add a domain).
2. **Point it at the site:** Workers & Pages → `website` → Settings → Domains & Routes → add the new
   domain as a Custom domain. Repeat the www redirect rule set up for the current domain.
3. **Keep the old domain and redirect it, for at least a year.** In the old domain's Cloudflare zone,
   create a Redirect Rule: *All incoming requests* → Dynamic → `concat("https://NEWDOMAIN", http.request.uri.path)`,
   status 301, preserve query string. Every old link and Google result then lands on the same page at the new address.
   Don't let the old domain expire: someone else could buy it.
4. **Google Search Console:** add and verify the new domain (DNS TXT record), submit
   `https://NEWDOMAIN/sitemap-index.xml`, then on the **old** property use *Settings → Change of address*.
5. **Bing Webmaster Tools:** add the new site and use its *Site move* tool.
6. **Sanity:** Manage → API → CORS origins: add the new domain if the Studio or site preview needs it.
7. **Email:** set up Email Routing for the new domain if you use addresses on it.

## 6. Everywhere else (anyone on the team)

Update the name, logo and website link on: LinkedIn, Instagram, Substack (name and custom domain),
Luma calendar, YouTube channel, GitHub organisation and the APEx pages, Google Business profile if any,
email signatures, partner websites that link to you, and grant/donation profiles.

The Studio address (`aisafetyhubng.sanity.studio`) can stay as it is: it is only seen by the team.
To change it, edit `studioHost` in `studio/sanity.cli.ts` and redeploy the Studio.

/**
 * The organisation's name and web address, in one place.
 * Renaming or moving to a new domain? Change this file, then follow REBRANDING.md.
 * Used by the website (astro.config.mjs, pages, structured data, robots.txt, llms.txt)
 * and by the Sanity Studio.
 */
export const brand = {
  /** Full name, exactly as it should appear in titles and text. */
  name: 'AI Safety Hub Nigeria',
  /** How the name breaks onto two lines next to the logo mark in the header and footer. */
  logoLines: ['AI Safety Hub', 'Nigeria'],
  /** Other names people search for. Helps Google and AI assistants recognise the organisation. */
  alternateNames: ['ASH Nigeria', 'AISHN', 'AI Safety Hub NG'],
  /** Main domain, without https:// or www. */
  domain: 'aisafetyhubng.com',
  /** Optional: a sentence that tells search engines who you are not (similar-sounding organisations). */
  disambiguation:
    'It is a separate organisation from AI Safety Nigeria (aisafetynigeria.com), with which it has collaborated on events.',
};

export const siteUrl = `https://${brand.domain}`;

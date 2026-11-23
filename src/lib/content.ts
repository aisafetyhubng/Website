/**
 * Loads the site's editable content.
 *
 * Content comes from Sanity, the team's editing dashboard (project k3pcsve9). Anything missing in Sanity, or a failed request, falls back
 * to the built-in copy in src/data/site.ts, so a build never breaks because of Sanity.
 */
import * as local from '../data/site';
import type { EventItem, Marker } from '../data/site';

// The project ID is public (it appears in every request), so it can live in the code.
// Set SANITY_PROJECT_ID=none to build from the built-in content only.
const envProject = import.meta.env.SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const projectId = envProject === 'none' ? undefined : envProject || 'k3pcsve9';
const dataset = import.meta.env.SANITY_DATASET ?? process.env.SANITY_DATASET ?? 'production';
const apiVersion = '2025-02-19';

type SanityImage = { asset?: { _ref?: string }; hotspot?: { x: number; y: number }; alt?: string } | null;

/** Builds a CDN address for a Sanity image, cropped around its hotspot. */
export function imageUrl(img: SanityImage, w: number, h?: number): string | undefined {
  const ref = img?.asset?._ref;
  if (!ref || !projectId) return undefined;
  const [, id, dims, ext] = ref.split('-'); // image-<id>-<w>x<h>-<ext>
  const params = new URLSearchParams({ w: String(w), auto: 'format', q: '82' });
  if (h) {
    params.set('h', String(h));
    params.set('fit', 'crop');
    if (img?.hotspot) {
      params.set('crop', 'focalpoint');
      params.set('fp-x', img.hotspot.x.toFixed(3));
      params.set('fp-y', img.hotspot.y.toFixed(3));
    }
  }
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${ext}?${params}`;
}

async function query<T>(groq: string): Promise<T | null> {
  if (!projectId) return null;
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const json = (await res.json()) as { result: T };
    return json.result;
  } catch (err) {
    console.warn(`[content] Sanity unavailable, using built-in content: ${(err as Error).message}`);
    return null;
  }
}

const TILE: Record<Marker, string> = { apex: 't-apex', read: 't-read', events: 't-events', watch: 't-watch' };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function eventDate(date: string, monthOnly?: boolean) {
  const [y, m, d] = date.split('-').map(Number);
  return monthOnly ? { day: MONTHS[m - 1], month: String(y) } : { day: String(d), month: MONTHS[m - 1] };
}
function longDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

type Raw = {
  settings: any;
  about: any;
  programmes: any[];
  events: any[];
  team: any[];
  partners: any[];
  quotes: any[];
  timeline: any[];
};

const GROQ = `{
  "settings": *[_id == "siteSettings"][0],
  "about": *[_id == "aboutPage"][0],
  "programmes": *[_type == "programme"] | order(order asc),
  "events": *[_type == "event" && defined(date)] | order(date asc),
  "team": *[_type == "teamMember"] | order(order asc),
  "partners": *[_type == "partner"] | order(order asc),
  "quotes": *[_type == "quote"] | order(order asc),
  "timeline": *[_type == "timelineEntry"] | order(date asc)
}`;

let cached: Promise<ReturnType<typeof build>> | undefined;

/** All content for the site, loaded once per build. */
export function getContent() {
  cached ??= query<Raw>(GROQ).then(build);
  return cached;
}

function build(raw: Raw | null) {
  const s = raw?.settings ?? {};
  const a = raw?.about ?? {};
  const today = new Date().toISOString().slice(0, 10);

  const site = {
    ...local.site,
    email: s.email || local.site.email,
    location: s.location || local.site.location,
    links: {
      ...local.site.links,
      apexProgram: s.apexLink || local.site.links.apexProgram,
      readingGroup: s.readingGroupLink || local.site.links.readingGroup,
    },
  };

  const announcement = raw?.settings
    ? {
        enabled: s.announcementEnabled !== false && Boolean(s.announcementTitle),
        title: s.announcementTitle ?? '',
        text: s.announcementText ?? '',
        linkLabel: s.announcementLinkLabel || 'Find out more →',
        href: s.announcementLink || '/',
      }
    : local.announcement;

  const stat = s.statNumber
    ? { number: s.statNumber, text: s.statText ?? '', detail: s.statDetail ?? '', linkLabel: s.statLinkLabel ?? 'Find out more →', href: s.statLink || site.links.apexProgram }
    : local.stat;

  const programmes = raw?.programmes?.length
    ? raw.programmes.map((p) => {
        const marker = (p.colour as Marker) || 'events';
        return {
          name: p.name,
          nameItalic: p.nameItalic || undefined,
          marker,
          tile: TILE[marker],
          tileText: p.tileText ?? '',
          rowText: p.rowText ?? p.tileText ?? '',
          aboutText: p.aboutText ?? p.rowText ?? '',
          status: p.status ?? '',
          statusDetail: p.statusDetail ?? '',
          menuStatus: p.menuStatus ?? p.statusDetail ?? '',
          aboutStatus: p.aboutStatus ?? p.statusDetail ?? '',
          href: p.link || '/programmes',
          linkLabel: p.linkLabel || 'Find out more →',
        };
      })
    : local.programmes;

  let upcomingEvents: EventItem[] = local.upcomingEvents;
  let recentEvents: EventItem[] = local.recentEvents;
  let earlierEvents: EventItem[] = local.earlierEvents;
  let pastEventCards = local.pastEventCards;
  let featuredPastEvent: typeof local.featuredPastEvent | null = local.featuredPastEvent;

  if (raw?.events?.length) {
    const toItem = (e: any, prefix = ''): EventItem => ({
      ...eventDate(e.date, e.monthOnly),
      title: e.title,
      details: prefix + (e.details ?? ''),
      href: e.link || undefined,
    });
    // An event counts as upcoming until the end of its day (or month, when only the month is known).
    const isUpcoming = (e: any) => (e.monthOnly ? e.date.slice(0, 7) >= today.slice(0, 7) : e.date >= today);
    const upcoming = raw.events.filter((e) => isUpcoming(e) && !e.featured?.enabled);
    const pastAll = raw.events.filter((e) => !isUpcoming(e)).reverse(); // newest first
    const past = pastAll.filter((e) => !e.featured?.enabled); // featured events get their own box

    upcomingEvents = upcoming.map((e) => toItem(e));
    recentEvents = past.filter((e) => e.showOnHomepage).slice(0, 3).map((e) => ({ ...toItem(e, 'Past · '), href: '/events' }));
    pastEventCards = past
      .filter((e) => e.image?.asset)
      .map((e) => ({
        title: e.cardTitle || e.title,
        date: [longDate(e.date), e.cardLabel].filter(Boolean).join(' · '),
        image: imageUrl(e.image, 800, 450) ?? '',
        alt: e.image?.alt || e.title,
        href: e.link || site.links.linkedinPosts,
      }));
    earlierEvents = past.filter((e) => !e.image?.asset).map((e) => ({ ...toItem(e), details: `${e.details ?? ''}${e.monthOnly ? '' : ` · ${e.date.slice(0, 4)}`}` }));
    const f = pastAll.find((e) => e.featured?.enabled);
    featuredPastEvent = f
      ? {
          kicker: f.featured.kicker ?? '',
          title: f.title,
          facts: (f.featured.facts ?? []).map((x: any) => ({ label: x.label, big: x.big || undefined, text: x.text })),
          photos: (f.featured.photos ?? []).map((p: any) => ({ src: imageUrl(p, 720, 553) ?? '', alt: p.alt ?? '' })),
        }
      : null;
  }

  const team = raw?.team?.length
    ? raw.team.map((t) => ({ name: t.name, role: t.role ?? '', bio: t.bio ?? '', photo: imageUrl(t.photo, 128, 128) ?? '', linkedin: t.linkedin ?? '' }))
    : local.team;

  const partners = raw?.partners?.length
    ? raw.partners.map((p) => ({ name: p.name, role: p.role ?? '', logo: imageUrl(p.logo, 400) ?? '', height: p.logoHeight || 36, website: p.website || '#' }))
    : local.partners;

  const quotes = raw?.quotes?.length
    ? raw.quotes.map((q) => ({ text: q.text, name: q.name ?? '', role: q.role ?? '', image: imageUrl(q.photo, 168, 224) ?? '' }))
    : local.quotes;

  const timeline = raw?.timeline?.length
    ? raw.timeline.map((t) => ({ short: t.short ?? '', label: t.label ?? '', when: t.when ?? '', title: t.title ?? '', text: t.text ?? '' }))
    : local.timeline;

  const about = {
    intro: a.intro || local.about.intro,
    why: a.why?.length ? a.why : local.about.why,
    pillars: a.pillars?.length ? a.pillars : local.about.pillars,
    vision: a.vision || local.about.vision,
    story: a.story?.length ? a.story : local.about.story,
    support: a.support || local.about.support,
  };

  return {
    fromSanity: Boolean(raw),
    site,
    announcement,
    stat,
    programmes,
    upcomingEvents,
    recentEvents,
    earlierEvents,
    pastEventCards,
    featuredPastEvent,
    team,
    partners,
    quotes,
    timeline,
    about,
    apex: local.apex,
    contactChannels: local.contactChannels,
  };
}

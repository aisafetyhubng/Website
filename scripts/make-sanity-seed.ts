/**
 * Turns the built-in content (src/data/site.ts) into a Sanity import file, including images.
 * Run:   node scripts/make-sanity-seed.ts
 * Then:  cd studio && npx sanity dataset import ../sanity-seed.ndjson production --replace
 * Fixed _ids make the import safe to repeat: it updates the same documents instead of duplicating them.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as c from '../src/data/site.ts';

const root = resolve(import.meta.dirname, '..');
const img = (publicPath: string, extra: Record<string, unknown> = {}) => ({
  _type: 'image',
  _sanityAsset: `image@${pathToFileURL(resolve(root, 'public', publicPath.replace(/^\//, ''))).href}`,
  ...extra,
});
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const docs: Record<string, unknown>[] = [];

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  announcementEnabled: c.announcement.enabled,
  announcementTitle: c.announcement.title,
  announcementText: c.announcement.text,
  announcementLinkLabel: c.announcement.linkLabel,
  announcementLink: c.announcement.href,
  statNumber: c.stat.number,
  statText: c.stat.text,
  statDetail: c.stat.detail,
  statLinkLabel: c.stat.linkLabel,
  statLink: c.stat.href,
  email: c.site.email,
  location: c.site.location,
  apexLink: c.site.links.apexProgram,
  readingGroupLink: c.site.links.readingGroup,
});

docs.push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  intro: c.about.intro,
  why: c.about.why,
  pillars: c.about.pillars.map((p) => ({ _type: 'pillar', _key: key(p.label), ...p })),
  vision: c.about.vision,
  story: c.about.story,
  support: c.about.support,
});

c.programmes.forEach((p, i) =>
  docs.push({
    _id: `programme-${key(p.name + ' ' + (p.nameItalic ?? ''))}`,
    _type: 'programme',
    name: p.name,
    nameItalic: p.nameItalic,
    colour: p.marker,
    order: (i + 1) * 10,
    tileText: p.tileText,
    rowText: p.rowText,
    aboutText: p.aboutText,
    status: p.status || undefined,
    statusDetail: p.statusDetail,
    menuStatus: p.menuStatus,
    aboutStatus: p.aboutStatus,
    link: p.href,
    linkLabel: p.linkLabel,
  }),
);

const events = [
  {
    title: 'Transformative AI and Society Reading Group', date: '2026-11-30', monthOnly: true,
    details: 'Six weekly sessions of about 90 minutes · Online · No technical background needed', link: c.site.links.readingGroup,
  },
  {
    title: 'Beyond Global North: Building AI safety for Africa', date: '2026-09-09',
    details: 'APEx seminar with Grace Chege · Online', link: c.site.links.linkedinPosts, showOnHomepage: true,
    cardTitle: 'Beyond Global North: Building AI safety for Africa, with Grace Chege', cardLabel: 'APEx seminar',
    image: img('/img/events/beyond-global-north.jpg', { alt: 'Flyer for Beyond Global North with speaker Grace Chege' }),
  },
  {
    title: 'APEx 2026 pilot cohort', date: '2026-09-08',
    featured: {
      enabled: true,
      kicker: 'Aug–Sep 2026 · Online',
      facts: c.featuredPastEvent.facts.map((f) => ({ _type: 'fact', _key: key(f.label), ...f })),
      photos: c.featuredPastEvent.photos.map((p) => ({ ...img(p.src, { alt: p.alt }), _key: key(p.src) })),
    },
  },
  {
    title: 'Finding your way into AI safety', date: '2026-08-31',
    details: 'APEx seminar with Mmachukwu Favour Osisioma, BlueDot Impact · Online', link: c.site.links.linkedinPosts, showOnHomepage: true,
    cardTitle: 'Finding your way into AI safety, with Mmachukwu Favour Osisioma', cardLabel: 'APEx seminar',
    image: img('/img/events/finding-your-way.jpg', { alt: 'Flyer for Finding Your Way Into AI Safety with Mmachukwu Favour Osisioma' }),
  },
  {
    title: 'Beyond the Guardrails: The people shaping AI in Nigeria', date: '2026-05-01',
    details: "Workers' Day community hangout · Abuja · With The AI Collective Abuja, AI Safety Nigeria, TrustedTech Africa and the Digital Rights and Mental Health Initiative Africa",
  },
  {
    title: 'Fireside chat: the India AI Impact Summit and what it means for Africa', date: '2026-03-14',
    details: 'With Madhusudhan Pathak · Online', link: c.site.links.linkedinPosts, cardLabel: 'Online',
    image: img('/img/events/fireside-chat-thumb.jpg', { alt: 'Fireside chat flyer with Madhusudhan Pathak' }),
  },
  {
    title: 'Introduction to AI safety: what you need to know as a Nigerian', date: '2025-12-20',
    details: 'Our first public webinar, with Tomilayo Olatunde, Habeeb Abdulfatah and Fola Amao · Online',
  },
];
events.forEach((e) => docs.push({ _id: `event-${e.date}-${key(e.title).slice(0, 24)}`, _type: 'event', ...e }));

c.team.forEach((t, i) =>
  docs.push({ _id: `team-${key(t.name)}`, _type: 'teamMember', name: t.name, role: t.role, bio: t.bio, linkedin: t.linkedin, order: (i + 1) * 10, photo: img(t.photo) }),
);

c.partners.forEach((p, i) =>
  docs.push({ _id: `partner-${key(p.name)}`, _type: 'partner', name: p.name, role: p.role, website: p.website, order: (i + 1) * 10, logoHeight: p.height, logo: img(p.logo) }),
);

c.quotes.forEach((q, i) =>
  docs.push({ _id: `quote-${key(q.name)}`, _type: 'quote', text: q.text, name: q.name, role: q.role, order: (i + 1) * 10, photo: img(q.image) }),
);

const timelineDates = ['2025-12-20', '2026-03-14', '2026-04-04', '2026-05-01', '2026-08-01', '2026-09-09', '2026-10-01', '2026-11-01'];
c.timeline.forEach((t, i) => docs.push({ _id: `timeline-${timelineDates[i]}`, _type: 'timelineEntry', date: timelineDates[i], ...t }));

const out = resolve(root, 'sanity-seed.ndjson');
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`Wrote ${docs.length} documents to ${out}`);

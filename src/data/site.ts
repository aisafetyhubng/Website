/**
 * Built-in copy of the site's content. The live site loads the same content from Sanity
 * (see src/lib/content.ts) and falls back to this file if Sanity can't be reached.
 * The organisation's name and domain come from brand.config.mjs.
 */
import { brand } from '../../brand.config.mjs';

export const site = {
  name: brand.name,
  logoLines: brand.logoLines,
  domain: brand.domain,
  description: `${brand.name} is a non-profit helping Nigerian students and early-career professionals find their way into AI safety research, governance and policy, through the free APEx Fellowship, reading groups and events.`,
  alternateNames: brand.alternateNames,
  disambiguation: `${brand.name} (${brand.domain}) runs the APEx Fellowship. ${brand.disambiguation}`,
  mission: 'Advancing AI safety research, education and governance in Nigeria and across Africa.',
  location: 'Abuja and Lagos, Nigeria',
  email: 'aisafetyhubng@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/company/ai-safety-hub-nigeria/',
    linkedinPosts: 'https://www.linkedin.com/company/ai-safety-hub-nigeria/posts/',
    instagram: 'https://instagram.com/aisafetyhubng',
    substack: 'https://aisafetyhubnigeria.substack.com/',
    github: 'https://github.com/aisafetyhubng',
    luma: 'https://luma.com/AISHNG',
    apexProgram: 'https://aisafetyhubng.github.io/apex-program',
    apexCurriculum: 'https://aisafetyhubng.github.io/apex-curriculum/',
    apexSurvey: 'https://aisafetyhubng.github.io/apex-survey',
    readingGroup: 'https://tally.so/r/VppZdj',
    /** YouTube channel, set in the Studio (Homepage and site settings → Contact and links). */
    youtube: '',
  },
  lumaCalendarId: 'cal-781TRaV2ceJrMvj',
  substackFeed: 'https://aisafetyhubnigeria.substack.com/feed',
};

/** The thin bar under the header. Set `enabled: false` to hide it. */
export const announcement = {
  enabled: true,
  title: 'Reading group',
  text: 'Transformative AI and Society · six weeks, online · starts January 2027',
  linkLabel: 'Apply to join →',
  href: site.links.readingGroup,
};

export type Marker = 'apex' | 'read' | 'events' | 'watch';

export const programmes: {
  name: string;
  /** Word shown in italics after the name on homepage tiles. */
  nameItalic?: string;
  marker: Marker;
  tile: string;
  tileText: string;
  rowText: string;
  aboutText: string;
  status: string;
  statusDetail: string;
  menuStatus: string;
  aboutStatus: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    name: 'APEx',
    nameItalic: 'Fellowship',
    marker: 'apex',
    tile: 't-apex',
    tileText: 'A free four-week programme that takes you from curious about AI safety to a written plan for where you fit in it.',
    rowText: 'Four-week pathway fellowship for Nigerian students and early-career professionals, ending in a Personal Pathway Plan.',
    aboutText: "A free, four-week virtual fellowship that ends with each fellow's Personal Pathway Plan.",
    status: '2026 pilot complete',
    statusDetail: 'Next cohort: join the waitlist',
    menuStatus: 'Next cohort: join the waitlist',
    aboutStatus: '30 participants, 13 graduates in 2026',
    href: site.links.apexProgram,
    linkLabel: 'Fellowship details →',
  },
  {
    name: 'Reading',
    nameItalic: 'group',
    marker: 'read',
    tile: 't-read',
    tileText: 'Six weekly discussions on how transformative AI could reshape work, power and governance.',
    rowText: 'Transformative AI and Society: six weekly discussions, open to every background.',
    aboutText: 'Facilitated discussions of AI safety and governance literature, open to every background.',
    status: 'Applications open',
    statusDetail: 'Starts January 2027',
    menuStatus: 'Applications open, starts January',
    aboutStatus: 'Starting January 2027',
    href: site.links.readingGroup,
    linkLabel: 'Apply to join →',
  },
  {
    name: 'Talks and seminars',
    marker: 'events',
    tile: 't-events',
    tileText: 'Webinars, fireside chats and seminars with people already working in AI safety.',
    rowText: 'Webinars, fireside chats and seminars with researchers and practitioners in the field.',
    aboutText: 'Webinars, fireside chats, seminars and community hangouts with people doing the work.',
    status: '',
    statusDetail: 'Online and in person · open to everyone',
    menuStatus: 'Online and in person',
    aboutStatus: 'Online and in person',
    href: '/events',
    linkLabel: 'See events →',
  },
  {
    name: 'Global AI Watch',
    marker: 'watch',
    tile: 't-watch',
    tileText: 'Major AI news and policy decisions, explained for people in Nigeria and across Africa.',
    rowText: 'International AI news and policy, explained for people in Nigeria and across Africa.',
    aboutText: 'International AI governance news, translated for Nigerian and African contexts.',
    status: '',
    statusDetail: 'In our newsletter',
    menuStatus: 'In our newsletter',
    aboutStatus: 'In our newsletter',
    href: site.links.substack,
    linkLabel: 'Read the newsletter →',
  },
];

export const apex = {
  pill: '2026 pilot complete · next cohort coming soon',
  fullName: 'AI Safety Pathways Exploration Programme',
  facts: [
    { label: 'Length', value: '4 weeks' },
    { label: 'Time', value: '4–5 hours a week' },
    { label: 'Format', value: 'Virtual, cohort-based' },
    { label: 'Cost', value: 'Free' },
  ],
  audienceIntro: 'The most important requirement is curiosity. We welcome people from the humanities to the hard sciences.',
  audience: [
    { name: 'Undergraduates', text: 'Students at any stage, in any discipline, who want to explore AI safety before choosing a direction.' },
    { name: 'Postgraduates', text: "Master's and PhD students working out how their research skills translate into AI safety work." },
    { name: 'Final-year students', text: 'People close to graduating who want clarity on fellowships, graduate study and roles.' },
    { name: 'Law, policy and humanities', text: 'No computer science background needed. AI safety needs economists, lawyers and social scientists too.' },
  ],
};

export const stat = {
  number: '13',
  text: 'fellows completed our first APEx cohort.',
  detail: 'APEx pilot, August to September 2026 · 30 participants',
  linkLabel: 'Our next fellowship →',
  href: site.links.apexProgram,
};

/**
 * Partner logos live in public/img/partners. `height` evens out the visual size of
 * very wide or very tall logos so they look balanced side by side.
 */
export const partners = [
  { name: 'BlueDot Impact', role: 'Seminar speaker', logo: '/img/partners/bluedot.svg', height: 21, website: 'https://bluedot.org' },
  { name: 'The AI Collective Abuja', role: 'Event co-host', logo: '/img/partners/ai-collective.svg', height: 52, website: 'https://www.aicollective.com' },
  { name: 'TrustedTech Africa', role: 'Event co-host', logo: '/img/partners/trustedtech-africa.png', height: 40, website: 'https://www.trustedtechafrica.com' },
  { name: 'AI Safety Nigeria', role: 'Event co-host', logo: '/img/partners/ai-safety-nigeria.png', height: 44, website: 'https://aisafetynigeria.com' },
  { name: 'ILINA Program', role: 'Speakers and alumni', logo: '/img/partners/ilina.png', height: 50, website: 'https://www.ilinaprogram.org' },
];

export const quotes = [
  {
    text: "If nobody can see your work, it might as well not exist. Be agentic, notice what's missing, do something about it, and don't wait for permission.",
    name: 'Mmachukwu Favour Osisioma',
    role: 'AI safety fieldbuilder, BlueDot Impact',
    image: '/img/events/speaker-mmachukwu.jpg',
  },
  {
    text: 'Breaking into this field requires agency, not permission.',
    name: 'Grace Chege',
    role: 'AI governance researcher and lawyer, at our APEx graduation seminar',
    image: '/img/events/speaker-grace.jpg',
  },
];

export type EventItem = {
  day: string;
  month: string;
  year?: string;
  title: string;
  details: string;
  href?: string;
};

export const upcomingEvents: EventItem[] = [
  {
    day: 'Jan',
    month: '2027',
    title: 'Transformative AI and Society Reading Group',
    details: 'Six weekly sessions of about 90 minutes · Online · No technical background needed',
    href: site.links.readingGroup,
  },
];

export const pastEventCards = [
  {
    title: 'Beyond Global North: Building AI safety for Africa, with Grace Chege',
    date: '9 Sep 2026 · APEx seminar',
    image: '/img/events/beyond-global-north.jpg',
    alt: 'Flyer for Beyond Global North with speaker Grace Chege',
    href: site.links.linkedinPosts,
  },
  {
    title: 'Finding your way into AI safety, with Mmachukwu Favour Osisioma',
    date: '31 Aug 2026 · APEx seminar',
    image: '/img/events/finding-your-way.jpg',
    alt: 'Flyer for Finding Your Way Into AI Safety with Mmachukwu Favour Osisioma',
    href: site.links.linkedinPosts,
  },
  {
    title: 'Fireside chat: the India AI Impact Summit and what it means for Africa',
    date: '14 Mar 2026 · Online',
    image: '/img/events/fireside-chat-thumb.jpg',
    alt: 'Fireside chat flyer with Madhusudhan Pathak',
    href: site.links.linkedinPosts,
  },
];

/**
 * Recorded talks shown on the Events page. Filled from events in Sanity that have a
 * "Recording on YouTube" link; the section is hidden while this is empty.
 */
export type Recording = { id: string; title: string; date: string; url: string };
export const recordings: Recording[] = [];

export const featuredPastEvent = {
  kicker: 'Aug–Sep 2026 · Online',
  title: 'APEx 2026 pilot cohort',
  facts: [
    { label: 'Participants', big: '30', text: 'students and early-career professionals' },
    { label: 'Graduates', big: '13', text: 'fellows completed the programme' },
    { label: 'Format', text: 'Four weeks of readings, facilitated sessions and a Personal Pathway Plan' },
    { label: 'Seminars', text: 'Mmachukwu Favour Osisioma (BlueDot Impact) and Grace Chege (AI governance researcher and lawyer)' },
  ],
  photos: [
    { src: '/img/events/apex-graduation-call.jpg', alt: 'APEx fellows on the graduation seminar call' },
    { src: '/img/events/apex-graduation-slide.jpg', alt: 'Slide: breaking into this field requires agency, not permission' },
  ],
};

/** Shown on the homepage "Upcoming events" list after any upcoming events. */
export const recentEvents: EventItem[] = [
  { day: '9', month: 'Sep', title: 'Beyond Global North: Building AI safety for Africa', details: 'Past · APEx seminar with Grace Chege · Online', href: '/events' },
  { day: '31', month: 'Aug', title: 'Finding your way into AI safety', details: 'Past · APEx seminar with Mmachukwu Favour Osisioma · Online', href: '/events' },
];

export const earlierEvents: EventItem[] = [
  {
    day: '1',
    month: 'May',
    title: 'Beyond the Guardrails: The people shaping AI in Nigeria',
    details:
      "Workers' Day community hangout · Abuja · With The AI Collectives Abuja, AI Safety Nigeria, TrustedTech Africa and the Digital Rights and Mental Health Initiative Africa",
  },
  {
    day: '20',
    month: 'Dec',
    title: 'Introduction to AI safety: what you need to know as a Nigerian',
    details: 'Our first public webinar, with Tomilayo Olatunde, Habeeb Abdulfatah and Fola Amao · Online · 2025',
  },
];

export const about = {
  intro:
    `${brand.name} helps people in Nigeria work on making advanced AI safe and beneficial. We do this by running fellowships, reading groups, events, and more.`,
  why: [
    "The rules and safety practices being set for advanced AI today will shape the next century, yet Africa, home to the world's youngest population, is largely absent from the rooms where they are decided.",
    'Nigeria has one of the largest youth populations in the world, with most of its more than 200 million people under 35. That talent could help make AI go well, but almost none of it is reaching AI safety research or governance yet.',
    'AI is already used across the continent in finance, healthcare, elections and content moderation, often without local oversight. We think African researchers, policymakers and technologists should help shape this work, not only live with its results.',
    "When we surveyed Nigerian students and young professionals, the main barrier wasn't interest. Two thirds were only partly aware of AI safety opportunities, and a third weren't aware of them at all. The most common answer was simple: “I don't know where to start.” Our programmes exist to fix that.",
  ],
  pillars: [
    { label: 'Upskilling', title: 'Build the skills', text: 'Fellowships, reading groups and workshops across technical safety, governance and policy, plus research methods and career guidance.' },
    { label: 'Assessment', title: 'Find the right path', text: "Skill audits and Personal Pathway Plans that match each person to the opportunities they're ready for, and show us where to build next." },
    { label: 'Awareness', title: 'Open the conversation', text: "Talks, writing and university events that explain what AI safety is, what it isn't, and why it matters for Nigeria." },
  ],
  vision:
    'Nigeria becomes a recognised hub for AI safety expertise in Africa, with Nigerian researchers and practitioners contributing to global AI safety research, policy and practice.',
  story: [
    `${brand.name} was started by five people from Nigeria's effective altruism community who kept running into the same problem. Nigerians were interested in AI safety, but there was almost no way in: few local programmes, few mentors, and little sense of where someone from Nigeria could contribute.`,
    "We came from different corners of that community, from university EA groups and EA Nigeria to the ILINA Program in Kenya and technology governance work at home. We decided to build the on-ramp we wished we'd had. Our first public webinar ran in December 2025. Since then we've run a fellowship, seminars, a community hangout in Abuja and a reading group.",
    'Our mission is to advance AI safety research, education and governance in Nigeria and across Africa. We work across Abuja and Lagos, and most of our programmes run online so anyone in Nigeria can join.',
  ],
  support:
    "Everything we run is free for participants. Donations pay for facilitators, speakers, internet data for remote fellows and the next APEx cohort. We'll publish what we receive and how we spend it here.",
};

export const team = [
  { name: 'Habeeb Abdulfatah', role: 'Co-founder', bio: 'AI safety researcher and mechatronics engineering student. Founder of Effective Altruism Ahmadu Bello University.', photo: '/img/team/habeeb-abdulfatah.jpg', linkedin: 'https://www.linkedin.com/in/abdulfatah-habeeb/' },
  { name: 'Tomilayo Olatunde', role: 'Co-founder', bio: 'AI governance researcher and Junior Research Scholar at the ILINA Program. LL.B, First Class Honours, University of Ibadan.', photo: '/img/team/tomilayo-olatunde.jpg', linkedin: 'https://www.linkedin.com/in/tomilayo-olatunde/' },
  { name: 'Folajomi Amao', role: 'Co-founder', bio: 'AI safety and governance researcher working across programmes and operations.', photo: '/img/team/folajomi-amao.jpg', linkedin: 'https://www.linkedin.com/in/meetfolaamao/' },
  { name: 'Adebayo Mubarak', role: 'Co-founder', bio: 'Writer, researcher and community builder in AI governance and safety, law and policy, with experience at BlueDot Impact and Effective Altruism Nigeria.', photo: '/img/team/adebayo-mubarak.jpg', linkedin: 'https://www.linkedin.com/in/adebayo-mubarak-48879a1aa/' },
  { name: 'Joseph Adeboye', role: 'Co-founder', bio: 'AI safety researcher and programme associate in policy and governance at the Tech Governance Project.', photo: '/img/team/joseph-adeboye.jpg', linkedin: 'https://www.linkedin.com/in/josephadeboye/' },
];

export const timeline = [
  { short: 'Dec 2025', label: 'First webinar', when: 'December 2025', title: 'First public webinar', text: 'Introduction to AI safety: what you need to know as a Nigerian, with Tomilayo Olatunde, Habeeb Abdulfatah and Fola Amao.' },
  { short: 'Mar', label: 'Fireside chat', when: 'March 2026', title: 'Fireside chat series begins', text: 'What happened at the India AI Impact Summit and what it means for Africa, with Madhusudhan Pathak.' },
  { short: 'Apr', label: 'Newsletter', when: 'April 2026', title: 'Newsletter and APEx survey', text: 'Issue 001 of our newsletter, and a survey of why interested Nigerians struggle to enter the field.' },
  { short: 'May', label: 'Abuja hangout', when: 'May 2026', title: 'Abuja community hangout', text: 'Beyond the Guardrails: the people shaping AI in Nigeria, co-hosted with four partner organisations.' },
  { short: 'Aug', label: 'APEx pilot', when: 'August 2026', title: 'APEx pilot cohort', text: "30 participants begin the first APEx Fellowship, with a seminar from BlueDot Impact's Mmachukwu Favour Osisioma." },
  { short: 'Sep', label: 'Graduation', when: 'September 2026', title: 'First fellows graduate', text: '13 fellows complete APEx. Grace Chege closes the programme with Beyond Global North: Building AI safety for Africa.' },
  { short: 'Oct', label: 'Facilitators', when: 'October 2026', title: 'Facilitators recruited', text: 'We recruit volunteer facilitators for our first reading group.' },
  { short: 'Jan', label: 'Reading group', when: 'January 2027', title: 'Reading group launches', text: 'Transformative AI and Society: six weekly sessions on how AI could reshape work, power, institutions and governance. Applications are open.' },
];

export const contactChannels = [
  { name: 'LinkedIn', text: 'News, event recaps and open calls', href: site.links.linkedin },
  { name: 'Substack', text: 'Our newsletter and Global AI Watch', href: site.links.substack },
  { name: 'Instagram', text: '@aisafetyhubng', href: site.links.instagram },
  { name: 'GitHub', text: 'The open APEx curriculum', href: site.links.github },
];

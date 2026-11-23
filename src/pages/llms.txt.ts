import type { APIRoute } from 'astro';
import { brand, siteUrl } from '../../brand.config.mjs';
import { getContent } from '../lib/content';

/**
 * A plain-text summary for AI assistants (llms.txt). Built from brand.config.mjs and the
 * same content as the site, so a rename or new programme updates it automatically.
 */
export const GET: APIRoute = async () => {
  const { site, programmes, team } = await getContent();
  const abs = (href: string) => (href.startsWith('/') ? `${siteUrl}${href}` : href);
  const names = team.map((t) => t.name);
  const founders = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names.join('');

  const lines = [
    `# ${brand.name}`,
    '',
    `> ${brand.name} (${brand.domain}) is a non-profit, community-driven organisation that helps Nigerian students and early-career professionals find their way into AI safety research, governance and policy. It works across ${site.location}, and most programmes run online.`,
    '',
    `${brand.name} runs the APEx Fellowship. ${brand.disambiguation}`,
    '',
    `Also known as: ${brand.alternateNames.join(', ')}.`,
    '',
    `Mission: ${site.mission}`,
    '',
    '## Programmes',
    '',
    ...programmes.map((p) => {
      const name = [p.name, p.nameItalic].filter(Boolean).join(' ');
      const status = p.aboutStatus ? ` (${p.aboutStatus})` : '';
      return `- [${name}](${abs(p.href)}): ${p.rowText}${status}`;
    }),
    '',
    '## About',
    '',
    `- [About us, team and history](${siteUrl}/about): founded in 2025 by ${founders}.`,
    `- [Events, recordings and past talks](${siteUrl}/events)`,
    `- [Contact](${siteUrl}/contact): ${site.email}`,
    '',
    '## Elsewhere',
    '',
    `- [LinkedIn](${site.links.linkedin})`,
    `- [Newsletter on Substack](${site.links.substack})`,
    `- [Events on Luma](${site.links.luma})`,
    ...(site.links.youtube ? [`- [Recordings on YouTube](${site.links.youtube})`] : []),
    `- [Open APEx curriculum](${site.links.apexCurriculum})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

/**
 * Reads the latest posts from the Substack RSS feed when the site is built.
 * If the feed can't be reached (offline build, Substack down), it returns an empty list
 * and the page simply hides the section instead of failing the build.
 */
export type Post = { title: string; link: string; date: Date; excerpt: string };

function pick(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : '';
}

function clean(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getLatestPosts(feedUrl: string, limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl, { headers: { 'user-agent': 'aishn-website-build' } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split('<item>').slice(1).map((chunk) => chunk.split('</item>')[0]);
    return items.slice(0, limit).map((item) => {
      const excerpt = clean(pick(item, 'description'));
      return {
        title: clean(pick(item, 'title')),
        link: pick(item, 'link'),
        date: new Date(pick(item, 'pubDate')),
        excerpt: excerpt.length > 180 ? excerpt.slice(0, 177).replace(/\s+\S*$/, '') + '…' : excerpt,
      };
    });
  } catch {
    return [];
  }
}

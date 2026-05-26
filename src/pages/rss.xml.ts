import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const essays = await getCollection('writing', ({ data }) => !data.draft);

  return rss({
    title: 'Kocziha Mihály — All Essays',
    description: 'Writing on AI governance, GenAI in banking, and AI transformation.',
    site: context.site,
    items: essays
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map(essay => ({
        title: essay.data.title,
        pubDate: new Date(essay.data.date),
        description: essay.data.description,
        link: `/${essay.data.language}/writing/${essay.data.slug}/`,
      })),
  });
}

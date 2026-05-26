import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const essays = await getCollection('writing', ({ data }) => {
    return data.language === 'en' && !data.draft;
  });

  return rss({
    title: 'Kocziha Mihály — Essays',
    description: 'Writing on AI governance, GenAI in banking, and AI transformation.',
    site: context.site,
    items: essays.map(essay => ({
      title: essay.data.title,
      pubDate: new Date(essay.data.date),
      description: essay.data.description,
      link: `/en/writing/${essay.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}

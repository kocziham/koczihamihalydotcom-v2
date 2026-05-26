import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const essays = await getCollection('writing', ({ data }) => {
    return data.language === 'hu' && !data.draft;
  });

  return rss({
    title: 'Kocziha Mihály — Írások',
    description: 'Írások az AI irányításról, a GenAI a bankászetban, és az AI-transzformációról.',
    site: context.site,
    items: essays.map(essay => ({
      title: essay.data.title,
      pubDate: new Date(essay.data.date),
      description: essay.data.description,
      link: `/hu/writing/${essay.slug}/`,
    })),
    customData: '<language>hu</language>',
  });
}

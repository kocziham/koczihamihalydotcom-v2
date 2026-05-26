import { getCollection } from 'astro:content';

export async function getEssays(language: 'en' | 'hu') {
  const essays = await getCollection('writing', ({ data }) => {
    return data.language === language && !data.draft;
  });
  return essays.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getEssayBySlug(slug: string, language: 'en' | 'hu') {
  const essays = await getCollection('writing', (entry) => {
    return entry.slug === slug && entry.data.language === language;
  });
  return essays[0];
}

export async function getAllEssays() {
  const essays = await getCollection('writing', ({ data }) => !data.draft);
  return essays.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getEssaysBySide(slug: string): Promise<{ en?: any; hu?: any }> {
  const essays = await getCollection('writing', (entry) => {
    return entry.slug === slug && !entry.data.draft;
  });

  if (essays.length === 0) return {};
  const essay = essays[0];
  const result = { [essay.data.language]: essay };

  if (essay.data.crossLanguageRef) {
    const paired = await getEssayBySlug(essay.data.crossLanguageRef, essay.data.language === 'en' ? 'hu' : 'en');
    if (paired) {
      result[paired.data.language] = paired;
    }
  }

  return result as { en?: any; hu?: any };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatDate(date: string, language: 'en' | 'hu'): string {
  const d = new Date(date);
  const formatter = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(d);
}

export function formatDateShort(date: string, language: 'en' | 'hu'): string {
  const d = new Date(date);
  const formatter = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(d);
}

import { defineCollection, z } from 'astro:content';

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string().datetime(),
    description: z.string(),
    pillar: z.enum(['genai-banking', 'ai-governance', 'ai-consulting', 'data-foundations']),
    language: z.enum(['en', 'hu']),
    draft: z.boolean().default(false),
    crossLanguageRef: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const pillars = {
  en: {
    'genai-banking': 'GenAI in Banking',
    'ai-governance': 'AI Governance',
    'ai-consulting': 'AI Consulting',
    'data-foundations': 'Data Foundations',
  },
  hu: {
    'genai-banking': 'GenAI a bankban',
    'ai-governance': 'AI Irányítás',
    'ai-consulting': 'AI Tanácsadás',
    'data-foundations': 'Adatfoundációk',
  },
};

export const collections = {
  writing: writingCollection,
};

export { pillars };

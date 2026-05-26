export type Language = 'en' | 'hu';

export const languages = {
  en: 'English',
  hu: 'Hungarian',
} as const;

export const translations = {
  en: {
    writing: 'Writing',
    about: 'About',
    speaking: 'Speaking',
    contact: 'Contact',
    rss: 'RSS',
    'all-writing': 'All writing',
    'latest-writing': 'Latest writing',
    'read-time': 'min read',
    'available-en-only': 'Available in English only.',
    'available-hu-only': 'Csak magyarul érhető el.',
    previous: 'Previous',
    next: 'Next',
    related: 'Related writing',
    upcoming: 'Upcoming',
    'nothing-scheduled': 'Nothing on the calendar at the moment.',
    'propose-event': 'To propose an event, write to me',
    footnotes: 'Footnotes',
    'back-to-writing': '← All writing',
  },
  hu: {
    writing: 'Írások',
    about: 'Rólam',
    speaking: 'Beszédek',
    contact: 'Kapcsolat',
    rss: 'RSS',
    'all-writing': 'Összes írás',
    'latest-writing': 'Legutóbbi írások',
    'read-time': 'perc',
    'available-en-only': 'Available in English only.',
    'available-hu-only': 'Csak magyarul érhető el.',
    previous: 'Előző',
    next: 'Következő',
    related: 'Kapcsolódó írások',
    upcoming: 'Hamarosan',
    'nothing-scheduled': 'Jelenleg semmi sincs az naptáron.',
    'propose-event': 'Esemény javaslatához írj nekem',
    footnotes: 'Lábjegyzetek',
    'back-to-writing': '← Összes írás',
  },
} as const;

export function t(key: keyof typeof translations.en, lang: Language): string {
  return translations[lang][key] || translations.en[key];
}

export function isValidLanguage(lang: any): lang is Language {
  return lang === 'en' || lang === 'hu';
}

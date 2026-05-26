export function getLocaleFromRequest(acceptLanguage: string): string {
  if (!acceptLanguage) return 'en';
  const langs = acceptLanguage.split(',').map(l => l.trim().split(';')[0].toLowerCase());
  if (langs.some(l => l.startsWith('hu'))) return 'hu';
  return 'en';
}

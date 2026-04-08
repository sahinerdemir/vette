import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'tr', 'es', 'pt', 'de', 'el', 'sq', 'ru'],
  defaultLocale: 'en',
});

export const localeNames: Record<string, string> = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español',
  pt: 'Português',
  de: 'Deutsch',
  el: 'Ελληνικά',
  sq: 'Shqip',
  ru: 'Русский',
};

import pt from './pt.json';
import en from './en.json';
import es from './es.json';

export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
};

export const translations = {
  pt,
  en,
  es,
} as const;

export type Translations = typeof pt;

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}


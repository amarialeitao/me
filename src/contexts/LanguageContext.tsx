'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Locale, locales, getTranslations, Translations } from '@/i18n';
import { BASE_PATH } from '@/lib/constants';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_PATHS: Record<Locale, string> = { pt: '/', en: '/en/', es: '/es/' };

function goToLocale(locale: Locale, replace = false) {
  const target = `${BASE_PATH}${LOCALE_PATHS[locale]}${window.location.hash}`;
  if (replace) window.location.replace(target);
  else window.location.assign(target);
}

interface LanguageProviderProps {
  children: ReactNode;
  /** Idioma da página atual (cada idioma tem a sua própria URL). */
  initialLocale: Locale;
  /** Na página principal, redireciona para o idioma salvo ou o do navegador. */
  detectLocale?: boolean;
}

export function LanguageProvider({ children, initialLocale, detectLocale = false }: LanguageProviderProps) {
  const [locale] = useState<Locale>(initialLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!detectLocale) return;

    let preferred: Locale | null = null;
    try {
      const saved = localStorage.getItem('locale') as Locale | null;
      if (saved && locales.includes(saved)) preferred = saved;
    } catch {
      // localStorage indisponível: segue para o idioma do navegador
    }
    if (!preferred) {
      const browserLang = navigator.language.split('-')[0];
      preferred = browserLang === 'pt' ? 'pt' : browserLang === 'es' ? 'es' : 'en';
    }
    if (preferred !== initialLocale) goToLocale(preferred, true);
  }, [detectLocale, initialLocale]);

  // Mantém o atributo lang da página igual ao idioma exibido
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem('locale', newLocale);
    } catch {
      // sem persistência, apenas navega
    }
    if (newLocale !== locale) goToLocale(newLocale);
  };

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

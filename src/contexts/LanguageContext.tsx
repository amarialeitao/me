'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Locale, getTranslations, Translations } from '@/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && ['pt', 'en', 'es'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'pt') setLocaleState('pt');
      else if (browserLang === 'es') setLocaleState('es');
      else setLocaleState('en');
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
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

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/SectionHeading';

// Código curto por idioma — mesma lógica do seletor no Header (mono, sem bandeira).
// A ordem de t.languages.list é fixa (Português/Inglês/Espanhol) em todos os locales.
const LANGUAGE_CODES = ['PT', 'EN', 'ES', 'FR', 'DE'];

export default function Languages() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-50 dark:bg-graphite-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="08" label="Idiomas" title={t.languages.title} />

        {/* Cards de idiomas */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {t.languages.list.map((lang, index) => (
            <div
              key={index}
              className="group w-[calc(50%-0.375rem)] sm:w-44 xl:w-48 px-3 py-5 sm:px-4 sm:py-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-300 dark:hover:border-signal-500/40 transition-colors duration-300 text-center"
            >
              <span className="block font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-graphite-400 dark:text-graphite-500 mb-3">
                {LANGUAGE_CODES[index]}
              </span>
              <h3
                className="font-display text-xl sm:text-2xl text-graphite-900 dark:text-white mb-2 transition-[font-variation-settings,color] duration-500 ease-out group-hover:text-signal-600 dark:group-hover:text-signal-400"
                style={{ fontVariationSettings: "'wght' 400" }}
                onMouseEnter={(e) => (e.currentTarget.style.fontVariationSettings = "'wght' 800")}
                onMouseLeave={(e) => (e.currentTarget.style.fontVariationSettings = "'wght' 400")}
              >
                {lang.name}
              </h3>
              <span className="block font-mono text-[11px] sm:text-xs leading-snug text-graphite-500 dark:text-graphite-400">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

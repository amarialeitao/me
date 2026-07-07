'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/SectionHeading';

export default function Languages() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-50 dark:bg-graphite-950" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="07" label="Idiomas" title={t.languages.title} />

        {/* Cards de idiomas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {t.languages.list.map((lang, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 text-center"
            >
              <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white mb-1">
                {lang.name}
              </h3>
              <span className="text-xs sm:text-sm font-mono text-signal-600 dark:text-signal-400">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

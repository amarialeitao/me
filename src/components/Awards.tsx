'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Medal } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const awardIcons = [Trophy, Medal];

export default function Awards() {
  const { t } = useLanguage();

  return (
    <section id="awards" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-900" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="07" label="Prêmios" title={t.awards.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {t.awards.items.map((award, index) => {
            const Icon = awardIcons[index % awardIcons.length];

            return (
              <div
                key={award.title}
                className="group p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-graphite-100 dark:bg-graphite-700 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-graphite-700 dark:text-graphite-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white">
                      {award.title}
                    </h3>
                    <p className="mb-2 sm:mb-3 font-mono text-[10px] sm:text-xs text-signal-600 dark:text-signal-400">
                      {award.issuer}
                    </p>
                    <p className="text-xs sm:text-sm text-graphite-600 dark:text-graphite-400">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

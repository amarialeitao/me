'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages as LanguagesIcon } from 'lucide-react';

const levelColors: Record<string, { bar: string; text: string }> = {
  Nativo: { bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400', text: 'text-emerald-600 dark:text-emerald-400' },
  Native: { bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400', text: 'text-emerald-600 dark:text-emerald-400' },
  Fluente: { bar: 'bg-gradient-to-r from-amber-500 to-amber-400', text: 'text-amber-600 dark:text-amber-400' },
  Fluent: { bar: 'bg-gradient-to-r from-amber-500 to-amber-400', text: 'text-amber-600 dark:text-amber-400' },
  Fluido: { bar: 'bg-gradient-to-r from-amber-500 to-amber-400', text: 'text-amber-600 dark:text-amber-400' },
  Intermediário: { bar: 'bg-gradient-to-r from-blue-500 to-blue-400', text: 'text-blue-600 dark:text-blue-400' },
  Intermediate: { bar: 'bg-gradient-to-r from-blue-500 to-blue-400', text: 'text-blue-600 dark:text-blue-400' },
  Intermedio: { bar: 'bg-gradient-to-r from-blue-500 to-blue-400', text: 'text-blue-600 dark:text-blue-400' },
};

const levelWidth: Record<string, string> = {
  Nativo: 'w-full',
  Native: 'w-full',
  Fluente: 'w-full',
  Fluent: 'w-full',
  Fluido: 'w-full',
  Intermediário: 'w-[40%]',
  Intermediate: 'w-[40%]',
  Intermedio: 'w-[40%]',
};

export default function Languages() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-50 to-white dark:from-midnight-950 dark:to-midnight-900" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl font-display font-bold text-midnight-900 dark:text-white">
            <LanguagesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-amber-500 flex-shrink-0" />
            <span>{t.languages.title}</span>
          </h2>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {t.languages.list.map((lang, index) => {
            const colors = levelColors[lang.level] || { bar: 'bg-midnight-400', text: 'text-midnight-600' };
            const width = levelWidth[lang.level] || 'w-1/2';
            
            return (
              <div
                key={index}
                className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white mb-0.5 sm:mb-1">
                    {lang.name}
                  </h3>
                  <span className={`text-xs sm:text-sm font-medium ${colors.text}`}>
                    {lang.level}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 sm:h-2 bg-midnight-200 dark:bg-midnight-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colors.bar} ${width} rounded-full transition-all duration-700 ease-out`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

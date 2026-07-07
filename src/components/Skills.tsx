'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Database, Rocket, Code2, Heart } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const categoryIcons = {
  business: Briefcase,
  data: Database,
  agile: Rocket,
  tech: Code2,
  leadership: Heart,
};

type CategoryKey = keyof typeof categoryIcons;

export default function Skills() {
  const { t } = useLanguage();

  const categories = Object.entries(t.skills.categories) as [CategoryKey, { title: string; items: string[] }][];

  return (
    <section id="skills" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-50 dark:bg-graphite-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" label="Habilidades" title={t.skills.title} />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map(([key, category]) => {
            const Icon = categoryIcons[key];

            return (
              <div
                key={key}
                className="group relative p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-graphite-100 dark:bg-graphite-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-graphite-700 dark:text-graphite-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-mono text-graphite-600 dark:text-graphite-400 bg-graphite-100 dark:bg-graphite-700/60 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

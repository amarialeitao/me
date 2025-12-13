'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Database, Rocket, Code2, Heart, Sparkles } from 'lucide-react';

const categoryIcons = {
  business: Briefcase,
  data: Database,
  agile: Rocket,
  tech: Code2,
  soft: Heart,
};

const categoryColors = {
  business: {
    bg: 'bg-amber-100 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-500/30',
    gradient: 'from-amber-500/10 to-transparent',
  },
  data: {
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    gradient: 'from-emerald-500/10 to-transparent',
  },
  agile: {
    bg: 'bg-violet-100 dark:bg-violet-500/20',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-500/30',
    gradient: 'from-violet-500/10 to-transparent',
  },
  tech: {
    bg: 'bg-blue-100 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-500/30',
    gradient: 'from-blue-500/10 to-transparent',
  },
  soft: {
    bg: 'bg-rose-100 dark:bg-rose-500/20',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-500/30',
    gradient: 'from-rose-500/10 to-transparent',
  },
};

type CategoryKey = keyof typeof categoryIcons;

export default function Skills() {
  const { t } = useLanguage();

  const categories = Object.entries(t.skills.categories) as [CategoryKey, { title: string; items: string[] }][];

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-midnight-50 dark:from-midnight-900 dark:to-midnight-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.skills.title}</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map(([key, category], index) => {
            const Icon = categoryIcons[key];
            const colors = categoryColors[key];
            
            return (
              <div
                key={key}
                className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.bg} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border rounded-md sm:rounded-lg`}
                      >
                        {skill}
                      </span>
                    ))}
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

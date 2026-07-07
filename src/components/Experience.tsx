'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-16 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-900" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" label="Experiência" title={t.experience.title} />

        {/* Lista vertical única — substitui o zigue-zague esquerda/direita
            (docs/ui-audit.md, "problemas de UX" / docs/ui-redesign-plan.md, wireframe) */}
        <div className="relative">
          {/* Rail */}
          <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-graphite-200 dark:bg-graphite-700" />

          <div className="space-y-8 sm:space-y-10">
            {t.experience.positions.map((position, index) => (
              <div key={index} className="relative pl-8 sm:pl-10">
                {/* Node */}
                <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-signal-500 ring-4 ring-white dark:ring-graphite-900" />

                <div className="group p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300">
                  {/* Header */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-graphite-900 dark:text-white mb-1">
                      {position.title}
                    </h3>
                    <p className="text-base font-medium text-signal-600 dark:text-signal-400">
                      {position.company}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm font-mono text-graphite-500 dark:text-graphite-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{position.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{position.location}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-graphite-600 dark:text-graphite-400 mb-3 sm:mb-4">
                    {position.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 sm:space-y-2">
                    {position.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-xs sm:text-sm text-graphite-700 dark:text-graphite-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-graphite-400 dark:text-graphite-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

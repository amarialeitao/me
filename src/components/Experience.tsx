'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function Experience() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const volunteering = t.experience.volunteering;

  return (
    <section id="experience" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" label={t.nav.experience} title={t.experience.title} />

        <ul className="border-t border-graphite-200 dark:border-graphite-800">
          {t.experience.positions.map((position, index) => {
            const isOpen = open === index;
            const panelId = `experience-panel-${index}`;
            return (
              <li key={`${position.title}-${position.period}`} className="border-b border-graphite-200 dark:border-graphite-800">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full grid grid-cols-[1fr_auto] md:grid-cols-[11rem_1fr_14rem_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:py-6 text-left"
                >
                  <span className="order-2 md:order-none col-span-1 font-mono text-xs text-graphite-600 dark:text-graphite-400">
                    {position.period}
                  </span>
                  <span className="order-1 md:order-none col-span-1">
                    <span className="block font-serif text-2xl sm:text-3xl leading-tight text-ink dark:text-white group-hover:text-signal-600 dark:group-hover:text-signal-400 transition-colors">
                      {position.title}
                    </span>
                    <span className="block mt-1 text-sm text-graphite-600 dark:text-graphite-400">{position.company}</span>
                  </span>
                  <span className="hidden md:block font-mono text-xs text-graphite-600 dark:text-graphite-400">
                    {position.location}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className={`order-1 md:order-none row-span-2 md:row-span-1 self-center w-5 h-5 text-graphite-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 md:pl-[calc(11rem+1.5rem)] max-w-4xl">
                      <p className="text-graphite-700 dark:text-graphite-300">{position.description}</p>
                      {position.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-graphite-400 text-sm text-graphite-600 dark:text-graphite-400">
                          {position.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                      {position.stack && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {position.stack.map((tech) => (
                            <li key={tech} className="px-2.5 py-1 rounded-md font-mono text-[11px] text-graphite-600 dark:text-graphite-300 bg-graphite-100 dark:bg-graphite-800">
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {volunteering && (
          <p className="mt-6 flex items-start gap-2 text-sm text-graphite-600 dark:text-graphite-400">
            <HeartHandshake className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span>
              <span className="font-mono uppercase tracking-wider text-xs mr-2">{volunteering.label}</span>
              <span className="text-graphite-700 dark:text-graphite-300">{volunteering.title} · {volunteering.organization}</span>
              <span className="font-mono"> · {volunteering.period}</span>
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

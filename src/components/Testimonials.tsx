'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Users } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  date?: string;
  relationship?: string;
}

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = t.testimonials.items as Testimonial[];

  return (
    <section className="relative py-16 sm:py-28 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="07" label={t.nav.testimonials} title={t.testimonials.title} />

        {/* Testimonials Grid - 3 columns on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300 overflow-hidden"
            >
              {/* Aspas tipográficas discretas — substitui o ícone decorativo rotacionado */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-3 text-7xl font-display text-graphite-100 dark:text-graphite-700 select-none leading-none pointer-events-none"
              >
                &rdquo;
              </span>

              {/* Content */}
              <div className="relative pt-3 sm:pt-4">
                {/* Meta info */}
                {(testimonial.date || testimonial.relationship) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[10px] sm:text-xs font-mono text-graphite-500 dark:text-graphite-400">
                    {testimonial.date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {testimonial.date}
                      </span>
                    )}
                    {testimonial.relationship && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {testimonial.relationship}
                      </span>
                    )}
                  </div>
                )}

                <p className="text-sm sm:text-base text-graphite-700 dark:text-graphite-300 italic leading-relaxed mb-4 sm:mb-6 line-clamp-6 sm:line-clamp-none">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-graphite-800 dark:bg-graphite-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {testimonial.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base text-graphite-900 dark:text-white leading-tight">
                      {testimonial.author}
                    </p>
                    <p className="text-[10px] sm:text-xs text-graphite-500 dark:text-graphite-400 mt-0.5 leading-tight line-clamp-2">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

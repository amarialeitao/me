'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquareQuote, Quote, Calendar, Users } from 'lucide-react';

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
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-midnight-50 dark:from-midnight-900 dark:to-midnight-950" />
      
      {/* Decorative Elements - Hidden on mobile */}
      <div className="hidden sm:block absolute top-1/4 -left-20 w-72 h-72 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white">
            <MessageSquareQuote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.testimonials.title}</span>
          </h2>
        </div>

        {/* Testimonials Grid - 3 columns on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-300 dark:hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 transform rotate-12 group-hover:rotate-0 transition-transform">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              {/* Content */}
              <div className="pt-3 sm:pt-4">
                {/* Meta info */}
                {(testimonial.date || testimonial.relationship) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[10px] sm:text-xs text-midnight-500 dark:text-midnight-400">
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

                <p className="text-sm sm:text-base text-midnight-700 dark:text-midnight-300 italic leading-relaxed mb-4 sm:mb-6 line-clamp-6 sm:line-clamp-none">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {testimonial.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base text-midnight-900 dark:text-white leading-tight">
                      {testimonial.author}
                    </p>
                    <p className="text-[10px] sm:text-xs text-midnight-600 dark:text-midnight-400 mt-0.5 leading-tight line-clamp-2">
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

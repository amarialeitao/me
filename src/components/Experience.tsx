'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-50 to-white dark:from-midnight-950 dark:to-midnight-900" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.experience.title}</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Left on mobile, center on desktop */}
          <div className="absolute left-4 sm:left-8 lg:left-1/2 lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-midnight-300 dark:to-midnight-700" />

          {/* Experience Items */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {t.experience.positions.map((position, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 sm:left-8 lg:left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full border-2 sm:border-4 border-white dark:border-midnight-900 shadow-lg z-10 top-6 sm:top-8" />

                  {/* Desktop Layout - Alternating */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Left Side */}
                    {isLeft ? (
                      <>
                        <div className="pr-12 text-right">
                          <ExperienceCard position={position} align="right" />
                        </div>
                        <div /> {/* Empty space */}
                      </>
                    ) : (
                      <>
                        <div /> {/* Empty space */}
                        <div className="pl-12">
                          <ExperienceCard position={position} align="left" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile/Tablet Layout - Always left aligned */}
                  <div className="lg:hidden ml-10 sm:ml-16">
                    <ExperienceCard position={position} align="left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Position {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

function ExperienceCard({ position, align }: { position: Position; align: 'left' | 'right' }) {
  return (
    <div className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Arrow pointing to timeline */}
      <div 
        className={`hidden lg:block absolute top-6 w-4 h-4 bg-white dark:bg-midnight-800/50 border border-midnight-200 dark:border-midnight-700 group-hover:border-amber-500 dark:group-hover:border-amber-500 transform rotate-45 transition-colors ${
          align === 'right' 
            ? '-right-2 border-l-0 border-b-0' 
            : '-left-2 border-r-0 border-t-0'
        }`}
      />

      <div className={`relative ${align === 'right' ? 'lg:text-right' : ''}`}>
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-midnight-900 dark:text-white mb-1">
            {position.title}
          </h3>
          <p className="text-base sm:text-lg font-medium text-amber-600 dark:text-amber-400">
            {position.company}
          </p>
        </div>

        {/* Meta Info */}
        <div className={`flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 ${
          align === 'right' ? 'lg:justify-end' : ''
        }`}>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{position.period}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{position.location}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-midnight-600 dark:text-midnight-400 mb-3 sm:mb-4">
          {position.description}
        </p>

        {/* Highlights */}
        <ul className={`space-y-1.5 sm:space-y-2 ${align === 'right' ? 'lg:text-left' : ''}`}>
          {position.highlights.map((highlight, hIndex) => (
            <li
              key={hIndex}
              className={`flex items-start gap-2 text-xs sm:text-sm text-midnight-700 dark:text-midnight-300 ${
                align === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

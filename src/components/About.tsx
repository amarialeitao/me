'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getAssetUrl } from '@/lib/constants';
import { Briefcase, Code2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-16 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-900" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="01" label="Sobre" title={t.about.title} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column - Photo/Visual */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-1 bg-signal-500 rounded-xl sm:rounded-2xl opacity-10" />

              {/* Profile Photo */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={getAssetUrl('/profile.png')}
                  alt="Maria Leitão - Tech Lead & Business Analyst"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Intro */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-graphite-700 dark:text-graphite-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.about.intro }}
            />

            {/* Description */}
            {t.about.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base md:text-lg text-graphite-600 dark:text-graphite-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}

            {/* Current Focus */}
            <div className="pl-4 border-l-2 border-signal-500">
              <p className="text-xs sm:text-sm md:text-base text-graphite-700 dark:text-graphite-300">
                {t.about.current}
              </p>
            </div>
          </div>
        </div>

        {/* Differentials Cards */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-graphite-900 dark:text-white text-center mb-6 sm:mb-10 px-2">
            {t.about.differentials.title}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Business Card */}
            <div className="group relative p-4 sm:p-6 md:p-8 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-graphite-100 dark:bg-graphite-700 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-graphite-700 dark:text-graphite-300" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-graphite-900 dark:text-white mb-2 sm:mb-3">
                {t.about.differentials.business.title}
              </h4>
              <p className="text-sm sm:text-base text-graphite-600 dark:text-graphite-400">
                {t.about.differentials.business.description}
              </p>
            </div>

            {/* Technical Card */}
            <div className="group relative p-4 sm:p-6 md:p-8 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-graphite-100 dark:bg-graphite-700 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-graphite-700 dark:text-graphite-300" />
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-graphite-900 dark:text-white mb-2 sm:mb-3">
                {t.about.differentials.technical.title}
              </h4>
              <p className="text-sm sm:text-base text-graphite-600 dark:text-graphite-400">
                {t.about.differentials.technical.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

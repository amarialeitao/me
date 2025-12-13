'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getAssetUrl } from '@/lib/constants';
import { Briefcase, Code2, Target, Zap } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-midnight-50/50 to-white dark:from-midnight-900 dark:via-midnight-950 dark:to-midnight-900" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.about.title}</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Column - Photo/Visual */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-amber-500/20 to-indigo-500/20 rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl opacity-20" />
              
              {/* Profile Photo */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden">
                <img 
                  src={getAssetUrl('/profile.png')}
                  alt="Maria Leitão - Tech Lead & Business Analyst"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Elements - Hidden on very small screens */}
                <div className="hidden sm:flex absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white/90 dark:bg-midnight-900/90 rounded-lg shadow-lg animate-float">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                </div>
                <div className="hidden sm:flex absolute bottom-3 sm:bottom-4 left-3 sm:left-4 p-1.5 sm:p-2 bg-white/90 dark:bg-midnight-900/90 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Intro */}
            <p 
              className="text-lg sm:text-xl md:text-2xl text-midnight-700 dark:text-midnight-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.about.intro }}
            />

            {/* Description */}
            {t.about.description.map((paragraph, index) => (
              <p 
                key={index}
                className="text-sm sm:text-base md:text-lg text-midnight-600 dark:text-midnight-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}

            {/* Current Focus */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg sm:rounded-xl">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm md:text-base text-midnight-700 dark:text-midnight-300">
                {t.about.current}
              </p>
            </div>
          </div>
        </div>

        {/* Differentials Cards */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-midnight-900 dark:text-white text-center mb-6 sm:mb-10 px-2">
            {t.about.differentials.title}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Business Card */}
            <div className="group relative p-4 sm:p-6 md:p-8 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-amber-100 dark:bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-midnight-900 dark:text-white mb-2 sm:mb-3">
                  {t.about.differentials.business.title}
                </h4>
                <p className="text-sm sm:text-base text-midnight-600 dark:text-midnight-400">
                  {t.about.differentials.business.description}
                </p>
              </div>
            </div>

            {/* Technical Card */}
            <div className="group relative p-4 sm:p-6 md:p-8 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-midnight-900 dark:text-white mb-2 sm:mb-3">
                  {t.about.differentials.technical.title}
                </h4>
                <p className="text-sm sm:text-base text-midnight-600 dark:text-midnight-400">
                  {t.about.differentials.technical.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

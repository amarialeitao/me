'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Linkedin, Github, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight-50 via-white to-amber-50/30 dark:from-midnight-950 dark:via-midnight-900 dark:to-midnight-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />

      {/* Gradient Orbs - Hidden on small screens to prevent overflow */}
      <div className="hidden sm:block absolute top-1/4 -left-20 w-72 h-72 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="hidden sm:block absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/5 to-transparent dark:from-amber-400/5 rounded-full" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 sm:mb-8 bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full animate-fade-in">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-400 whitespace-nowrap">
            Tech Lead @ Instituto Semear
          </span>
        </div>

        {/* Greeting */}
        <p className="text-base sm:text-lg md:text-xl text-midnight-600 dark:text-midnight-300 mb-3 sm:mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {t.hero.greeting}
        </p>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-6 animate-slide-up leading-tight" style={{ animationDelay: '0.2s' }}>
          <span className="text-midnight-900 dark:text-white">{t.hero.name.split(' ')[0]}</span>
          <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500"> {t.hero.name.split(' ')[1]}</span>
        </h1>

        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-midnight-700 dark:text-midnight-200 mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {t.hero.title}
        </h2>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-midnight-600 dark:text-midnight-400 mb-3 sm:mb-4 animate-slide-up px-2" style={{ animationDelay: '0.4s' }}>
          {t.hero.tagline}
        </p>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-midnight-500 dark:text-midnight-500 mb-8 sm:mb-10 animate-slide-up px-2" style={{ animationDelay: '0.5s' }}>
          <span className="italic">{t.hero.subtitle}</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.hero.cta.contact}
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-midnight-100 dark:bg-midnight-800 hover:bg-midnight-200 dark:hover:bg-midnight-700 text-midnight-900 dark:text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {t.hero.cta.projects}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <a
            href="https://www.linkedin.com/in/marialeitaoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 sm:p-3 text-midnight-600 dark:text-midnight-400 hover:text-amber-500 dark:hover:text-amber-400 bg-midnight-100 dark:bg-midnight-800 hover:bg-midnight-200 dark:hover:bg-midnight-700 rounded-xl transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://github.com/marialuizaleitao"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 sm:p-3 text-midnight-600 dark:text-midnight-400 hover:text-amber-500 dark:hover:text-amber-400 bg-midnight-100 dark:bg-midnight-800 hover:bg-midnight-200 dark:hover:bg-midnight-700 rounded-xl transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-midnight-500 dark:text-midnight-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

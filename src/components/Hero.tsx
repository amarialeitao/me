'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import PipelineFlow from '@/components/PipelineFlow';

export default function Hero() {
  const { t } = useLanguage();
  const stages = t.hero.stages as [string, string, string, string];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-10 overflow-hidden">
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-graphite-500 dark:text-graphite-400 animate-fade-in">
          {t.hero.name} <span className="mx-1 opacity-50">/</span> {t.hero.meta}
        </p>

        <h1 className="mt-6 sm:mt-8 max-w-5xl font-serif font-normal tracking-tight leading-[0.95] text-[clamp(3rem,9vw,7.5rem)] text-ink dark:text-white animate-slide-up">
          {t.hero.headline}{' '}
          <em className="italic text-signal-600 dark:text-signal-400">{t.hero.headlineAccent}</em>
        </h1>

        <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-graphite-600 dark:text-graphite-400 animate-fade-in">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-ink text-paper dark:bg-white dark:text-ink text-sm font-medium hover:bg-signal-600 dark:hover:bg-signal-400 transition-colors"
          >
            {t.hero.cta.projects}
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-graphite-300 dark:border-graphite-700 text-sm font-medium text-ink dark:text-white hover:border-ink dark:hover:border-white transition-colors"
          >
            {t.hero.cta.contact}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <PipelineFlow stages={stages} className="relative mt-10 sm:mt-12 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" />
    </section>
  );
}

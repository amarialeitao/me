'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Linkedin, Github } from 'lucide-react';
import {
  SiPython,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiN8n,
  SiGit,
} from '@icons-pack/react-simple-icons';
import DotGrid from '@/components/react-bits/DotGrid';
import SplitText from '@/components/react-bits/SplitText';
import Magnet from '@/components/react-bits/Magnet';
import RotatingText from '@/components/react-bits/RotatingText';
import LogoLoop, { LogoItem } from '@/components/react-bits/LogoLoop';

// Stack — ícones das tecnologias.
const stackData = [
  { label: 'Python', Icon: SiPython },
  { label: 'React', Icon: SiReact },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'Docker', Icon: SiDocker },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'n8n', Icon: SiN8n },
  { label: 'Git', Icon: SiGit },
];

const stackItems: LogoItem[] = stackData.map(({ label, Icon }) => ({
  node: (
    <span className="inline-flex items-center gap-2 text-graphite-400 dark:text-graphite-500">
      <Icon size={16} color="currentColor" />
      <span className="font-mono text-xs sm:text-sm whitespace-nowrap">{label}</span>
    </span>
  ),
  ariaLabel: label,
}));

export default function Hero() {
  const { t } = useLanguage();

  // Especialidades — reaproveita os títulos já existentes de skills.categories
  // (nenhum texto novo), exibidas em rotação via RotatingText (React Bits).
  const specialties = Object.values(t.skills.categories).map((c) => c.title);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background — grade de pontos */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-950" />
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12]">
        <DotGrid />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow — cargo atual, sem pill/ícone decorativo */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-signal-600 dark:text-signal-400 mb-6 sm:mb-8">
          Tech Lead @ Instituto Semear
        </p>

        {/* Greeting */}
        <p className="text-base sm:text-lg text-graphite-500 dark:text-graphite-400 mb-3 sm:mb-4">
          {t.hero.greeting}
        </p>

        {/* Name — entrada única via SplitText, sem gradiente */}
        <SplitText
          text={t.hero.name}
          tag="h1"
          splitType="words"
          className="text-5xl md:text-6xl font-display font-bold text-graphite-900 dark:text-white mb-4 sm:mb-6 leading-tight"
        />

        {/* Rest of content: uma única entrada, sem cascata de delays */}
        <div className="animate-slide-up">
          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-graphite-700 dark:text-graphite-300 mb-4 sm:mb-6">
            {t.hero.title}
          </h2>

          {/* Especialidades em rotação — reforça o posicionamento técnico, estilo "terminal" */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 font-mono text-xs sm:text-sm text-graphite-400 dark:text-graphite-500">
            <span className="text-signal-500 dark:text-signal-400" aria-hidden="true">
              {'>'}
            </span>
            <RotatingText
              texts={specialties}
              mainClassName="text-graphite-600 dark:text-graphite-300 font-medium overflow-hidden"
              staggerFrom="last"
              staggerDuration={0.015}
              splitBy="characters"
              rotationInterval={2800}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            />
          </div>

          {/* Tagline */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-graphite-600 dark:text-graphite-400 mb-3 sm:mb-4 px-2">
            {t.hero.tagline}
          </p>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-graphite-500 dark:text-graphite-500 mb-8 sm:mb-10 px-2 font-light">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Magnet padding={40} magnetStrength={6} wrapperClassName="w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-signal-500 hover:bg-signal-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                {t.hero.cta.contact}
              </a>
            </Magnet>
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-graphite-100 dark:bg-graphite-800 hover:bg-graphite-200 dark:hover:bg-graphite-700 text-graphite-900 dark:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              {t.hero.cta.projects}
            </a>
          </div>

          {/* Stack — comunica o posicionamento técnico via ícones de marca reais (Python, React, n8n, Docker...) */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12 h-6">
            <LogoLoop logos={stackItems} speed={40} gap={40} fadeOut pauseOnHover />
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/amarialeitao/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 text-graphite-500 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 bg-graphite-100 dark:bg-graphite-800 hover:bg-graphite-200 dark:hover:bg-graphite-700 rounded-lg transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://github.com/amarialeitao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 text-graphite-500 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 bg-graphite-100 dark:bg-graphite-800 hover:bg-graphite-200 dark:hover:bg-graphite-700 rounded-lg transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-graphite-400 dark:text-graphite-500 hover:text-signal-500 dark:hover:text-signal-400 transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

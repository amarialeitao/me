'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Target,
  Lightbulb,
  TrendingUp,
  ExternalLink,
  Github
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CountUp from '@/components/CountUp';

interface Project {
  title: string;
  subtitle: string;
  company: string;
  period: string;
  description: string;
  problem: string;
  approach: string[];
  impact: string;
  skills: string[];
  github?: string;
}

// Anima só o número contido na frase de impacto (ex.: "25% de redução em custos"),
// preservando o texto original de src/i18n/*.json — nenhuma alteração de conteúdo.
function ImpactValue({ impact }: { impact: string }) {
  const match = impact.match(/([+-]?\d+(?:[.,]\d+)?)/);
  if (!match || match.index === undefined) {
    return <>{impact}</>;
  }
  const before = impact.slice(0, match.index);
  const after = impact.slice(match.index + match[0].length);
  const numericValue = parseFloat(match[1].replace(',', '.'));
  const prefix = match[1].startsWith('+') ? '+' : '';

  return (
    <>
      {before}
      {prefix}
      <CountUp to={Math.abs(numericValue)} duration={1.2} />
      {after}
    </>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const projects = t.projects.items as Project[];

  return (
    <section id="projects" className="relative py-16 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-50 dark:bg-graphite-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label="Projetos" title={t.projects.title} subtitle={t.projects.subtitle} />

        {/* Projects Grid */}
        <div className="grid gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300 overflow-hidden"
            >
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Header Row */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-graphite-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-signal-600 dark:text-signal-400 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Impact Badge — único lugar do site onde o verde é usado, e só para resultado quantificado */}
                  <div className="self-start">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        <ImpactValue impact={project.impact} />
                      </span>
                    </span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm font-mono text-graphite-500 dark:text-graphite-400">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{project.company}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 sm:gap-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{project.period}</span>
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-graphite-500 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{t.projects.viewCode}</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-graphite-700 dark:text-graphite-300 mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-graphite-600 dark:text-graphite-300 bg-graphite-100 dark:bg-graphite-700 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-signal-600 dark:text-signal-400 hover:text-signal-700 dark:hover:text-signal-300 transition-colors"
                >
                  {expandedIndex === index ? (
                    <>
                      <span>Ver menos</span>
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  ) : (
                    <>
                      <span>Ver detalhes</span>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>

                {/* Expanded Content */}
                {expandedIndex === index && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-graphite-200 dark:border-graphite-700 animate-fade-in">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                      {/* Problem */}
                      <div className="p-3 sm:p-4 bg-graphite-50 dark:bg-graphite-900/60 rounded-lg border border-graphite-200 dark:border-graphite-700">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-graphite-500 dark:text-graphite-400 flex-shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-graphite-900 dark:text-white">
                            Problema
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-graphite-700 dark:text-graphite-300">
                          {project.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="p-3 sm:p-4 bg-graphite-50 dark:bg-graphite-900/60 rounded-lg border border-graphite-200 dark:border-graphite-700">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-signal-500 flex-shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-graphite-900 dark:text-white">
                            Abordagem
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {project.approach.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2 text-xs sm:text-sm text-graphite-700 dark:text-graphite-300"
                            >
                              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-signal-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="https://github.com/amarialeitao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-graphite-900 dark:bg-white text-white dark:text-graphite-900 text-sm sm:text-base font-semibold rounded-lg hover:bg-graphite-800 dark:hover:bg-graphite-100 transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Ver mais no GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

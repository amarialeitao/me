'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FolderKanban, 
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

export default function Projects() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const projects = t.projects.items as Project[];

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-white dark:from-midnight-900 dark:via-midnight-950 dark:to-midnight-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10" />
      
      {/* Decorative Orbs - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 -right-32 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-1/4 -left-32 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white mb-3 sm:mb-4">
            <FolderKanban className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.projects.title}</span>
          </h2>
          <p className="text-base sm:text-lg text-midnight-600 dark:text-midnight-400 max-w-2xl mx-auto px-2">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Header Row */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-midnight-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400 font-medium">
                      {project.subtitle}
                    </p>
                  </div>
                  
                  {/* Impact Badge */}
                  <div className="self-start">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {project.impact}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-midnight-600 dark:text-midnight-400">
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
                      className="inline-flex items-center gap-1 sm:gap-1.5 text-midnight-600 dark:text-midnight-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{t.projects.viewCode}</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-midnight-700 dark:text-midnight-300 mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-midnight-100 dark:bg-midnight-700 text-midnight-700 dark:text-midnight-300 rounded-md sm:rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
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
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-midnight-200 dark:border-midnight-700 animate-fade-in">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                      {/* Problem */}
                      <div className="p-3 sm:p-4 bg-rose-50 dark:bg-rose-500/10 rounded-lg sm:rounded-xl border border-rose-200 dark:border-rose-500/20">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-midnight-900 dark:text-white">
                            Problema
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-midnight-700 dark:text-midnight-300">
                          {project.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-500/10 rounded-lg sm:rounded-xl border border-amber-200 dark:border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-midnight-900 dark:text-white">
                            Abordagem
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {project.approach.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2 text-xs sm:text-sm text-midnight-700 dark:text-midnight-300"
                            >
                              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
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
            href="https://github.com/marialuizaleitao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-midnight-900 dark:bg-white text-white dark:text-midnight-900 text-sm sm:text-base font-semibold rounded-xl hover:bg-midnight-800 dark:hover:bg-midnight-100 transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Ver mais no GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

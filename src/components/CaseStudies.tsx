'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { BASE_PATH } from '@/lib/constants';

interface CaseStudy {
  title: string;
  subtitle: string;
  company: string;
  period: string;
  description: string;
  problem: string;
  approach: string[];
  pipeline: string[];
  impact: string;
  skills: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  github?: string;
  demo?: string;
}

function BrowserFrame({ study }: { study: CaseStudy }) {
  return (
    <div className="rounded-2xl border border-graphite-200 dark:border-graphite-800 bg-white dark:bg-graphite-900 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_40px_-24px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-graphite-200 dark:border-graphite-800">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-graphite-300 dark:bg-graphite-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-graphite-300 dark:bg-graphite-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-graphite-300 dark:bg-graphite-700" />
        </div>
        <span className="flex-1 truncate text-center font-mono text-[10px] sm:text-xs text-graphite-600 dark:text-graphite-400">
          {study.url || study.title.toLowerCase().replace(/\s+/g, '-')}
        </span>
      </div>

      {study.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${BASE_PATH}${study.image}`}
          alt={study.imageAlt || study.title}
          loading="lazy"
          className="w-full aspect-[16/10] object-cover object-top"
        />
      ) : (
        <ol className="min-h-[16rem] sm:min-h-[22rem] p-5 sm:p-8 flex flex-col justify-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm bg-graphite-50 dark:bg-graphite-950/60">
          {study.approach.map((step, index) => (
            <li key={step} className="flex gap-3 text-graphite-600 dark:text-graphite-300">
              <span className="text-signal-600 dark:text-signal-400 flex-shrink-0">{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function CaseStudies() {
  const { t } = useLanguage();
  const studies = t.projects.items as CaseStudy[];
  const labels = t.projects.labels;

  return (
    <section id="work" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="01" label={labels.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="space-y-16 sm:space-y-24">
          {studies.map((study, index) => {
            const reversed = index % 2 === 1;
            return (
              <article key={study.title} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Texto */}
                <div className={`lg:col-span-5 ${reversed ? 'lg:order-2' : ''}`}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite-600 dark:text-graphite-400">
                    {String(index + 1).padStart(2, '0')} <span className="mx-1 opacity-50">/</span> {study.company} · {study.period}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink dark:text-white">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-graphite-600 dark:text-graphite-400">{study.subtitle}</p>

                  <dl className="mt-8 space-y-6">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600 dark:text-graphite-400">
                        {labels.problem}
                      </dt>
                      <dd className="mt-2 text-sm sm:text-base text-graphite-700 dark:text-graphite-300">{study.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600 dark:text-graphite-400">
                        {labels.result}
                      </dt>
                      <dd className="mt-2 font-serif text-2xl sm:text-3xl leading-snug text-ink dark:text-white">{study.impact}</dd>
                    </div>
                  </dl>

                  <ul className="mt-8 flex flex-wrap gap-2" aria-label={labels.stack}>
                    {study.skills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1 rounded-md font-mono text-[11px] sm:text-xs text-graphite-600 dark:text-graphite-300 bg-graphite-100 dark:bg-graphite-800"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>

                  {(study.github || study.demo) && (
                    <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                      {study.demo && (
                        <a href={study.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-signal-600 dark:text-signal-400 hover:underline underline-offset-4">
                          {labels.demo} <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                      {study.github && (
                        <a href={study.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink dark:text-white hover:underline underline-offset-4">
                          <Github className="w-4 h-4" /> {labels.code}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : ''}`}>
                  <BrowserFrame study={study} />

                  {/* Diagrama do pipeline */}
                  <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] sm:text-xs text-graphite-600 dark:text-graphite-400" aria-label={labels.pipeline}>
                    {study.pipeline.map((step, stepIndex) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full border ${stepIndex === study.pipeline.length - 1
                          ? 'border-signal-500/40 text-signal-600 dark:text-signal-400 bg-signal-50 dark:bg-signal-500/10'
                          : 'border-graphite-200 dark:border-graphite-800 bg-white dark:bg-graphite-900'
                          }`}>
                          {step}
                        </span>
                        {stepIndex < study.pipeline.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-graphite-400" aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

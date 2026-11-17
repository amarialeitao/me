'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/SectionHeading';

export default function Now() {
  const { t } = useLanguage();
  const featured = t.education.featured;
  const volunteering = t.experience.volunteering;

  const rows = [
    {
      label: t.now.studying,
      title: featured.title,
      detail: `${featured.institution} · ${featured.period}`,
    },
    {
      label: t.now.volunteering,
      title: `${volunteering.title} · ${volunteering.organization}`,
      detail: volunteering.description,
    },
    ...t.awards.items.map((award) => ({
      label: t.now.recognition,
      title: award.title,
      detail: award.issuer,
    })),
  ];

  return (
    <section id="now" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading index="05" label={t.now.label} title={t.now.title} className="!mb-6" />
          <div className="space-y-4 text-graphite-600 dark:text-graphite-400">
            {t.about.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="lg:col-span-7 border-t border-graphite-200 dark:border-graphite-800 self-start">
          {rows.map((row) => (
            <li
              key={`${row.label}-${row.title}`}
              className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-graphite-200 dark:border-graphite-800"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600 dark:text-graphite-400 pt-1">
                {row.label}
              </span>
              <span>
                <span className="block font-serif text-xl sm:text-2xl leading-snug text-ink dark:text-white">{row.title}</span>
                <span className="block mt-1 text-sm text-graphite-600 dark:text-graphite-400">{row.detail}</span>
              </span>
            </li>
          ))}
          <li className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-graphite-200 dark:border-graphite-800">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600 dark:text-graphite-400 pt-1">
              {t.now.languages}
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {t.languages.list.map((lang) => (
                <li key={lang.name}>
                  <span className="font-serif text-xl sm:text-2xl text-ink dark:text-white">{lang.name}</span>
                  <span className="block font-mono text-[11px] text-graphite-600 dark:text-graphite-400">{lang.level}</span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

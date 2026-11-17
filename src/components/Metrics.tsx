'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import CountUp from '@/components/CountUp';

const NUMBER_LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' } as const;

export default function Metrics() {
  const { t, locale } = useLanguage();

  return (
    <section aria-label={t.metrics.label} className="border-y border-graphite-200 dark:border-graphite-800">
      <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4">
        {t.metrics.items.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse justify-end px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-graphite-200 dark:border-graphite-800 ${
              index % 2 === 1 ? 'border-l' : ''
            } ${index >= 2 ? 'border-t lg:border-t-0' : ''} ${index === 2 ? 'lg:border-l' : ''}`}
          >
            <dt className="mt-2">
              <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] leading-relaxed text-ink dark:text-white">
                {item.label}
              </span>
              <span className="block mt-1 text-xs sm:text-sm leading-snug text-graphite-600 dark:text-graphite-400">
                {item.context}
              </span>
            </dt>
            <dd className="font-serif text-5xl sm:text-6xl tracking-tight text-ink dark:text-white">
              <CountUp to={item.value} duration={1.4} locale={NUMBER_LOCALES[locale]} />
              <span className="text-signal-600 dark:text-signal-400">{item.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

const EMAIL = 'malufln.99@gmail.com';
const TIME_LOCALES = { pt: 'pt-BR', en: 'en-GB', es: 'es-ES' } as const;

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amarialeitao/' },
  { label: 'GitHub', href: 'https://github.com/amarialeitao' },
  { label: 'Dev.to', href: 'https://dev.to/marialuizaleitao' },
];

export default function ContactFooter() {
  const { t, locale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(TIME_LOCALES[locale], {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Lisbon',
      }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="bg-ink text-paper dark:bg-graphite-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite-400">
          08 · {t.nav.contact}
        </p>
        <h2 className="mt-4 max-w-4xl font-serif font-normal tracking-tight leading-[0.95] text-[clamp(2.75rem,8vw,6.5rem)]">
          {t.contact.title}
        </h2>
        <p className="mt-6 max-w-xl text-graphite-300">{t.contact.subtitle}</p>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="font-serif text-2xl sm:text-4xl underline decoration-graphite-600 underline-offset-8 hover:decoration-signal-400 transition-colors break-all"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-graphite-700 text-sm hover:border-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
        </div>

        <div className="mt-16 sm:mt-24 pt-6 border-t border-graphite-800 grid gap-6 sm:grid-cols-3 items-end font-mono text-xs uppercase tracking-[0.15em] text-graphite-400">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                  {link.label} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="sm:text-center">
            {t.contact.location}
            {time && <span className="text-graphite-500"> · {time}</span>}
          </p>
          <p className="sm:text-right text-graphite-500">© {new Date().getFullYear()} Maria Leitão</p>
        </div>
      </div>
    </footer>
  );
}

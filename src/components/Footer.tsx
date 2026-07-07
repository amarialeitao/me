'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-6 sm:py-8 border-t border-graphite-200 dark:border-graphite-800">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-base sm:text-lg font-semibold text-graphite-900 dark:text-white hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
          >
            ML<span className="font-mono text-signal-500">_</span>
          </a>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-graphite-500 dark:text-graphite-400 text-center order-3 sm:order-2 font-mono">
            {t.footer.copyright}
          </p>

          {/* Made with & Social */}
          <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-3">
            <span className="flex items-center gap-1 text-xs sm:text-sm text-graphite-500 dark:text-graphite-400">
              {t.footer.madeWith}
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-current" />
            </span>

            <a
              href="https://www.linkedin.com/in/marialeitaoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-graphite-500 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com/marialuizaleitao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-graphite-500 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

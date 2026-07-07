'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Github, Send, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Magnet from '@/components/react-bits/Magnet';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-16 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-graphite-900" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="text-center">
          <SectionHeading index="09" label="Contato" title={t.contact.title} subtitle={t.contact.subtitle} />

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* LinkedIn — mantém a cor de marca oficial, é identificação de plataforma, não decoração */}
            <a
              href="https://www.linkedin.com/in/marialeitaoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-[#0077b5] dark:hover:border-[#0077b5] transition-colors duration-300"
            >
              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0077b5]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0077b5] transition-colors">
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-[#0077b5] group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.linkedin}
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite-500 dark:text-graphite-400 flex items-center justify-center gap-1 font-mono">
                    <span className="truncate">/in/marialeitaoo</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/marialuizaleitao"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300"
            >
              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-graphite-100 dark:bg-graphite-700 rounded-2xl flex items-center justify-center group-hover:bg-graphite-900 dark:group-hover:bg-white transition-colors">
                  <Github className="w-6 h-6 sm:w-7 sm:h-7 text-graphite-700 dark:text-graphite-300 group-hover:text-white dark:group-hover:text-graphite-900 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.github}
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite-500 dark:text-graphite-400 flex items-center justify-center gap-1 font-mono">
                    <span className="truncate">/marialuizaleitao</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:malufln.99@gmail.com"
              className="group relative p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300"
            >
              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-graphite-100 dark:bg-graphite-700 rounded-2xl flex items-center justify-center group-hover:bg-signal-500 transition-colors">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-graphite-700 dark:text-graphite-300 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.email}
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite-500 dark:text-graphite-400 flex items-center justify-center gap-1 font-mono">
                    <span className="truncate">malufln.99@gmail.com</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* CTA Button */}
          <Magnet padding={40} magnetStrength={6} wrapperClassName="inline-block">
            <a
              href="https://www.linkedin.com/in/marialeitaoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-signal-500 hover:bg-signal-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-300"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t.contact.cta}</span>
            </a>
          </Magnet>
        </div>
      </div>
    </section>
  );
}

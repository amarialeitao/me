'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Github, MessageCircle, Send, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-50 to-white dark:from-midnight-950 dark:to-midnight-900" />

      {/* Decorative Gradient Orb - Hidden on mobile */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-gradient-radial from-amber-500/10 to-transparent dark:from-amber-400/5 rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="text-center">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white mb-3 sm:mb-4">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
              <span>{t.contact.title}</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-midnight-600 dark:text-midnight-400 px-2">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/marialeitaoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-[#0077b5] dark:hover:border-[#0077b5] transition-all duration-300 hover:shadow-xl hover:shadow-[#0077b5]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077b5]/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0077b5]/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#0077b5] transition-colors">
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-[#0077b5] group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.linkedin}
                  </h3>
                  <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 flex items-center justify-center gap-1">
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
              className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-midnight-900 dark:hover:border-white transition-all duration-300 hover:shadow-xl hover:shadow-midnight-900/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-midnight-900/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-midnight-100 dark:bg-midnight-700 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-midnight-900 dark:group-hover:bg-white transition-colors">
                  <Github className="w-6 h-6 sm:w-7 sm:h-7 text-midnight-900 dark:text-white group-hover:text-white dark:group-hover:text-midnight-900 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.github}
                  </h3>
                  <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 flex items-center justify-center gap-1">
                    <span className="truncate">/marialuizaleitao</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:malufln.99@gmail.com"
              className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 dark:bg-amber-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 transition-colors">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white mb-0.5 sm:mb-1">
                    {t.contact.email}
                  </h3>
                  <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 flex items-center justify-center gap-1">
                    <span className="truncate">malufln.99@gmail.com</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="https://www.linkedin.com/in/marialeitaoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t.contact.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

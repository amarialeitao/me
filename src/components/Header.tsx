'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale, localeFlags, locales } from '@/i18n';
import { Sun, Moon, Menu, X, Globe, ChevronDown } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects', label: t.nav.projects },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-graphite-950/80 backdrop-blur-lg shadow-sm border-b border-graphite-200/60 dark:border-graphite-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-lg md:text-xl font-semibold text-graphite-900 dark:text-white hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
          >
            ML<span className="font-mono text-signal-500 animate-cursor-blink">_</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-graphite-700 dark:text-graphite-300 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-lg hover:bg-graphite-100/60 dark:hover:bg-graphite-800/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-graphite-700 dark:text-graphite-300 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-lg hover:bg-graphite-100/60 dark:hover:bg-graphite-800/50"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline font-mono text-xs uppercase tracking-wide">{locale}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-graphite-900 rounded-lg shadow-lg border border-graphite-200 dark:border-graphite-700 animate-fade-in">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          locale === loc
                            ? 'text-signal-600 dark:text-signal-400 bg-signal-50 dark:bg-signal-500/10'
                            : 'text-graphite-700 dark:text-graphite-300 hover:bg-graphite-100 dark:hover:bg-graphite-800'
                        }`}
                      >
                        <span className="text-lg">{localeFlags[loc]}</span>
                        <span>
                          {loc === 'pt' ? 'Português' : loc === 'en' ? 'English' : 'Español'}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-graphite-700 dark:text-graphite-300 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-lg hover:bg-graphite-100/60 dark:hover:bg-graphite-800/50"
              aria-label={theme === 'dark' ? t.theme.light : t.theme.dark}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-graphite-700 dark:text-graphite-300 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-lg hover:bg-graphite-100/60 dark:hover:bg-graphite-800/50"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-graphite-950 border-t border-graphite-200 dark:border-graphite-800 animate-fade-in">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-4 py-3 text-base font-medium text-graphite-700 dark:text-graphite-300 hover:text-signal-600 dark:hover:text-signal-400 transition-colors rounded-lg hover:bg-graphite-100/60 dark:hover:bg-graphite-800/50"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}


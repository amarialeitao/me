import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Locale, getTranslations } from '@/i18n';

export const SITE_URL = 'https://amarialeitao.github.io/me';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const LOCALE_PATHS: Record<Locale, string> = { pt: '/', en: '/en/', es: '/es/' };
const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

const pageUrl = (locale: Locale) => `${SITE_URL}${LOCALE_PATHS[locale]}`;

/** Metadados de cada versão do site, com links entre os idiomas (hreflang). */
export function buildMetadata(locale: Locale): Metadata {
  const t = getTranslations(locale);
  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: t.meta.title,
    description: t.meta.description,
    keywords: [
      'AI Data Engineer',
      'Data Engineer',
      'Data Engineering',
      'ETL',
      'Data Pipelines',
      'Python',
      'SQL',
      'PostgreSQL',
      'AWS',
      'Machine Learning',
      'Data Science',
      'Streamlit',
      'n8n',
      'Lisbon',
    ],
    authors: [{ name: 'Maria Leitão' }],
    creator: 'Maria Leitão',
    alternates: {
      canonical: pageUrl(locale),
      languages: {
        'pt-BR': pageUrl('pt'),
        en: pageUrl('en'),
        es: pageUrl('es'),
        'x-default': pageUrl('en'),
      },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: (Object.keys(OG_LOCALE) as Locale[]).filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url: pageUrl(locale),
      title: t.meta.title,
      description: t.hero.subtitle,
      siteName: 'Maria Leitão',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Maria Leitão - AI Data Engineer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.hero.subtitle,
      images: [OG_IMAGE],
    },
    verification: {
      google: 'm28nwVfpcS4oK8zmPLl2gI-a5aJpowHLeIwGKZhyuf0',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    icons: {
      icon: '/me/favicon.svg',
      shortcut: '/me/favicon.svg',
      apple: '/me/favicon.svg',
    },
  };
}

/** Dados estruturados (schema.org) para buscadores: quem é a pessoa por trás do site. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maria Leitão',
  jobTitle: 'AI Data Engineer',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/profile.webp`,
  email: 'mailto:malufln.99@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
  worksFor: { '@type': 'Organization', name: 'Instituto Semear' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Faculdade de Ciências da Universidade de Lisboa' },
    { '@type': 'CollegeOrUniversity', name: 'Senac Santa Catarina' },
  ],
  knowsAbout: ['Data Engineering', 'ETL', 'Data Pipelines', 'Data Modeling', 'Machine Learning', 'Python', 'SQL', 'People Analytics'],
  knowsLanguage: ['pt', 'en', 'es'],
  sameAs: [
    'https://www.linkedin.com/in/amarialeitao/',
    'https://github.com/amarialeitao',
    'https://dev.to/marialuizaleitao',
  ],
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

/** Estrutura HTML comum às três versões do site. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={HTML_LANG[locale]} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Conta só o caminho da página, sem parâmetros de URL. Mescla com o objeto já criado
            // pelo count.js, caso ele carregue antes deste trecho.
            __html: 'window.goatcounter = Object.assign(window.goatcounter || {}, { path: function () { return location.pathname; } });',
          }}
        />
        {/* Contador de visitas GoatCounter: sem cookies e sem dados pessoais, dispensa banner de consentimento */}
        <script data-goatcounter="https://amarialeitao.goatcounter.com/count" async src="https://gc.zgo.at/count.js" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="bg-paper dark:bg-graphite-950 text-ink dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

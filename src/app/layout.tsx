import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://amarialeitao.github.io/me/'),
  title: 'Maria Leitão | AI Data Engineer',
  description: 'AI Data Engineer em Lisboa, construindo pipelines de dados, analytics e automações com IA. Mestranda em Ciência de Dados na Universidade de Lisboa.',
  keywords: [
    'AI Data Engineer',
    'Data Engineer',
    'Engenharia de Dados',
    'ETL',
    'Data Pipelines',
    'Python',
    'SQL',
    'PostgreSQL',
    'AWS',
    'Machine Learning',
    'Ciência de Dados',
    'Streamlit',
    'n8n',
    'Lisboa',
  ],
  authors: [{ name: 'Maria Leitão' }],
  creator: 'Maria Leitão',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'es_ES'],
    url: 'https://amarialeitao.github.io/me/',
    title: 'Maria Leitão | AI Data Engineer',
    description: 'Transformo dados operacionais dispersos em informação confiável e pronta para a tomada de decisão.',
    siteName: 'Maria Leitão',
    images: [
      {
        url: 'https://amarialeitao.github.io/me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maria Leitão - AI Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maria Leitão | AI Data Engineer',
    description: 'Transformo dados operacionais dispersos em informação confiável e pronta para a tomada de decisão.',
    images: ['https://amarialeitao.github.io/me/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/me/favicon.svg',
    shortcut: '/me/favicon.svg',
    apple: '/me/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@100..900&family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Contador de visitas GoatCounter: sem cookies e sem dados pessoais, dispensa banner de consentimento */}
        <script
          data-goatcounter="https://amarialeitao.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-paper dark:bg-graphite-950 text-ink dark:text-white antialiased transition-colors duration-300">
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Maria Leitão - Portfolio</h1>
            <p>Por favor, habilite o JavaScript para visualizar este site.</p>
          </div>
        </noscript>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


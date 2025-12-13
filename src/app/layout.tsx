import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'Maria Leitão | Tech Lead & Business Analyst',
  description: 'Tech Lead especializada em transformação digital, unindo visão estratégica de negócios com profundidade técnica. Scrum Certified e Especialista em Segurança da Informação.',
  keywords: [
    'Tech Lead',
    'Business Analyst',
    'Scrum Master',
    'Transformação Digital',
    'Engenharia de Requisitos',
    'SQL',
    'PostgreSQL',
    'Java',
    'NestJS',
    'Node.js',
    'Segurança da Informação',
    'Power BI',
    'Agile',
    'DevOps',
  ],
  authors: [{ name: 'Maria Leitão' }],
  creator: 'Maria Leitão',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'es_ES'],
    url: 'https://marialeitao.dev',
    title: 'Maria Leitão | Tech Lead & Business Analyst',
    description: 'Transformando estratégias de negócio em soluções técnicas que geram impacto real.',
    siteName: 'Maria Leitão',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maria Leitão - Tech Lead & Business Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maria Leitão | Tech Lead & Business Analyst',
    description: 'Transformando estratégias de negócio em soluções técnicas que geram impacto real.',
    images: ['/og-image.png'],
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
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
      <body className="bg-white dark:bg-midnight-950 text-midnight-900 dark:text-white antialiased transition-colors duration-300">
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


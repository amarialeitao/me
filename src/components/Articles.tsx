'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getAssetUrl } from '@/lib/constants';
import {
  FileText,
  ExternalLink,
  Calendar,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

interface Article {
  title: string;
  platform: string;
  date: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
}

export default function Articles() {
  const { t } = useLanguage();

  const articles = (t.articles?.items || []) as Article[];

  if (articles.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-28 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          label={t.nav.articles}
          title={t.articles?.title || 'Artigos & Publicações'}
          subtitle={t.articles?.subtitle || 'Compartilhando conhecimento sobre tecnologia e gestão'}
        />

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 overflow-hidden transition-colors duration-300"
            >
              {/* Article Image */}
              <div className="relative h-40 sm:h-48 bg-graphite-100 dark:bg-graphite-700 overflow-hidden">
                <img
                  src={getAssetUrl(article.image)}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Platform Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-lg shadow-lg ${
                    article.platform === 'LinkedIn'
                      ? 'bg-[#0077b5] text-white'
                      : 'bg-graphite-900 dark:bg-white text-white dark:text-graphite-900'
                  }`}>
                    {article.platform === 'LinkedIn' ? (
                      <Linkedin className="w-3 h-3" />
                    ) : (
                      <FileText className="w-3 h-3" />
                    )}
                    {article.platform}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-graphite-500 dark:text-graphite-400 mb-2 sm:mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-signal-600 dark:group-hover:text-signal-400 transition-colors">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-graphite-600 dark:text-graphite-400 mb-3 sm:mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-graphite-600 dark:text-graphite-300 bg-graphite-100 dark:bg-graphite-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-signal-600 dark:text-signal-400 group-hover:gap-2.5 transition-all">
                  {t.articles?.readArticle || 'Ler artigo'}
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Read More Button */}
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href={t.articles?.devtoUrl || 'https://dev.to/marialuizaleitao'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-graphite-900 dark:bg-white text-white dark:text-graphite-900 text-sm sm:text-base font-semibold rounded-lg hover:bg-graphite-800 dark:hover:bg-graphite-100 transition-colors duration-300 group"
          >
            {t.articles?.readMore || 'Ver mais artigos'}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

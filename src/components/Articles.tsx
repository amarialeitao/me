'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, 
  ExternalLink, 
  Calendar,
  Linkedin,
  ArrowRight
} from 'lucide-react';

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
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-50 to-white dark:from-midnight-950 dark:to-midnight-900" />
      
      {/* Decorative Elements */}
      <div className="hidden sm:block absolute top-1/4 -right-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-1/4 -left-20 w-72 h-72 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white mb-3 sm:mb-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.articles?.title || 'Artigos & Publicações'}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-midnight-600 dark:text-midnight-400 max-w-2xl mx-auto">
            {t.articles?.subtitle || 'Compartilhando conhecimento sobre tecnologia e gestão'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500 dark:hover:border-amber-500 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-midnight-100 to-midnight-200 dark:from-midnight-700 dark:to-midnight-800 overflow-hidden">
                <img 
                  src={article.image} 
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
                      : 'bg-midnight-900 dark:bg-white text-white dark:text-midnight-900'
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
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-midnight-500 dark:text-midnight-400 mb-2 sm:mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-midnight-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 mb-3 sm:mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-midnight-100 dark:bg-midnight-700 text-midnight-700 dark:text-midnight-300 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:gap-2.5 transition-all">
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
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-midnight-900 dark:bg-white text-white dark:text-midnight-900 text-sm sm:text-base font-semibold rounded-xl hover:bg-midnight-800 dark:hover:bg-midnight-100 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            {t.articles?.readMore || 'Ver mais artigos'}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}


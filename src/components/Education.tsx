'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  GraduationCap,
  Award,
  Trophy,
  BookOpen,
  Users,
  ShieldCheck,
  Building2,
  ChevronRight,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Database,
  BarChart3,
  Target,
  MessageSquare,
  Code,
  Package,
  X
} from 'lucide-react';

// Helper function to get correct image path with basePath
function getImagePath(imagePath: string): string {
  // Remove leading slash and add basePath
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `/me/${cleanPath}`;
}

interface Certification {
  title: string;
  issuer: string;
  date?: string;
  hours?: string;
  icon: string;
  description: string;
  certificateImage: string;
}

interface CourseGroup {
  institution: string;
  courses: string[];
}

interface Graduation {
  title: string;
  institution: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
}

// Icons for each certification type
const certificationIcons: Record<string, React.ReactNode> = {
  scrum: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
  microsoft: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
  data: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
  database: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
  agile: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
  leadership: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
  communication: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
  code: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
  product: <Package className="w-5 h-5 sm:w-6 sm:h-6" />,
  security: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
};

// Colors for each certification type
const certificationColors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  scrum: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-500/5',
    border: 'border-blue-200 dark:border-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  microsoft: {
    bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-500/10 dark:to-cyan-500/5',
    border: 'border-cyan-200 dark:border-cyan-500/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
  },
  data: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5',
    border: 'border-emerald-200 dark:border-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  database: {
    bg: 'bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-500/10 dark:to-violet-500/5',
    border: 'border-violet-200 dark:border-violet-500/20',
    text: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600',
  },
  agile: {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-500/10 dark:to-orange-500/5',
    border: 'border-orange-200 dark:border-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  leadership: {
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-500/10 dark:to-rose-500/5',
    border: 'border-rose-200 dark:border-rose-500/20',
    text: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
  },
  communication: {
    bg: 'bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-500/10 dark:to-pink-500/5',
    border: 'border-pink-200 dark:border-pink-500/20',
    text: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
  },
  code: {
    bg: 'bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-500/10 dark:to-slate-500/5',
    border: 'border-slate-200 dark:border-slate-500/20',
    text: 'text-slate-600 dark:text-slate-400',
    iconBg: 'bg-gradient-to-br from-slate-600 to-slate-700',
  },
  product: {
    bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-500/10 dark:to-indigo-500/5',
    border: 'border-indigo-200 dark:border-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  },
  security: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5',
    border: 'border-emerald-200 dark:border-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
};

export default function Education() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const mainCertifications = (t.education.mainCertifications || []) as Certification[];
  const courseGroups = (t.education.courseGroups || []) as CourseGroup[];
  const graduation = t.education.graduation as Graduation | undefined;

  // Check scroll position
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [mainCertifications]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 320; // approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Modal controls
  const openModal = (cert: Certification) => {
    setSelectedCertification(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCertification(null);
    document.body.style.overflow = 'unset';
  };

  // All certifications modal controls
  const openAllCertificationsModal = () => {
    setShowAllCertifications(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAllCertificationsModal = () => {
    setShowAllCertifications(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCertification) {
        closeModal();
      }
      if (e.key === 'Escape' && showAllCertifications) {
        closeAllCertificationsModal();
      }
    };

    if (selectedCertification || showAllCertifications) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedCertification, showAllCertifications]);

  return (
    <section id="education" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-midnight-50 dark:from-midnight-900 dark:to-midnight-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-midnight-900 dark:text-white">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
            <span>{t.education.title}</span>
          </h2>
        </div>

        {/* Graduation - Featured */}
        {graduation && (
          <div className="mb-8 sm:mb-12">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-midnight-900 dark:text-white mb-4 sm:mb-6">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
              <span>{t.education.subtitles?.graduation || 'Graduação'}</span>
            </h3>

            <div className="group relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-500/10 dark:to-amber-500/5 rounded-xl sm:rounded-2xl border border-amber-200 dark:border-amber-500/20 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-midnight-900 dark:text-white">
                        {graduation.title}
                      </h4>
                      <p className="text-base sm:text-lg font-medium text-amber-600 dark:text-amber-400">
                        {graduation.institution}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 text-xs sm:text-sm text-midnight-600 dark:text-midnight-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {graduation.period}
                      </span>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full">
                        {graduation.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-midnight-600 dark:text-midnight-400 mb-3 sm:mb-4">
                    {graduation.description}
                  </p>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {graduation.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-midnight-700 dark:text-midnight-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Carousel */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-midnight-900 dark:text-white">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
              <span>{t.education.subtitles?.certifications || 'Certificações'}</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full">
                {mainCertifications.length}
              </span>
            </h3>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-lg border transition-all duration-200 ${canScrollLeft
                  ? 'bg-white dark:bg-midnight-800 border-midnight-200 dark:border-midnight-700 text-midnight-700 dark:text-midnight-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-300 dark:hover:border-amber-500/30 hover:text-amber-600 dark:hover:text-amber-400'
                  : 'bg-midnight-100 dark:bg-midnight-800/50 border-midnight-200 dark:border-midnight-700 text-midnight-400 dark:text-midnight-600 cursor-not-allowed'
                  }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-lg border transition-all duration-200 ${canScrollRight
                  ? 'bg-white dark:bg-midnight-800 border-midnight-200 dark:border-midnight-700 text-midnight-700 dark:text-midnight-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-300 dark:hover:border-amber-500/30 hover:text-amber-600 dark:hover:text-amber-400'
                  : 'bg-midnight-100 dark:bg-midnight-800/50 border-midnight-200 dark:border-midnight-700 text-midnight-400 dark:text-midnight-600 cursor-not-allowed'
                  }`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={openAllCertificationsModal}
                className="px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all duration-200 text-sm font-medium"
              >
                Ver todos
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Gradient Fades */}
            <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-midnight-900 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-midnight-900 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

            {/* Scrollable Cards */}
            <div
              ref={carouselRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-4 -mb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mainCertifications.map((cert, index) => {
                const colors = certificationColors[cert.icon] || certificationColors.data;
                const icon = certificationIcons[cert.icon] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />;

                return (
                  <div
                    key={index}
                    onClick={() => openModal(cert)}
                    className={`group relative flex-shrink-0 w-[280px] sm:w-[300px] p-4 sm:p-5 ${colors.bg} rounded-xl sm:rounded-2xl border ${colors.border} hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${colors.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg text-white`}>
                        {icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm sm:text-base text-midnight-900 dark:text-white mb-1 leading-tight line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className={`text-xs sm:text-sm ${colors.text} mb-1`}>
                          {cert.issuer}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-midnight-500 dark:text-midnight-400">
                          {cert.date && <span>{cert.date}</span>}
                          {cert.hours && (
                            <>
                              <span>•</span>
                              <span className="font-medium">{cert.hours}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Degrees */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-midnight-900 dark:text-white mb-4 sm:mb-6">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
              <span>{t.education.subtitles?.postgraduate || 'Pós-Graduação'}</span>
            </h3>

            {t.education.degrees.map((degree, index) => (
              <div
                key={index}
                className="group relative p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                    <h4 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white">
                      {degree.title}
                    </h4>
                    {degree.status && degree.status !== 'Concluída' && (
                      <span className="self-start flex-shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full">
                        {degree.status}
                      </span>
                    )}
                    {degree.status === 'Concluída' && (
                      <span className="self-start flex-shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
                        {degree.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400 font-medium mb-2">
                    {degree.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400">
                    {degree.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Awards */}
            <div className="mt-6 sm:mt-8 space-y-4">
              <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-midnight-900 dark:text-white mb-4 sm:mb-6">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                <span>{t.education.subtitles?.awards || 'Prêmios'}</span>
              </h3>

              {t.education.awards.map((award, index) => (
                <div
                  key={index}
                  className="group relative p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-500/10 dark:to-amber-500/5 rounded-xl sm:rounded-2xl border border-amber-200 dark:border-amber-500/20"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-midnight-900 dark:text-white mb-1 sm:mb-2">
                        {award.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-midnight-600 dark:text-midnight-400">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses by Institution */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-midnight-900 dark:text-white mb-4 sm:mb-6">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
              <span>{t.education.subtitles?.courses || 'Cursos Complementares'}</span>
            </h3>

            {courseGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="p-4 sm:p-6 bg-white dark:bg-midnight-800/50 rounded-xl sm:rounded-2xl border border-midnight-200 dark:border-midnight-700"
              >
                <h4 className="font-semibold text-sm sm:text-base text-midnight-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full flex-shrink-0" />
                  <span>{group.institution}</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                  {group.courses.map((course, courseIndex) => (
                    <div
                      key={courseIndex}
                      className="flex items-center gap-2 text-xs sm:text-sm text-midnight-600 dark:text-midnight-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-midnight-400 dark:text-midnight-600 flex-shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Modal */}
      {selectedCertification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-midnight-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-midnight-100 dark:bg-midnight-800 hover:bg-midnight-200 dark:hover:bg-midnight-700 text-midnight-600 dark:text-midnight-400 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-midnight-200 dark:border-midnight-800">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 ${certificationColors[selectedCertification.icon]?.iconBg || certificationColors.data.iconBg} rounded-xl flex items-center justify-center shadow-lg text-white`}>
                  {certificationIcons[selectedCertification.icon] || <Award className="w-7 h-7" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-midnight-900 dark:text-white mb-2">
                    {selectedCertification.title}
                  </h3>
                  <p className={`text-sm sm:text-base font-medium ${certificationColors[selectedCertification.icon]?.text || certificationColors.data.text}`}>
                    {selectedCertification.issuer}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm text-midnight-500 dark:text-midnight-400">
                    {selectedCertification.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedCertification.date}
                      </span>
                    )}
                    {selectedCertification.hours && (
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {selectedCertification.hours}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-midnight-900 dark:text-white mb-3">
                  Descrição
                </h4>
                <p className="text-midnight-700 dark:text-midnight-300 leading-relaxed">
                  {selectedCertification.description}
                </p>
              </div>

              {/* Certificate Image */}
              <div>
                <h4 className="text-lg font-semibold text-midnight-900 dark:text-white mb-3">
                  Certificado
                </h4>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={getImagePath(selectedCertification.certificateImage)}
                    alt={`Certificado: ${selectedCertification.title}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Certifications Modal */}
      {showAllCertifications && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeAllCertificationsModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-certifications-title"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-midnight-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeAllCertificationsModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-midnight-100 dark:bg-midnight-800 hover:bg-midnight-200 dark:hover:bg-midnight-700 text-midnight-600 dark:text-midnight-400 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-midnight-200 dark:border-midnight-800">
              <h2 id="all-certifications-title" className="text-2xl sm:text-3xl font-bold text-midnight-900 dark:text-white mb-2">
                Todas as Certificações
              </h2>
              <p className="text-midnight-600 dark:text-midnight-400">
                Clique em qualquer certificado para ver os detalhes e imagem
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCertifications.map((cert, index) => {
                  const colors = certificationColors[cert.icon] || certificationColors.data;
                  const icon = certificationIcons[cert.icon] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        closeAllCertificationsModal();
                        openModal(cert);
                      }}
                      className={`group relative p-4 ${colors.bg} rounded-xl border ${colors.border} hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center shadow-lg text-white`}>
                          {icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-midnight-900 dark:text-white mb-1 leading-tight line-clamp-2">
                            {cert.title}
                          </h4>
                          <p className={`text-xs ${colors.text} mb-1`}>
                            {cert.issuer}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-midnight-500 dark:text-midnight-400">
                            {cert.date && <span>{cert.date}</span>}
                            {cert.hours && (
                              <>
                                <span>•</span>
                                <span className="font-medium">{cert.hours}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

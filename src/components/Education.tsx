'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  GraduationCap,
  Award,
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
import SectionHeading from '@/components/SectionHeading';

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

interface FeaturedDegree {
  title: string;
  institution: string;
  period: string;
  status: string;
  completed?: boolean;
  description: string;
  highlights: string[];
}

interface Degree {
  title: string;
  institution: string;
  period?: string;
  status?: string;
  completed?: boolean;
  description: string;
}

// Ícones por tipo de certificação.
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

export default function Education() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const mainCertifications = (t.education.mainCertifications || []) as Certification[];
  const courseGroups = (t.education.courseGroups || []) as CourseGroup[];
  const featured = t.education.featured as FeaturedDegree | undefined;
  const degrees = (t.education.degrees || []) as Degree[];

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
    // Only restore page scroll if no other modal is open
    if (!showAllCertifications) {
      document.body.style.overflow = 'unset';
    }
  };

  // All certifications modal controls
  const openAllCertificationsModal = () => {
    setShowAllCertifications(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAllCertificationsModal = () => {
    setShowAllCertifications(false);
    // Only restore page scroll if no other modal is open
    if (!selectedCertification) {
      document.body.style.overflow = 'unset';
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      // If the detail modal is open, ESC should close only it and return to the previous view
      if (selectedCertification) {
        closeModal();
        return;
      }

      if (showAllCertifications) {
        closeAllCertificationsModal();
      }
    };

    if (selectedCertification || showAllCertifications) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedCertification, showAllCertifications]);

  return (
    <section id="education" className="relative py-16 sm:py-28 overflow-x-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label={t.nav.education} title={t.education.title} />

        {/* Mestrado - destaque */}
        {featured && (
          <div className="mb-8 sm:mb-12">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-graphite-900 dark:text-white mb-4 sm:mb-6">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-signal-500 flex-shrink-0" />
              <span>{t.education.subtitles?.featured || 'Mestrado'}</span>
            </h3>

            <div className="group relative p-4 sm:p-6 md:p-8 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-graphite-100 dark:bg-graphite-700 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-graphite-700 dark:text-graphite-300" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-graphite-900 dark:text-white">
                        {featured.title}
                      </h4>
                      <p className="text-base sm:text-lg font-medium text-signal-600 dark:text-signal-400">
                        {featured.institution}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono text-graphite-500 dark:text-graphite-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.period}
                      </span>
                      <span
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${featured.completed
                          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                          : 'bg-signal-50 dark:bg-signal-500/10 text-signal-600 dark:text-signal-400'
                          }`}
                      >
                        {featured.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-graphite-600 dark:text-graphite-400 mb-3 sm:mb-4">
                    {featured.description}
                  </p>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {featured.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-graphite-700 dark:text-graphite-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-graphite-400 dark:text-graphite-500 mt-0.5 flex-shrink-0" />
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
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-graphite-900 dark:text-white">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-signal-500 flex-shrink-0" />
              <span>{t.education.subtitles?.certifications || 'Certificações'}</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-mono text-graphite-500 dark:text-graphite-400 bg-graphite-100 dark:bg-graphite-800 rounded-full">
                {mainCertifications.length}
              </span>
            </h3>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-lg border transition-colors duration-200 ${canScrollLeft
                  ? 'bg-white dark:bg-graphite-800 border-graphite-200 dark:border-graphite-700 text-graphite-700 dark:text-graphite-300 hover:border-signal-500 hover:text-signal-600 dark:hover:text-signal-400'
                  : 'bg-graphite-100 dark:bg-graphite-800/50 border-graphite-200 dark:border-graphite-700 text-graphite-400 dark:text-graphite-600 cursor-not-allowed'
                  }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-lg border transition-colors duration-200 ${canScrollRight
                  ? 'bg-white dark:bg-graphite-800 border-graphite-200 dark:border-graphite-700 text-graphite-700 dark:text-graphite-300 hover:border-signal-500 hover:text-signal-600 dark:hover:text-signal-400'
                  : 'bg-graphite-100 dark:bg-graphite-800/50 border-graphite-200 dark:border-graphite-700 text-graphite-400 dark:text-graphite-600 cursor-not-allowed'
                  }`}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={openAllCertificationsModal}
                className="px-3 py-2 rounded-lg border border-signal-500/30 bg-signal-50 dark:bg-signal-500/10 text-signal-600 dark:text-signal-400 hover:bg-signal-100 dark:hover:bg-signal-500/20 transition-colors duration-200 text-sm font-medium"
              >
                Ver todos
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Gradient Fades */}
            <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-paper dark:from-graphite-950 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-paper dark:from-graphite-950 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

            {/* Scrollable Cards */}
            <div
              ref={carouselRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-4 -mb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mainCertifications.map((cert, index) => {
                const icon = certificationIcons[cert.icon] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />;

                return (
                  <div
                    key={index}
                    onClick={() => openModal(cert)}
                    className="group relative flex-shrink-0 w-[280px] sm:w-[300px] p-4 sm:p-5 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-graphite-100 dark:bg-graphite-700 rounded-xl flex items-center justify-center text-graphite-700 dark:text-graphite-300">
                        {icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm sm:text-base text-graphite-900 dark:text-white mb-1 leading-tight line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-signal-600 dark:text-signal-400 mb-1">
                          {cert.issuer}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-graphite-500 dark:text-graphite-400">
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
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-graphite-900 dark:text-white mb-4 sm:mb-6">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-signal-500 flex-shrink-0" />
              <span>{t.education.subtitles?.postgraduate || 'Pós-Graduação'}</span>
            </h3>

            {degrees.map((degree, index) => (
              <div
                key={index}
                className="group relative p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <h4 className="text-base sm:text-lg font-semibold text-graphite-900 dark:text-white">
                    {degree.title}
                  </h4>
                  {degree.status && (
                    <span
                      className={`self-start flex-shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${degree.completed
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                        : 'bg-signal-50 dark:bg-signal-500/10 text-signal-600 dark:text-signal-400'
                        }`}
                    >
                      {degree.status}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-signal-600 dark:text-signal-400 font-medium mb-1">
                  {degree.institution}
                </p>
                {degree.period && (
                  <p className="inline-flex items-center gap-1.5 mb-2 text-xs font-mono text-graphite-500 dark:text-graphite-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {degree.period}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-graphite-600 dark:text-graphite-400">
                  {degree.description}
                </p>
              </div>
            ))}
          </div>

          {/* Courses by Institution */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-graphite-900 dark:text-white mb-4 sm:mb-6">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-signal-500 flex-shrink-0" />
              <span>{t.education.subtitles?.courses || 'Cursos Complementares'}</span>
            </h3>

            {courseGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="p-4 sm:p-6 bg-white dark:bg-graphite-800/50 rounded-2xl border border-graphite-200 dark:border-graphite-700"
              >
                <h4 className="font-semibold text-sm sm:text-base text-graphite-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-signal-500 rounded-full flex-shrink-0" />
                  <span>{group.institution}</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                  {group.courses.map((course, courseIndex) => (
                    <div
                      key={courseIndex}
                      className="flex items-center gap-2 text-xs sm:text-sm text-graphite-600 dark:text-graphite-400 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-graphite-400 dark:text-graphite-600 flex-shrink-0" />
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-graphite-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-graphite-100 dark:bg-graphite-800 hover:bg-graphite-200 dark:hover:bg-graphite-700 text-graphite-600 dark:text-graphite-400 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-graphite-200 dark:border-graphite-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-graphite-100 dark:bg-graphite-700 rounded-xl flex items-center justify-center text-graphite-700 dark:text-graphite-300">
                  {certificationIcons[selectedCertification.icon] || <Award className="w-7 h-7" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-graphite-900 dark:text-white mb-2">
                    {selectedCertification.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-signal-600 dark:text-signal-400">
                    {selectedCertification.issuer}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm font-mono text-graphite-500 dark:text-graphite-400">
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
                <h4 className="text-lg font-semibold text-graphite-900 dark:text-white mb-3">
                  Descrição
                </h4>
                <p className="text-graphite-700 dark:text-graphite-300 leading-relaxed">
                  {selectedCertification.description}
                </p>
              </div>

              {/* Certificate Image */}
              <div>
                <h4 className="text-lg font-semibold text-graphite-900 dark:text-white mb-3">
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
            className="relative bg-white dark:bg-graphite-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeAllCertificationsModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-graphite-100 dark:bg-graphite-800 hover:bg-graphite-200 dark:hover:bg-graphite-700 text-graphite-600 dark:text-graphite-400 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-graphite-200 dark:border-graphite-800">
              <h2 id="all-certifications-title" className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white mb-2">
                Todas as Certificações
              </h2>
              <p className="text-graphite-600 dark:text-graphite-400">
                Clique em qualquer certificado para ver os detalhes e imagem
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCertifications.map((cert, index) => {
                  const icon = certificationIcons[cert.icon] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        openModal(cert);
                      }}
                      className="group relative p-4 bg-white dark:bg-graphite-800/50 rounded-xl border border-graphite-200 dark:border-graphite-700 hover:border-signal-500 dark:hover:border-signal-500 cursor-pointer transition-colors duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-graphite-100 dark:bg-graphite-700 rounded-lg flex items-center justify-center text-graphite-700 dark:text-graphite-300">
                          {icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-graphite-900 dark:text-white mb-1 leading-tight line-clamp-2">
                            {cert.title}
                          </h4>
                          <p className="text-xs text-signal-600 dark:text-signal-400 mb-1">
                            {cert.issuer}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-graphite-500 dark:text-graphite-400">
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

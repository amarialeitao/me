'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Cabeçalho de seção padrão do UI Refresh: eyebrow numerado em mono-space
 * (assinatura visual do site, docs/ui-redesign-plan.md seção 2) + título.
 * Substitui o padrão antigo de "ícone Lucide colorido + título" repetido em
 * todas as seções. Faz um fade/slide sutil na primeira vez que entra na tela
 * (equivalente local e mais leve ao ScrollReveal do React Bits — o componente
 * original do React Bits foi desenhado para blocos longos de texto com
 * scroll-scrub palavra a palavra e mata todos os ScrollTriggers da página no
 * unmount, o que quebra ao repetir em 7 seções; esta versão faz a mesma
 * entrada suave sem esse efeito colateral).
 */
export default function SectionHeading({ index, label, title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-10 sm:mb-16 transition-all duration-700 ease-out ${align === 'center' ? 'text-center' : 'text-left'} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
    >
      <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-signal-600 dark:text-signal-400 mb-2 sm:mb-3">
        {index} · {label}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-graphite-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-graphite-600 dark:text-graphite-400 max-w-2xl mx-auto px-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

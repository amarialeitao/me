'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  /** Quando informado, formata o número com separador de milhar do idioma (ex.: 10.000). */
  locale?: string;
}

/**
 * Contador que anima do valor inicial até `to` quando entra na tela.
 * Inspirado no CountUp do React Bits (https://reactbits.dev/text-animations/count-up).
 * Respeita prefers-reduced-motion mostrando o valor final direto.
 */
export default function CountUp({ to, from = 0, duration = 1.5, className = '', locale }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const hasAnimated = useRef(false);

  const decimals = (() => {
    const str = to.toString();
    return str.includes('.') ? str.split('.')[1].length : 0;
  })();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {locale
        ? value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : value.toFixed(decimals)}
    </span>
  );
}

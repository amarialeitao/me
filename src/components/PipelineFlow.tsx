'use client';

import { useEffect, useRef } from 'react';

interface PipelineFlowProps {
  /** Rótulos das quatro etapas, da esquerda para a direita. */
  stages: [string, string, string, string];
  className?: string;
}

interface Particle {
  t: number; // progresso horizontal de 0 a 1
  speed: number;
  noise: number; // deslocamento vertical aleatório na etapa de ingestão
  lane: number; // faixa usada na etapa de modelagem (-1, 0, 1)
  dirty: boolean; // registros descartados na limpeza
  phase: number;
}

const smooth = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

function createParticle(randomStart: boolean): Particle {
  return {
    t: randomStart ? Math.random() : -Math.random() * 0.15,
    speed: 0.045 + Math.random() * 0.03,
    noise: Math.random() * 2 - 1,
    lane: Math.floor(Math.random() * 3) - 1,
    dirty: Math.random() < 0.18,
    phase: Math.random() * Math.PI * 2,
  };
}

/**
 * Animação de fundo do Hero: pontos dispersos entram à esquerda (ingestão),
 * são filtrados e alinhados (limpeza), agrupados em faixas (modelagem) e saem
 * como um único fluxo na cor de destaque (decisão).
 */
export default function PipelineFlow({ stages, className = '' }: PipelineFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    let last = performance.now();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(170, Math.max(60, Math.round(width / 8)));
      particles = Array.from({ length: count }, () => createParticle(true));
    };

    const colors = () => {
      const styles = getComputedStyle(container);
      return { base: styles.color, accent: styles.getPropertyValue('--pipeline-accent').trim() || '#5B5FEF' };
    };

    const draw = (time: number) => {
      const { base, accent } = colors();
      ctx.clearRect(0, 0, width, height);
      const cy = height / 2;

      // Divisórias discretas entre as etapas
      ctx.strokeStyle = base;
      ctx.globalAlpha = 0.12;
      ctx.setLineDash([2, 6]);
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const x = (width * i) / 4;
        ctx.beginPath();
        ctx.moveTo(x, height * 0.1);
        ctx.lineTo(x, height * 0.9);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      for (const p of particles) {
        if (p.t < 0 || p.t > 1) continue;
        const scatter = 1 - smooth(0.18, 0.45, p.t);
        const lane = smooth(0.45, 0.58, p.t) * (1 - smooth(0.72, 0.86, p.t));
        const wobble = Math.sin(time / 900 + p.phase) * 3 * scatter;
        const y = cy + p.noise * height * 0.38 * scatter + p.lane * height * 0.16 * lane + wobble;
        const x = p.t * width;

        let alpha = 0.35 + 0.25 * (1 - scatter);
        if (p.dirty) alpha *= 1 - smooth(0.28, 0.42, p.t);
        if (alpha <= 0.01) continue;

        const decided = smooth(0.74, 0.86, p.t);
        ctx.globalAlpha = alpha + decided * 0.35;
        ctx.fillStyle = decided > 0.5 ? accent : base;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + decided * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.t += p.speed * dt;
        if (p.t > 1.02) particles[i] = createParticle(false);
      }
      draw(now);
      if (running) frame = requestAnimationFrame(tick);
    };

    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(container);

    // Pausa a animação quando o Hero sai da tela
    const visibility = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    visibility.observe(container);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="relative h-40 sm:h-52 text-graphite-500 dark:text-graphite-400 [--pipeline-accent:#5B5FEF] dark:[--pipeline-accent:#7C82FF]"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <ol className="grid grid-cols-4 mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-graphite-500 dark:text-graphite-400">
        {stages.map((stage, index) => (
          <li key={stage} className={`text-center ${index === 3 ? 'text-signal-600 dark:text-signal-400' : ''}`}>
            <span className="opacity-60">0{index + 1}</span> {stage}
          </li>
        ))}
      </ol>
    </div>
  );
}

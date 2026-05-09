"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  hue: number; // 250-270 = violet/blue range
}

const COUNT    = 72;
const MAX_DIST = 150;
const SPEED    = 0.35;

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function spawn() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x:       Math.random() * canvas!.width,
          y:       Math.random() * canvas!.height,
          vx:      (Math.random() - 0.5) * SPEED,
          vy:      (Math.random() - 0.5) * SPEED,
          r:       Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.45 + 0.15,
          hue:     250 + Math.random() * 40, // violet → blue
        });
      }
    }

    function tick() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DIST) continue;

          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx!.beginPath();
          ctx!.strokeStyle = `hsla(260,70%,65%,${alpha})`;
          ctx!.lineWidth   = 0.6;
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.stroke();
        }
      }

      /* dots */
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue},70%,70%,${p.opacity})`;
        ctx!.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => { resize(); spawn(); });
    ro.observe(canvas);
    resize();
    spawn();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity: 0.55 }}
    />
  );
}

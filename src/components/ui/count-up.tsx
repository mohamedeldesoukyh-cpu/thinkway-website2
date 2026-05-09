"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** e.g. "50+", "10M+", "200+", "4.9★" */
  value: string;
  duration?: number; // ms
  className?: string;
}

function parse(raw: string): { num: number; suffix: string } {
  const match = raw.match(/^([\d.]+)([^\d.]*)$/);
  if (!match) return { num: 0, suffix: raw };
  let num = parseFloat(match[1]);
  const suffix = match[2] ?? "";
  // treat "M" suffix as millions display — keep numeric value as-is
  return { num, suffix };
}

export function CountUp({ value, duration = 1800, className }: Props) {
  const [displayed, setDisplayed] = useState("0");
  const ref       = useRef<HTMLSpanElement>(null);
  const started   = useRef(false);

  useEffect(() => {
    const { num, suffix } = parse(value);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();
        const step = (now: number) => {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * num;

          // Format display
          let formatted: string;
          if (num >= 1 && Number.isInteger(num)) {
            formatted = Math.round(current).toString();
          } else {
            formatted = current.toFixed(1);
          }
          setDisplayed(formatted + suffix);

          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}

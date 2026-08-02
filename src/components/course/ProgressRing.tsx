"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated circular progress ring. Sweeps from 0 → `value`% and counts the
 * number up the first time it scrolls into view. Respects reduced motion.
 */
export function ProgressRing({
  value,
  suffix = "%",
  label,
  size = 150,
  stroke = 12,
  duration = 2200,
}: {
  value: number;
  suffix?: string;
  label: string;
  size?: number;
  stroke?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const started = useRef(false);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setP(value * eased);
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(14,47,73,0.10)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--eb-blue, #2781c8)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - p / 100)}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[28px] font-extrabold text-eb-navy">
            {value % 1 === 0 ? Math.round(p) : p.toFixed(1)}
            {suffix}
          </span>
        </div>
      </div>
      <p className="mt-4 max-w-[210px] text-[13px] font-medium leading-snug text-eb-navy">{label}</p>
    </div>
  );
}

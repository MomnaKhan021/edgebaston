"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progress bar that fills from 0 → `pct`% the first time it scrolls into
 * view, with a long, gentle ease-out. Respects prefers-reduced-motion.
 */
export function ProgressBar({ pct, className = "" }: { pct: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={"h-3.5 overflow-hidden rounded-sm bg-eb-cream " + className}>
      <div
        className="h-full rounded-sm bg-eb-blue"
        style={{
          width: on ? `${pct}%` : "0%",
          transition: "width 3.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

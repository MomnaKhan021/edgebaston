"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals text one word at a time (staggered fade + rise) the first time it
 * scrolls into view. Respects prefers-reduced-motion.
 */
export function WordReveal({
  text,
  className,
  step = 55,
}: {
  text: string;
  className?: string;
  step?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block whitespace-pre"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            transitionDelay: `${i * step}ms`,
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(10px)",
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

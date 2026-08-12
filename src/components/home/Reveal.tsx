"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + rises its children into view the first time they enter the viewport.
 * Elements already on screen at load animate in immediately.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver support → reveal immediately rather than leaving
    // the content stuck invisible at opacity:0.
    if (typeof IntersectionObserver === "undefined") {
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
      // threshold 0: reveal as soon as ANY part enters view. A fixed ratio like
      // 0.12 is unreachable for sections taller than ~8× the viewport — the
      // viewport can't show 12% of them at once — so such sections (e.g. the
      // tall results/destinations block) stayed permanently invisible, worst on
      // mobile where the viewport is shortest.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`eb-reveal ${shown ? "eb-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

/**
 * Horizontal slider with working prev/next arrows (also swipeable / trackpad
 * scrollable on touch devices). The header (label + title) sits alongside the
 * arrows; the track scrolls by roughly one viewport per click.
 */
export function Slider({
  label,
  title,
  dark = false,
  children,
}: {
  label: string;
  title: React.ReactNode;
  dark?: boolean;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrowBase = dark
    ? "bg-white/10 text-white hover:bg-white/20"
    : "bg-white text-eb-navy shadow-sm hover:bg-eb-cream";

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {label && (
            <p
              className={
                "font-mono text-sm uppercase tracking-[0.12em] " +
                (dark ? "text-white/60" : "text-eb-navy/70")
              }
            >
              {label}
            </p>
          )}
          <h2
            className={
              "mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-[54px] " +
              (dark ? "text-white" : "text-eb-ink")
            }
          >
            {title}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            aria-label="Previous"
            onClick={() => scroll(-1)}
            disabled={atStart}
            className={`grid h-12 w-12 place-items-center rounded-lg transition disabled:opacity-40 ${arrowBase}`}
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            className={`grid h-12 w-12 place-items-center rounded-lg transition disabled:opacity-40 ${arrowBase}`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="eb-noscroll -mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0"
      >
        {children}
      </div>
    </div>
  );
}

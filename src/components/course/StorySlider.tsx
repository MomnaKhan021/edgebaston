"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Horizontal snap slider with centred prev/next buttons below the track. */
export function StorySlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // Arrows only make sense when the track actually overflows.
  const check = useCallback(() => {
    const el = ref.current;
    if (el) setScrollable(el.scrollWidth - el.clientWidth > 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    // On mobile, start with the middle slide centred (per the design);
    // desktop starts from the first slide.
    if (el && window.innerWidth < 640) {
      const mid = el.children[Math.floor(el.children.length / 2)] as HTMLElement | undefined;
      if (mid) el.scrollLeft = mid.offsetLeft - (el.clientWidth - mid.clientWidth) / 2;
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [check]);

  const nudge = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref}
        className="eb-scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
      {scrollable && (
        <div className="mt-8 flex justify-center gap-2.5">
          <button
            type="button"
            aria-label="Previous stories"
            onClick={() => nudge(-1)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded border border-black/10 bg-white text-eb-navy transition hover:bg-eb-navy hover:text-white"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next stories"
            onClick={() => nudge(1)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded border border-black/10 bg-white text-eb-navy transition hover:bg-eb-navy hover:text-white"
          >
            <Arrow dir="right" />
          </button>
        </div>
      )}
    </div>
  );
}

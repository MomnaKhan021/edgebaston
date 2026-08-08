"use client";

import { useEffect, useRef } from "react";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M11 4l-5 5 5 5" : "M7 4l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full-bleed centre-mode slider for the news section: the track spans the
 * whole viewport with no side padding, cards snap to centre, and the middle
 * card starts centred (its neighbours peeking in from both edges).
 */
export function NewsSlider({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Centre the middle card on mobile only; on desktop the track starts at the
  // left (aligned with the heading) so the first card isn't clipped at the edge.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(min-width: 640px)").matches) return;
    const mid = el.children[Math.floor(el.children.length / 2)] as HTMLElement | undefined;
    if (mid) el.scrollLeft = mid.offsetLeft - (el.clientWidth - mid.clientWidth) / 2;
  }, []);

  const nudge = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const step = card ? card.clientWidth + 20 : Math.round(el.clientWidth * 0.5);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header keeps the page gutter */}
      <div className="mx-auto flex max-w-[1440px] items-end justify-between px-4 lg:px-[60px]">
        <div>
          <p className="font-mono text-[13px] font-medium uppercase tracking-wide text-eb-blue sm:text-[14px]">
            {label}
          </p>
          <h2 className="mt-3 max-w-[520px] text-[26px] font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl lg:text-[52px]">
            {title}
          </h2>
        </div>
        <div className="hidden shrink-0 gap-3 pb-2 md:flex">
          <button
            type="button"
            aria-label="Previous articles"
            onClick={() => nudge(-1)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded bg-white text-eb-navy shadow-sm transition hover:bg-eb-navy hover:text-white"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next articles"
            onClick={() => nudge(1)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded bg-white text-eb-navy shadow-sm transition hover:bg-eb-navy hover:text-white"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      {/* Track aligned to the page gutter (like the header) so the cards don't
          run to the hard screen edge on desktop; still edge-to-edge on mobile. */}
      <div className="mx-auto max-w-[1440px] px-4 lg:px-[60px]">
        <div
          ref={ref}
          className="eb-noscroll -mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:mt-10 sm:gap-5 sm:px-4 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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
  subtitle,
  dark = false,
  titleClassName,
  labelClassName,
  labelUppercase = true,
  trackClassName = "mt-12 gap-6",
  mobileAlign = "center",
  startIndex,
  edgeClassName,
  children,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
  titleClassName?: string;
  labelClassName?: string;
  /** Design uses Title Case for some eyebrows (e.g. "Courses We Offer"). */
  labelUppercase?: boolean;
  /** Tailwind classes for the scroll track's top margin + gap. */
  trackClassName?: string;
  /** Header alignment on mobile (desktop is always left). */
  mobileAlign?: "center" | "left";
  /** On mobile, start with this slide centered (center-mode swiper). */
  startIndex?: number;
  /** Width of the mobile edge spacers: calc((sideInset) - gap) for the slide width in use. */
  edgeClassName?: string;
  children: React.ReactNode;
}) {
  const centerMobile = mobileAlign === "center";
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Center-mode start slide (mobile only): scroll the track so the slide at
  // `startIndex` sits in the middle, with its neighbours peeking either side.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || startIndex == null) return;
    if (window.matchMedia("(min-width: 640px)").matches) return;
    const slides = (Array.from(el.children) as HTMLElement[]).filter(
      (c) => !c.hasAttribute("aria-hidden") && c.offsetWidth > 0,
    );
    const target = slides[startIndex];
    if (!target) return;
    const track = el.getBoundingClientRect();
    const slide = target.getBoundingClientRect();
    el.scrollLeft += slide.left - track.left - (el.clientWidth - slide.width) / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    : "bg-white text-eb-navy-2 shadow-sm hover:bg-eb-cream";

  return (
    <div>
      <div className={"flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:text-left " + (centerMobile ? "text-center" : "text-left")}>
        <div className="eb-stagger">
          {label && (
            <p
              className={
                "font-mono text-sm font-medium tracking-[0.12em] " +
                (labelUppercase ? "uppercase " : "") +
                (labelClassName ?? (dark ? "text-white/60" : "text-eb-blue"))
              }
            >
              {label}
            </p>
          )}
          <h2
            className={
              "mt-4 max-w-3xl text-[30px] font-extrabold leading-[1.1] tracking-tight sm:text-4xl sm:leading-[1.05] md:mx-0 lg:text-[62px] " +
              (centerMobile ? "mx-auto " : "") +
              (titleClassName ?? (dark ? "text-white" : "text-eb-ink"))
            }
          >
            {title}
          </h2>
          {subtitle && (
            <p className={"mt-4 max-w-md text-[15px] leading-relaxed md:mx-0 " + (centerMobile ? "mx-auto " : "") + (dark ? "text-white/70" : "text-neutral-600")}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="hidden gap-3 md:flex">
          <button
            aria-label="Previous"
            onClick={() => scroll(-1)}
            disabled={atStart}
            className={`eb-ctrl grid h-12 w-12 cursor-pointer place-items-center rounded disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none ${arrowBase}`}
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scroll(1)}
            disabled={atEnd}
            className={`eb-ctrl grid h-12 w-12 cursor-pointer place-items-center rounded disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:transform-none ${arrowBase}`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`eb-noscroll -mx-4 flex snap-x snap-mandatory overflow-x-auto pb-2 sm:px-4 lg:mx-0 lg:px-0 ${trackClassName}`}
      >
        {/* Edge spacers so the first/last slide can snap to the centre on mobile */}
        <div aria-hidden className={`${edgeClassName ?? "w-[calc(10vw-1rem)]"} shrink-0 sm:hidden`} />
        {children}
        <div aria-hidden className={`${edgeClassName ?? "w-[calc(10vw-1rem)]"} shrink-0 sm:hidden`} />
      </div>
    </div>
  );
}

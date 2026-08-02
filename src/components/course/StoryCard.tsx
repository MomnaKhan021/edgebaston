"use client";

import { useState } from "react";

export type Story = {
  name: string;
  img: string;
  from: string;
  to: string;
  course: string;
  quote: string;
};

function DoubleArrow() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden className="inline-block">
      <path d="M1.5 1l4 4-4 4M7.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GradePill({ from, to, course }: { from: string; to: string; course: string }) {
  return (
    <div className="rounded-md bg-white px-3 py-2">
      <span className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-eb-navy">
        {from} <DoubleArrow /> {to}
      </span>
      <p className="mt-0.5 font-mono text-[10px] uppercase leading-snug tracking-wide text-neutral-600">{course}</p>
    </div>
  );
}

/**
 * Success-story photo card. Tapping the + rotates it to a × and fades in a
 * navy overlay with the student's quote — same interaction as the homepage.
 */
export function StoryCard({ story, className = "" }: { story: Story; className?: string }) {
  const [open, setOpen] = useState(false);
  const { name, img, from, to, course, quote } = story;
  return (
    <div className={"group relative shrink-0 overflow-hidden rounded-xl bg-eb-navy " + className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

      <button
        type="button"
        aria-label={open ? "Hide quote" : "Show quote"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-md bg-white text-eb-navy shadow-sm transition hover:bg-eb-cream"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={"transition-transform duration-300 " + (open ? "rotate-45" : "")}>
          <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {/* Collapsed: name + grade pill at the bottom */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-4">
        <p className="text-2xl font-bold leading-none text-white drop-shadow">{name}</p>
        <GradePill from={from} to={to} course={course} />
      </div>

      {/* Expanded: navy overlay with the quote (fades in) */}
      <div
        className={
          "absolute inset-0 flex flex-col justify-end gap-2.5 bg-eb-navy/92 p-4 transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      >
        <p className="text-2xl font-bold leading-none text-white">{name}</p>
        <p className="text-[13px] leading-relaxed text-white/85">&ldquo;{quote}&rdquo;</p>
        <GradePill from={from} to={to} course={course} />
      </div>
    </div>
  );
}

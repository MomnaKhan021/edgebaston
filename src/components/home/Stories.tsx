"use client";

import { useState } from "react";
import { Slider } from "./Slider";

function GradeBadge({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-eb-navy">
      {from}
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
        <path d="M0 5h9M6 1l4 4-4 4M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {to}
    </span>
  );
}

function PhotoCaption({ name, from, to, course }: { name: string; from: string; to: string; course: string }) {
  return (
    <>
      <span className="absolute bottom-24 left-4 text-2xl font-bold text-white drop-shadow-lg">
        {name}
      </span>
      <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white p-2.5">
        <GradeBadge from={from} to={to} />
        <p className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-wide text-neutral-600">{course}</p>
      </div>
    </>
  );
}

const COMPACT = [
  { name: "Nicole", img: "/figma/news-1.png", from: "BB", to: "A*A*", course: "Dentistry at King's College London", quote: "The small classes and mock exams gave me the confidence to jump from BB to A*A* and secure my dentistry place." },
  { name: "Tara", img: "/figma/news-2.png", from: "BB", to: "AA", course: "Medicine at Edge Hill University", quote: "The personalised UCAS support was the difference — I reapplied and got my medicine offer." },
  { name: "Jacob", img: "/figma/pathway-3.png", from: "CC", to: "A*A", course: "Engineering at University of Warwick", quote: "Weekly assessments kept me on track and my grades climbed two full levels over the year." },
];

function CompactCard({ c }: { c: (typeof COMPACT)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="eb-card group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl bg-eb-navy sm:w-[300px]">
      <div className="relative aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.img} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {/* readability gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <button
          type="button"
          aria-label={open ? "Collapse" : "Expand"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-md bg-white text-eb-navy shadow-sm transition hover:bg-eb-cream"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={"transition-transform " + (open ? "rotate-45" : "")}>
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {!open && <PhotoCaption name={c.name} from={c.from} to={c.to} course={c.course} />}

        {/* Expanded testimonial */}
        <div
          className={
            "absolute inset-0 flex flex-col justify-end bg-eb-navy/92 p-5 transition-opacity duration-300 " +
            (open ? "opacity-100" : "pointer-events-none opacity-0")
          }
        >
          <p className="text-2xl font-bold text-white">{c.name}</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/85">&ldquo;{c.quote}&rdquo;</p>
          <div className="mt-4 rounded-xl bg-white p-2.5">
            <GradeBadge from={c.from} to={c.to} />
            <p className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-wide text-neutral-600">{c.course}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Stories() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
        <Slider
          label="Success Stories"
          title="Real Students. Real Grade Transformation."
          labelClassName="text-eb-blue"
          trackClassName="mt-[60px] gap-5"
        >
          {/* Featured */}
          <div className="eb-card grid w-[90%] shrink-0 snap-start overflow-hidden rounded-2xl bg-white sm:w-[640px] sm:grid-cols-2">
            <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/pathway-1.png" alt="Alishba" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <PhotoCaption name="Alishba" from="BB" to="A*A*" course="Law at University of Cambridge" />
            </div>
            <div className="flex flex-col justify-between p-7">
              <p className="text-lg font-bold leading-relaxed text-eb-navy">
                &ldquo;The career guidance was absolutely transformative for me.
                Umar&apos;s Chemistry teaching helped me jump from a D to an A,
                whilst Owais&apos;s university advice gave me clear direction for
                my future. I&apos;m incredibly grateful for the comprehensive
                academic and careers support.&rdquo;
              </p>
              <button className="mt-6 self-start text-sm font-bold uppercase tracking-wide text-eb-navy underline underline-offset-4">
                View full profile
              </button>
            </div>
          </div>

          {/* Compact (expandable) */}
          {COMPACT.map((c) => (
            <CompactCard key={c.name} c={c} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

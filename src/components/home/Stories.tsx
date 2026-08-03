"use client";

import { useState } from "react";
import Link from "next/link";
import { Slider } from "./Slider";

/** Double-triangle "grade jump" glyph between the before/after grades. */
function GradeJump() {
  return (
    <svg width="13" height="8" viewBox="0 0 13 8" fill="currentColor" aria-hidden className="inline-block shrink-0">
      <path d="M0 0l5 4-5 4V0zM7 0l5 4-5 4V0z" />
    </svg>
  );
}

/** White grade box: a cream grade pill + the course, matching the Figma. */
function GradeBox({ grade, course }: { grade: string; course: string }) {
  const [from, to] = grade.split("→").map((s) => s.trim());
  return (
    <div className="rounded-lg bg-white p-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-eb-cream px-2 py-0.5 font-mono text-[11px] font-bold text-eb-navy">
        {from} <GradeJump /> {to}
      </span>
      <p className="mt-2 font-mono text-[11px] font-medium uppercase leading-snug tracking-wide text-eb-navy">
        {course}
      </p>
    </div>
  );
}

type Story = {
  name: string;
  img: string;
  grade: string;
  course: string;
  quote: string;
  /** Mobile-only compact version of the featured student. */
  mobileOnly?: boolean;
};

const STUDENTS: Story[] = [
  { name: "Alishba", img: "/figma/pathway-1.webp", grade: "BB → A*A*", course: "Law at University of Cambridge", quote: "The career guidance was absolutely transformative for me. Umar's Chemistry teaching helped me jump from a D to an A, whilst Owais's university advice gave me clear direction.", mobileOnly: true },
  { name: "Nicole", img: "/figma/news-1.webp", grade: "BB → A*A*", course: "Dentistry at King's College London", quote: "The small classes and mock exams gave me the confidence to jump from BB to A*A* and secure my dentistry place." },
  { name: "Tara", img: "/figma/news-2.webp", grade: "BB → AA", course: "Medicine at Edge Hill University", quote: "The personalised UCAS support was the difference — I reapplied and got my medicine offer." },
  { name: "Jacob", img: "/figma/pathway-3.webp", grade: "CC → A*A", course: "Engineering at University of Warwick", quote: "Weekly assessments kept me on track and my grades climbed two full levels over the year." },
];

function CompactCard({ c }: { c: Story }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        "group relative aspect-[4/5] w-[calc(100%-64px)] shrink-0 snap-center overflow-hidden rounded-lg bg-eb-navy sm:aspect-auto sm:h-[420px] sm:w-[292px] sm:snap-start " +
        (c.mobileOnly ? "sm:hidden" : "")
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

      <button
        type="button"
        aria-label={open ? "Collapse" : "Expand"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute right-4 top-4 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded bg-white text-eb-navy shadow-sm transition hover:bg-eb-cream"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={"transition-transform " + (open ? "rotate-45" : "")}>
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4">
          <p className="text-[28px] font-bold leading-none text-white sm:text-[32px]">{c.name}</p>
          <GradeBox grade={c.grade} course={c.course} />
        </div>
      )}

      <div
        className={
          "absolute inset-0 flex flex-col justify-end gap-3 bg-eb-navy/92 p-4 transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      >
        <p className="text-[28px] font-bold leading-none text-white sm:text-[32px]">{c.name}</p>
        <p className="text-[14px] leading-relaxed text-white/85">&ldquo;{c.quote}&rdquo;</p>
        <GradeBox grade={c.grade} course={c.course} />
      </div>
    </div>
  );
}

export function Stories({ data }: { data?: Record<string, string> }) {
  const featured = STUDENTS[0];
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-20">
        <Slider
          label={data?.label || "Success Stories"}
          title={data?.title || "Real Students. Real Grade Transformation."}
          subtitle={data?.subtitle || "Real students, real grade jumps. Watch how their retake year went."}
          labelClassName="text-black"
          titleClassName="text-black"
          trackClassName="mt-[40px] gap-4 sm:mt-[60px] sm:gap-6"
          startIndex={1}
          edgeClassName="w-4"
        >
          {/* Featured card — desktop only (688 wide: image + quote) */}
          <div className="hidden w-[688px] shrink-0 snap-start overflow-hidden rounded-lg bg-white sm:grid sm:grid-cols-2">
            <div className="relative min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.img} alt={featured.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4">
                <p className="text-[28px] font-bold leading-none text-white">{featured.name}</p>
                <GradeBox grade={featured.grade} course={featured.course} />
              </div>
            </div>
            <div className="flex flex-col justify-between p-6">
              <p className="text-[18px] font-bold leading-[1.35] text-eb-navy">&ldquo;{featured.quote}&rdquo;</p>
              <Link href="/about" className="mt-6 self-start text-[12px] font-semibold uppercase tracking-wide text-black underline underline-offset-4">
                View full profile
              </Link>
            </div>
          </div>

          {/* All students as compact cards (Alishba is mobile-only here) */}
          {STUDENTS.map((c) => (
            <CompactCard key={c.name} c={c} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

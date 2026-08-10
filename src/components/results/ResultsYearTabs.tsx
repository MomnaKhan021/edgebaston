"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/home/icons";

export type YearBlock = {
  year: string;
  heading: string;
  body: string; // HTML
  stats: [string, string, string];
  subjects: { name: string; grade: string; percent: number }[];
  gradesValue: string;
  dest1Value: number;
  dest2Value: number;
};

export type SharedLabels = {
  eyebrow: string;
  statLabels: [string, string, string];
  storyLabel: string;
  storyLinkLabel: string;
  storyLinkUrl: string;
  subjectsHeading: string;
  subjectsSubtitle: string;
  gradesLabel: string;
  destHeading: string;
  dest1Label: string;
  dest2Label: string;
  buttonLabel: string;
  buttonUrl: string;
  activeYear: string;
};

function Person({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={"h-6 w-6 " + (filled ? "text-eb-blue" : "text-eb-navy")} fill="currentColor" aria-hidden>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M5 21c0-4 3.1-7 7-7s7 3 7 7v.5H5V21Z" />
    </svg>
  );
}

function PeopleStat({ value, label }: { value: number; label: string }) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
      <p className="text-sm font-bold text-eb-navy">{label}</p>
      <div className="mt-5 grid max-w-[300px] grid-cols-10 gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <Person key={i} filled={i < filled} />
        ))}
      </div>
      <p className="mt-6 text-6xl font-extrabold leading-none text-eb-blue lg:text-7xl">
        {value % 1 === 0 ? value : value.toFixed(1)}
        <span className="align-top text-3xl lg:text-4xl">%</span>
      </p>
    </div>
  );
}

const SUBJECT_ICONS = [
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14M5 19c3-5 6-7 10-9" /></svg>),
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 15h9" /></svg>),
  (c: string) => (<svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 5H7l5 7-5 7h10" /></svg>),
];

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

/**
 * Year tabs for the Results page. Clicking a year switches the whole results
 * block (heading, intro, headline stats, subject bars and destination
 * highlights) to that year's data — no page reload.
 */
export function ResultsYearTabs({
  years,
  shared,
  showTabs = true,
  showSummary = true,
  showSubjects = true,
  showDestinations = true,
}: {
  years: YearBlock[];
  shared: SharedLabels;
  /** Section visibility (from the admin toggles) — lets the year bar, summary,
   *  subjects and destinations be hidden individually even in tabbed mode. */
  showTabs?: boolean;
  showSummary?: boolean;
  showSubjects?: boolean;
  showDestinations?: boolean;
}) {
  const initial =
    years.findIndex((y) => y.year === shared.activeYear) >= 0
      ? years.findIndex((y) => y.year === shared.activeYear)
      : 0;
  const [active, setActive] = useState(initial);
  const yr = years[active];
  if (!yr) return null;

  const hasBody = showSummary || showSubjects || showDestinations;

  return (
    <>
      {/* Year tab bar */}
      {showTabs && (
      <section className="bg-eb-navy">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <div className="eb-noscroll -mx-1 flex gap-1.5 overflow-x-auto px-1" role="tablist">
            {years.map((y, i) => (
              <button
                key={y.year}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={
                  "shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold transition " +
                  (i === active ? "bg-eb-blue text-white" : "text-white/70 hover:bg-white/10")
                }
              >
                {y.year}
              </button>
            ))}
          </div>
          {shared.buttonUrl && (
            <Link href={shared.buttonUrl} className="eb-cta group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy">
              {shared.buttonLabel}
              <span className="eb-square grid h-8 w-8 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          )}
        </div>
      </section>
      )}

      {/* Active year's results */}
      {hasBody && (
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-10 lg:px-16 lg:py-14">
          <div className="space-y-6 rounded-[28px] bg-eb-cream p-4 sm:p-6 lg:p-8">
            {/* Summary */}
            {showSummary && (
            <div>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-eb-navy/60">{shared.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-eb-ink lg:text-[40px]">{yr.heading}</h2>
                </div>
                <div className="w-full shrink-0 rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:w-[300px]">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-eb-navy">{shared.storyLabel}</p>
                    <PdfIcon className="h-5 w-5 shrink-0 text-eb-navy/70" />
                  </div>
                  {shared.storyLinkUrl && (
                    <Link href={shared.storyLinkUrl} className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-eb-navy/15 py-2 pl-4 pr-2 transition hover:border-eb-blue">
                      <span className="text-xs font-bold uppercase tracking-wide text-eb-navy">{shared.storyLinkLabel}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-eb-blue text-white"><ArrowUpRight className="h-4 w-4" /></span>
                    </Link>
                  )}
                </div>
              </div>

              {yr.body && (
                <div className="eb-rich mt-5 max-w-3xl text-[15px] leading-relaxed text-neutral-600" dangerouslySetInnerHTML={{ __html: yr.body }} />
              )}

              <div className="mt-6 grid grid-cols-1 divide-y divide-black/5 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {yr.stats.map((v, i) => (
                  <div key={i} className="p-6 text-center">
                    <p className="text-3xl font-extrabold text-eb-navy lg:text-4xl">{v}%</p>
                    <p className="mt-1 text-sm font-bold text-eb-blue">{shared.statLabels[i]}</p>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Subjects + grades */}
            {showSubjects && (
            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-stretch">
              <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-7">
                <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{shared.subjectsHeading}</h3>
                <p className="mt-1 text-sm text-neutral-600">{shared.subjectsSubtitle}</p>
                <div className="mt-6 space-y-5">
                  {yr.subjects.map((b, i) => {
                    const icon = SUBJECT_ICONS[i % SUBJECT_ICONS.length];
                    return (
                      <div key={i} className="flex items-center gap-3 sm:gap-4">
                        <span className="shrink-0 text-eb-navy">{icon("h-6 w-6")}</span>
                        <div className="flex w-28 shrink-0 items-center gap-2 sm:w-40">
                          <span className="text-sm font-semibold text-eb-navy">{b.name}</span>
                          {b.grade && <span className="rounded bg-eb-blue/10 px-2 py-0.5 text-[11px] font-bold text-eb-navy">{b.grade}</span>}
                        </div>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-eb-navy/10">
                          <div className="h-full rounded-full bg-eb-blue" style={{ width: `${Math.min(100, b.percent)}%` }} />
                        </div>
                        <span className="w-14 shrink-0 text-right text-sm font-bold text-eb-navy">{b.percent.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-extrabold text-eb-navy">{shared.gradesLabel}</h3>
                <div className="flex flex-1 items-center justify-center py-4">
                  <div className="relative grid h-40 w-40 place-items-center">
                    <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(14,47,73,0.10)" strokeWidth="14" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="var(--eb-blue, #2781c8)" strokeWidth="14" strokeLinecap="round" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={2 * Math.PI * 70 * 0.14} />
                    </svg>
                    <span className="absolute text-4xl font-extrabold text-eb-blue">{yr.gradesValue}</span>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Destinations */}
            {showDestinations && (
            <div>
              <h3 className="text-xl font-extrabold text-eb-navy lg:text-2xl">{shared.destHeading}</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <PeopleStat value={yr.dest1Value} label={shared.dest1Label} />
                <PeopleStat value={yr.dest2Value} label={shared.dest2Label} />
              </div>
            </div>
            )}
          </div>
        </div>
      </section>
      )}
    </>
  );
}

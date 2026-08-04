"use client";

import { useMemo, useState } from "react";

export type DestinationCard = {
  name: string;
  year: string;
  course: string;
  university: string;
  photo: string;
  logo: string;
};

const ALL = "all";

/**
 * "Where our students go next" — the destination card grid with working
 * Destination + Year filters and a reset. Options are derived from the cards
 * themselves, so they stay in sync with whatever the CMS holds.
 */
export function StudentDestinations({
  cards,
  destLabel,
  yearLabel,
  resetLabel,
}: {
  cards: DestinationCard[];
  destLabel: string;
  yearLabel: string;
  resetLabel: string;
}) {
  const [dest, setDest] = useState(ALL);
  const [year, setYear] = useState(ALL);

  const universities = useMemo(
    () => Array.from(new Set(cards.map((c) => c.university).filter(Boolean))).sort(),
    [cards],
  );
  const years = useMemo(
    () => Array.from(new Set(cards.map((c) => c.year).filter(Boolean))).sort((a, b) => b.localeCompare(a)),
    [cards],
  );

  const filtered = cards.filter(
    (c) => (dest === ALL || c.university === dest) && (year === ALL || c.year === year),
  );

  const selectCls =
    "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-9 text-sm text-eb-navy outline-none focus:border-eb-blue";
  const caret =
    "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-eb-navy/50";

  return (
    <div>
      {/* Filter bar */}
      <div className="grid gap-3 rounded-2xl bg-eb-cream p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-4 sm:p-4">
        <div className="relative">
          <label className="sr-only">{destLabel}</label>
          <select value={dest} onChange={(e) => setDest(e.target.value)} className={selectCls}>
            <option value={ALL}>{destLabel}</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={caret}><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="relative">
          <label className="sr-only">{yearLabel}</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
            <option value={ALL}>{yearLabel}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={caret}><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <button
          type="button"
          onClick={() => { setDest(ALL); setYear(ALL); }}
          className="rounded-xl border border-eb-navy/20 bg-white px-5 py-3 text-sm font-semibold text-eb-navy transition hover:bg-eb-navy hover:text-white"
        >
          {resetLabel}
        </button>
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">No destinations match those filters.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex items-center gap-3 p-4">
                {c.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.photo} alt={c.name} className="h-11 w-11 shrink-0 rounded-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-eb-cream text-sm font-bold text-eb-navy">
                    {c.name.charAt(0)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-eb-navy">{c.name}</p>
                  <p className="text-xs text-neutral-500">{c.year}</p>
                </div>
              </div>
              <div className="px-4 pb-2">
                <p className="text-[11px] font-mono uppercase tracking-wide text-eb-navy/50">Destination</p>
                <p className="text-sm font-semibold text-eb-navy">{c.course}</p>
              </div>
              <div className="mt-auto grid min-h-[92px] place-items-center border-t bg-eb-cream/60 p-4 text-center">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logo} alt={c.university} className="max-h-14 w-auto object-contain" loading="lazy" decoding="async" />
                ) : (
                  <span className="text-sm font-extrabold uppercase tracking-tight text-eb-navy">{c.university}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/home/icons";

/** Next 1st of August (this year if still upcoming, otherwise next year). */
function nextAugust(now: Date) {
  const thisYear = new Date(now.getFullYear(), 7, 1, 0, 0, 0);
  return now < thisYear ? thisYear : new Date(now.getFullYear() + 1, 7, 1, 0, 0, 0);
}

type T = { d: number; h: number; m: number; s: number };
function remaining(now: Date): T {
  let ms = nextAugust(now).getTime() - now.getTime();
  if (ms < 0) ms = 0;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}
const pad = (n: number) => String(n).padStart(2, "0");

/** Inline offer band shown directly under the breadcrumb on course pages. */
export function OfferBand() {
  const [t, setT] = useState<T>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => setT(remaining(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells: [number, string][] = [
    [t.d, "Days"],
    [t.h, "Hrs"],
    [t.m, "Mins"],
    [t.s, "Secs"],
  ];

  return (
    <div className="bg-gradient-to-r from-eb-navy via-eb-navy to-eb-blue">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-[60px] lg:py-2.5">
        <div className="flex items-center gap-6">
          {/* Countdown */}
          <div className="flex items-center gap-2">
            {cells.map(([v, label], i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-lg font-extrabold leading-none text-white sm:text-xl">{pad(v)}</div>
                  <div className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-white/60">{label}</div>
                </div>
                {i < cells.length - 1 && <span className="pb-3 text-base font-bold text-white/40">:</span>}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-white">July Offer</p>
            <p className="text-sm text-white/80">30% off course fees for the first 5 eligible applicants only.</p>
          </div>
        </div>
        <Link
          href="/contact"
          className="eb-cta group flex items-center justify-between gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-sm lg:justify-start"
        >
          Enquire About Course
          <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

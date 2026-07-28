"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./icons";

/**
 * Site-wide sticky offer bar. Stays fixed to the bottom on every public page
 * and shows the next August intake year (computed automatically). Hidden on
 * the admin dashboard and dismissible for the session.
 */
export function OfferBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    // August is month index 7. Show this year's August up to & including Aug,
    // otherwise next year's.
    setYear(now.getMonth() <= 7 ? now.getFullYear() : now.getFullYear() + 1);
    setOpen(sessionStorage.getItem("eb-offer-dismissed") !== "1");
  }, []);

  if (!open || year === null) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 rounded-2xl bg-eb-navy px-4 py-3 text-white shadow-2xl ring-1 ring-white/10 sm:px-6 sm:py-4">
        <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-eb-blue text-white sm:grid">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold sm:text-base">
            Applications are open for our August {year} intake
          </p>
          <p className="hidden text-sm text-white/70 sm:block">
            Places are limited — enquire today to secure your place.
          </p>
        </div>
        <Link
          href="/contact"
          className="eb-cta group flex shrink-0 items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy sm:pl-5 sm:text-sm"
        >
          Enquire
          <span className="eb-square grid h-8 w-8 place-items-center rounded-md bg-eb-blue text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
        <button
          type="button"
          aria-label="Dismiss offer"
          onClick={() => {
            setOpen(false);
            sessionStorage.setItem("eb-offer-dismissed", "1");
          }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
    </div>
  );
}

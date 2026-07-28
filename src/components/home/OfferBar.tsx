"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./icons";

/** Next 1st of August (this year if still upcoming, otherwise next year). */
function nextAugust(now: Date) {
  const thisYear = new Date(now.getFullYear(), 7, 1, 0, 0, 0);
  return now < thisYear ? thisYear : new Date(now.getFullYear() + 1, 7, 1, 0, 0, 0);
}

type T = { d: number; h: number; m: number; s: number };
function remaining(now: Date): T {
  let ms = nextAugust(now).getTime() - now.getTime();
  if (ms < 0) ms = 0;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}
const pad = (n: number) => String(n).padStart(2, "0");

function Countdown({ t, dark }: { t: T; dark?: boolean }) {
  const cells: [number, string][] = [
    [t.d, "Days"],
    [t.h, "Hrs"],
    [t.m, "Mins"],
    [t.s, "Secs"],
  ];
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {cells.map(([v, label], i) => (
        <div key={label} className="flex items-center gap-1.5 sm:gap-2">
          <div className="text-center">
            <div className="text-lg font-extrabold leading-none text-white sm:text-xl">{pad(v)}</div>
            <div className={"mt-0.5 text-[9px] font-medium uppercase tracking-wide " + (dark ? "text-white/50" : "text-white/50")}>{label}</div>
          </div>
          {i < cells.length - 1 && <span className="pb-3 text-base font-bold text-white/40">:</span>}
        </div>
      ))}
    </div>
  );
}

function EnquireBtn({ full }: { full?: boolean }) {
  return (
    <Link
      href="/contact"
      className={
        "eb-cta group flex items-center justify-between gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-sm " +
        (full ? "w-full" : "")
      }
    >
      Enquire About Course
      <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-md bg-eb-blue text-white">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}

export function OfferBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState<T>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    setOpen(sessionStorage.getItem("eb-offer-dismissed") !== "1");
    const tick = () => setT(remaining(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !open) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-3 mb-3 overflow-hidden rounded-2xl bg-gradient-to-r from-eb-navy to-eb-blue shadow-2xl ring-1 ring-white/10 lg:mx-0 lg:mb-0 lg:rounded-none lg:ring-0">
        <div className="mx-auto max-w-[1440px] px-4 py-3 lg:px-16 lg:py-3.5">
          {/* Desktop */}
          <div className="hidden items-center justify-between gap-6 lg:flex">
            <div className="flex items-center gap-6">
              <Countdown t={t} />
              <div className="border-l border-white/20 pl-6">
                <p className="text-sm font-extrabold uppercase tracking-wide text-white">August Offer</p>
                <p className="text-sm text-white/80">30% off course fees for the first 5 eligible applicants only.</p>
              </div>
            </div>
            <EnquireBtn />
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <div className="flex items-start justify-between gap-3">
              <p className="max-w-[52%] text-xs leading-snug text-white/85">
                <span className="font-bold text-white">August Offer:</span> 30% off course fees for the first 5 eligible applicants only.
              </p>
              <Countdown t={t} dark />
            </div>
            <div className="mt-3">
              <EnquireBtn full />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

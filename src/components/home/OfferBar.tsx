"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./icons";

/**
 * Parse the admin "Offer ends" value. Accepts "YYYY-MM-DD HH:MM",
 * "YYYY-MM-DD" or full ISO; interpreted in the visitor's local time.
 * Returns null when empty or unparseable → no countdown is shown.
 */
function parseEndDate(value?: string): Date | null {
  const raw = (value ?? "").trim();
  if (!raw) return null;
  const iso = raw.replace(" ", "T");
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Make a link domain-independent: a full URL pointing at our deploy host
 * (e.g. https://edgebaston.vercel.app/inquiry) becomes a relative path
 * (/inquiry) so it keeps working after the real domain goes live.
 */
function internalHref(u: string): string {
  try {
    const p = new URL(u);
    if (/(^|\.)vercel\.app$/i.test(p.hostname)) return (p.pathname + p.search + p.hash) || "/";
  } catch {
    /* not an absolute URL — leave as-is */
  }
  return u;
}

type T = { d: number; h: number; m: number; s: number };
function remaining(now: Date, target: Date): T {
  let ms = target.getTime() - now.getTime();
  if (ms < 0) ms = 0;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}
const pad = (n: number) => String(n).padStart(2, "0");

function Countdown({ t }: { t: T }) {
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
            <div className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-white/50">{label}</div>
          </div>
          {i < cells.length - 1 && <span className="pb-3 text-base font-bold text-white/40">:</span>}
        </div>
      ))}
    </div>
  );
}

function EnquireBtn({ full, label = "Enquire About Course", href = "/contact" }: { full?: boolean; label?: string; href?: string }) {
  return (
    <Link
      href={internalHref(href)}
      className={
        "eb-cta group flex items-center justify-between gap-3 rounded-lg bg-white py-2 pl-5 pr-2 text-xs font-bold uppercase tracking-wide text-eb-navy sm:text-sm " +
        (full ? "w-full" : "")
      }
    >
      {label}
      <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}

export function OfferBar({
  bgColor = "",
  title = "August Offer",
  message = "30% off course fees for the first 5 eligible applicants only.",
  endDate = "",
  buttonLabel = "Enquire About Course",
  buttonUrl = "/contact",
}: {
  bgColor?: string;
  title?: string;
  message?: string;
  endDate?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState<T>({ d: 0, h: 0, m: 0, s: 0 });

  const target = parseEndDate(endDate);
  const hasTimer = target !== null;
  // Treat whitespace-only values as empty so a blank title never prints a
  // stray ":" (or an empty text block) on the bar.
  title = (title ?? "").trim();
  message = (message ?? "").trim();

  useEffect(() => {
    setMounted(true);
    setOpen(sessionStorage.getItem("eb-offer-dismissed") !== "1");
    if (!target) return;
    const tick = () => setT(remaining(new Date(), target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  const info = hasTimer || Boolean(title) || Boolean(message);
  const hasContent = info || Boolean(buttonUrl);
  if (!mounted || !open || !hasContent) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    // z-[65]: above the hero (z-[60], whose full-height image would otherwise
    // paint over this fixed bar) but below the navbar / mobile menu (z-[70]).
    <div className="fixed inset-x-0 bottom-0 z-[65]">
      <div className="mx-3 mb-3 overflow-hidden rounded-2xl bg-gradient-to-r from-eb-navy to-eb-blue shadow-2xl ring-1 ring-white/10 lg:mx-0 lg:mb-0 lg:rounded-none lg:ring-0" style={bgColor ? { background: bgColor } : undefined}>
        <div className="mx-auto max-w-[1440px] px-4 py-3 lg:px-[60px] lg:py-3.5">
          {/* Desktop — the button is truly centred on the bar; the timer/text
              sits on the left (absolutely, with a capped width) so it can never
              push the button off centre. The button always shows. */}
          <div className="relative hidden min-h-[44px] items-center justify-center lg:flex">
            {info && (
              <div className="absolute left-0 top-1/2 flex max-w-[calc(50%-150px)] -translate-y-1/2 items-center gap-5 overflow-hidden">
                {hasTimer && <Countdown t={t} />}
                {(title || message) && (
                  <div className={"min-w-0 " + (hasTimer ? "border-l border-white/20 pl-5" : "")}>
                    {title && <p className="truncate text-sm font-extrabold uppercase tracking-wide text-white">{title}</p>}
                    {message && <p className="truncate text-sm text-white/80">{message}</p>}
                  </div>
                )}
              </div>
            )}
            <EnquireBtn label={buttonLabel} href={buttonUrl || "/contact"} />
          </div>

          {/* Mobile — the button always shows, full width, below the offer text */}
          <div className="lg:hidden">
            {info && (
              <div className="flex items-start justify-between gap-3">
                {(title || message) && (
                  <p className="max-w-[52%] text-xs leading-snug text-white/85">
                    {title && <span className="font-bold text-white">{title}{message ? ": " : ""}</span>}
                    {message}
                  </p>
                )}
                {hasTimer && <Countdown t={t} />}
              </div>
            )}
            <div className={info ? "mt-3" : ""}>
              <EnquireBtn full label={buttonLabel} href={buttonUrl || "/contact"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

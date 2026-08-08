import Link from "next/link";
import { SiteNavbar } from "./SiteNavbar";
import { ArrowUpRight } from "./icons";
import { CountUp } from "./CountUp";
import {num, sectionDefaults, bgStyle, overlayOn } from "@/lib/templates";

export function Hero({ data }: { data?: Record<string, string> }) {
  const d = { ...sectionDefaults("home", "hero"), ...data };
  const bgDesktop = d.bgDesktop || "/figma/hero-building.webp";
  const bgMobile = d.bgMobile || bgDesktop;

  return (
    <section className="relative z-[60] isolate overflow-x-clip bg-eb-navy" style={bgStyle(data)}>
      <SiteNavbar />

      {/* Background photo (separate mobile/desktop images from the admin) */}
      <picture>
        <source media="(max-width: 639px)" srcSet={bgMobile} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgDesktop}
          alt="Edgbaston College"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%]" fetchPriority="high" />
      </picture>
      {overlayOn(d) && (
        <>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
        </>
      )}

      <div className="relative mx-auto flex min-h-[600px] max-w-[1440px] flex-col justify-end px-4 pb-8 pt-32 sm:min-h-[720px] sm:pt-36 lg:min-h-[780px] lg:px-[60px] lg:pb-14">
        <div className="grid gap-3 lg:grid-cols-[1fr_440px] lg:items-end lg:gap-8">
          {/* Heading — wraps to three lines like the design */}
          <h1 className="text-center text-[30px] font-bold leading-[1.1] tracking-tight text-white sm:text-left sm:text-5xl sm:leading-[1.02] lg:col-start-1 lg:row-start-1 lg:max-w-[760px] lg:text-[62px]">
            {d.heading}
          </h1>

          {/* Stats card */}
          <div className="relative rounded-2xl bg-white p-3 shadow-xl lg:col-start-2 lg:row-span-2 lg:self-end">
            {/* Badge hangs from the top-right edge (ribbon peeks at the top) */}
            <Medal className="absolute right-4 top-0 h-12 w-12 sm:right-5 sm:h-16 sm:w-16" />
            <div className="px-3 pb-3 pr-12 pt-2 sm:pb-4 sm:pr-16 sm:pt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-extrabold leading-none text-eb-blue sm:text-[43px]">{d.statHeadline}</span>
                <span className="text-[12px] font-medium leading-snug text-eb-navy sm:text-[17px]">
                  {d.statCaption}
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-eb-cream px-4 sm:px-6">
              <StatRow label={d.stat1Label} to={num(d.stat1Value, 24)} />
              <StatRow label={d.stat2Label} to={num(d.stat2Value, 57)} />
            </div>
          </div>

          {/* CTA — hidden when no link is set in the admin */}
          {d.buttonUrl && (
            <Link
              href={d.buttonUrl}
              className="eb-cta group flex w-full items-center justify-between gap-3 self-start rounded-lg bg-white py-2 pl-5 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy sm:inline-flex sm:w-fit sm:justify-start lg:col-start-1 lg:row-start-2"
            >
              {d.buttonLabel}
              <span className="eb-square grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-eb-blue text-white ring-2 ring-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** Blue rosette medal with a ribbon hanger and a white star. */
function Medal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 52" fill="none" className={className} aria-hidden>
      {/* ribbon hanger peeking above the medallion */}
      <rect x="20.5" y="1.5" width="7" height="15" rx="3.5" fill="#1f6fb2" />
      {/* scalloped rosette */}
      <path
        d="M24 11 L27.11 14.41 L31.50 13.01 L32.49 17.51 L36.99 18.50 L35.59 22.89 L39.00 26.00 L35.59 29.11 L36.99 33.50 L32.49 34.49 L31.50 38.99 L27.11 37.59 L24.00 41.00 L20.89 37.59 L16.50 38.99 L15.51 34.49 L11.01 33.50 L12.41 29.11 L9.00 26.00 L12.41 22.89 L11.01 18.50 L15.51 17.51 L16.50 13.01 L20.89 14.41 Z"
        fill="#2781c8"
      />
      {/* white star */}
      <path
        d="M24 19 L25.70 23.65 L30.66 23.84 L26.76 26.90 L28.11 31.66 L24.00 28.90 L19.89 31.66 L21.24 26.90 L17.34 23.84 L22.30 23.65 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function StatRow({ label, to }: { label: string; to: number }) {
  // Show one decimal place when the value has one (e.g. 72.7), whole otherwise.
  const decimals = Number.isInteger(to) ? 0 : 1;
  return (
    <div className="flex items-center justify-between py-3 sm:py-4">
      <span className="text-[14px] font-medium text-eb-navy sm:text-[18px]">{label}</span>
      <CountUp to={to} decimals={decimals} suffix="%" className="text-[24px] font-extrabold leading-none text-eb-blue sm:text-[40px]" />
    </div>
  );
}

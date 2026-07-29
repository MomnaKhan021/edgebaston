import Link from "next/link";
import { Navbar } from "./Navbar";
import { ArrowUpRight } from "./icons";
import { CountUp } from "./CountUp";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-eb-navy">
      <Navbar />

      {/* Building photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/hero-building.png"
        alt="Edgbaston College building"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-4 pb-8 pt-36 lg:min-h-[780px] lg:px-[60px] lg:pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-end lg:gap-8">
          {/* Heading — wraps to three lines like the design */}
          <h1 className="text-[34px] font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:col-start-1 lg:row-start-1 lg:max-w-[720px] lg:text-[62px]">
            Birmingham&apos;s Top-Performing Independent Sixth Form College
          </h1>

          {/* Stats card */}
          <div className="relative rounded-2xl bg-white p-3 shadow-xl lg:col-start-2 lg:row-span-2 lg:self-end">
            {/* Badge hangs from the top-right edge (ribbon peeks at the top) */}
            <Medal className="absolute right-5 top-0 h-16 w-16" />
            <div className="px-3 pb-4 pr-16 pt-3">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[43px] font-extrabold leading-none text-eb-blue">#1</span>
                <span className="max-w-[190px] text-[17px] font-medium leading-snug text-eb-navy">
                  for Value-Added in Birmingham
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-eb-cream px-6">
              <StatRow label="A Level Results A*-A" to={24} />
              <StatRow label="A Level Results A*-B" to={57} />
            </div>
          </div>

          {/* CTA — fit-content width */}
          <Link
            href="/contact"
            className="eb-cta group inline-flex w-fit items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy lg:col-start-1 lg:row-start-2"
          >
            Enquire About Course
            <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-md bg-eb-blue text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
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
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-[18px] font-medium text-eb-navy">{label}</span>
      <CountUp to={to} suffix="%" className="text-[40px] font-extrabold leading-none text-eb-blue" />
    </div>
  );
}

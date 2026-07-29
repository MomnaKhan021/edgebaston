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
          <h1 className="text-[34px] font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:col-start-1 lg:row-start-1 lg:text-[62px]">
            Birmingham&apos;s Top-Performing Independent Sixth Form College
          </h1>

          {/* Stats card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl lg:col-start-2 lg:row-span-2 lg:self-end">
            <div className="flex items-center justify-between gap-3 px-6 py-5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[43px] font-extrabold leading-none text-eb-blue">#1</span>
                <span className="text-[15px] font-medium text-eb-navy">for Value-Added in Birmingham</span>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-eb-blue/10 text-eb-blue">
                <StarIcon />
              </span>
            </div>
            <StatRow label="A Level Results A*-A" to={24} />
            <StatRow label="A Level Results A*-B" to={57} />
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

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.6 6.3L21 9l-5 4.3L17.6 20 12 16.4 6.4 20 8 13.3 3 9l6.4-.7L12 2z" />
    </svg>
  );
}

function StatRow({ label, to }: { label: string; to: number }) {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
      <span className="text-[15px] font-medium text-eb-navy">{label}</span>
      <CountUp to={to} suffix="%" className="text-[28px] font-extrabold text-eb-blue" />
    </div>
  );
}

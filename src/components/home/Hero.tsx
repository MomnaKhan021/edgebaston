import Link from "next/link";
import { Navbar } from "./Navbar";
import { ArrowUpRight } from "./icons";

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
      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-end px-6 pb-10 pt-40 lg:min-h-[780px] lg:px-16 lg:pb-14">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          {/* Heading + CTA */}
          <div className="max-w-2xl">
            <h1 className="text-[38px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[62px]">
              Birmingham&apos;s Top-Performing Independent Sixth Form College
            </h1>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-eb-navy transition hover:bg-white/90"
            >
              Enquire About Course
              <span className="grid h-9 w-9 place-items-center rounded-md bg-eb-blue text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          </div>

          {/* Stats card */}
          <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl lg:w-[440px]">
            <div className="flex items-center justify-between gap-3 px-6 py-5">
              <div className="flex items-baseline gap-3">
                <span className="text-[40px] font-extrabold leading-none text-eb-blue">
                  #1
                </span>
                <span className="text-sm font-medium text-eb-navy">
                  for Value-Added in Birmingham
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/medal.svg" alt="" className="h-9 w-9" />
            </div>
            <StatRow label="A Level Results A*-A" value="24%" tint />
            <StatRow label="A Level Results A*-B" value="57%" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-between px-6 py-4 " +
        (tint ? "bg-eb-cream" : "bg-white")
      }
    >
      <span className="text-[17px] font-medium text-eb-navy">{label}</span>
      <span className="text-2xl font-extrabold text-eb-blue">{value}</span>
    </div>
  );
}

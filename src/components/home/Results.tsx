import { ArrowUpRight } from "./icons";
import { CountUp } from "./CountUp";

type Info = { label: string; title: string; body?: string; place?: string };

function InfoCard({ label, title, body, place }: Info) {
  return (
    <div className={"rounded-xl bg-eb-cream p-7 " + (place ?? "")}>
      <div>
        <p className="font-mono text-[16px] font-medium uppercase tracking-wide text-eb-blue">{label}</p>
        <h4 className="mt-6 text-[28px] font-bold leading-tight text-eb-navy lg:text-[32px]">{title}</h4>
      </div>
      {body && <p className="mt-[42px] text-[16px] leading-relaxed text-black">{body}</p>}
    </div>
  );
}

/** Blue rosette medal with a ribbon hanger and a white star. */
function Medal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 52" fill="none" className={className} aria-hidden>
      <rect x="20.5" y="1.5" width="7" height="15" rx="3.5" fill="#1f6fb2" />
      <path
        d="M24 11 L27.11 14.41 L31.50 13.01 L32.49 17.51 L36.99 18.50 L35.59 22.89 L39.00 26.00 L35.59 29.11 L36.99 33.50 L32.49 34.49 L31.50 38.99 L27.11 37.59 L24.00 41.00 L20.89 37.59 L16.50 38.99 L15.51 34.49 L11.01 33.50 L12.41 29.11 L9.00 26.00 L12.41 22.89 L11.01 18.50 L15.51 17.51 L16.50 13.01 L20.89 14.41 Z"
        fill="#2781c8"
      />
      <path
        d="M24 19 L25.70 23.65 L30.66 23.84 L26.76 26.90 L28.11 31.66 L24.00 28.90 L19.89 31.66 L21.24 26.90 L17.34 23.84 L22.30 23.65 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function Results() {
  return (
    <section className="bg-eb-navy">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 lg:px-10 lg:pb-10 lg:pt-20">
        {/* Heading block (gap 16, centered) */}
        <div className="eb-stagger mx-auto max-w-3xl text-center">
          <p className="text-[16px] font-medium text-white">Outcome Spotlight</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white lg:text-[62px]">
            Results That Open Doors
          </h2>
          <p className="mt-4 text-[16px] font-normal leading-relaxed text-white/80">
            Our 2025 results place Edgbaston College among England&apos;s highest-performing sixth
            form colleges — independently verified and publicly ranked.
          </p>
        </div>

        {/* Door + flanking stat boxes (left higher, right lower) */}
        <div className="relative mt-[60px] grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <svg className="pointer-events-none absolute left-[27%] top-[58%] hidden h-24 w-32 text-white/70 md:block" viewBox="0 0 120 80" fill="none" aria-hidden>
            <path d="M4 8 C 50 16, 78 54, 112 68" stroke="currentColor" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
            <circle cx="112" cy="68" r="4" fill="currentColor" />
          </svg>
          <svg className="pointer-events-none absolute right-[27%] top-[16%] hidden h-24 w-32 text-white/70 md:block" viewBox="0 0 120 80" fill="none" aria-hidden>
            <path d="M116 72 C 70 62, 42 22, 8 8" stroke="currentColor" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
            <circle cx="8" cy="8" r="4" fill="currentColor" />
          </svg>

          {/* Left box — higher */}
          <div className="z-10 rounded-xl border border-white/25 bg-white/[0.06] p-5 text-center backdrop-blur-sm sm:p-[26px] lg:-translate-y-8">
            <p className="text-[16px] font-medium text-white">National Ranking</p>
            <CountUp to={25} prefix="#" className="my-2 block text-5xl font-extrabold text-white lg:text-[64px]" />
            <p className="text-[15px] text-white/80">Sixth form college in England</p>
          </div>

          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/door.svg" alt="" className="h-40 w-auto sm:h-56 lg:h-72" />
          </div>

          {/* Right box — lower, with rosette medal top-left */}
          <div className="relative z-10 rounded-xl border border-white/25 bg-white/[0.06] p-5 text-center backdrop-blur-sm sm:p-[26px] lg:translate-y-10">
            <Medal className="absolute left-4 top-3 h-8 w-8" />
            <p className="text-[16px] font-medium text-white">Value Added</p>
            <CountUp to={1} prefix="#" className="my-2 block text-5xl font-extrabold text-white lg:text-[64px]" />
            <p className="text-[15px] text-white/80">For Value-Added in Birmingham</p>
          </div>
        </div>

        {/* Blue split bar (r12) */}
        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-xl bg-eb-blue">
          <div className="flex flex-col gap-1 border-r border-white/25 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
            <CountUp to={96} suffix="%" className="text-4xl font-bold text-white sm:text-6xl lg:text-[64px]" />
            <span className="text-sm text-white sm:text-[22px] sm:leading-tight">success rate in securing Medicine &amp; Dentistry places</span>
          </div>
          <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
            <CountUp to={72.7} decimals={1} suffix="%" className="text-4xl font-bold text-white sm:text-6xl lg:text-[64px]" />
            <span className="text-sm text-white sm:text-[22px] sm:leading-tight">Russell Group Progression</span>
          </div>
        </div>

        {/* White card (r12, 40px padding), inset a further 20px like the design */}
        <div className="mt-10 lg:mx-5">
          <div className="rounded-xl bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              <InfoCard label="Grade Performance" title="A*-A / A*-B Results" body="Clear academic proof showing how students perform across top grade bands." place="lg:col-start-1 lg:row-start-1" />
              <InfoCard label="Grade Improvement" title="Value-Added Progress" body="Shows how students improve from their starting point through personalised support." place="lg:col-start-2 lg:row-start-1" />
              <InfoCard label="Competitive Pathways" title="Oxbridge Outcomes" body="Support for ambitious students applying to Oxford, Cambridge, and high-tariff courses." place="lg:col-start-1 lg:row-start-2" />
              <InfoCard label="Specialist Routes" title="Medicine & Dentistry" body="Focused guidance for students aiming for medicine, dentistry, and clinical pathways." place="lg:col-start-2 lg:row-start-2" />
              <div className="col-span-2 flex flex-col rounded-xl bg-eb-cream p-7 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
                <p className="font-mono text-[16px] font-medium uppercase tracking-wide text-eb-blue">University Destinations</p>
                <h4 className="mt-6 text-[28px] font-bold leading-tight text-eb-navy lg:text-[32px]">Russell Group &amp; QS Top Universities</h4>
                <p className="mt-[42px] text-[16px] leading-relaxed text-black lg:mt-auto lg:pt-10">
                  A stronger way to show where students progress after Edgbaston College, from leading UK universities to competitive degree pathways.
                </p>
              </div>
              <button className="eb-cta group col-span-2 flex items-center justify-between gap-4 rounded bg-eb-cream py-3 pl-5 pr-3 text-left lg:col-span-1 lg:col-start-3 lg:row-start-3">
                <span className="text-[14px] font-bold uppercase tracking-wide text-eb-navy">View Results &amp; Destinations</span>
                <span className="eb-square grid h-10 w-10 shrink-0 place-items-center rounded bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "./icons";

type Info = { label: string; title: string; body?: string; place?: string };

function InfoCard({ label, title, body, place }: Info) {
  return (
    <div className={"rounded-xl bg-eb-cream p-6 " + (place ?? "")}>
      <p className="font-mono text-[13px] uppercase tracking-wide text-eb-blue">{label}</p>
      <h4 className="mt-3 text-xl font-bold text-eb-navy lg:text-2xl">{title}</h4>
      {body && <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{body}</p>}
    </div>
  );
}

export function Results() {
  return (
    <section className="bg-eb-navy">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
        {/* Heading */}
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-white/60">Outcome Spotlight</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white lg:text-[58px]">
            Results That Open Doors
          </h2>
        </div>

        {/* Door + flanking stat boxes (stay side-by-side on all sizes) */}
        <div className="relative mt-12 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <div className="z-10 rounded-2xl bg-white/[0.06] p-4 text-center backdrop-blur-sm sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-white/70 sm:text-sm">National Ranking</p>
            <p className="my-1 text-4xl font-extrabold text-white sm:text-6xl">#25</p>
            <p className="text-xs text-white/70 sm:text-sm">Sixth form college in England</p>
          </div>

          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/door.svg" alt="" className="h-40 w-auto sm:h-56 lg:h-72" />
          </div>

          <div className="z-10 rounded-2xl bg-white/[0.06] p-4 text-center backdrop-blur-sm sm:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/medal.svg" alt="" className="mx-auto mb-1 h-7 w-7 sm:h-8 sm:w-8" />
            <p className="font-mono text-[11px] uppercase tracking-wide text-white/70 sm:text-sm">Value Added</p>
            <p className="my-1 text-4xl font-extrabold text-white sm:text-6xl">#1</p>
            <p className="text-xs text-white/70 sm:text-sm">For Value-Added in Birmingham</p>
          </div>
        </div>

        {/* Blue split bar (two columns on all sizes) */}
        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl bg-eb-blue">
          <div className="flex flex-col gap-1 border-r border-white/25 px-4 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-6">
            <span className="text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl">96%</span>
            <span className="text-sm text-white/90 sm:text-lg">success rate in securing Medicine &amp; Dentistry places</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-6">
            <span className="text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl">72.7%</span>
            <span className="text-sm text-white/90 sm:text-lg">Russell Group Progression</span>
          </div>
        </div>

        {/* White card with info grid: 2-col on mobile, 3-col on desktop */}
        <div className="mt-6 rounded-3xl bg-white p-4 sm:p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <InfoCard
              label="Grade Performance"
              title="A*-A / A*-B Results"
              body="Clear academic proof showing how students perform across top grade bands."
              place="lg:col-start-1 lg:row-start-1"
            />
            <InfoCard
              label="Grade Improvement"
              title="Value-Added Progress"
              body="Shows how students improve from their starting point through personalised support."
              place="lg:col-start-2 lg:row-start-1"
            />
            <InfoCard
              label="Competitive Pathways"
              title="Oxbridge Outcomes"
              body="Support for ambitious students applying to Oxford, Cambridge, and high-tariff courses."
              place="lg:col-start-1 lg:row-start-2"
            />
            <InfoCard
              label="Specialist Routes"
              title="Medicine & Dentistry"
              body="Focused guidance for students aiming for medicine, dentistry, and clinical pathways."
              place="lg:col-start-2 lg:row-start-2"
            />
            <div className="col-span-2 flex flex-col rounded-xl bg-eb-cream p-6 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
              <p className="font-mono text-[13px] uppercase tracking-wide text-eb-blue">University Destinations</p>
              <h4 className="mt-3 text-xl font-extrabold text-eb-navy lg:text-2xl">
                Russell Group &amp; QS Top Universities
              </h4>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 lg:mt-auto lg:pt-8">
                A stronger way to show where students progress after Edgbaston College, from
                leading UK universities to competitive degree pathways.
              </p>
            </div>
            <button className="col-span-2 flex items-center justify-between gap-4 rounded-xl bg-eb-cream px-6 py-4 text-left lg:col-span-1 lg:col-start-3 lg:row-start-3">
              <span className="text-sm font-bold uppercase tracking-wide text-eb-navy">View Results &amp; Destinations</span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-eb-blue text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

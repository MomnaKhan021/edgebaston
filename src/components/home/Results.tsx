import { ArrowUpRight } from "./icons";

type Info = { label: string; title: string; body?: string };

const INFO: Info[] = [
  {
    label: "Grade Performance",
    title: "A*-A / A*-B Results",
    body: "Clear academic proof showing how students perform across top grade bands.",
  },
  {
    label: "Grade Improvement",
    title: "Value-Added Progress",
    body: "Shows how students improve from their starting point through personalised support.",
  },
  {
    label: "Competitive Pathways",
    title: "Oxbridge Outcomes",
    body: "Support for ambitious students applying to Oxford, Cambridge, and high-tariff courses.",
  },
  {
    label: "Specialist Routes",
    title: "Medicine & Dentistry",
    body: "Focused guidance for students aiming for medicine, dentistry, and clinical pathways.",
  },
];

function InfoCard({ label, title, body }: Info) {
  return (
    <div className="rounded-xl bg-eb-cream p-6">
      <p className="font-mono text-[13px] uppercase tracking-wide text-eb-blue">
        {label}
      </p>
      <h4 className="mt-3 text-2xl font-bold text-eb-navy">{title}</h4>
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
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-white/60">
            Outcome Spotlight
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white lg:text-[58px]">
            Results That Open Doors
          </h2>
        </div>

        {/* Door + stat boxes */}
        <div className="mt-12 grid items-center gap-6 md:grid-cols-3 md:gap-4">
          <div className="order-2 rounded-2xl bg-white/[0.06] px-8 py-8 text-center md:order-1">
            <p className="font-mono text-sm uppercase tracking-wide text-white/70">
              National Ranking
            </p>
            <p className="my-2 text-6xl font-extrabold text-white">#25</p>
            <p className="text-sm text-white/70">Sixth form college in England</p>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/door.svg" alt="" className="h-56 w-auto lg:h-72" />
          </div>

          <div className="order-3 rounded-2xl bg-white/[0.06] px-8 py-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/medal.svg" alt="" className="mx-auto mb-2 h-8 w-8" />
            <p className="font-mono text-sm uppercase tracking-wide text-white/70">
              Value Added
            </p>
            <p className="my-2 text-6xl font-extrabold text-white">#1</p>
            <p className="text-sm text-white/70">For Value-Added in Birmingham</p>
          </div>
        </div>

        {/* Blue split bar */}
        <div className="mt-6 grid overflow-hidden rounded-2xl bg-eb-blue sm:grid-cols-2">
          <div className="flex items-center gap-4 px-8 py-6 sm:border-r sm:border-white/25">
            <span className="text-5xl font-extrabold text-white lg:text-6xl">96%</span>
            <span className="text-lg text-white/90">
              success rate in securing Medicine &amp; Dentistry places
            </span>
          </div>
          <div className="flex items-center gap-4 px-8 py-6">
            <span className="text-5xl font-extrabold text-white lg:text-6xl">72.7%</span>
            <span className="text-lg text-white/90">Russell Group Progression</span>
          </div>
        </div>

        {/* White card with info grid */}
        <div className="mt-6 rounded-3xl bg-white p-5 lg:p-7">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <InfoCard {...INFO[0]} />
              <InfoCard {...INFO[2]} />
            </div>
            <div className="flex flex-col gap-4">
              <InfoCard {...INFO[1]} />
              <InfoCard {...INFO[3]} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-1 flex-col rounded-xl bg-eb-cream p-6">
                <p className="font-mono text-[13px] uppercase tracking-wide text-eb-blue">
                  University Destinations
                </p>
                <h4 className="mt-3 text-2xl font-extrabold text-eb-navy">
                  Russell Group &amp; QS Top Universities
                </h4>
                <p className="mt-auto pt-8 text-[15px] leading-relaxed text-neutral-600">
                  A stronger way to show where students progress after Edgbaston
                  College, from leading UK universities to competitive degree
                  pathways.
                </p>
              </div>
              <button className="flex items-center justify-between gap-4 rounded-xl bg-eb-cream px-6 py-4 text-left">
                <span className="text-sm font-bold uppercase tracking-wide text-eb-navy">
                  View Results &amp; Destinations
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-eb-blue text-white">
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

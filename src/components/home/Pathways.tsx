import { ArrowRight, ArrowUpRight } from "./icons";

const CARDS = [
  {
    title: "One Year A-Level Retake",
    body: "Focused retake support in a specialist environment. Small classes, regular mocks, and dedicated university guidance to help you secure the grades you need.",
    stat: "16.0%",
    statLabel: "of 2025 A-Level grades achieved the top A* grade",
    img: "/figma/pathway-1.png",
  },
  {
    title: "Five Term A-Level",
    body: "A flexible five-term pathway starting in January. Ideal for students who missed the September entry window but want a full and structured route to university.",
    stat: "16.0%",
    statLabel: "of 2025 A-Level grades achieved the top A* grade",
    img: "/figma/pathway-2.png",
  },
  {
    title: "Transfer into Year 13",
    body: "Already in Year 12 elsewhere? Transfer mid-course into more focused, supportive environment where you'll receive the individual attention to push for top grades.",
    stat: "72.7%",
    statLabel: "of students progressed to Russell Group universities",
    img: "/figma/pathway-3.png",
  },
];

export function Pathways() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.12em] text-eb-navy/70">
              Courses We Offer
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink lg:text-[58px]">
              Choose the A-Level Pathway That Fits Your Goal
            </h2>
          </div>
          <div className="flex gap-3">
            <button aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-lg bg-white text-eb-navy shadow-sm">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
            <button aria-label="Next" className="grid h-12 w-12 place-items-center rounded-lg bg-white text-eb-navy shadow-sm">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <article key={c.title} className="flex flex-col rounded-2xl bg-white p-6">
              <h3 className="text-2xl font-bold text-eb-navy">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                {c.body}
              </p>
              <div className="mt-5 flex items-center gap-4 rounded-xl bg-eb-cream px-5 py-4">
                <span className="text-3xl font-extrabold text-eb-blue">{c.stat}</span>
                <span className="text-[13px] font-semibold leading-tight text-eb-blue">
                  {c.statLabel}
                </span>
              </div>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-md bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

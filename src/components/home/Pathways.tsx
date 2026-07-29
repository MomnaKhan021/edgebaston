import { Slider } from "./Slider";
import { ArrowUpRight } from "./icons";
import { CountUp } from "./CountUp";

const CARDS = [
  {
    title: "One Year A-Level Retake",
    body: "Focused retake support in a specialist environment. Small classes, regular mocks, and dedicated university guidance to help you secure the grades you need.",
    stat: 16.0,
    statLabel: "of 2025 A-Level grades achieved the top A* grade",
    img: "/figma/course-retake.png",
    objPos: "object-[70%_center]",
  },
  {
    title: "Five Term A-Level",
    body: "A flexible five-term pathway starting in January. Ideal for students who missed the September entry window but want a full and structured route to university.",
    stat: 16.0,
    statLabel: "of 2025 A-Level grades achieved the top A* grade",
    img: "/figma/course-fiveterm.png",
    objPos: "object-[55%_center]",
  },
  {
    title: "Transfer into Year 13",
    body: "Already in Year 12 elsewhere? Transfer mid-course into more focused, supportive environment where you'll receive the individual attention to push for top grades.",
    stat: 72.7,
    statLabel: "of students progressed to Russell Group universities",
    img: "/figma/course-transfer.png",
    objPos: "object-[45%_center]",
  },
];

export function Pathways() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-[60px] lg:py-20">
        <Slider
          label="Courses We Offer"
          title="Choose the A-Level Pathway That Fits Your Goal"
          labelClassName="text-neutral-900"
          titleClassName="text-neutral-900"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="group flex w-[85%] shrink-0 snap-start flex-col bg-transparent sm:w-[440px] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="flex flex-1 flex-col px-1 pb-6">
                <h3 className="text-[26px] font-bold leading-tight text-eb-navy">{c.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{c.body}</p>
                <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-black/[0.04] px-6 py-5">
                  <CountUp to={c.stat} decimals={1} suffix="%" className="shrink-0 text-[32px] font-extrabold text-eb-blue" />
                  <span className="text-right text-[13px] font-semibold leading-snug text-eb-blue">
                    {c.statLabel}
                  </span>
                </div>
              </div>
              {/* Full-bleed image: full width, no padding, no border radius */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-eb-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title} className={`h-full w-full object-cover ${c.objPos} transition duration-500 group-hover:scale-105`} />
                <span className="eb-square absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-md bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}

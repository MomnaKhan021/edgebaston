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
          labelClassName="text-black"
          titleClassName="text-black"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="group flex w-[80%] shrink-0 snap-center flex-col rounded-xl bg-white p-4 sm:w-[440px] sm:snap-start sm:p-6 lg:w-[calc((100%-3rem)/3)]"
            >
              <div className="flex flex-1 flex-col gap-2.5 sm:gap-3">
                <h3 className="text-[20px] font-bold leading-tight text-eb-navy sm:text-[28px]">{c.title}</h3>
                <p className="text-[14px] leading-snug text-black sm:text-[16px]">{c.body}</p>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-eb-cream p-3">
                  <CountUp to={c.stat} decimals={1} suffix="%" className="shrink-0 text-[20px] font-extrabold text-eb-blue sm:text-[30px]" />
                  <span className="text-right text-[10px] font-semibold leading-snug text-eb-blue sm:text-[12px]">
                    {c.statLabel}
                  </span>
                </div>
              </div>
              {/* Image (inset within the card, rounded) */}
              <div className="relative mt-2 aspect-[16/11] w-full overflow-hidden rounded-lg bg-white sm:mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title} className={`h-full w-full object-cover ${c.objPos} transition duration-500 group-hover:scale-105`} />
                <span className="eb-square absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded bg-eb-blue text-white">
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

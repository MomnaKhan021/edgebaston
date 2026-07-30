import { Slider } from "./Slider";
import { ArrowUpRight } from "./icons";

const NEWS = [
  { date: "2025 Results", title: "Edgbaston College Celebrates Outstanding 2025 A-Level Results", img: "/figma/pathway-1.png" },
  { date: "22 Nov 2024", title: "Maneek Wins the Great College Bake Off to Support Children…", img: "/figma/news-1.png" },
  { date: "15 Oct 2024", title: "Year 12 Students Explore Future Opportunities at UK University…", img: "/figma/pathway-2.png" },
  { date: "3 Oct 2024", title: "Edgbaston College Students Build Life-Saving Skills with St John…", img: "/figma/news-2.png" },
  { date: "7 Oct 2024", title: "Students Hit the Track for Go Karting Fun", img: "/figma/pathway-3.png" },
];

export function News() {
  return (
    <section className="bg-eb-cream">
      <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-[60px] lg:py-20">
        <Slider
          label="News & Events"
          title="What's happening at Edgbaston"
          labelClassName="text-eb-blue"
          titleClassName="text-neutral-900"
          trackClassName="mt-8 gap-4 sm:mt-[42px] sm:gap-5"
          mobileAlign="left"
        >
          {NEWS.map((n) => (
            <article key={n.title} className="group w-[80%] shrink-0 snap-center sm:w-[320px] sm:snap-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.img}
                  alt={n.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-wide text-eb-blue">
                News • {n.date}
              </p>
              <h3 className="mt-2 text-[18px] font-bold leading-snug text-eb-navy transition group-hover:text-eb-blue sm:mt-3 sm:text-[22px]">{n.title}</h3>
              <span className="eb-cta mt-4 inline-flex items-center gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy shadow-sm">
                Read Article
                <span className="eb-square grid h-8 w-8 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}

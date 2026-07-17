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
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-24">
        <Slider label="News & Events" title="What's happening at Edgbaston">
          {NEWS.map((n) => (
            <article key={n.title} className="w-[78%] shrink-0 snap-start sm:w-[320px]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.img} alt={n.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 font-mono text-[13px] uppercase tracking-wide text-eb-blue">
                News • {n.date}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-snug text-eb-navy">{n.title}</h3>
              <button className="mt-4 inline-flex items-center gap-3 rounded-lg bg-white py-1.5 pl-5 pr-1.5 text-xs font-bold uppercase tracking-wide text-eb-navy shadow-sm">
                Read Article
                <span className="grid h-8 w-8 place-items-center rounded-md bg-eb-blue text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
}

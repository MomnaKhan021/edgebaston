import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { bgStyle, parseItems } from "@/lib/templates";
import { NewsSlider } from "./NewsSlider";

const NEWS = [
  { date: "12 Sep 2024", title: "Edgbaston College Celebrates Outstanding A-Level Results", img: "/figma/news-results.webp" },
  { date: "22 Nov 2024", title: "Maneek Wins the Great College Bake Off to Support Children…", img: "/figma/news-cake.webp" },
  { date: "15 Oct 2024", title: "Year 12 Students Explore Future Opportunities at UK University…", img: "/figma/news-uni.webp" },
  { date: "3 Oct 2024", title: "Edgbaston College Students Build Life-Saving Skills with St John…", img: "/figma/news-firstaid.webp" },
  { date: "7 Oct 2024", title: "Students Hit the Track for Karting Fun", img: "/figma/news-karting.webp" },
];

export function News({ data }: { data?: Record<string, string> }) {
  const managed = parseItems(data?.articles);
  const articles = managed.length
    ? managed.map((a, i) => ({
        date: a.date ?? "",
        title: a.title ?? "",
        img: a.image || NEWS[i % NEWS.length].img,
        url: a.url ?? "",
      }))
    : NEWS.map((n) => ({ ...n, url: "" }));
  // "View full blog" button below the articles (empty URL = hidden).
  const moreUrl = data?.moreUrl ?? "/blog";
  const moreLabel = data?.moreLabel || "View Full Blog";
  return (
    <section className="overflow-hidden bg-eb-cream py-10 lg:py-14" style={bgStyle(data)}>
      <NewsSlider label={data?.label || "Find Your Local YDS Clinic"} title={data?.title || "What's happening at Edgbaston"}>
        {articles.map((n) => {
          const cardCls = "group w-[78%] shrink-0 snap-center sm:w-[300px]";
          const inner = (
            <>
              <div className="relative aspect-[283/350] overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.img}
                  alt={n.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mt-4 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-eb-blue sm:text-[13px]">
                {data?.tag || "News"} <span className="px-0.5">•</span> {n.date}
              </p>
              <h3 className="mt-2 min-h-[52px] text-[16px] font-bold leading-snug text-eb-navy transition group-hover:text-eb-blue sm:text-[18px]">
                {n.title}
              </h3>
              {/* "Read Article" only shows when the card actually links somewhere. */}
              {n.url && (
                <span className="eb-cta mt-3 flex items-stretch gap-1">
                  <span className="flex flex-1 items-center bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-eb-navy">
                    {data?.readLabel || "Read Article"}
                  </span>
                  <span className="eb-square grid w-10 shrink-0 place-items-center rounded-sm bg-eb-blue text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              )}
            </>
          );
          // Linkable only when a URL is set; otherwise a plain, non-clickable card.
          return n.url ? (
            <Link key={n.title} href={n.url} className={"block " + cardCls}>
              {inner}
            </Link>
          ) : (
            <article key={n.title} className={cardCls}>
              {inner}
            </article>
          );
        })}
      </NewsSlider>
      {moreUrl && (
        <div className="mx-auto mt-8 flex max-w-[1440px] justify-center px-4 sm:mt-10 lg:px-[60px]">
          <Link
            href={moreUrl}
            className="eb-cta group inline-flex items-center gap-3 rounded-lg bg-eb-navy py-2 pl-5 pr-2 text-xs font-bold uppercase tracking-wide text-white sm:text-sm"
          >
            {moreLabel}
            <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}

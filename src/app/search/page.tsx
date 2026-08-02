import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { ArrowUpRight } from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Search",
  description: "Search courses and pages across Edgbaston College.",
};

// Static routes that aren't stored in the database but should be findable.
const STATIC_PAGES = [
  { title: "Contact Us", href: "/contact" },
  { title: "One Year A-Level Retake", href: "/one-year-a-level-retake" },
  { title: "Admissions Requirements", href: "/admissions-requirements" },
  { title: "Our History", href: "/our-history" },
  { title: "About Us", href: "/about" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // If the database is unreachable, fall back to static-page matches only
  // rather than erroring the whole page.
  const [courses, pages] = query
    ? await Promise.all([
        db.course.findMany({
          where: {
            published: true,
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { summary: { contains: query, mode: "insensitive" } },
              { category: { contains: query, mode: "insensitive" } },
            ],
          },
          orderBy: [{ featured: "desc" }, { order: "asc" }],
          select: { id: true, title: true, slug: true, summary: true, category: true },
        }).catch(() => []),
        db.page.findMany({
          where: {
            published: true,
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
            ],
          },
          select: { id: true, title: true, slug: true },
        }).catch(() => []),
      ])
    : [[], []];

  const staticHits = query
    ? STATIC_PAGES.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const total = courses.length + pages.length + staticHits.length;

  return (
    <>
      <AnnouncementBar />

      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        <div className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-32 lg:px-16 lg:pb-14">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">
            Edgbaston College
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white lg:text-5xl">Search</h1>
          <form action="/search" className="relative mt-6 max-w-xl">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search courses and pages…"
              className="w-full rounded-lg bg-white py-3.5 pl-5 pr-14 text-[15px] text-eb-navy outline-none placeholder:text-eb-navy/50"
            />
            <button
              type="submit"
              aria-label="Search"
              className="eb-square absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg bg-eb-blue text-white"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </form>
        </div>
      </section>

      <section className="bg-eb-cream">
        <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-16 lg:py-14">
          {!query ? (
            <p className="text-[15px] text-eb-navy/75">
              Type something above to search courses and pages.
            </p>
          ) : total === 0 ? (
            <p className="text-[15px] text-eb-navy/75">
              No results for &ldquo;{query}&rdquo;. Try a different term, or{" "}
              <Link href="/courses" className="font-semibold text-eb-blue underline underline-offset-2">
                browse all courses
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-10">
              {courses.length > 0 && (
                <div>
                  <h2 className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-eb-blue">
                    Courses
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {courses.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/courses/${c.slug}`}
                          className="eb-cta group flex items-center justify-between gap-4 rounded-lg bg-white p-5"
                        >
                          <span>
                            <span className="block text-[18px] font-bold text-eb-navy">{c.title}</span>
                            {c.summary && (
                              <span className="mt-1 block text-[14px] leading-relaxed text-eb-navy/75">
                                {c.summary}
                              </span>
                            )}
                          </span>
                          <span className="eb-square grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(pages.length > 0 || staticHits.length > 0) && (
                <div>
                  <h2 className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-eb-blue">
                    Pages
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {pages.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/${p.slug}`}
                          className="eb-cta group flex items-center justify-between gap-4 rounded-lg bg-white p-5"
                        >
                          <span className="text-[18px] font-bold text-eb-navy">{p.title}</span>
                          <span className="eb-square grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                    {staticHits.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="eb-cta group flex items-center justify-between gap-4 rounded-lg bg-white p-5"
                        >
                          <span className="text-[18px] font-bold text-eb-navy">{s.title}</span>
                          <span className="eb-square grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <FigmaFooter />
    </>
  );
}

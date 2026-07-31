import type { Metadata } from "next";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { compressDataUri } from "@/lib/images";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore A-Level programmes at Edgbaston College — one-year retakes, two-year A-Levels and mid-course transfers, with the small classes and support that get results.",
};

type CourseRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: string;
  duration: string;
  summary: string;
  imageUrl: string;
};

// Cached course list (invalidated by revalidateTag("courses") on admin saves)
// so browsing courses never waits on a database round-trip.
const getPublishedCourses = unstable_cache(
  async () => {
    const courses = await db.course.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    });
    // Uploaded card images are stored inline as data URIs and can be many MB
    // each — compress them so the page HTML stays small.
    return Promise.all(
      courses.map(async (c) => ({ ...c, imageUrl: await compressDataUri(c.imageUrl, 1200) })),
    );
  },
  ["published-courses"],
  { revalidate: 60, tags: ["courses"] },
);

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const all = (await getPublishedCourses()) as CourseRow[];
  const courses = category ? all.filter((c) => c.category === category) : all;
  const categories = [...new Set(all.map((c) => c.category))].sort();

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <Navbar />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-eb-navy via-eb-navy to-eb-navy-2" />
        <div className="relative mx-auto max-w-[1440px] px-4 pb-14 pt-32 lg:px-16 lg:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">
            Edgbaston College
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Our Courses
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            A-Level pathways built around small classes, frequent exam practice
            and personalised university support — designed to turn hard work
            into top grades.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1440px] px-4 py-4 text-sm text-muted-foreground lg:px-16"
        >
          <Link href="/" className="hover:text-eb-navy">
            Home
          </Link>
          <span className="px-2 text-neutral-300">/</span>
          <span className="font-medium text-eb-navy">Courses</span>
        </nav>
      </div>

      {/* Listing */}
      <section className="bg-eb-cream">
        <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-16 lg:py-16">
          {/* Category filter */}
          {categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <FilterPill label="All" href="/courses" active={!category} />
              {categories.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  href={`/courses?category=${encodeURIComponent(c)}`}
                  active={category === c}
                />
              ))}
            </div>
          )}

          {courses.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-eb-navy/20 bg-white p-10 text-center text-neutral-500">
              No courses found in this category.
            </p>
          )}
        </div>
      </section>

      <Reveal>
        <FigmaFooter />
      </Reveal>
    </>
  );
}

function CourseCard({ course }: { course: CourseRow }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04] transition hover:-translate-y-1 hover:shadow-md sm:p-6"
    >
      <div className="flex flex-1 flex-col gap-3">
        <span className="w-fit rounded-full bg-eb-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-eb-blue">
          {course.category}
        </span>
        <h3 className="text-[20px] font-bold leading-tight text-eb-navy sm:text-[24px]">
          {course.title}
        </h3>
        {course.summary && (
          <p className="text-[14px] leading-snug text-black/70 sm:text-[15px]">
            {course.summary}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-eb-navy/70">
          {course.level && (
            <span className="rounded-md bg-eb-cream px-2.5 py-1">
              {course.level}
            </span>
          )}
          {course.duration && (
            <span className="rounded-md bg-eb-cream px-2.5 py-1">
              {course.duration}
            </span>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative mt-3 aspect-[16/11] w-full overflow-hidden rounded-lg bg-eb-cream">
        {course.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.imageUrl}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-6xl font-extrabold text-eb-navy/10">
            {course.title.charAt(0)}
          </div>
        )}
        <span className="eb-square absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-lg bg-eb-blue text-white">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}

function FilterPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full px-4 py-1.5 text-sm font-semibold transition " +
        (active
          ? "bg-eb-navy text-white"
          : "bg-white text-eb-navy ring-1 ring-black/5 hover:bg-white/70")
      }
    >
      {label}
    </Link>
  );
}

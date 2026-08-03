import type { Metadata } from "next";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt } from "@/lib/utils";
import { compressDataUri, compressInlineImages } from "@/lib/images";

// Cached per-slug course lookup shared by metadata + page render
// (invalidated by revalidateTag("courses") on admin saves).
const getCourse = (slug: string) =>
  unstable_cache(
    async () => {
      const course = await db.course.findUnique({ where: { slug } });
      if (!course) return course;
      // Inline data-URI images from admin uploads can be many MB — compress
      // them so the page HTML stays small.
      return {
        ...course,
        imageUrl: await compressDataUri(course.imageUrl, 1600),
        content: await compressInlineImages(course.content),
      };
    },
    ["course", slug],
    { revalidate: 60, tags: ["courses"] },
  )();
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "@/components/home/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.summary || excerpt(course.content),
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course || !course.published) notFound();
  if (course.redirectUrl) redirect(course.redirectUrl);

  return (
    <>
      <SiteAnnouncement />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-eb-navy">
        <SiteNavbar />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-eb-navy via-eb-navy to-eb-navy-2" />
        <div className="relative mx-auto max-w-[1440px] px-4 pb-14 pt-32 lg:px-16 lg:pb-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-eb-blue px-3 py-1 text-xs font-semibold text-white">
              {course.category}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {course.level}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            {course.title}
          </h1>
          {course.summary && (
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
              {course.summary}
            </p>
          )}
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
          <Link href="/courses" className="hover:text-eb-navy">
            Courses
          </Link>
          <span className="px-2 text-neutral-300">/</span>
          <span className="font-medium text-eb-navy">{course.title}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 lg:grid-cols-[1fr_320px] lg:px-16 lg:py-16">
          <div>
            {course.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.imageUrl}
                alt={course.title}
                className="mb-8 aspect-[16/9] w-full rounded-2xl object-cover"
              />
            )}
            {course.content ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: course.content }}
              />
            ) : (
              <p className="text-neutral-500">Full course details coming soon.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-eb-cream p-6 sm:p-7">
              <h2 className="text-lg font-bold text-eb-navy">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Level" value={course.level} />
                <Row label="Duration" value={course.duration || "—"} />
                <Row label="Category" value={course.category} />
                <Row label="Fees" value={course.fee || "Contact us"} />
              </dl>
              <Link
                href="/contact"
                className="eb-cta group mt-6 flex items-center justify-between gap-3 rounded-lg bg-eb-navy py-2 pl-5 pr-2 text-sm font-bold uppercase tracking-wide text-white"
              >
                Enquire About Course
                <span className="eb-square grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-eb-blue text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Reveal>
        <FigmaFooter />
      </Reveal>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-eb-navy/10 pb-2 last:border-0">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-semibold text-eb-navy">{value}</dd>
    </div>
  );
}

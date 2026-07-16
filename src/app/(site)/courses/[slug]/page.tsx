import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await db.course.findUnique({ where: { slug } });
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
  const course = await db.course.findUnique({ where: { slug } });

  if (!course || !course.published) notFound();

  return (
    <article>
      {/* Hero */}
      <div className="bg-brand text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <Link
            href="/courses"
            className="text-sm text-white/70 hover:text-accent"
          >
            ← Back to courses
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-brand-dark">
              {course.category}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              {course.level}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold">{course.title}</h1>
          {course.summary && (
            <p className="mt-3 max-w-2xl text-lg text-white/80">
              {course.summary}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_280px]">
        {/* Content */}
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
            <p className="text-muted-foreground">
              Full course details coming soon.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border bg-muted p-6">
            <h2 className="mb-4 text-lg font-bold text-brand">
              At a glance
            </h2>
            <dl className="space-y-3 text-sm">
              <Row label="Level" value={course.level} />
              <Row label="Duration" value={course.duration || "—"} />
              <Row label="Category" value={course.category} />
              <Row label="Fees" value={course.fee || "Contact us"} />
            </dl>
            <Link
              href="/contact"
              className="mt-6 block rounded-lg bg-brand px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Apply for this course
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold text-foreground">{value}</dd>
    </div>
  );
}

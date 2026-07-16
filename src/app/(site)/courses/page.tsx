import type { Metadata } from "next";
import { db } from "@/lib/db";
import { CourseCard } from "@/components/site/CourseCard";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const courses = await db.course.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: { order: "asc" },
  });

  const categories = [
    ...new Set(
      (
        await db.course.findMany({
          where: { published: true },
          select: { category: true },
        })
      ).map((c) => c.category),
    ),
  ].sort();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-brand">Our courses</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our full range of undergraduate, postgraduate and
          professional programmes.
        </p>
      </header>

      {/* Category filter */}
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

      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No courses found in this category.
        </p>
      )}
    </div>
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
    <a
      href={href}
      className={
        "rounded-full border px-4 py-1.5 text-sm font-medium transition " +
        (active
          ? "border-brand bg-brand text-white"
          : "hover:bg-muted")
      }
    >
      {label}
    </a>
  );
}

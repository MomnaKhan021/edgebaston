import Link from "next/link";

export type CourseCardData = {
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  summary: string;
  imageUrl: string;
};

export function CourseCard({ course }: { course: CourseCardData }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {course.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.imageUrl}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-brand/20">
            {course.title.charAt(0)}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-brand-dark">
          {course.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-brand group-hover:text-brand-dark">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {course.summary}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <span className="rounded-md bg-muted px-2 py-1">{course.level}</span>
          {course.duration && (
            <span className="rounded-md bg-muted px-2 py-1">
              {course.duration}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

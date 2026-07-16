import Link from "next/link";
import { db } from "@/lib/db";
import { deleteCourse } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function CoursesAdmin() {
  const courses = await db.course.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand">Courses</h1>
          <p className="text-sm text-muted-foreground">
            {courses.length} course{courses.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          ＋ New course
        </Link>
      </div>

      {courses.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                <th className="hidden px-4 py-3 md:table-cell">Level</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">
                      /{c.slug}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {c.category}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">{c.level}</td>
                  <td className="px-4 py-3">
                    <StatusBadge published={c.published} featured={c.featured} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/${c.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteCourse} id={c.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function StatusBadge({
  published,
  featured,
}: {
  published: boolean;
  featured: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      <span
        className={
          "rounded-full px-2 py-0.5 text-xs font-medium " +
          (published
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500")
        }
      >
        {published ? "Published" : "Draft"}
      </span>
      {featured && (
        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-brand-dark">
          Featured
        </span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">
      <p className="text-muted-foreground">No courses yet.</p>
      <Link
        href="/admin/courses/new"
        className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
      >
        Create your first course
      </Link>
    </div>
  );
}

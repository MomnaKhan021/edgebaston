import Link from "next/link";
import { db } from "@/lib/db";
import { deletePage } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function PagesAdmin() {
  const pages = await db.page.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand">Pages</h1>
          <p className="text-sm text-muted-foreground">
            Custom content pages (e.g. Admissions, Campus Life).
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          ＋ New page
        </Link>
      </div>

      {pages.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="hidden px-4 py-3 sm:table-cell">In nav</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.title}</div>
                    <Link
                      href={`/p/${p.slug}`}
                      target="_blank"
                      className="text-xs text-accent hover:underline"
                    >
                      /p/{p.slug} ↗
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {p.showInNav ? "Yes" : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-xs font-medium " +
                        (p.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500")
                      }
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/${p.id}`}
                        className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deletePage} id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No pages yet.</p>
          <Link
            href="/admin/pages/new"
            className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            Create your first page
          </Link>
        </div>
      )}
    </div>
  );
}

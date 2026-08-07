import Link from "next/link";
import { db } from "@/lib/db";
import { deletePost } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconPlus, IconExternal } from "@/components/admin/icons";

export default async function BlogAdmin() {
  const posts = await db.post.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }).catch(() => []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-eb-navy">Blog</h1>
          <p className="text-sm text-muted-foreground">Articles shown on the blog listing and their branded article pages.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-eb-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-eb-navy-2"
        >
          <IconPlus className="h-4 w-4" /> New post
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.title}</div>
                    <Link href={`/blog/${p.slug}`} target="_blank" className="inline-flex items-center gap-1 text-xs text-eb-blue hover:underline">
                      /blog/{p.slug}
                      <IconExternal className="h-3 w-3" />
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">{p.category || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={"rounded-full px-2 py-0.5 text-xs font-medium " + (p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${p.id}`} className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted">Edit</Link>
                      <DeleteButton action={deletePost} id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No posts yet.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-block rounded-lg bg-eb-navy px-4 py-2 text-sm font-semibold text-white">
            Write your first post
          </Link>
        </div>
      )}
    </div>
  );
}

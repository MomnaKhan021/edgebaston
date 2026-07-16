import Link from "next/link";
import { db } from "@/lib/db";
import { deleteStaff } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function StaffAdmin() {
  const staff = await db.staff.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand">Staff</h1>
          <p className="text-sm text-muted-foreground">
            {staff.length} member{staff.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/staff/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          ＋ New member
        </Link>
      </div>

      {staff.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {staff.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 rounded-2xl border bg-background p-4 shadow-sm"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                {m.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xl font-bold text-brand/30">
                    {m.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{m.name}</div>
                <div className="truncate text-sm text-muted-foreground">
                  {m.role || m.category}
                </div>
                {!m.published && (
                  <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    Hidden
                  </span>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Link
                  href={`/admin/staff/${m.id}`}
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteStaff} id={m.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No staff added yet.</p>
          <Link
            href="/admin/staff/new"
            className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            Add your first staff member
          </Link>
        </div>
      )}
    </div>
  );
}

import { db } from "@/lib/db";
import { builtInAdminEmails, getSession } from "@/lib/auth";
import { createUser, deleteUser } from "@/app/admin/actions";
import { Field, Input, SubmitButton } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function UsersAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const [sp, session, users] = await Promise.all([
    searchParams,
    getSession(),
    // Fail-soft: if the table doesn't exist yet / DB is down, show an empty list
    // rather than crashing the page.
    db.adminUser
      .findMany({ orderBy: { createdAt: "asc" } })
      .catch(() => [] as Awaited<ReturnType<typeof db.adminUser.findMany>>),
  ]);
  const builtIns = builtInAdminEmails();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-eb-navy">Users</h1>
        <p className="text-sm text-muted-foreground">
          People who can sign in to this dashboard. Anyone without an account
          here (or a built-in admin) cannot access the dashboard — the public
          site stays open to everyone.
        </p>
      </div>

      {sp.saved && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          ✓ Saved {decodeURIComponent(sp.saved)} — they can now sign in with the
          password you set.
        </p>
      )}
      {sp.deleted && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          ✓ User removed. They can no longer sign in.
        </p>
      )}
      {sp.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {decodeURIComponent(sp.error)}
        </p>
      )}

      {/* Add / update a user */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-eb-navy">Add a user</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          They&apos;ll sign in at <span className="font-mono">/admin</span> with
          this email and password. Using an email that already exists updates
          that person&apos;s name and password (handy for resetting it).
        </p>
        <form action={createUser} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <Input id="name" name="name" placeholder="Jane Smith" />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Password"
              htmlFor="password"
              hint="At least 8 characters. Share it with the user securely — it's stored hashed and can't be viewed again."
            >
              <Input id="password" name="password" type="text" autoComplete="new-password" placeholder="At least 8 characters" required />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <SubmitButton>Add user</SubmitButton>
          </div>
        </form>
      </section>

      {/* Dashboard users (editable) */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-eb-navy">
          Dashboard users{" "}
          <span className="font-normal text-muted-foreground">({users.length})</span>
        </h2>
        {users.length > 0 ? (
          <ul className="divide-y">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-4 py-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-eb-cream text-sm font-bold uppercase text-eb-navy">
                  {(u.name || u.email).charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">
                    {u.name || u.email}
                    {session?.email?.toLowerCase() === u.email && (
                      <span className="ml-2 rounded-full bg-eb-blue/10 px-2 py-0.5 text-xs font-medium text-eb-blue">
                        You
                      </span>
                    )}
                  </div>
                  {u.name && (
                    <div className="truncate text-sm text-muted-foreground">{u.email}</div>
                  )}
                </div>
                <DeleteButton
                  action={deleteUser}
                  id={u.id}
                  label="Remove"
                  confirm={`Remove ${u.email}? They will no longer be able to sign in.`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No dashboard users added yet. Add one above.
          </p>
        )}
      </section>

      {/* Built-in accounts (read-only) */}
      {builtIns.length > 0 && (
        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="mb-1 font-bold text-eb-navy">Built-in admins</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            These accounts are configured in the site&apos;s environment settings
            and always have access (a safety net so you can never be locked out).
            They can&apos;t be changed here.
          </p>
          <ul className="flex flex-wrap gap-2">
            {builtIns.map((email) => (
              <li
                key={email}
                className="rounded-full border bg-muted/40 px-3 py-1 font-mono text-xs text-eb-navy/80"
              >
                {email}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

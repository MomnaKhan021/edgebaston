import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";

export default async function DashboardOverview() {
  const [settings, courses, staff, pages, inquiries, unread, recentInquiries] =
    await Promise.all([
      getSettings(),
      db.course.count(),
      db.staff.count(),
      db.page.count(),
      db.inquiry.count(),
      db.inquiry.count({ where: { read: false } }),
      db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Courses", value: courses, href: "/admin/courses" },
    { label: "Staff members", value: staff, href: "/admin/staff" },
    { label: "Pages", value: pages, href: "/admin/pages" },
    { label: "Inquiries", value: inquiries, href: "/admin/inquiries", badge: unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand">
        Welcome back 👋
      </h1>
      <p className="mt-1 text-muted-foreground">
        Manage {settings.siteName}&apos;s content from here.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border bg-background p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl font-extrabold text-brand">
                {s.value}
              </span>
              {"badge" in s && s.badge ? (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-brand-dark">
                  {s.badge} new
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-brand">Quick actions</h2>
          <div className="grid gap-2">
            <QuickLink href="/admin/courses/new" label="＋ Add a new course" />
            <QuickLink href="/admin/staff/new" label="＋ Add a staff member" />
            <QuickLink href="/admin/pages/new" label="＋ Create a new page" />
            <QuickLink href="/admin/settings" label="⚙️ Edit site settings & branding" />
          </div>
        </section>

        {/* Recent inquiries */}
        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-brand">Recent inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          {recentInquiries.length > 0 ? (
            <ul className="divide-y">
              {recentInquiries.map((i) => (
                <li key={i.id} className="flex items-center gap-3 py-2.5">
                  <span
                    className={
                      "h-2 w-2 shrink-0 rounded-full " +
                      (i.read ? "bg-border" : "bg-accent")
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {i.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {i.subject || i.message}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(i.createdAt)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No inquiries yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-muted"
    >
      {label}
    </Link>
  );
}

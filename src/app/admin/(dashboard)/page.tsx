import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";
import { IconPlus, IconCourses, IconStaff, IconPages, IconSettings } from "@/components/admin/icons";

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
      <h1 className="text-2xl font-bold text-eb-navy">Welcome back</h1>
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
              <span className="text-3xl font-extrabold text-eb-navy">
                {s.value}
              </span>
              {"badge" in s && s.badge ? (
                <span className="rounded-full bg-eb-blue px-2 py-0.5 text-xs font-bold text-white">
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
          <h2 className="mb-4 font-bold text-eb-navy">Quick actions</h2>
          <div className="grid gap-2">
            <QuickLink href="/admin/courses/new" label="Add a new course" Icon={IconCourses} />
            <QuickLink href="/admin/staff/new" label="Add a staff member" Icon={IconStaff} />
            <QuickLink href="/admin/pages/new" label="Create a new page" Icon={IconPages} />
            <QuickLink href="/admin/settings" label="Edit site settings & branding" Icon={IconSettings} />
          </div>
        </section>

        {/* Recent inquiries */}
        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-eb-navy">Recent inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm font-medium text-eb-blue hover:underline"
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
                      (i.read ? "bg-border" : "bg-eb-blue")
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

function QuickLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-eb-navy transition hover:border-eb-blue/40 hover:bg-eb-cream"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-eb-cream text-eb-navy transition group-hover:bg-white">
        <Icon className="h-4 w-4" />
      </span>
      {label}
      <IconPlus className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:text-eb-blue" />
    </Link>
  );
}

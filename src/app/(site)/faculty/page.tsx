import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Faculty & Staff" };

const GROUPS = [
  { key: "Admin", label: "Leadership & Administration" },
  { key: "Faculty", label: "Academic Faculty" },
  { key: "Support", label: "Student Support" },
];

export default async function FacultyPage() {
  const staff = await db.staff.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-brand">
          Faculty &amp; Staff
        </h1>
        <p className="mt-2 text-muted-foreground">
          Meet the dedicated people behind our college.
        </p>
      </header>

      {GROUPS.map((group) => {
        const members = staff.filter((s) => s.category === group.key);
        if (members.length === 0) return null;
        return (
          <section key={group.key} className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-brand">
              {group.label}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex gap-4 rounded-2xl border bg-background p-5 shadow-sm"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {member.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl font-bold text-brand/30">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand">{member.name}</h3>
                    <p className="text-sm font-medium text-accent">
                      {member.role}
                    </p>
                    {member.department && (
                      <p className="text-xs text-muted-foreground">
                        {member.department}
                      </p>
                    )}
                    {member.bio && (
                      <div
                        className="prose-content mt-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: member.bio }}
                      />
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                      >
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {staff.length === 0 && (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No staff added yet.
        </p>
      )}
    </div>
  );
}

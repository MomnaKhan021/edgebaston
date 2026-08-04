import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { db } from "@/lib/db";
import { IconTemplates } from "@/components/admin/icons";
import { DuplicatePanel } from "@/components/admin/DuplicatePanel";

export default async function TemplatesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ copied?: string; name?: string }>;
}) {
  const { copied, name } = await searchParams;

  // Courses and custom pages join the designed-page templates in the copy tool.
  const [courses, pages] = await Promise.all([
    db.course.findMany({ orderBy: { order: "asc" }, select: { id: true, title: true } }).catch(() => []),
    db.page.findMany({ orderBy: { order: "asc" }, select: { id: true, title: true } }).catch(() => []),
  ]);

  const groups = [
    { label: "Designed pages", options: TEMPLATES.map((t) => ({ value: `template:${t.key}`, name: t.name })) },
    ...(courses.length
      ? [{ label: "Courses", options: courses.map((c) => ({ value: `course:${c.id}`, name: c.title })) }]
      : []),
    ...(pages.length
      ? [{ label: "Custom pages", options: pages.map((p) => ({ value: `page:${p.id}`, name: p.title })) }]
      : []),
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eb-navy">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Edit the content of each designed page, section by section. Changes go live as soon as you save.
        </p>
      </div>

      {copied === "invalid" ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Please choose two different items to copy between.
        </div>
      ) : copied === "mismatch" ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          You can only copy between two items of the same type — page → page, course → course, or custom page → custom page.
        </div>
      ) : copied ? (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Copied content{name ? ` to ${name}` : ""}. The changes are live now.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <Link
            key={t.key}
            href={`/admin/templates/${t.key}`}
            className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-eb-cream text-eb-navy">
                <IconTemplates className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-eb-navy group-hover:text-eb-blue">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.sections.length} sections</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <DuplicatePanel groups={groups} />
      </div>
    </div>
  );
}

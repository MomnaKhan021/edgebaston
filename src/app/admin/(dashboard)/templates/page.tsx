import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { db } from "@/lib/db";
import { INSTANCE_TEMPLATES } from "@/lib/templateInstances";
import { createPageFromTemplate } from "@/app/admin/actions";
import { IconTemplates, IconExternal } from "@/components/admin/icons";
import { DuplicatePanel } from "@/components/admin/DuplicatePanel";
import { SubmitButton } from "@/components/admin/ui";

export default async function TemplatesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ copied?: string; name?: string; created?: string }>;
}) {
  const { copied, name, created } = await searchParams;

  // Courses and custom pages join the designed-page templates in the copy tool.
  const [courses, pages, instancePages] = await Promise.all([
    db.course.findMany({ orderBy: { order: "asc" }, select: { id: true, title: true } }).catch(() => []),
    db.page.findMany({ orderBy: { order: "asc" }, select: { id: true, title: true } }).catch(() => []),
    db.page
      .findMany({ where: { NOT: { templateKey: "" } }, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, slug: true, templateKey: true } })
      .catch(() => []),
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

  const templateName = (key: string) => INSTANCE_TEMPLATES.find((t) => t.key === key)?.name ?? key;
  const select = "min-w-[220px] rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue";

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

      {created === "invalid" && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Please enter a page name and pick a template to create from.
        </div>
      )}

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

      {/* Create a new page from a template */}
      <div className="mt-8 rounded-2xl border bg-background p-5 shadow-sm">
        <h2 className="text-sm font-bold text-eb-navy">Create a new page from a template</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Makes a brand-new page that uses a designed template&apos;s layout, pre-filled with a copy of its
          current content. The new page lives at its own URL and is edited independently — the original is untouched.
        </p>
        <form action={createPageFromTemplate} className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">Template</span>
            <select name="template" defaultValue={INSTANCE_TEMPLATES[0]?.key} className={select}>
              {INSTANCE_TEMPLATES.map((t) => (
                <option key={t.key} value={t.key}>{t.name}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">New page name</span>
            <input name="title" required placeholder="e.g. Online One Year Retake" className={select} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">URL slug (optional)</span>
            <input name="slug" placeholder="auto from name" className={select} />
          </label>
          <SubmitButton>Create page</SubmitButton>
        </form>
      </div>

      {/* Pages built from templates */}
      {instancePages.length > 0 && (
        <div className="mt-6 rounded-2xl border bg-background p-5 shadow-sm">
          <h2 className="text-sm font-bold text-eb-navy">Pages built from templates</h2>
          <ul className="mt-3 divide-y">
            {instancePages.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-medium text-eb-navy">{p.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {templateName(p.templateKey)} · /{p.slug}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/templates/inst_${p.id}`}
                    className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-eb-navy hover:bg-eb-cream"
                  >
                    Edit sections
                  </Link>
                  <Link
                    href={`/${p.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold text-eb-navy hover:bg-eb-cream"
                  >
                    View live <IconExternal className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <DuplicatePanel groups={groups} />
      </div>
    </div>
  );
}

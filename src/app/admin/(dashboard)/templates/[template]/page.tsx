import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTemplateDef } from "@/lib/templates";
import { instancePageId } from "@/lib/templateInstances";
import { PAGE_ROUTES, canUnpublish } from "@/lib/pageRoutes";
import { getPagePublished, getPageMeta } from "@/lib/sections";
import { setPagePublished, savePageMeta } from "@/app/admin/actions";
import { ToggleField } from "@/components/admin/ToggleField";
import { Field, Input, SubmitButton, Textarea } from "@/components/admin/ui";
import { IconExternal } from "@/components/admin/icons";

export default async function TemplateSectionsAdmin({
  params,
  searchParams,
}: {
  params: Promise<{ template: string }>;
  searchParams: Promise<{ saved?: string; created?: string; status?: string }>;
}) {
  const { template } = await params;
  const { saved, created, status } = await searchParams;

  // A template-backed page (inst_<id>) uses its base template's field defs but
  // its own title, live URL and stored content namespace.
  const pageId = instancePageId(template);
  let title: string;
  let description: string;
  let liveHref: string;
  let def: ReturnType<typeof getTemplateDef>;
  let instancePublished = true;
  if (pageId) {
    const pg = await db.page.findUnique({ where: { id: pageId } }).catch(() => null);
    if (!pg) notFound();
    def = getTemplateDef(pg.templateKey);
    if (!def) notFound();
    title = pg.title;
    description = `Page built from the ${def.name} template. Edit its sections below.`;
    liveHref = `/${pg.slug}`;
    instancePublished = pg.published;
  } else {
    def = getTemplateDef(template);
    if (!def) notFound();
    title = def.name;
    description = def.description;
    liveHref = PAGE_ROUTES[template] ?? `/${template}`;
  }

  // Both designed pages and template-backed pages can be turned off from here
  // (home / header / footer are excluded so the homepage can't be hidden).
  const showPublish = pageId ? true : canUnpublish(template);
  const published = pageId ? instancePublished : showPublish ? await getPagePublished(template) : true;
  // The __page SEO fields apply to a BUILT-IN designed page. A template-backed
  // instance edits its own SEO on the Pages editor (its Page row), so we don't
  // show the (no-op) __page SEO form there.
  const showPageMeta = showPublish && !pageId;
  const meta = showPageMeta ? await getPageMeta(template) : { metaTitle: "", metaDescription: "" };

  const rows = await db.templateSection
    .findMany({ where: { template } })
    .catch(() => [] as { key: string; updatedAt: Date }[]);
  const updatedAt = (key: string) => rows.find((r) => r.key === key)?.updatedAt;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">
            <Link href="/admin/templates" className="hover:text-eb-navy">Templates</Link>
            <span className="px-1.5">/</span>
            {title}
          </div>
          <h1 className="mt-1 text-2xl font-bold text-eb-navy">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Link
          href={liveHref}
          target="_blank"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-eb-navy transition hover:bg-eb-cream"
        >
          View live <IconExternal className="h-4 w-4" />
        </Link>
      </div>

      {status && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          {status === "on" ? "This page is now live." : "This page is now hidden from the live site (visitors get a 404)."}
        </div>
      )}

      {created && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Page created from the template. Edit any section below, or view it live — changes publish instantly.
        </div>
      )}

      {/* Live on/off for this whole page */}
      {showPublish && (
        <form action={setPagePublished} className="mb-5 flex flex-col gap-4 rounded-2xl border bg-background p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <input type="hidden" name="template" value={template} />
          <div>
            <p className="text-sm font-bold text-eb-navy">Live status</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Turn this page off to remove it from the live site — visitors get a 404 and it drops from search. Your section content is kept, so you can switch it back on any time.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <ToggleField name="published" defaultValue={published ? "1" : "0"} />
            <SubmitButton>Save</SubmitButton>
          </div>
        </form>
      )}

      {/* SEO title/description for this whole page (built-in designed pages;
          instances edit their SEO on the Pages editor) */}
      {showPageMeta && (
        <form action={savePageMeta} className="mb-5 rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
          <input type="hidden" name="template" value={template} />
          <p className="text-sm font-bold text-eb-navy">SEO &amp; metadata</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Control how this page appears in Google and when shared. Leave blank to use the page&apos;s built-in defaults.
          </p>
          <div className="mt-4 space-y-4">
            <Field
              label="Meta title"
              htmlFor="metaTitle"
              hint="Around 50–60 characters. Falls back to the page's own title if left blank."
            >
              <Input id="metaTitle" name="metaTitle" defaultValue={meta.metaTitle} />
            </Field>
            <Field
              label="Meta description"
              htmlFor="metaDescription"
              hint="Around 150–160 characters. Falls back to the page's built-in description if left blank."
            >
              <Textarea id="metaDescription" name="metaDescription" rows={3} defaultValue={meta.metaDescription} />
            </Field>
            <SubmitButton>Save</SubmitButton>
          </div>
        </form>
      )}

      {saved === "meta" && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          SEO settings saved.
        </div>
      )}

      {saved && saved !== "meta" && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Section saved — the live site has been updated.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        <ul className="divide-y">
          {def.sections.map((s, i) => {
            const at = updatedAt(s.key);
            return (
              <li key={s.key}>
                <Link
                  href={`/admin/templates/${template}/${s.key}`}
                  className={
                    "flex items-center gap-4 px-4 py-4 transition hover:bg-muted/40 " +
                    (saved === s.key ? "bg-green-50/60" : "")
                  }
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-eb-cream font-mono text-xs font-bold text-eb-navy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-eb-navy">{s.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{s.description}</span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                    {at ? `Edited ${at.toLocaleDateString("en-GB")}` : "Using defaults"}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-muted-foreground">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

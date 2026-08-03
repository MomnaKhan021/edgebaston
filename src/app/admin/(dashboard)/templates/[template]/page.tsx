import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTemplateDef } from "@/lib/templates";
import { IconExternal } from "@/components/admin/icons";

export default async function TemplateSectionsAdmin({
  params,
  searchParams,
}: {
  params: Promise<{ template: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { template } = await params;
  const { saved } = await searchParams;
  const def = getTemplateDef(template);
  if (!def) notFound();

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
            {def.name}
          </div>
          <h1 className="mt-1 text-2xl font-bold text-eb-navy">{def.name}</h1>
          <p className="text-sm text-muted-foreground">{def.description}</p>
        </div>
        <Link
          href={template === "home" ? "/" : `/${template}`}
          target="_blank"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-eb-navy transition hover:bg-eb-cream"
        >
          View live <IconExternal className="h-4 w-4" />
        </Link>
      </div>

      {saved && (
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

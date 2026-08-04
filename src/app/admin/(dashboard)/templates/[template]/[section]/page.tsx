import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSectionDef, getTemplateDef } from "@/lib/templates";
import { instancePageId } from "@/lib/templateInstances";
import { saveSection } from "@/app/admin/actions";
import { Field, Input, Textarea, SubmitButton } from "@/components/admin/ui";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ColorField } from "@/components/admin/ColorField";
import { ToggleField } from "@/components/admin/ToggleField";
import { ListField } from "@/components/admin/ListField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default async function SectionEditor({
  params,
}: {
  params: Promise<{ template: string; section: string }>;
}) {
  const { template, section } = await params;
  // Template-backed page (inst_<id>): field defs come from the base template,
  // but content is read/written under the "inst_<id>" namespace (= `template`).
  const pageId = instancePageId(template);
  let baseKey = template;
  let templateName: string | undefined;
  if (pageId) {
    const pg = await db.page.findUnique({ where: { id: pageId } }).catch(() => null);
    if (!pg) notFound();
    baseKey = pg.templateKey;
    templateName = pg.title;
  }
  const templateDef = getTemplateDef(baseKey);
  const def = getSectionDef(baseKey, section);
  if (!templateDef || !def) notFound();

  // Read the saved row directly (fresh, not via the public cache).
  const row = await db.templateSection
    .findUnique({ where: { template_key: { template, key: section } } })
    .catch(() => null);
  let saved: Record<string, string> = {};
  try {
    saved = row ? JSON.parse(row.data) : {};
  } catch {
    saved = {};
  }
  // Merge saved values over defaults. List/complex values may have been stored
  // as objects/arrays by an earlier version — coerce them back to strings so the
  // editors always receive what they expect.
  const merged: Record<string, unknown> = { ...def.defaults, ...saved };
  const values: Record<string, string> = {};
  for (const [k, v] of Object.entries(merged)) {
    values[k] = typeof v === "string" ? v : v == null ? "" : JSON.stringify(v);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="text-xs text-muted-foreground">
          <Link href="/admin/templates" className="hover:text-eb-navy">Templates</Link>
          <span className="px-1.5">/</span>
          <Link href={`/admin/templates/${template}`} className="hover:text-eb-navy">{templateName ?? templateDef.name}</Link>
          <span className="px-1.5">/</span>
          {def.name}
        </div>
        <h1 className="mt-1 text-2xl font-bold text-eb-navy">{def.name}</h1>
        <p className="text-sm text-muted-foreground">{def.description}</p>
      </div>

      <form action={saveSection} className="space-y-5 rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
        <input type="hidden" name="_template" value={template} />
        <input type="hidden" name="_section" value={section} />

        {def.fields.map((f) => (
          <Field key={f.name} label={f.label} htmlFor={f.name} hint={f.hint}>
            {f.type === "image" ? (
              <ImageUpload name={f.name} defaultValue={values[f.name] ?? ""} />
            ) : f.type === "toggle" ? (
              <ToggleField name={f.name} defaultValue={values[f.name] ?? "1"} />
            ) : f.type === "list" ? (
              <ListField name={f.name} itemLabel={f.itemLabel} itemFields={f.itemFields ?? []} defaultValue={values[f.name] ?? ""} />
            ) : f.type === "color" ? (
              <ColorField name={f.name} defaultValue={values[f.name] ?? ""} />
            ) : f.type === "rich" ? (
              <RichTextEditor name={f.name} defaultValue={values[f.name] ?? ""} />
            ) : f.type === "textarea" ? (
              <Textarea id={f.name} name={f.name} rows={4} defaultValue={values[f.name] ?? ""} />
            ) : (
              <Input
                id={f.name}
                name={f.name}
                defaultValue={values[f.name] ?? ""}
                placeholder={f.type === "url" ? "/contact or https://…" : undefined}
              />
            )}
          </Field>
        ))}

        <div className="flex items-center justify-between gap-4 border-t pt-5">
          <Link href={`/admin/templates/${template}`} className="text-sm font-medium text-muted-foreground hover:text-eb-navy">
            Cancel
          </Link>
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </div>
  );
}

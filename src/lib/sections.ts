import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { getTemplateDef, getSectionDef } from "@/lib/templates";

// One cached query per template; admin saves call revalidateTag("sections")
// so edits appear on the live site immediately.
const readTemplateRows = unstable_cache(
  async (template: string) => db.templateSection.findMany({ where: { template } }),
  ["template-sections"],
  { revalidate: 300, tags: ["sections"] },
);

function parse(data: string | undefined): Record<string, string> {
  if (!data) return {};
  try {
    const obj = JSON.parse(data);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

/**
 * All sections of a template with saved values merged over code defaults.
 * Falls back to pure defaults if the database is unavailable, so the site
 * never hard-crashes on a DB hiccup.
 */
export async function getTemplateSections(template: string): Promise<Record<string, Record<string, string>>> {
  const def = getTemplateDef(template);
  if (!def) return {};
  let rows: { key: string; data: string }[] = [];
  try {
    rows = await readTemplateRows(template);
  } catch {
    rows = [];
  }
  const out: Record<string, Record<string, string>> = {};
  for (const section of def.sections) {
    const row = rows.find((r) => r.key === section.key);
    out[section.key] = { ...section.defaults, ...parse(row?.data) };
  }
  return out;
}

/** A single section's values (defaults merged with any saved overrides). */
export async function getSection(template: string, key: string): Promise<Record<string, string>> {
  const def = getSectionDef(template, key);
  if (!def) return {};
  const all = await getTemplateSections(template);
  return all[key] ?? { ...def.defaults };
}

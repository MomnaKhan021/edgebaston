import { AsyncLocalStorage } from "node:async_hooks";
import { db } from "@/lib/db";
import { getTemplateDef, getSectionDef } from "@/lib/templates";

/**
 * Per-request override that lets a duplicated page render a designed template
 * with its OWN saved content. Maps a base template key (e.g. "retake") to the
 * DB namespace its rows live under (e.g. "inst_<pageId>"). Field definitions
 * and defaults still come from the base template; only the stored rows differ.
 */
const nsStore = new AsyncLocalStorage<Record<string, string>>();

/** Run `fn` (typically a rendered page) with template→namespace overrides active. */
export function withSectionNamespace<T>(map: Record<string, string>, fn: () => T): T {
  return nsStore.run(map, fn);
}

/** Which DB template string to read rows from for a given base key. */
function rowsTemplate(baseKey: string): string {
  const map = nsStore.getStore();
  return (map && map[baseKey]) || baseKey;
}

// Read a template's saved rows fresh on every render. Pages that use this are
// already `force-dynamic`, so there is no caching layer between an admin save
// and the live site — edits publish instantly.
const readTemplateRows = (template: string) =>
  db.templateSection.findMany({ where: { template } });

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
    rows = await readTemplateRows(rowsTemplate(template));
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

/** Reserved key used to store a designed page's live on/off state. */
const PAGE_META_KEY = "__page";

/**
 * Whether a designed page (template) is published on the live site. Defaults to
 * true. When the template is being rendered as a template-backed page instance
 * (a namespace override is active), this always returns true — an instance's
 * visibility is controlled by its Page row, not the base template's flag.
 * Fails open (returns true) if the database is unavailable.
 */
export async function getPagePublished(template: string): Promise<boolean> {
  const map = nsStore.getStore();
  if (map && map[template]) return true;
  try {
    const row = await db.templateSection.findUnique({
      where: { template_key: { template, key: PAGE_META_KEY } },
    });
    if (!row) return true;
    const data = parse(row.data);
    return data.published !== "0";
  } catch {
    return true;
  }
}

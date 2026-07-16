import { db } from "@/lib/db";

export type Settings = Awaited<ReturnType<typeof getSettings>>;

/** Fetch the single site-settings row, creating it with defaults if missing. */
export async function getSettings() {
  const existing = await db.siteSetting.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return db.siteSetting.create({ data: { id: 1 } });
}

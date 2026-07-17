import { db } from "@/lib/db";

export type Settings = {
  id: number;
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutText: string;
  email: string;
  phone: string;
  address: string;
  primaryColor: string;
  accentColor: string;
  updatedAt: Date;
};

const DEFAULTS: Settings = {
  id: 1,
  siteName: "Edgbaston College",
  tagline: "Shaping futures through education",
  heroTitle: "Welcome to Edgbaston College",
  heroSubtitle: "A community of learners committed to academic excellence.",
  heroImageUrl: "",
  aboutText: "",
  email: "enquiries@edgbastoncollege.co.uk",
  phone: "0121 306 0182",
  address: "37 George Road, Edgbaston, Birmingham, B15 1PL",
  primaryColor: "#0e2f49",
  accentColor: "#2781c8",
  updatedAt: new Date(0),
};

/**
 * Fetch the single site-settings row. Falls back to sensible defaults if the
 * database is unavailable so the site never hard-crashes on a DB hiccup.
 */
export async function getSettings(): Promise<Settings> {
  try {
    const existing = await db.siteSetting.findUnique({ where: { id: 1 } });
    if (existing) return existing;
    return await db.siteSetting.create({ data: { id: 1 } });
  } catch {
    return DEFAULTS;
  }
}

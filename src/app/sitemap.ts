import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { PAGE_ROUTES } from "@/lib/pageRoutes";
import { getPagePublished, getPageRedirect } from "@/lib/sections";
import { normalizeRedirect } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function baseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "edgbastoncollege.co.uk";
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

/**
 * When a page has an admin redirect, that redirect *becomes* its live URL — so
 * the sitemap should list the redirect target, not the base route. Returns the
 * canonical internal path, or null if the item redirects off-site (then it's
 * not a page of ours to index).
 */
function canonicalPath(route: string, redirect: string): string | null {
  const target = normalizeRedirect(redirect || "");
  if (!target) return route;
  if (target.startsWith("/")) return target.split(/[?#]/)[0];
  return null; // external redirect — not our canonical page
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await baseUrl();
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const add = (path: string | null, priority: number, lastModified?: Date) => {
    if (!path) return;
    const p = (path.startsWith("/") ? path : `/${path}`).split(/[?#]/)[0];
    if (seen.has(p)) return;
    seen.add(p);
    entries.push({
      url: base + (p === "/" ? "" : p),
      lastModified: lastModified ?? new Date(),
      changeFrequency: "weekly",
      priority,
    });
  };

  // Designed pages (home + the fixed routes), honouring publish + redirect.
  for (const [key, route] of Object.entries(PAGE_ROUTES)) {
    try {
      if (!(await getPagePublished(key))) continue;
      const redirect = await getPageRedirect(key);
      add(canonicalPath(route, redirect), key === "home" ? 1 : 0.8);
    } catch {
      add(route, 0.8);
    }
  }

  // Other public, indexable static routes not in PAGE_ROUTES.
  add("/courses", 0.7);
  add("/faculty", 0.5);

  // Courses.
  try {
    const courses = await db.course.findMany({
      where: { published: true },
      select: { slug: true, redirectUrl: true, updatedAt: true },
    });
    for (const c of courses) add(canonicalPath(`/courses/${c.slug}`, c.redirectUrl), 0.6, c.updatedAt);
  } catch {
    /* DB unavailable — skip dynamic entries */
  }

  // Blog posts.
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, redirectUrl: true, updatedAt: true },
    });
    for (const p of posts) add(canonicalPath(`/blog/${p.slug}`, p.redirectUrl), 0.6, p.updatedAt);
  } catch {
    /* skip */
  }

  // Custom + template-instance pages.
  try {
    const pages = await db.page.findMany({
      where: { published: true },
      select: { slug: true, redirectUrl: true, updatedAt: true },
    });
    for (const pg of pages) add(canonicalPath(`/${pg.slug}`, pg.redirectUrl), 0.5, pg.updatedAt);
  } catch {
    /* skip */
  }

  return entries;
}

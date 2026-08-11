import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/**
 * robots.txt — allow crawling of the public site, keep the admin, API and
 * on-site search out of the index, and point crawlers at the sitemap. The base
 * URL is derived from the request so it's correct on any domain.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const host = h.get("host") ?? "edgbastoncollege.co.uk";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/search"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

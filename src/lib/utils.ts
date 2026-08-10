import slugify from "slugify";

/** Join class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Build a URL-safe slug from a title. */
export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

/**
 * Build a URL-safe *path* slug that may contain `/` separators, e.g.
 * "/guard/course" → "guard/course". Each segment is slugified individually,
 * empty segments (from leading/trailing/duplicate slashes) are dropped.
 */
export function toPathSlug(input: string): string {
  return input
    .split("/")
    .map((segment) => toSlug(segment))
    .filter(Boolean)
    .join("/");
}

/**
 * Normalise a redirect value into a site-relative path ("/foo") or a safe
 * absolute URL. Guards the common mistake of typing a bare internal target like
 * "about-us" — which would otherwise become the broken host "https://about-us":
 * any value whose host has no dot (not a real public domain) is treated as an
 * on-site path, and our own deploy host (*.vercel.app) is collapsed to a path.
 * Applied on both save and read, so it also repairs already-stored bad values.
 */
export function normalizeRedirect(value: string | undefined): string {
  const raw = (value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("/")) return raw; // already a site-relative path

  // Absolute or protocol-relative URL.
  if (/^(https?:)?\/\//i.test(raw)) {
    const withScheme = raw.replace(/^\/\//, "https://");
    try {
      const u = new URL(withScheme);
      if (/(^|\.)vercel\.app$/i.test(u.hostname)) {
        return (u.pathname + u.search + u.hash) || "/"; // our own host → path
      }
      if (!u.hostname.includes(".")) {
        // e.g. "https://about-us" — the "host" was meant to be a page path.
        const path = u.pathname === "/" ? "" : u.pathname;
        return "/" + u.hostname + path + u.search + u.hash;
      }
      return withScheme; // a real external domain
    } catch {
      return withScheme;
    }
  }

  // No scheme and no leading slash: a bare token with no dot is an internal
  // page (e.g. "about-us" → "/about-us"); anything with a dot is a domain.
  if (!raw.includes(".")) return "/" + raw.replace(/^\/+/, "");
  return `https://${raw}`;
}

/** Human-friendly date, e.g. "16 Jul 2026". */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Strip HTML tags to produce a plain-text excerpt. */
export function excerpt(html: string, max = 160): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

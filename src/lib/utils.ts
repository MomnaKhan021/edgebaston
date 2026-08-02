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

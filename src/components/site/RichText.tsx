import { cn } from "@/lib/utils";

/**
 * Renders admin-authored rich text (HTML) from a template "rich" field.
 * Plain-text values (older saves) render fine too. The wrapper carries the
 * surrounding typography classes (size/colour/leading) so formatted text
 * inherits the section's intended style; `.eb-rich` (globals.css) handles
 * inline marks, lists and paragraph spacing.
 */
export function RichText({ html, className }: { html?: string; className?: string }) {
  const value = (html ?? "").trim();
  if (!value) return null;
  return <div className={cn("eb-rich", className)} dangerouslySetInnerHTML={{ __html: value }} />;
}

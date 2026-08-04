import "server-only";
import { TEMPLATES } from "@/lib/templates";

/**
 * Registry of designed templates that can be *instantiated* as new pages.
 *
 * A "template-backed page" is a Page row whose `templateKey` is one of these.
 * The public [...slug] route renders the matching designed layout, but reads
 * that page's own saved content from the "inst_<pageId>" namespace (see
 * `withSectionNamespace` in lib/sections). Header / Footer are excluded — they
 * are site-wide chrome fragments, not standalone pages.
 */

type PageModule = { default: (props: Record<string, never>) => unknown };
type Renderer = () => Promise<PageModule>;

/** Base template key → dynamic import of the page module that renders it. */
const RENDERERS: Record<string, Renderer> = {
  home: () => import("@/app/(home)/page"),
  retake: () => import("@/app/one-year-a-level-retake/page"),
  "five-term": () => import("@/app/five-term-a-level/page"),
  about: () => import("@/app/about-us/page"),
  history: () => import("@/app/our-history/page"),
  admissions: () => import("@/app/admissions-requirements/page"),
  fees: () => import("@/app/fees/page"),
  "term-dates": () => import("@/app/term-dates/page"),
  results: () => import("@/app/results/page"),
  contact: () => import("@/app/contact/page"),
};

export function canInstance(templateKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(RENDERERS, templateKey);
}

/**
 * Templates offered in the "create a page from a template" picker — every
 * designed page template that has a renderer, in template-list order. New
 * templates added to TEMPLATES with a renderer appear here automatically.
 */
export const INSTANCE_TEMPLATES: { key: string; name: string }[] = TEMPLATES.filter((t) =>
  canInstance(t.key),
).map((t) => ({ key: t.key, name: t.name }));

export function getInstanceRenderer(templateKey: string): Renderer | undefined {
  return RENDERERS[templateKey];
}

/** The DB namespace a template-backed page's content lives under. */
export const instanceNamespace = (pageId: string): string => `inst_${pageId}`;

/** Parse a template string; returns the page id if it is an instance namespace. */
export const instancePageId = (template: string): string | null =>
  template.startsWith("inst_") ? template.slice("inst_".length) : null;

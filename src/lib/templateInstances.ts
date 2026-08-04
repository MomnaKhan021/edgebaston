import "server-only";

/**
 * Registry of designed templates that can be *instantiated* as new pages.
 *
 * A "template-backed page" is a Page row whose `templateKey` is one of these.
 * The public [...slug] route renders the matching designed layout, but reads
 * that page's own saved content from the "inst_<pageId>" namespace (see
 * `withSectionNamespace` in lib/sections). Home / Header / Footer are excluded
 * (they are site-wide singletons), as is the currently-broken Five Term page.
 */

type PageModule = { default: (props: Record<string, never>) => unknown };
type Renderer = () => Promise<PageModule>;

/** Templates offered in the "create a page from a template" picker. */
export const INSTANCE_TEMPLATES: { key: string; name: string }[] = [
  { key: "retake", name: "One Year A-Level Retake Page" },
  { key: "about", name: "About Us Page" },
  { key: "history", name: "Our History Page" },
  { key: "admissions", name: "Admissions Requirements Page" },
  { key: "fees", name: "Fees Page" },
  { key: "term-dates", name: "Term Dates Page" },
  { key: "results", name: "Results & Destinations Page" },
  { key: "contact", name: "Contact Page" },
];

/** Base template key → dynamic import of the page module that renders it. */
const RENDERERS: Record<string, Renderer> = {
  retake: () => import("@/app/one-year-a-level-retake/page"),
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

export function getInstanceRenderer(templateKey: string): Renderer | undefined {
  return RENDERERS[templateKey];
}

/** The DB namespace a template-backed page's content lives under. */
export const instanceNamespace = (pageId: string): string => `inst_${pageId}`;

/** Parse a template string; returns the page id if it is an instance namespace. */
export const instancePageId = (template: string): string | null =>
  template.startsWith("inst_") ? template.slice("inst_".length) : null;

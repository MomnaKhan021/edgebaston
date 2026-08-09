/**
 * Which live URL each designed-page template renders at. Used for the "View
 * live" link and to decide which templates can be turned off from the admin.
 */
export const PAGE_ROUTES: Record<string, string> = {
  home: "/",
  retake: "/one-year-a-level-retake",
  "five-term": "/five-term-a-level",
  subjects: "/subjects",
  inquiry: "/inquiry",
  about: "/about-us",
  history: "/our-history",
  admissions: "/admissions-requirements",
  fees: "/fees",
  "term-dates": "/term-dates",
  results: "/results",
  blog: "/blog",
  "success-stories": "/what-our-students-say",
  contact: "/contact",
};

/**
 * Templates whose live page can be published/unpublished (and given a redirect
 * or SEO overrides) from the admin. This is every template with a live route —
 * including the homepage. The non-page chrome (header/footer) isn't in
 * PAGE_ROUTES, so it's excluded automatically.
 */
export function canUnpublish(templateKey: string): boolean {
  return templateKey in PAGE_ROUTES;
}

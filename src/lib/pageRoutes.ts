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
 * Templates whose live page can be published/unpublished from the admin.
 * The homepage and the non-page chrome (header/footer) are excluded — turning
 * the homepage off would leave the site with no home.
 */
export function canUnpublish(templateKey: string): boolean {
  return templateKey in PAGE_ROUTES && templateKey !== "home";
}

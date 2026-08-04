import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt } from "@/lib/utils";
import { getSettings } from "@/lib/settings";
import { withSectionNamespace } from "@/lib/sections";
import { canInstance, getInstanceRenderer, instanceNamespace } from "@/lib/templateInstances";
import { Header, type NavLink } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

/** Join the catch-all segments back into a stored slug, e.g. ["guard","course"] → "guard/course". */
function joinSlug(segments: string[]): string {
  return segments.map((s) => decodeURIComponent(s)).join("/");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug: joinSlug(slug) } }).catch(() => null);
  if (!page) return { title: "Page not found" };
  return { title: page.title, description: excerpt(page.content) };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug: joinSlug(slug) } });

  if (!page || !page.published) notFound();
  if (page.redirectUrl) redirect(page.redirectUrl);

  // Template-backed page: render the designed layout with this page's own
  // content (read from the "inst_<id>" namespace via the async-context
  // override). The layout supplies its own header/footer, so we render it
  // bare — no extra site chrome around it.
  if (page.templateKey && canInstance(page.templateKey)) {
    const load = getInstanceRenderer(page.templateKey)!;
    const mod = await load();
    const rendered = await withSectionNamespace(
      { [page.templateKey]: instanceNamespace(page.id) },
      () => mod.default({}),
    );
    return rendered as ReactElement;
  }

  // Plain rich-text page: wrap it in the standard site header/footer.
  const [settings, navPages] = await Promise.all([
    getSettings(),
    db.page
      .findMany({ where: { published: true, showInNav: true }, orderBy: { order: "asc" } })
      .catch(() => [] as { title: string; slug: string }[]),
  ]);
  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Faculty", href: "/faculty" },
    { label: "About", href: "/about" },
    ...navPages.map((p) => ({ label: p.title, href: `/${p.slug}` })),
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Header siteName={settings.siteName} navLinks={navLinks} />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="mb-6 text-4xl font-extrabold text-brand">{page.title}</h1>
          {page.content ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p className="text-muted-foreground">This page has no content yet.</p>
          )}
        </div>
      </main>
      <Footer
        siteName={settings.siteName}
        tagline={settings.tagline}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        navLinks={navLinks}
      />
    </>
  );
}

import type { Metadata } from "next";
import type { ReactElement } from "react";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt } from "@/lib/utils";
import { withSectionNamespace, findTemplateByAliasPath, getPageMeta } from "@/lib/sections";
import { canInstance, getInstanceRenderer, instanceNamespace } from "@/lib/templateInstances";
import { PAGE_ROUTES } from "@/lib/pageRoutes";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";

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
  if (!page) {
    // A designed page rendered at its alias URL keeps its own SEO meta.
    const tpl = await findTemplateByAliasPath("/" + joinSlug(slug));
    if (tpl) {
      const m = await getPageMeta(tpl);
      if (m.metaTitle || m.metaDescription) {
        return {
          title: m.metaTitle ? { absolute: m.metaTitle } : undefined,
          description: m.metaDescription || undefined,
        };
      }
      return {};
    }
    return { title: "Page not found" };
  }

  // Per-page SEO from the admin; fall back to the page title / a content excerpt.
  // `absolute` lets the admin control the exact title (no "| Site name" suffix).
  const title = page.metaTitle ? { absolute: page.metaTitle } : page.title;
  const description = page.metaDescription || excerpt(page.content) || undefined;
  return {
    title,
    description,
    openGraph: { title: page.metaTitle || page.title, description },
  };
}

export const dynamic = "force-dynamic";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const currentPath = "/" + joinSlug(slug);
  let page = await db.page.findUnique({ where: { slug: joinSlug(slug) } });

  if (!page) {
    // "The redirect URL becomes the page's URL": if a designed page's admin
    // redirect points exactly at this (otherwise unknown) path, render that
    // page's full content HERE — the address bar keeps this URL.
    const tpl = await findTemplateByAliasPath(currentPath);
    if (tpl && canInstance(tpl)) {
      const mod = await getInstanceRenderer(tpl)!();
      // Identity namespace override: reads the template's own content, while
      // signalling getPageRedirect to skip re-redirecting (no loop).
      const rendered = await withSectionNamespace({ [tpl]: tpl }, () => mod.default({}));
      return rendered as ReactElement;
    }

    // Forgiving fallback: if a nested path has no page of its own, resolve it
    // to its FINAL segment when that is a real page — so /x/fees still lands
    // on /fees even though the "/x" parent doesn't exist.
    if (slug.length > 1) {
      const last = decodeURIComponent(slug[slug.length - 1]);
      const lastPage = await db.page.findUnique({ where: { slug: last } }).catch(() => null);
      if (lastPage?.published) {
        const aliasTarget = (lastPage.redirectUrl || "").split(/[?#]/)[0];
        if (aliasTarget === currentPath) {
          // That page's redirect points exactly here → this is its new URL;
          // render its content at this address instead of bouncing back.
          page = lastPage;
        } else {
          redirect(`/${last}`);
        }
      } else {
        const knownRoutes = new Set(Object.values(PAGE_ROUTES).map((p) => p.replace(/^\//, "")));
        if (last && knownRoutes.has(last)) redirect(`/${last}`);
      }
    }
  }

  if (!page || !page.published) notFound();
  // Follow the page's redirect unless it points at the URL being rendered
  // right now (then this IS the destination — render the content).
  if (page.redirectUrl) {
    const targetPath = page.redirectUrl.startsWith("/") ? page.redirectUrl.split(/[?#]/)[0] : "";
    if (targetPath !== currentPath) redirect(page.redirectUrl);
  }

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

  // Plain rich-text page: wrap it in the same header/footer as the rest of the
  // site (the branded Navbar + FigmaFooter), not a separate simple chrome.
  return (
    <>
      <AnnouncementBar />
      <SiteNavbar variant="solid" />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-eb-ink lg:text-[44px]">{page.title}</h1>
          {page.content ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p className="text-muted-foreground">This page has no content yet.</p>
          )}
        </div>
      </main>
      <FigmaFooter />
    </>
  );
}

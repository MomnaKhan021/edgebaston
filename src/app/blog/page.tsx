import type { Metadata } from "next";
import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";
import { BlogList, type PostCard } from "@/components/blog/BlogList";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getTemplateSections, getPagePublished, getPageMeta, getPageRedirect } from "@/lib/sections";
import { sectionDefaults, isVisible, bgStyle } from "@/lib/templates";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta("blog");
  return {
    title: m.metaTitle ? { absolute: m.metaTitle } : "Blog",
    description: m.metaDescription || "News, insights and guides from Edgbaston College.",
  };
}

export default async function BlogPage() {
  if (!(await getPagePublished("blog"))) notFound();
  const redirectTo = await getPageRedirect("blog");
  if (redirectTo) redirect(redirectTo);
  const s = await getTemplateSections("blog");
  const d = (k: string) => ({ ...sectionDefaults("blog", k), ...s[k] });
  const hero = d("hero");
  const list = d("list");

  const posts = await db.post
    .findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] })
    .catch(() => [] as Awaited<ReturnType<typeof db.post.findMany>>);

  const cards: PostCard[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    imageUrl: p.imageUrl,
  }));
  const categories = Array.from(new Set(cards.map((c) => c.category).filter(Boolean))).sort();
  const hasImage = Boolean(hero.bgDesktop);

  return (
    <>
      <SiteAnnouncement />
      <SiteNavbar variant="solid" />

      {/* Banner */}
      {isVisible(hero) && (
        <section
          className={"relative z-[60] isolate overflow-x-clip " + (hasImage ? "bg-eb-navy" : "bg-eb-cream")}
          style={bgStyle(hero)}
        >
          {hasImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.bgDesktop} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/30" />
            </>
          )}
          <div className="relative mx-auto max-w-[1320px] px-4 py-14 lg:px-16 lg:py-20">
            <p className={"font-mono text-sm uppercase tracking-[0.14em] " + (hasImage ? "text-white/70" : "text-eb-blue")}>
              {hero.eyebrow}
            </p>
            <h1 className={"mt-3 text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl " + (hasImage ? "text-white" : "text-eb-ink")}>
              {hero.heading}
            </h1>
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 lg:px-16">
          <nav className="border-b py-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link>
            <span className="px-2">/</span>
            <span className="text-eb-navy">Blog</span>
          </nav>
        </div>
      </div>

      <Reveal>
        <BlogList
          posts={cards}
          categories={categories}
          categoriesLabel={list.categoriesLabel}
          allLabel={list.allLabel}
        />
      </Reveal>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}

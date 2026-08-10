import Link from "next/link";
import { SiteAnnouncement } from "@/components/home/SiteAnnouncement";
import { SiteNavbar } from "@/components/home/SiteNavbar";
import { FigmaFooter } from "@/components/home/FigmaFooter";
import { Reveal } from "@/components/home/Reveal";

/** The fields a blog article needs to render. */
export type ArticlePost = {
  title: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  content: string;
};

/**
 * The full branded blog-article page. Shared by the canonical /blog/<slug>
 * route and the catch-all, so a post reachable at a custom alias URL (its
 * "Redirect this article" target) renders identically at that address.
 */
export function BlogArticle({ post }: { post: ArticlePost }) {
  return (
    <>
      <SiteAnnouncement />
      <SiteNavbar variant="solid" />

      <article className="bg-white">
        <div className="mx-auto max-w-[820px] px-4 pb-14 pt-10 lg:pb-20 lg:pt-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-eb-navy">Home</Link>
            <span className="px-2">/</span>
            <Link href="/blog" className="hover:text-eb-navy">Blog</Link>
            <span className="px-2">/</span>
            <span className="text-eb-navy">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mt-8 text-center">
            {post.category && (
              <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-eb-blue">{post.category}</p>
            )}
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-eb-ink sm:text-5xl lg:text-[56px]">
              {post.title}
            </h1>
            {post.authorName && (
              <div className="mt-6 flex items-center justify-center gap-3">
                {post.authorImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.authorImage} alt={post.authorName} className="h-9 w-9 rounded-full object-cover" loading="lazy" decoding="async" />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-eb-cream text-sm font-bold text-eb-navy">
                    {post.authorName.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-medium text-eb-navy/80">{post.authorName}</span>
              </div>
            )}
          </header>

          {/* Cover image */}
          {post.imageUrl && (
            <div className="mt-8 overflow-hidden rounded-3xl lg:mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageUrl} alt={post.title} className="aspect-[16/9] w-full object-cover" fetchPriority="high" />
            </div>
          )}

          {/* Body */}
          <Reveal>
            {post.content ? (
              <div className="blog-prose mt-10 lg:mt-12" dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="mt-10 text-neutral-500">This article has no content yet.</p>
            )}
          </Reveal>
        </div>
      </article>

      <Reveal><FigmaFooter /></Reveal>
    </>
  );
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt as makeExcerpt, normalizeRedirect } from "@/lib/utils";
import { BlogArticle } from "@/components/blog/BlogArticle";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return { title: "Post not found" };

  // Per-post SEO from the admin; fall back to the post title / excerpt.
  const title = post.metaTitle ? { absolute: post.metaTitle } : post.title;
  const description = post.metaDescription || post.excerpt || makeExcerpt(post.content) || undefined;
  return {
    title,
    description,
    openGraph: {
      title: post.metaTitle || post.title,
      description,
      type: "article",
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    // A designed page whose admin redirect targets /blog/<slug> renders its
    // content at this address ("the redirect URL becomes the page's URL").
    const { withSectionNamespace, findTemplateByAliasPath } = await import("@/lib/sections");
    const { canInstance, getInstanceRenderer } = await import("@/lib/templateInstances");
    const tpl = await findTemplateByAliasPath(`/blog/${slug}`);
    if (tpl && canInstance(tpl)) {
      const mod = await getInstanceRenderer(tpl)!();
      const rendered = await withSectionNamespace({ [tpl]: tpl }, () => mod.default({}));
      return rendered as React.ReactElement;
    }
    notFound();
  }
  // Follow the post's redirect unless it points at this very URL.
  const postRedirect = normalizeRedirect(post.redirectUrl);
  if (postRedirect && postRedirect.split(/[?#]/)[0] !== `/blog/${slug}`) {
    redirect(postRedirect);
  }

  return <BlogArticle post={post} />;
}

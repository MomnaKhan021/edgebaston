import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { excerpt } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });
  if (!page) return { title: "Page not found" };
  return { title: page.title, description: excerpt(page.content) };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });

  if (!page || !page.published) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-4xl font-extrabold text-brand">{page.title}</h1>
      {page.content ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <p className="text-muted-foreground">This page has no content yet.</p>
      )}
    </div>
  );
}

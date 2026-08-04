import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageForm } from "@/components/admin/PageForm";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await db.page.findUnique({ where: { id } });
  if (!page) notFound();
  return (
    <div className="space-y-5">
      {page.templateKey && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-eb-blue/30 bg-eb-blue/5 px-5 py-4">
          <p className="text-sm text-eb-navy">
            This page uses a <strong>designed template</strong>. Its layout content (banner, cards, images…) is
            edited section by section.
          </p>
          <Link
            href={`/admin/templates/inst_${page.id}`}
            className="shrink-0 rounded-lg bg-eb-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-eb-blue"
          >
            Edit design sections
          </Link>
        </div>
      )}
      <PageForm page={page} />
    </div>
  );
}

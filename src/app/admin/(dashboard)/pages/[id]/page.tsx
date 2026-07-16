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
  return <PageForm page={page} />;
}

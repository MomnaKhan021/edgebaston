import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StaffForm } from "@/components/admin/StaffForm";

export default async function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await db.staff.findUnique({ where: { id } });
  if (!member) notFound();
  return <StaffForm member={member} />;
}

import type { Metadata } from "next";
import { requireAuth } from "@/lib/guard";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const [settings, unreadCount] = await Promise.all([
    getSettings(),
    db.inquiry.count({ where: { read: false } }),
  ]);

  return (
    <div className="lg:flex">
      <Sidebar
        siteName={settings.siteName}
        email={session.email}
        unreadCount={unreadCount}
      />
      <div className="min-w-0 flex-1 bg-muted lg:h-screen lg:overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
      </div>
    </div>
  );
}

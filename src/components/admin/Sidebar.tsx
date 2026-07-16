"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/auth-actions";

const NAV = [
  { label: "Overview", href: "/admin", icon: "▦" },
  { label: "Courses", href: "/admin/courses", icon: "🎓" },
  { label: "Staff", href: "/admin/staff", icon: "👥" },
  { label: "Pages", href: "/admin/pages", icon: "📄" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "✉️" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export function Sidebar({
  siteName,
  email,
  unreadCount,
}: {
  siteName: string;
  email: string;
  unreadCount: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b bg-brand px-4 py-3 text-white lg:hidden">
        <span className="font-bold">{siteName} · Admin</span>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/30 px-3 py-1 text-sm"
        >
          Menu
        </button>
      </div>

      <aside
        className={cn(
          "flex-col bg-brand text-white lg:flex lg:h-screen lg:w-64 lg:shrink-0",
          open ? "flex" : "hidden lg:flex",
        )}
      >
        <div className="hidden items-center gap-2 border-b border-white/10 px-6 py-5 lg:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-sm font-bold">
            {siteName.charAt(0)}
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold">{siteName}</div>
            <div className="text-xs text-white/60">Content dashboard</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive(item.href)
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="flex items-center gap-3">
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </span>
              {item.href === "/admin/inquiries" && unreadCount > 0 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-brand-dark">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
          >
            <span className="w-5 text-center">🌐</span> View site ↗
          </Link>
          <div className="px-3 py-2 text-xs text-white/50">{email}</div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <span className="mr-3 w-5 text-center">⏻</span> Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

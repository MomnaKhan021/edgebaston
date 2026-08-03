"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/auth-actions";
import {
  IconOverview,
  IconTemplates,
  IconCourses,
  IconStaff,
  IconPages,
  IconInquiries,
  IconSettings,
  IconExternal,
  IconSignOut,
  IconMenu,
  IconClose,
} from "./icons";

const NAV = [
  { label: "Overview", href: "/admin", Icon: IconOverview },
  { label: "Templates", href: "/admin/templates", Icon: IconTemplates },
  { label: "Courses", href: "/admin/courses", Icon: IconCourses },
  { label: "Staff", href: "/admin/staff", Icon: IconStaff },
  { label: "Pages", href: "/admin/pages", Icon: IconPages },
  { label: "Inquiries", href: "/admin/inquiries", Icon: IconInquiries },
  { label: "Settings", href: "/admin/settings", Icon: IconSettings },
];

export function Sidebar({
  email,
  unreadCount,
}: {
  siteName?: string;
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
      <div className="sticky top-0 z-40 flex items-center justify-between bg-eb-navy px-4 py-3 lg:hidden">
        <Link href="/admin" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/logo.svg" alt="Edgbaston College" className="h-8 w-auto" loading="lazy" decoding="async" />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/25 text-white transition hover:bg-white/10"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[82%] flex-col bg-eb-navy text-white transition-transform duration-300 ease-out",
          "lg:static lg:z-auto lg:h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 lg:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link href="/admin" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.svg" alt="Edgbaston College" className="h-9 w-auto" loading="lazy" decoding="async" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <p className="px-6 pt-4 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
          Content dashboard
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {NAV.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-eb-blue text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </span>
              {href === "/admin/inquiries" && unreadCount > 0 && (
                <span className="grid min-w-5 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-eb-navy">
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
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconExternal className="h-5 w-5 shrink-0" />
            View live site
          </Link>
          <div className="truncate px-3 py-2 text-xs text-white/45">{email}</div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconSignOut className="h-5 w-5 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

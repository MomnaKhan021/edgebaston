"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseMenu, type MenuNode } from "@/lib/templates";

const NAV: MenuNode[] = [
  { label: "Courses", url: "/courses", children: [] },
  { label: "Admissions", url: "/admissions", children: [] },
  { label: "About Us", url: "/about", children: [] },
  { label: "Guides", url: "#", children: [] },
];

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A dropdown entry. If it has children they render as an indented group. */
function DropdownItem({ item }: { item: MenuNode }) {
  const kids = item.children ?? [];
  if (kids.length === 0) {
    return (
      <Link href={item.url || "#"} className="block rounded-lg px-4 py-2.5 text-[14px] font-medium text-eb-navy transition hover:bg-eb-cream">
        {item.label}
      </Link>
    );
  }
  return (
    <div className="px-2 py-2">
      <Link href={item.url || "#"} className="block px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-eb-navy/70 transition hover:text-eb-blue">
        {item.label}
      </Link>
      <div className="mt-1 space-y-0.5">
        {kids.map((c, i) => (
          <Link key={i} href={c.url || "#"} className="block rounded-lg px-2 py-2 text-[14px] text-eb-navy transition hover:bg-eb-cream">
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** A top-level nav item; becomes a hover dropdown when it has children. */
function NavItem({ item, className, style }: { item: MenuNode; className?: string; style?: React.CSSProperties }) {
  const kids = item.children ?? [];
  if (kids.length === 0) {
    return (
      <Link href={item.url || "#"} className={className} style={style}>
        {item.label}
      </Link>
    );
  }
  return (
    <div className="group relative">
      <Link href={item.url || "#"} className={`inline-flex items-center gap-1.5 ${className ?? ""}`} style={style}>
        {item.label}
        <Chevron className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
      </Link>
      {/* pt-3 bridges the gap so the panel stays open while the cursor travels to it */}
      <div className="invisible absolute left-0 top-full z-40 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="min-w-[248px] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
          {kids.map((c, i) => (
            <DropdownItem key={i} item={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mobile menu item: items with children use a native <details> disclosure. */
function MobileItem({ item, onNavigate, depth = 0 }: { item: MenuNode; onNavigate: () => void; depth?: number }) {
  const kids = item.children ?? [];
  const pad = depth === 0 ? "px-4" : depth === 1 ? "px-6" : "px-8";
  if (kids.length === 0) {
    return (
      <Link href={item.url || "#"} onClick={onNavigate} className={`block rounded-lg ${pad} py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream`}>
        {item.label}
      </Link>
    );
  }
  return (
    <details className="group">
      <summary className={`flex cursor-pointer list-none items-center justify-between rounded-lg ${pad} py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream`}>
        {item.label}
        <Chevron className="h-4 w-4 text-eb-navy/60 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-0.5">
        {item.url && item.url !== "#" && (
          <Link href={item.url} onClick={onNavigate} className={`block rounded-lg ${depth === 0 ? "px-6" : "px-8"} py-2 text-[13px] font-medium text-eb-navy/60 hover:bg-eb-cream`}>
            View {item.label}
          </Link>
        )}
        {kids.map((c, i) => (
          <MobileItem key={i} item={c} onNavigate={onNavigate} depth={depth + 1} />
        ))}
      </div>
    </details>
  );
}

export function Navbar({
  variant = "overlay",
  data,
}: {
  variant?: "overlay" | "solid";
  data?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const solid = variant === "solid";
  const pill = solid ? "bg-eb-cream" : "bg-white";
  const pillStyle = data?.pillColor ? { backgroundColor: data.pillColor } : undefined;

  const parsed = data?.links ? parseMenu(data.links) : [];
  const menu = parsed.length ? parsed : NAV;
  const first = menu[0] ?? NAV[0];
  const rest = menu.slice(1);
  const logoLight = data?.logoLight || "/figma/logo.svg";
  const logoDark = data?.logoDark || "/figma/logo-navy.svg";
  const contactLabel = data?.contactLabel || "Contact us";
  const contactUrl = data?.contactUrl ?? "/contact";

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={solid ? "relative z-30 border-b bg-white" : "absolute inset-x-0 top-0 z-30"}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-[60px] lg:py-5">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={solid ? logoDark : logoLight} alt="Edgbaston College" className="h-14 w-auto lg:h-[68px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex">
          <NavItem
            item={first}
            className={`rounded-full px-6 py-3.5 text-[15px] font-semibold text-eb-navy shadow-sm transition hover:brightness-95 ${pill}`}
            style={pillStyle}
          />
          <div className={`flex items-center gap-1 rounded-full px-3 py-2 shadow-sm ${pill}`} style={pillStyle}>
            {rest.map((item, i) => (
              <NavItem
                key={i}
                item={item}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-semibold text-eb-navy transition hover:bg-eb-cream"
              />
            ))}
            {searchOpen && (
              <form onSubmit={submitSearch} className="ml-1">
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  placeholder="Search…"
                  className="w-40 rounded-full border border-eb-navy/20 bg-white px-3 py-1.5 text-sm text-eb-navy outline-none placeholder:text-eb-navy/50 focus:border-eb-blue"
                />
              </form>
            )}
            <button
              aria-label="Search"
              onClick={(e) => {
                if (searchOpen && query.trim()) {
                  submitSearch(e);
                  return;
                }
                setSearchOpen((v) => {
                  const next = !v;
                  if (next) setTimeout(() => searchRef.current?.focus(), 0);
                  return next;
                });
              }}
              className="ml-1 grid h-9 w-9 place-items-center rounded-full text-eb-navy transition hover:bg-eb-cream"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            <button aria-label="Language" className="grid h-9 w-9 place-items-center rounded-full text-eb-navy transition hover:bg-eb-cream">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M2 9h14M9 2c2 2.5 2 11.5 0 14M9 2C7 4.5 7 13.5 9 16" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
          <Link
            href={contactUrl}
            className={`eb-cta rounded-full px-7 py-3.5 text-[15px] font-bold uppercase tracking-wide text-eb-navy shadow-sm ${pill}`}
            style={pillStyle}
          >
            {contactLabel}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Menu"}
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full text-eb-navy shadow-sm lg:hidden ${pill}`}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 rounded-2xl bg-white p-3 shadow-lg lg:hidden">
          <form onSubmit={submitSearch} className="relative mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-full border border-eb-navy/20 bg-white py-2.5 pl-4 pr-11 text-[15px] text-eb-navy outline-none placeholder:text-eb-navy/50 focus:border-eb-blue"
            />
            <button type="submit" aria-label="Search" className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-eb-navy text-white">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </form>
          {menu.map((item, i) => (
            <MobileItem key={i} item={item} onNavigate={() => setOpen(false)} />
          ))}
          <Link
            href={contactUrl}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-eb-navy px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
          >
            {contactLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

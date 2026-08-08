"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseItems, parseMenu, type MenuNode } from "@/lib/templates";

const NAV: MenuNode[] = [
  { label: "Courses", url: "/courses", children: [] },
  { label: "Admissions", url: "/admissions-requirements", children: [] },
  { label: "About Us", url: "/about-us", children: [] },
  { label: "Guides", url: "#", children: [] },
];

type Portal = { label: string; url: string };
const DEFAULT_PORTALS: Portal[] = [
  { label: "Engage Login", url: "https://edgbastoncollege.engagehosted.com/Login.aspx?ReturnUrl=%2f" },
  { label: "Teams Login", url: "https://teams.microsoft.com/" },
];

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 9h14M9 2c2 2.5 2 11.5 0 14M9 2C7 4.5 7 13.5 9 16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Reads the admin-configured login portals; falls back to the defaults. */
function usePortals(data?: Record<string, string>): Portal[] {
  const parsed = parseItems(data?.portals) as Portal[];
  return parsed.length ? parsed : DEFAULT_PORTALS;
}

/** Globe icon in the header that opens a dropdown of external login links. */
function PortalMenu({ portals }: { portals: Portal[] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Login portals"
        className="grid h-9 w-9 place-items-center rounded-full text-eb-navy transition hover:bg-eb-cream"
      >
        <GlobeIcon />
      </button>
      <div className="invisible absolute right-0 top-full z-40 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="min-w-[200px] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
          {portals.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-[14px] font-medium text-eb-navy transition hover:bg-eb-cream"
            >
              {p.label}
              <ExternalArrow className="h-4 w-4 shrink-0 text-eb-navy/50" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders dropdown contents as a single, uniform list of links. Every entry —
 * whether or not it has sub-items — uses the exact same styling and left
 * alignment; nothing is rendered as a differently-styled, indented section
 * heading. Any sub-items are shown as further links at the same level. Shared
 * by the desktop hover panel and the mobile expanded menu.
 */
function DropdownList({ items, onNavigate }: { items: MenuNode[]; onNavigate?: () => void }) {
  return (
    <>
      {items.map((item, i) => {
        const kids = item.children ?? [];
        return (
          <div key={i} className="contents">
            <Link
              href={item.url || "#"}
              onClick={onNavigate}
              className="block rounded-lg px-4 py-2.5 text-[14px] font-medium text-eb-navy transition hover:bg-eb-cream"
            >
              {item.label}
            </Link>
            {kids.length > 0 && <DropdownList items={kids} onNavigate={onNavigate} />}
          </div>
        );
      })}
    </>
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
        <div className="max-h-[calc(100vh-7rem)] min-w-[248px] overflow-y-auto rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
          <DropdownList items={kids} />
        </div>
      </div>
    </div>
  );
}

/** Mobile menu item: a top-level item with children expands once to reveal all
 *  of its options flat — the same list the desktop dropdown shows. */
function MobileItem({ item, onNavigate }: { item: MenuNode; onNavigate: () => void }) {
  const kids = item.children ?? [];
  if (kids.length === 0) {
    return (
      <Link href={item.url || "#"} onClick={onNavigate} className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream">
        {item.label}
      </Link>
    );
  }
  return (
    // Shared name → native single-open accordion: expanding one section
    // collapses the others, so the menu stays compact and never runs long.
    <details name="eb-mobile-menu" className="group border-b border-black/5 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-4 py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream">
        {item.label}
        <Chevron className="h-4 w-4 text-eb-navy/60 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mb-1 mt-0.5 pl-1">
        <DropdownList items={kids} onNavigate={onNavigate} />
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

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
  const portals = usePortals(data);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={solid ? "relative z-[70] border-b bg-white" : "absolute inset-x-0 top-0 z-[70]"}>
      {/* On image banners, darken the top strip so the white logo stays legible
          on any hero photo (light or dark). */}
      {!solid && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 via-black/25 to-transparent" aria-hidden />
      )}
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-[60px] lg:py-5">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={solid ? logoDark : logoLight} alt="Edgbaston College" className="h-14 w-auto lg:h-[68px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex">
          <NavItem
            item={first}
            className={`rounded-full px-6 py-3.5 text-[15px] font-semibold text-eb-navy shadow-sm transition ${pill}`}
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
            {/* Search field: always mounted, slides/fades open for a smooth reveal */}
            <form
              onSubmit={submitSearch}
              className={
                "overflow-hidden transition-all duration-300 ease-out " +
                (searchOpen ? "ml-1 w-40 opacity-100" : "pointer-events-none w-0 opacity-0")
              }
            >
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                placeholder="Search…"
                tabIndex={searchOpen ? 0 : -1}
                aria-hidden={!searchOpen}
                className="w-40 rounded-full border border-eb-navy/20 bg-white px-3 py-1.5 text-sm text-eb-navy outline-none placeholder:text-eb-navy/50 focus:border-eb-blue"
              />
            </form>
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
            {portals.length > 0 && <PortalMenu portals={portals} />}
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

      {/* Mobile menu — a fixed full-screen sheet so it's never clipped by a
          hero's overflow-hidden, and scrolls internally when the menu is tall
          or a dropdown is expanded. */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
          {/* Sheet header mirrors the bar so the logo + close stay in place */}
          <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-4 py-4">
            <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoDark} alt="Edgbaston College" className="h-14 w-auto" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className={`grid h-11 w-11 place-items-center rounded-full text-eb-navy shadow-sm ${pill}`}
              style={pillStyle}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-8 pt-3">
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
            {portals.length > 0 && (
              <div className="mt-3 border-t border-black/5 pt-3">
                {portals.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream"
                  >
                    {p.label}
                    <ExternalArrow className="h-4 w-4 shrink-0 text-eb-navy/50" />
                  </a>
                ))}
              </div>
            )}
            <Link
              href={contactUrl}
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-eb-navy px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

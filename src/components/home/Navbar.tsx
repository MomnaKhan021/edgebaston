"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Courses", href: "/courses" },
  { label: "Admissions", href: "/admissions" },
  { label: "About Us", href: "/about" },
  { label: "Guides", href: "#" },
];

export function Navbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const solid = variant === "solid";
  const pill = solid ? "bg-eb-cream" : "bg-white";

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
          <img src={solid ? "/figma/logo-navy.svg" : "/figma/logo.svg"} alt="Edgbaston College" className="h-14 w-auto lg:h-[68px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex">
          <Link
            href="/courses"
            className={`flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-eb-navy shadow-sm transition hover:brightness-95 ${pill}`}
          >
            Courses
          </Link>
          <div className={`flex items-center gap-1 rounded-full px-3 py-2 shadow-sm ${pill}`}>
            {NAV.slice(1).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center rounded-full px-3.5 py-1.5 text-[15px] font-semibold text-eb-navy transition hover:bg-eb-cream"
              >
                {item.label}
              </Link>
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
            href="/contact"
            className={`eb-cta rounded-full px-7 py-3.5 text-[15px] font-bold uppercase tracking-wide text-eb-navy shadow-sm ${pill}`}
          >
            Contact us
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
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-eb-navy hover:bg-eb-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-eb-navy px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
          >
            Contact us
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Courses", href: "/courses" },
  { label: "Admissions", href: "/contact" },
  { label: "College Life", href: "/p/campus-life" },
  { label: "About Us", href: "/about" },
  { label: "Guides", href: "#" },
];

function Caret() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-16 lg:py-7">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/logo.svg" alt="Edgbaston College" className="h-11 w-auto lg:h-14" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex">
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-eb-navy shadow-sm transition hover:bg-white/90"
          >
            Courses <Caret />
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-sm">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[15px] font-semibold text-eb-navy transition hover:bg-eb-cream"
              >
                {item.label} <Caret />
              </Link>
            ))}
            <button aria-label="Search" className="ml-1 grid h-9 w-9 place-items-center rounded-full text-eb-navy transition hover:bg-eb-cream">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            <button aria-label="Language" className="grid h-9 w-9 place-items-center rounded-full text-eb-navy transition hover:bg-eb-cream">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M2 9h14M9 2c2 2.5 2 11.5 0 14M9 2C7 4.5 7 13.5 9 16" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3.5 text-[15px] font-bold uppercase tracking-wide text-eb-navy shadow-sm transition hover:bg-white/90"
          >
            Contact us
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-eb-navy shadow-sm lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 rounded-2xl bg-white p-3 shadow-lg lg:hidden">
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

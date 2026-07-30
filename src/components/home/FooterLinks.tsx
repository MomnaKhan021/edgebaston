"use client";

import { useState } from "react";
import Link from "next/link";

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0 text-eb-blue">
      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "Useful Links" — a collapsible accordion on mobile (toggle with the +/−),
 * always expanded on desktop.
 */
export function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between lg:pointer-events-none"
      >
        <h3 className="text-base font-bold uppercase tracking-wide">Useful Links</h3>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="lg:hidden">
          <path d="M11 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={open ? "opacity-0" : ""} />
          <path d="M4 11h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <ul className={(open ? "grid" : "hidden") + " mt-6 grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:mt-8 lg:!block lg:space-y-5"}>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="flex items-start gap-3 text-[14px] text-white/85 transition hover:text-white lg:text-[15px]">
              <Arrow /> {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

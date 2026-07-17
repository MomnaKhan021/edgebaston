"use client";

import { useState } from "react";
import Link from "next/link";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-eb-navy text-white">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-10 py-2.5 text-center text-sm">
        <p className="leading-tight">
          <span className="font-bold">EXCITING NEWS:</span>{" "}
          <span className="text-white/85">
            Admissions for Batch 2026 are Now Open! Visit our{" "}
          </span>
          <Link href="/contact" className="font-bold underline underline-offset-2">
            Admissions page
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 transition hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

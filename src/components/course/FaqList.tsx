"use client";

import { useState } from "react";

/** Minimal FAQ list — bordered rows with a +/× toggle, per the course-page design. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left"
            >
              <span className="text-[15px] font-semibold text-eb-navy sm:text-base">{item.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
                className={"shrink-0 text-eb-navy/60 transition-transform duration-300 " + (isOpen ? "rotate-45" : "")}
              >
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-[14px] leading-relaxed text-neutral-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

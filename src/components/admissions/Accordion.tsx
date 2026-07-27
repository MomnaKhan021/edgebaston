"use client";

import { useState } from "react";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-xl bg-eb-cream">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-4 text-left"
            >
              <span className="text-base font-bold text-eb-navy lg:text-lg">{item.q}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={"shrink-0 text-eb-navy transition " + (isOpen ? "rotate-180" : "")}>
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="grid transition-all duration-400 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[14px] leading-relaxed text-neutral-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

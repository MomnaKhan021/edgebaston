"use client";

import { useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  imageUrl?: string;
  /** Rich-text HTML (rendered with .prose-content). */
  html?: string;
};

/**
 * Navy accordion rows. Each header shows a title with a +/× toggle; opening
 * reveals a white panel with the item's image and rich-text HTML. Used for the
 * Staff and Subjects pages — content is authored in the admin.
 */
export function DetailAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-eb-navy/20 p-8 text-center text-eb-navy/60">
        No entries added yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="overflow-hidden rounded-xl bg-eb-navy">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5 sm:px-6 sm:py-5"
            >
              <span className="text-[16px] font-bold text-white sm:text-[18px]">{it.title}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center text-white">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={"transition-opacity " + (isOpen ? "opacity-0" : "")} />
                  <path d="M4 11h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {/* Smooth height + fade reveal */}
            <div className={"grid transition-all duration-300 ease-out " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-5 bg-white p-5 sm:flex-row sm:gap-6 sm:p-6">
                  {it.imageUrl && (
                    <div className="shrink-0 overflow-hidden rounded-lg bg-eb-cream sm:w-40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.imageUrl} alt={it.title} className="h-48 w-full object-cover object-top sm:h-52" loading="lazy" decoding="async" />
                    </div>
                  )}
                  {it.html ? (
                    <div className="prose-content min-w-0 flex-1 text-[14px]" dangerouslySetInnerHTML={{ __html: it.html }} />
                  ) : (
                    <p className="flex-1 text-[14px] text-neutral-500">No details added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

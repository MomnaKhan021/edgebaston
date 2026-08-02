"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FAQ list per the course-page design: bordered rows with a thin +/× toggle.
 * Rows reveal one-by-one as the list scrolls into view, and one answer opens
 * at a time with a smooth height + fade transition.
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="border-b border-black/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(14px)",
              transitionDelay: shown ? `${i * 70}ms` : "0ms",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-[15px] text-left sm:py-[17px]"
            >
              <span className="text-[14px] font-bold text-eb-navy sm:text-[17px]">{item.q}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
                className={
                  "shrink-0 text-eb-navy transition-transform duration-300 ease-out " +
                  (isOpen ? "rotate-45" : "")
                }
              >
                <path d="M10 3.5v13M3.5 10h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={
                    "pb-4 pr-10 text-[13px] leading-relaxed text-neutral-600 transition-all duration-500 ease-out sm:pb-5 sm:text-[14px] " +
                    (isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0")
                  }
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

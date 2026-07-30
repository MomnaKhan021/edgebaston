"use client";

import { usePathname } from "next/navigation";

const BASE_URL = "https://edgebaston.vercel.app";

/**
 * "Share This Page" icon row. Builds share links from the page it is
 * rendered on, so the shared link always lands on the same page.
 */
export function SharePage({ title }: { title?: string }) {
  const pathname = usePathname() ?? "/";
  const u = encodeURIComponent(BASE_URL + pathname);
  const t = encodeURIComponent(title ?? "Edgbaston College");

  const items = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: <path d="M13 8h2V5h-2c-1.7 0-3 1.3-3 3v1.5H8V12h2v6h2.5v-6H15l.5-2.5H12.5V8c0-.6.4-1 1-1z" fill="currentColor" />,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: <path d="M6 5l5.2 6.9L6.3 18H8l3.7-4.1L14.7 18H18l-5.5-7.3L17.4 5h-1.7l-3.4 3.8L9.4 5H6zm2.3 1.3h1l6.5 8.6h-1L8.3 6.3z" fill="currentColor" />,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${t}&body=${u}`,
      icon: (
        <>
          <rect x="4.5" y="6" width="15" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 7l7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-eb-navy">Share This Page</span>
      <div className="flex items-center">
        {items.map((s, i) => (
          <span key={s.label} className="flex items-center">
            {i > 0 && <span className="mx-3 h-4 w-px bg-black/15" />}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-eb-navy transition hover:text-eb-blue"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{s.icon}</svg>
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

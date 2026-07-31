"use client";

import { useEffect, useState } from "react";

/**
 * "Share This Page" icons — share the CURRENT page URL via the platforms'
 * share intents (no hardcoded links, works on any deploy domain).
 */
export function SharePage({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent(url);

  const item =
    "grid h-10 w-10 place-items-center rounded-full border border-eb-navy/20 text-eb-navy transition hover:bg-eb-cream";

  return (
    <div className="flex items-center justify-center gap-3 sm:justify-start">
      <span className="text-sm text-muted-foreground">Share This Page</span>
      <a
        href={url ? `https://www.facebook.com/sharer/sharer.php?u=${enc}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={item}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 16V9h2l.3-2.3H9.5V5.2c0-.66.2-1.1 1.14-1.1H12V2.1C11.7 2.06 10.9 2 10 2 8.06 2 6.75 3.16 6.75 5v1.7H4.7V9h2.05v7h2.75Z"/></svg>
      </a>
      <a
        href={url ? `https://x.com/intent/post?url=${enc}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={item}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1.5h2.3L9.9 7.2l5.9 7.3h-4.6L7.6 9.9l-4.1 4.6H1.2l5.4-6.1L1 1.5h4.7l3.3 4.3 3.6-4.3Zm-.8 11.6h1.3L4.7 2.8H3.3l8.5 10.3Z"/></svg>
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}${url ? `&body=${enc}` : ""}`}
        aria-label="Share by email"
        className={item}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5 8 8.5l5.5-4"/></svg>
      </a>
    </div>
  );
}

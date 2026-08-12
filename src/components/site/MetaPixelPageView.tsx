"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Fbq = (...args: unknown[]) => void;

/**
 * Fires a Meta Pixel PageView on client-side route changes. The base pixel
 * snippet in the root layout already tracks the first (server-rendered) load,
 * so we skip the initial render and only refire on subsequent navigations —
 * which Next's SPA router wouldn't otherwise report to the pixel.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return; // base snippet covers the first load
    }
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (typeof fbq === "function") fbq("track", "PageView");
  }, [pathname]);

  return null;
}

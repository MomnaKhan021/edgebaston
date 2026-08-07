"use client";

import { useEffect } from "react";

const SRC = "https://embed.typeform.com/next/embed.js";

type TypeformGlobal = { reload?: () => void; load?: () => void };

/**
 * Embeds a Typeform "live" form reliably under Next's client-side navigation.
 *
 * Typeform's embed.js only scans the DOM for [data-tf-live] the first time it
 * runs. With SPA navigation the script is already loaded (and de-duped by the
 * browser), so a first visit to this page would leave the widget blank until a
 * hard reload re-ran the scan — exactly the bug we saw. Instead of relying on
 * next/script's one-shot auto-scan, we drive the lifecycle ourselves: inject
 * the script on first use, and on every mount call tf.reload() so the embed
 * (re)scans and mounts the current container whether or not the script was
 * already present.
 */
export function TypeformEmbed({ formId }: { formId: string }) {
  useEffect(() => {
    if (!formId) return;

    const mount = () => {
      const tf = (window as unknown as { tf?: TypeformGlobal }).tf;
      // reload() rescans and mounts any unmounted [data-tf-live]; load() is the
      // initial scan the script runs on first execution.
      if (tf?.reload) tf.reload();
      else if (tf?.load) tf.load();
    };

    const isReady = () => Boolean((window as unknown as { tf?: TypeformGlobal }).tf);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);

    if (existing) {
      // Script already on the page from a previous route.
      if (isReady()) mount();
      else existing.addEventListener("load", mount); // still loading — wait for it
    } else {
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.addEventListener("load", mount);
      document.body.appendChild(script);
    }
  }, [formId]);

  if (!formId) return null;
  return (
    <div className="overflow-hidden rounded-2xl">
      <div data-tf-live={formId} style={{ width: "100%", minHeight: "600px" }} />
    </div>
  );
}

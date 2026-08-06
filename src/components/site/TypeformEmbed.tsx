"use client";

import Script from "next/script";

/**
 * Embeds a Typeform "live" form. Renders the [data-tf-live] container and loads
 * Typeform's embed script, which scans the DOM and mounts the form inline.
 */
export function TypeformEmbed({ formId }: { formId: string }) {
  if (!formId) return null;
  return (
    <div className="overflow-hidden rounded-2xl">
      <div data-tf-live={formId} style={{ width: "100%", minHeight: "600px" }} />
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </div>
  );
}

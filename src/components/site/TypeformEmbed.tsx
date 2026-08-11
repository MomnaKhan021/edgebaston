"use client";

import { useEffect } from "react";

const SRC = "https://embed.typeform.com/next/embed.js";

type TypeformGlobal = { reload?: () => void; load?: () => void };
type Gtag = (...args: unknown[]) => void;

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
export function TypeformEmbed({
  formId,
  conversionSendTo,
}: {
  formId: string;
  /** When set, a Google Ads conversion (this send_to) fires on form submit. */
  conversionSendTo?: string;
}) {
  useEffect(() => {
    if (!formId) return;

    // Typeform calls the global named by data-tf-on-submit when the form is
    // submitted. Define it here so the Google Ads conversion fires. It checks
    // for gtag at call time (gtag.js loads site-wide in the root layout).
    if (conversionSendTo) {
      (window as unknown as { enquiryConversion?: () => void }).enquiryConversion = () => {
        const gtag = (window as unknown as { gtag?: Gtag }).gtag;
        if (typeof gtag !== "function") return;
        // Google Ads conversion.
        gtag("event", "conversion", { send_to: conversionSendTo });
        // GA4 lead event so form completions are tracked in Analytics too
        // (routes to every configured GA4 destination by default).
        gtag("event", "generate_lead", { form: "enquiry", currency: "GBP", value: 0 });
      };
    }

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
    <div className="tf-embed overflow-hidden rounded-2xl">
      {/* Tall enough to fit the whole enquiry form (the mobile layout is the
          tallest, ~1500px), so it renders in one length — the page scrolls, not
          a nested scrollbar inside the form (which was trapping touch-scroll on
          mobile). Shorter on wide screens where the form stacks less. */}
      <div
        data-tf-live={formId}
        data-tf-on-submit={conversionSendTo ? "enquiryConversion" : undefined}
        className="h-[1750px] w-full lg:h-[1200px]"
      />
    </div>
  );
}

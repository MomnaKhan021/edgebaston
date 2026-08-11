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

    // Guard against a Typeform form's custom CSS leaking onto our page. When a
    // form has custom code, the embed injects that CSS as a <style> into OUR
    // document (a sibling of the iframe, not inside it). If that CSS uses
    // page-global selectors — a bare `*` reset, or html/body rules — it hits
    // the whole site and flattens every margin/padding (announcement bar,
    // header, breadcrumb, footer). The form's own look lives inside its
    // cross-origin iframe, so stripping these host-scoped <style> tags is safe.
    const pageGlobal = /(^|[{},])\s*(\*|html|body)\b/i;
    const sanitize = () => {
      const scope = document.querySelector(`[data-tf-live="${formId}"]`);
      if (!scope) return;
      scope.querySelectorAll("style").forEach((el) => {
        if (pageGlobal.test(el.textContent || "")) el.remove();
      });
    };

    const container = document.querySelector(`[data-tf-live="${formId}"]`);
    // Typeform injects that <style> asynchronously (and again on reload), so
    // watch the container and strip it whenever it reappears.
    const styleWatch = new MutationObserver(sanitize);
    if (container) styleWatch.observe(container, { childList: true, subtree: true });
    sanitize();

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

    return () => styleWatch.disconnect();
  }, [formId, conversionSendTo]);

  if (!formId) return null;
  return (
    <div className="tf-embed overflow-hidden rounded-2xl">
      {/* Tall box so the whole (long) enquiry form renders in one length — the
          page scrolls, not a nested scrollbar inside the form. The .tf-embed CSS
          forces Typeform's injected wrapper + iframe to fill this box. */}
      <div
        data-tf-live={formId}
        data-tf-on-submit={conversionSendTo ? "enquiryConversion" : undefined}
        className="h-[1400px] min-h-[640px] w-full"
      />
    </div>
  );
}

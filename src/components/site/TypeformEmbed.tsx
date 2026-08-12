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

    // Fire the enquiry-submit conversions: Meta Pixel Lead, the Google Ads
    // conversion, and a GA4 lead event. Deduped so it fires at most once.
    //
    // We do NOT rely on Typeform's `data-tf-on-submit` attribute: with this
    // embed it does not invoke the named global on submit (verified live — the
    // form posts its submit message but the callback never runs), which had
    // silently stopped the conversions firing. Instead we trigger off
    // Typeform's own `form-submit` postMessage (handled in onMessage below),
    // which the embed always emits. `enquiryConversion` stays defined as a
    // harmless, deduped fallback in case the attribute ever does fire.
    let converted = false;
    const fireConversions = () => {
      if (converted) return;
      converted = true;
      const w = window as unknown as { fbq?: (...args: unknown[]) => void; gtag?: Gtag };
      // Meta Pixel Lead — the event the ad campaign optimises on. Fired first
      // so it lands even if gtag isn't ready.
      if (typeof w.fbq === "function") w.fbq("track", "Lead");
      if (typeof w.gtag === "function") {
        // Google Ads conversion.
        if (conversionSendTo) w.gtag("event", "conversion", { send_to: conversionSendTo });
        // GA4 lead event so form completions are tracked in Analytics too
        // (routes to every configured GA4 destination by default).
        w.gtag("event", "generate_lead", { form: "enquiry", currency: "GBP", value: 0 });
      }
    };
    (window as unknown as { enquiryConversion?: () => void }).enquiryConversion = fireConversions;

    let disposed = false;
    let formReady = false;
    let retries = 0;

    const mount = () => {
      const tf = (window as unknown as { tf?: TypeformGlobal }).tf;
      // reload() rescans and mounts any unmounted [data-tf-live]; load() is the
      // initial scan the script runs on first execution.
      if (tf?.reload) tf.reload();
      else if (tf?.load) tf.load();
    };

    // The first mount can race hydration and leave the iframe blank. Typeform
    // posts a `form-ready` message once it has actually rendered; until that
    // arrives, wipe the container and remount a few times.
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.endsWith("typeform.com")) return;
      let type: unknown = (e.data as { type?: string } | null)?.type;
      if (typeof e.data === "string") {
        try {
          type = (JSON.parse(e.data) as { type?: string }).type;
        } catch {
          /* not JSON */
        }
      }
      if (type === "form-ready") formReady = true;
      // Primary conversion trigger: the embed emits this when the form is
      // submitted (data-tf-on-submit is unreliable here — see fireConversions).
      if (type === "form-submit" || type === "form-submitted") fireConversions();
    };
    window.addEventListener("message", onMessage);
    const verify = () => {
      if (disposed || formReady || retries >= 3) return;
      retries += 1;
      const box = document.querySelector(`[data-tf-live="${formId}"]`);
      if (box) box.innerHTML = "";
      mount();
      setTimeout(verify, 2500);
    };
    const verifyTimer = setTimeout(verify, 2500);

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

    // This form is configured to take over the screen: Typeform's embed locks
    // page scroll by setting `overflow: hidden` on <body>, so the whole page
    // freezes. Undo it whenever it reappears — except when the mobile menu owns
    // the lock (it tags <body> with data-eb-menu-lock).
    const unlockBody = () => {
      if (document.body.dataset.ebMenuLock) return;
      if (document.body.style.overflow === "hidden") document.body.style.overflow = "";
    };
    const bodyWatch = new MutationObserver(unlockBody);
    bodyWatch.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    unlockBody();

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

    return () => {
      disposed = true;
      clearTimeout(verifyTimer);
      window.removeEventListener("message", onMessage);
      styleWatch.disconnect();
      bodyWatch.disconnect();
      unlockBody(); // don't leave the page frozen after leaving this page
    };
  }, [formId, conversionSendTo]);

  if (!formId) return null;
  // This form renders itself as a full-screen, high z-index overlay. The
  // .tf-embed CSS makes this box a positioning context and pins that overlay
  // inside it, so the form sits in this one section instead of floating over
  // the whole page. The height gives the section a size for the (internally
  // scrolling) form; page scroll itself is kept unlocked in the effect above.
  return (
    <div className="tf-embed h-[760px] w-full">
      <div
        data-tf-live={formId}
        data-tf-on-submit={conversionSendTo ? "enquiryConversion" : undefined}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { getSettings } from "@/lib/settings";
import { saans, saansMono } from "./fonts";
import { OfferBar } from "@/components/home/OfferBar";
import { MetaPixelPageView } from "@/components/site/MetaPixelPageView";
import { getSection } from "@/lib/sections";
import { isVisible } from "@/lib/templates";

// This is a database-backed CMS: render pages per-request so content edited in
// the dashboard shows immediately, and so the build never queries the database.
export const dynamic = "force-dynamic";

// Meta (Facebook) Pixel — Events Manager › Data sources › Edgbaston College.
// Fires sitewide on every page, like the GA4 tag; the enquiry-form submit
// callback adds a Lead event on top of these PageViews.
const META_PIXEL_ID = "1372105881008436";

// Self-hosted Saans (design typeface) for text, Saans SemiMono for labels.
const geistSans = saans;
const geistMono = saansMono;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  // Admin-configured SEO values, with sensible fallbacks so the tags are never empty.
  const defaultTitle = settings.metaTitle || `${settings.siteName} — ${settings.tagline}`;
  const description = settings.metaDescription || settings.tagline;

  // Absolute base URL for share tags — social crawlers need absolute image
  // URLs. Derived from the request so it works on any domain (vercel.app or
  // the live domain) without hard-coding.
  const h = await headers();
  const host = h.get("host") ?? "edgbastoncollege.co.uk";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const baseUrl = `${proto}://${host}`;

  // Social share image (og:image) is always served (and normalised to a
  // 1200×630 WebP) by /api/og-image — the admin upload when set, otherwise the
  // home banner as a sensible default.
  const shareImage = "/api/og-image";

  const meta: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${settings.siteName}`,
    },
    description,
    openGraph: {
      title: defaultTitle,
      description,
      siteName: settings.siteName,
      type: "website",
      url: baseUrl,
      images: [{ url: shareImage, width: 1200, height: 630, alt: settings.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: [shareImage],
    },
  };

  // Browser-tab icon: the admin-uploaded favicon when set, otherwise the
  // bundled branded default (the Edgbaston gatehouse mark).
  const icon = settings.faviconUrl || "/favicon.svg";
  meta.icons = { icon, shortcut: icon, apple: icon };

  return meta;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const offer = await getSection("home", "offer-bar");

  // Inject the client's brand colours as CSS variables so the entire site
  // (and dashboard) re-themes from the database with no code changes.
  const themeStyle = {
    "--brand": settings.primaryColor,
    "--accent": settings.accentColor,
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      style={themeStyle}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        {isVisible(offer) && <OfferBar title={offer.title} message={offer.message} endDate={offer.endDate} buttonLabel={offer.buttonLabel} buttonUrl={offer.buttonUrl} bgColor={offer.bgColor} />}

        {/* Google Analytics 4 — loads only when a Measurement ID is configured. */}
        {settings.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.ga4Id}');gtag('config','AW-494533244');`}
            </Script>
          </>
        )}

        {/* Meta Pixel — base snippet, fires PageView on every page. */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* Refire PageView on client-side route changes (SPA navigations). */}
        <MetaPixelPageView />
      </body>
    </html>
  );
}

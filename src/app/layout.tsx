import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getSettings } from "@/lib/settings";
import { saans, saansMono } from "./fonts";
import { OfferBar } from "@/components/home/OfferBar";
import { getSection } from "@/lib/sections";
import { isVisible } from "@/lib/templates";

// This is a database-backed CMS: render pages per-request so content edited in
// the dashboard shows immediately, and so the build never queries the database.
export const dynamic = "force-dynamic";

// Self-hosted Saans (design typeface) for text, Saans SemiMono for labels.
const geistSans = saans;
const geistMono = saansMono;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  // Admin-configured SEO values, with sensible fallbacks so the tags are never empty.
  const defaultTitle = settings.metaTitle || `${settings.siteName} — ${settings.tagline}`;
  const description = settings.metaDescription || settings.tagline;

  const meta: Metadata = {
    title: {
      default: defaultTitle,
      template: `%s | ${settings.siteName}`,
    },
    description,
    openGraph: { title: defaultTitle, description, siteName: settings.siteName },
    twitter: { card: "summary_large_image", title: defaultTitle, description },
  };

  // Custom favicon (browser-tab icon) when one is uploaded in the admin.
  if (settings.faviconUrl) {
    meta.icons = {
      icon: settings.faviconUrl,
      shortcut: settings.faviconUrl,
      apple: settings.faviconUrl,
    };
  }

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
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.ga4Id}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/settings";

// This is a database-backed CMS: render pages per-request so content edited in
// the dashboard shows immediately, and so the build never queries the database.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings.siteName} — ${settings.tagline}`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.tagline,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

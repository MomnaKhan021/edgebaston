import localFont from "next/font/local";

// Self-hosted Saans (from the client's provided files). Exposed as
// --font-geist-sans so the existing Tailwind --font-sans token picks it up.
export const saans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    { path: "../fonts/Saans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Saans-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/Saans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Saans-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Saans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Saans-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/Saans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Saans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Saans-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/Saans-Heavy.woff2", weight: "800 900", style: "normal" },
    { path: "../fonts/Saans-HeavyItalic.woff2", weight: "800 900", style: "italic" },
  ],
});

// Saans SemiMono for the uppercase mono labels. Exposed as --font-geist-mono.
export const saansMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    { path: "../fonts/SaansSemiMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SaansSemiMono-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/SaansSemiMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/SaansSemiMono-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/SaansSemiMono-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/SaansSemiMono-SemiBoldItalic.woff2", weight: "600", style: "italic" },
  ],
});

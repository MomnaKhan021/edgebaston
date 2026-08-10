import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";

// The admin-uploaded social share image is stored as a data URI, but social
// crawlers (WhatsApp, Facebook, LinkedIn) can only fetch a real image URL — so
// we decode and serve it here. og:image points at this route when a custom
// image is set; otherwise the metadata uses the static home banner directly.
export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "/figma/hero-building.webp";

export async function GET(req: Request) {
  const { ogImageUrl } = await getSettings();

  // A plain path or external URL: just redirect to it.
  if (ogImageUrl && !ogImageUrl.startsWith("data:")) {
    return NextResponse.redirect(new URL(ogImageUrl, req.url));
  }

  // A data URI: decode "data:<mime>;base64,<payload>" and stream the bytes.
  const match = ogImageUrl.match(/^data:([^;]+);base64,([\s\S]*)$/);
  if (match) {
    const [, mime, b64] = match;
    const body = Buffer.from(b64, "base64");
    return new NextResponse(body, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=300, must-revalidate",
      },
    });
  }

  // Nothing usable stored → fall back to the static home banner.
  return NextResponse.redirect(new URL(DEFAULT_IMAGE, req.url));
}

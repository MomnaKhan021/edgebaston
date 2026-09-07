import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";

// Serves the social share image (og:image) as a real, crawler-fetchable image.
// The admin upload is stored as a data URI (crawlers can't read those), and the
// default banner is a large static file — so we always normalise here to a
// 1200×630 image kept well under WhatsApp's ~300KB preview limit.
//
// Output is PNG. It's universally rendered by Facebook, WhatsApp, LinkedIn,
// Twitter, Slack and iMessage (WebP is not — WhatsApp/LinkedIn often show no
// preview), and unlike JPEG it can't crash sharp on transparent uploads (the
// admin image is a PNG). sharp is imported lazily inside the handler so a slow
// native-module load at cold start can't take the whole route down.
export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "/figma/hero-building.webp";

async function toShareImage(buf: Buffer): Promise<Buffer> {
  const sharp = (await import("sharp")).default;
  return sharp(buf)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    // palette PNG keeps the file small (line-art shrinks to a few KB; a photo
    // stays well under WhatsApp's ~300KB preview limit) while remaining a
    // universally-rendered PNG.
    .png({ palette: true, quality: 80, effort: 7 })
    .toBuffer();
}

function serve(buf: Buffer): NextResponse {
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}

export async function GET(req: Request) {
  try {
    const { ogImageUrl } = await getSettings();

    // Custom upload stored as a data URI → decode and normalise.
    const m = ogImageUrl.match(/^data:([^;]+);base64,([\s\S]*)$/);
    if (m) return serve(await toShareImage(Buffer.from(m[2], "base64")));

    // Custom value that's a plain path or external URL → just redirect to it.
    if (ogImageUrl) return NextResponse.redirect(new URL(ogImageUrl, req.url));

    // Nothing uploaded → the home banner, compressed to a share-friendly size.
    const res = await fetch(new URL(DEFAULT_IMAGE, req.url));
    const bytes = Buffer.from(await res.arrayBuffer());
    return serve(await toShareImage(bytes));
  } catch {
    // Last-resort fallback: redirect to the raw default asset.
    return NextResponse.redirect(new URL(DEFAULT_IMAGE, req.url));
  }
}

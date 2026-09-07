import { NextResponse } from "next/server";
import sharp from "sharp";
import { getSettings } from "@/lib/settings";

// Serves the social share image (og:image) as a real, crawler-fetchable image.
// The admin upload is stored as a data URI (crawlers can't read those), and the
// default banner is a large static file — so we always normalise here to a
// 1200×630 JPEG kept well under WhatsApp's ~300KB preview limit.
//
// JPEG (not WebP): Facebook renders WebP og:images, but WhatsApp and LinkedIn
// frequently do not — they show no preview at all. JPEG is supported by every
// platform, so we serve that for maximum compatibility.
export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "/figma/hero-building.webp";

async function toShareImage(buf: Buffer): Promise<Buffer> {
  return sharp(buf)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toBuffer();
}

function serve(buf: Buffer): NextResponse {
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}

export async function GET(req: Request) {
  const { ogImageUrl } = await getSettings();

  try {
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

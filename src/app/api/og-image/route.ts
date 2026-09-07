import { NextResponse } from "next/server";
import sharp from "sharp";
import { getSettings } from "@/lib/settings";

// Serves the social share image (og:image) as a real, crawler-fetchable image.
// The admin upload is stored as a data URI (crawlers can't read those), and the
// default banner is a large static file — so we always normalise here to a
// 1200×630 image kept well under WhatsApp's ~300KB preview limit.
//
// Format is JPEG when possible (WhatsApp/LinkedIn don't reliably render WebP
// og:images), with a WebP fallback: on Vercel's sharp build, encoding some
// uploaded images to JPEG crashes natively (a segfault that bypasses JS
// try/catch and 500s the whole route), so we flatten away any alpha first and,
// if JPEG encoding still fails, fall back to WebP — which never crashes.
export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "/figma/hero-building.webp";

async function toShareImage(buf: Buffer): Promise<{ body: Buffer; type: string }> {
  // Flatten onto the brand navy so images with transparency (the usual cause
  // of the JPEG-encode crash) become opaque before encoding.
  const base = sharp(buf)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .flatten({ background: "#0e2f49" });
  try {
    const body = await base.clone().jpeg({ quality: 82 }).toBuffer();
    return { body, type: "image/jpeg" };
  } catch {
    const body = await base.webp({ quality: 80 }).toBuffer();
    return { body, type: "image/webp" };
  }
}

function serve({ body, type }: { body: Buffer; type: string }): NextResponse {
  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": type,
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

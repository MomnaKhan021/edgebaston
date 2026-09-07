import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";

// Serves the social share image (og:image) as a real, crawler-fetchable image.
// The admin upload is stored as a data URI, which crawlers can't read — so this
// route's job is to hand that same image back at a real URL.
//
// No image processing: we serve the uploaded bytes as-is. The admin uploads a
// share-ready PNG/JPG (the field recommends 1200×630), and every social
// platform renders PNG/JPG. Avoiding sharp here is deliberate — re-encoding on
// Vercel's sharp build was unreliable (native crashes / cold-start failures
// that 500'd the route), and it isn't needed to make the image crawlable.
export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "/figma/hero-building.webp";

export async function GET(req: Request) {
  try {
    const { ogImageUrl } = await getSettings();

    // Uploaded image stored as a data URI → decode and serve as a real image.
    const m = ogImageUrl.match(/^data:([^;]+);base64,([\s\S]*)$/);
    if (m) {
      return new NextResponse(new Uint8Array(Buffer.from(m[2], "base64")), {
        headers: {
          "Content-Type": m[1] || "image/png",
          "Cache-Control": "public, max-age=300, must-revalidate",
        },
      });
    }

    // Custom value that's a plain path or external URL → redirect to it.
    if (ogImageUrl) return NextResponse.redirect(new URL(ogImageUrl, req.url));

    // Nothing uploaded → the default banner asset.
    return NextResponse.redirect(new URL(DEFAULT_IMAGE, req.url));
  } catch {
    return NextResponse.redirect(new URL(DEFAULT_IMAGE, req.url));
  }
}

import sharp from "sharp";

const DATA_URI_RE = /^data:image\/([a-z0-9.+-]+);base64,(.+)$/i;

/**
 * Admin uploads store images inline as base64 data URIs. Uncompressed photos
 * can be many megabytes each, which bloats the HTML of any page that renders
 * them. This resizes + re-encodes oversized data URIs to WebP (~100KB).
 */
export async function compressDataUri(uri: string, width = 1600): Promise<string> {
  const m = uri?.match?.(DATA_URI_RE);
  if (!m) return uri;
  const buf = Buffer.from(m[2], "base64");
  if (buf.length < 150_000) return uri; // already small enough
  try {
    const out = await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
    // Never return something bigger than what we started with.
    if (out.length >= buf.length) return uri;
    return `data:image/webp;base64,${out.toString("base64")}`;
  } catch {
    return uri;
  }
}

/** Compress every oversized inline data-URI image inside an HTML string. */
export async function compressInlineImages(html: string): Promise<string> {
  if (!html || !html.includes("data:image/")) return html;
  const re = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+/gi;
  const matches = [...new Set(html.match(re) ?? [])];
  for (const uri of matches) {
    const small = await compressDataUri(uri, 1400);
    if (small !== uri) html = html.split(uri).join(small);
  }
  return html;
}

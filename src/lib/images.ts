const DATA_URI_RE = /^data:image\/([a-z0-9.+-]+);base64,(.+)$/i;

/**
 * Admin uploads store images inline as base64 data URIs. Uncompressed photos
 * can be many megabytes each, which bloats the HTML of any page that renders
 * them. This resizes + re-encodes oversized data URIs to WebP (~100KB).
 *
 * sharp is imported lazily inside the try so that if the native module fails to
 * load or crashes (it has been flaky on Vercel), compression is simply skipped
 * and the original image is kept — the caller's save must never fail because of
 * image compression. A static top-level `import sharp` would instead crash the
 * whole server action (e.g. saveSettings) before it could write to the DB,
 * which silently dropped admin saves.
 */
export async function compressDataUri(uri: string, width = 1600): Promise<string> {
  const m = uri?.match?.(DATA_URI_RE);
  if (!m) return uri;
  const buf = Buffer.from(m[2], "base64");
  if (buf.length < 150_000) return uri; // already small enough
  try {
    const sharp = (await import("sharp")).default;
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

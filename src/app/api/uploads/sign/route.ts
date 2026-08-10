import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabaseAdmin, storageConfigured, MEDIA_BUCKET, SUPABASE_URL } from "@/lib/supabaseStorage";

export const dynamic = "force-dynamic";

// Allowed upload kinds → accepted MIME types.
const ALLOWED: Record<string, string[]> = {
  video: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
  pdf: ["application/pdf"],
  image: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"],
};
const EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/quicktime": "mov",
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/**
 * Mints a one-time signed upload URL so the browser can upload a media file
 * directly to Supabase Storage (bypassing the platform request-size limit).
 * Admin session required. Returns the token/path plus the eventual public URL.
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!storageConfigured()) {
    return NextResponse.json(
      { error: "File uploads aren't set up yet — add the Supabase Storage env vars." },
      { status: 501 },
    );
  }

  let body: { kind?: string; type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const kind = String(body.kind || "");
  const type = String(body.type || "");
  const allowed = ALLOWED[kind];
  if (!allowed || !allowed.includes(type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 415 });
  }

  const ext = EXT[type] || "bin";
  const path = `${kind}/${crypto.randomUUID()}.${ext}`;

  const supabase = supabaseAdmin()!;
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Could not create upload URL." }, { status: 500 });
  }
  const { data: pub } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(data.path);

  return NextResponse.json({
    bucket: MEDIA_BUCKET,
    path: data.path,
    token: data.token,
    publicUrl: pub.publicUrl,
    supabaseUrl: SUPABASE_URL,
  });
}

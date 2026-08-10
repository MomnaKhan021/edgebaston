import { createClient } from "@supabase/supabase-js";

export type UploadKind = "video" | "pdf" | "image";

const PUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const MEDIA_BUCKET = "media";

/** True when the browser has the public config needed to upload. */
export function uploadsEnabled(): boolean {
  return Boolean(PUBLIC_URL && ANON_KEY);
}

/**
 * Upload a media file to Supabase Storage and return its public URL.
 * Flow: ask our server for a signed upload URL (admin-gated), then upload the
 * bytes straight to Supabase from the browser — so even large videos aren't
 * limited by the serverless request-body size.
 */
export async function uploadMedia(kind: UploadKind, file: File): Promise<string> {
  const res = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind, type: file.type }),
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(j.error || `Upload failed (${res.status}).`);
  }
  const { path, token, publicUrl, supabaseUrl } = (await res.json()) as {
    path: string;
    token: string;
    publicUrl: string;
    supabaseUrl: string;
  };

  const supabase = createClient(supabaseUrl || PUBLIC_URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .uploadToSignedUrl(path, token, file, { contentType: file.type });
  if (error) throw new Error(error.message);

  return publicUrl;
}

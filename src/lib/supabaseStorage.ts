import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase Storage access for admin media uploads (video / PDF).
 * Files live in a public bucket so their URLs can be embedded directly in page
 * content — the database only ever stores the resulting URL, never the bytes.
 *
 * Requires these env vars (added in the Supabase + Vercel dashboards):
 *   NEXT_PUBLIC_SUPABASE_URL        — https://<project-ref>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY   — public anon key (used by the browser)
 *   SUPABASE_SERVICE_ROLE_KEY       — server-only key (mints signed uploads)
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
export const MEDIA_BUCKET = "media";

/** True when the server has what it needs to mint signed upload URLs. */
export function storageConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

/** Admin storage client (service role), or null when not configured. */
export function supabaseAdmin() {
  if (!storageConfigured()) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
}

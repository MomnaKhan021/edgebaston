import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const COOKIE_NAME = "eb_session";
const SESSION_DAYS = 7;

function getSecretKey() {
  const secret =
    process.env.SESSION_SECRET ||
    "dev-secret-change-me-in-production-please-32chars-min";
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  email: string;
  expiresAt: string;
};

/**
 * Admin accounts allowed to sign in. All share one password (ADMIN_PASSWORD).
 * The list is: built-in defaults below, plus ADMIN_EMAIL, plus any comma-
 * separated addresses in ADMIN_EMAILS — so more admins can be added later from
 * the Vercel env without a code change.
 */
function allowedAdminEmails(): Set<string> {
  const defaults = [
    "admin@edgebaston.edu",
    "momnadev@convertt.co",
    "support@convertt.co",
    "owais@rhokea.com",
  ];
  const fromEnv = [process.env.ADMIN_EMAIL || "", ...(process.env.ADMIN_EMAILS || "").split(",")];
  return new Set(
    [...defaults, ...fromEnv].map((e) => e.trim().toLowerCase()).filter(Boolean),
  );
}

/** The built-in admin emails (from env), for display in Admin → Users. */
export function builtInAdminEmails(): string[] {
  return [...allowedAdminEmails()].sort();
}

/**
 * Verify submitted credentials. Two sources, checked in this order:
 *   1. Built-in env admins (ADMIN_EMAIL/ADMIN_EMAILS + ADMIN_PASSWORD). These
 *      need no database, so they always work — even if the DB is down or the
 *      AdminUser table doesn't exist yet — guaranteeing no one is locked out.
 *   2. Dashboard users added via Admin → Users (stored with a scrypt hash).
 * The DB check is fail-soft: any DB error falls through to "invalid" rather
 * than breaking login for everyone.
 */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const normEmail = email.trim().toLowerCase();

  const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";
  if (allowedAdminEmails().has(normEmail) && password === adminPassword) {
    return true;
  }

  try {
    const user = await db.adminUser.findUnique({ where: { email: normEmail } });
    if (user) return await verifyPassword(password, user.passwordHash);
  } catch {
    // DB unavailable / table missing — env admins above still work.
  }
  return false;
}

/** Create a signed session JWT and store it in an httpOnly cookie. */
export async function createSession(email: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const token = await new SignJWT({ email, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

/** Read and verify the current session. Returns null when not signed in. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME };

import "server-only";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

// Password hashing with Node's built-in scrypt — no external dependency. Hashes
// are stored as "salt:hash" (both hex). scrypt is deliberately slow/memory-hard,
// so a leaked hash can't be brute-forced cheaply.
const scryptAsync = promisify(scrypt);
const KEY_LEN = 64;

/** Hash a plaintext password for storage. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, KEY_LEN)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

/** Check a plaintext password against a stored "salt:hash" value. */
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [salt, key] = (stored || "").split(":");
  if (!salt || !key) return false;
  const keyBuf = Buffer.from(key, "hex");
  const derived = (await scryptAsync(password, salt, KEY_LEN)) as Buffer;
  // Constant-time compare; timingSafeEqual throws if lengths differ.
  return keyBuf.length === derived.length && timingSafeEqual(keyBuf, derived);
}

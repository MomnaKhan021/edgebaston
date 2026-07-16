import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

/**
 * Ensures the request is authenticated. Redirects to the login page otherwise.
 * Call this at the top of every admin server component / server action.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

import { db } from "@/lib/db";

// Temporary diagnostic — reports DB env-var presence + connection status
// WITHOUT leaking any secret values. Remove once the DB is confirmed healthy.
export const dynamic = "force-dynamic";

export async function GET() {
  const candidateVars = [
    "DATABASE_URL",
    "DIRECT_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "DATABASE_URL_UNPOOLED",
    "POSTGRES_URL_NO_SSL",
    "PGHOST",
  ];
  const presentDbEnvVars = candidateVars.filter((k) => Boolean(process.env[k]));

  // Show the host of DATABASE_URL only (no user/password), to spot wrong hosts.
  let dbHost: string | null = null;
  try {
    const u = process.env.DATABASE_URL;
    if (u) dbHost = new URL(u).host;
  } catch {
    dbHost = "unparseable";
  }

  let dbConnect = false;
  let courseCount: number | null = null;
  let dbError: string | null = null;
  try {
    await db.$queryRawUnsafe("SELECT 1");
    dbConnect = true;
    courseCount = await db.course.count();
  } catch (e) {
    dbError = (e instanceof Error ? e.message : String(e))
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(" | ");
  }

  return Response.json(
    {
      ok: dbConnect && courseCount !== null,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      dbHost,
      presentDbEnvVars,
      dbConnect,
      courseCount,
      dbError,
    },
    { headers: { "cache-control": "no-store" } },
  );
}

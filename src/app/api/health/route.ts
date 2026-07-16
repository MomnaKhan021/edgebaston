import { db } from "@/lib/db";

// Temporary diagnostic endpoint. Reports DB configuration/health WITHOUT
// leaking any secret values (only presence of variables). Safe to remove
// once the deployment is confirmed healthy.
export const dynamic = "force-dynamic";

export async function GET() {
  const candidateVars = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "DATABASE_URL_UNPOOLED",
    "POSTGRES_URL_NO_SSL",
    "PGHOST",
  ];
  const presentDbEnvVars = candidateVars.filter((k) =>
    Boolean(process.env[k]),
  );

  let dbConnect = false;
  let siteSettingTableExists: unknown = null;
  let dbError: string | null = null;

  try {
    await db.$queryRawUnsafe("SELECT 1");
    dbConnect = true;
    const rows = (await db.$queryRawUnsafe(
      `SELECT to_regclass('public."SiteSetting"') AS t`,
    )) as { t: string | null }[];
    siteSettingTableExists = rows?.[0]?.t ?? null;
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  return Response.json(
    {
      ok: dbConnect && Boolean(siteSettingTableExists),
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      presentDbEnvVars,
      dbConnect,
      siteSettingTableExists,
      dbError,
      nodeEnv: process.env.NODE_ENV,
    },
    { headers: { "cache-control": "no-store" } },
  );
}

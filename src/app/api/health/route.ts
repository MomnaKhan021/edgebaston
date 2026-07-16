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
  let tables: string[] = [];
  let courseCount: number | null = null;
  let dbError: string | null = null;

  try {
    await db.$queryRawUnsafe("SELECT 1");
    dbConnect = true;

    const rows = (await db.$queryRawUnsafe(
      `SELECT table_name::text AS name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY name`,
    )) as { name: string }[];
    tables = rows.map((r) => r.name);

    try {
      courseCount = await db.course.count();
    } catch (e) {
      dbError = `models: ${e instanceof Error ? e.message : String(e)}`;
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  return Response.json(
    {
      ok: dbConnect && courseCount !== null,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      presentDbEnvVars,
      dbConnect,
      tables,
      courseCount,
      dbError,
      nodeEnv: process.env.NODE_ENV,
    },
    { headers: { "cache-control": "no-store" } },
  );
}

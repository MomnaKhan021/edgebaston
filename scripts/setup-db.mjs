// Runs during the build. If a Postgres connection is configured, it syncs the
// schema (creates tables) and seeds demo content (idempotently). If no database
// is set, it skips gracefully so `next build` can still run.
//
// For the schema push + seed we use the DIRECT (non-pooled) connection — on
// Supabase that's DIRECT_URL (port 5432). DDL/migrations over the pooled
// Supavisor/PgBouncer connection (port 6543) are unreliable. The running app
// still uses the pooled DATABASE_URL at runtime.
import { execSync } from "node:child_process";

const directUrl =
  process.env.DIRECT_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  "";

if (!/^postgres(ql)?:\/\//.test(directUrl)) {
  console.log(
    "[setup-db] No Postgres connection found — skipping schema sync & seed.",
  );
  process.exit(0);
}

// Point both url and directUrl at the direct connection for CLI/seed work.
const childEnv = { ...process.env, DATABASE_URL: directUrl, DIRECT_URL: directUrl };

try {
  console.log("[setup-db] Syncing schema to Supabase (prisma db push)…");
  execSync("prisma db push --skip-generate --accept-data-loss", {
    stdio: "inherit",
    env: childEnv,
  });

  console.log("[setup-db] Seeding (idempotent)…");
  execSync("tsx prisma/seed.ts", { stdio: "inherit", env: childEnv });

  console.log("[setup-db] Done.");
} catch (err) {
  // Do NOT fail the build if the DB is unreachable/misconfigured — let the
  // app deploy (static pages + diagnostics still work) so the connection can
  // be fixed via env vars and a redeploy. DB-backed pages will error until then.
  console.error(
    "[setup-db] WARNING: schema sync/seed failed — deploying anyway.",
    err?.message ?? err,
  );
  process.exit(0);
}

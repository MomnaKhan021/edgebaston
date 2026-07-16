// Runs during the build. If a Postgres connection is configured, it syncs the
// schema (creates tables) and seeds demo content (idempotently). If no database
// is set, it skips gracefully so `next build` can still run.
//
// For the schema push we prefer a DIRECT (unpooled) connection — Neon/Vercel
// expose one as POSTGRES_URL_NON_POOLING / DATABASE_URL_UNPOOLED — because
// DDL over a PgBouncer pooled connection can be unreliable. The app itself
// still uses the pooled DATABASE_URL at runtime.
import { execSync } from "node:child_process";

const pushUrl =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  "";

if (!/^postgres(ql)?:\/\//.test(pushUrl)) {
  console.log(
    "[setup-db] No Postgres connection found — skipping schema sync & seed.",
  );
  process.exit(0);
}

const childEnv = { ...process.env, DATABASE_URL: pushUrl };

try {
  console.log("[setup-db] Syncing schema (prisma db push)…");
  execSync("prisma db push --skip-generate --accept-data-loss", {
    stdio: "inherit",
    env: childEnv,
  });

  console.log("[setup-db] Seeding (idempotent)…");
  execSync("tsx prisma/seed.ts", { stdio: "inherit", env: childEnv });

  console.log("[setup-db] Done.");
} catch (err) {
  console.error("[setup-db] Failed:", err?.message ?? err);
  process.exit(1);
}

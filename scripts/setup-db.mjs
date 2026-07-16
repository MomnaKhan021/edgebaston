// Runs during the build. If a Postgres DATABASE_URL is configured, it syncs
// the schema and seeds demo content (idempotently). If no database is set,
// it skips gracefully so `next build` can still run (e.g. CI type-checks).
import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL ?? "";

if (!/^postgres(ql)?:\/\//.test(url)) {
  console.log(
    "[setup-db] No Postgres DATABASE_URL found — skipping schema sync & seed.",
  );
  process.exit(0);
}

try {
  console.log("[setup-db] Syncing schema (prisma db push)…");
  execSync("prisma db push --skip-generate --accept-data-loss", {
    stdio: "inherit",
  });

  console.log("[setup-db] Seeding (idempotent)…");
  execSync("tsx prisma/seed.ts", { stdio: "inherit" });

  console.log("[setup-db] Done.");
} catch (err) {
  console.error("[setup-db] Failed:", err?.message ?? err);
  process.exit(1);
}

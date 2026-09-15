/**
 * Runs src/lib/db/schema.sql against DATABASE_URL. No migration-history
 * tracking here on purpose — every statement is `CREATE TABLE IF NOT
 * EXISTS`, so this is safe to re-run any time you add a new table to
 * schema.sql. Run with `npm run db:migrate`.
 */
import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set — add it to .env.local first.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const schemaPath = join(process.cwd(), "src/lib/db/schema.sql");
  const raw = readFileSync(schemaPath, "utf-8");

  // Strip comments (both full-line and trailing) before splitting on
  // semicolons — a `;` or `--` inside a comment must never affect
  // statement boundaries. Safe for this schema: no string literal here
  // contains `--`.
  const withoutComments = raw
    .split("\n")
    .map((line) => line.replace(/--.*$/, ""))
    .join("\n");

  const statements = withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Running ${statements.length} statements against Neon…\n`);

  for (const statement of statements) {
    const label = statement.split("\n")[0].slice(0, 60);
    try {
      await sql.query(statement);
      console.log(`✓ ${label}`);
    } catch (err) {
      console.error(`✗ ${label}`);
      throw err;
    }
  }

  console.log("\nDone. Run `npm run db:seed` next to create demo portal accounts.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

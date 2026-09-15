import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

/**
 * Returns a raw SQL client — a tagged-template function, e.g.
 * `await db\`SELECT * FROM users WHERE email = ${email}\``  — or null if
 * DATABASE_URL isn't configured yet. Values interpolated into the
 * template are automatically parameterized (safe from SQL injection).
 *
 * Callers should fall back to sample data (see lib/sample-data.ts) when
 * this returns null, so the site stays fully functional in local preview
 * before Neon is wired up.
 */
export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

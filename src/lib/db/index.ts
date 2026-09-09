import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

/**
 * Returns the Drizzle client, or null if DATABASE_URL isn't configured
 * yet. Callers should fall back to sample data (see lib/sample-data.ts)
 * when this returns null, so the site stays fully functional in local
 * preview before Neon is wired up.
 */
export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!db) {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
  }
  return db;
}

export { schema };

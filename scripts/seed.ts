/**
 * Seeds one demo account per role. Run with `npm run db:seed` after
 * `npm run db:migrate`, once DATABASE_URL is set.
 *
 * Demo logins (change these passwords immediately in production):
 *   student  — student@newlifebaptistchurch.org  / password123
 *   parent   — parent@newlifebaptistchurch.org   / password123
 *   staff    — staff@newlifebaptistchurch.org    / password123
 *   admin    — admin@newlifebaptistchurch.org    / password123
 */
import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set — add it to .env.local first.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const passwordHash = await bcrypt.hash("password123", 10);

  const demoUsers = [
    { name: "David Chinedu", email: "student@newlifebaptistchurch.org", role: "student" as const },
    { name: "Mrs. Ngozi Chinedu", email: "parent@newlifebaptistchurch.org", role: "parent" as const },
    { name: "Mr. Emeka Wosu", email: "staff@newlifebaptistchurch.org", role: "staff" as const },
    { name: "Admin", email: "admin@newlifebaptistchurch.org", role: "admin" as const },
  ];

  for (const u of demoUsers) {
    const rows = await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${u.name}, ${u.email}, ${passwordHash}, ${u.role})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    const created = rows[0] as { id: number } | undefined;

    if (created && u.role === "student") {
      await sql`
        INSERT INTO student_profiles (user_id, grade_level, admission_number)
        VALUES (${created.id}, 'Primary 5', 'NBCS-0001')
      `;
    }
    console.log(created ? `Created ${u.role}: ${u.email}` : `Skipped ${u.role} (already exists): ${u.email}`);
  }

  console.log("\nDone. All demo accounts use the password: password123");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

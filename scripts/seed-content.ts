/**
 * Seeds sermons, events, and portal demo data (classes, assignments,
 * results, attendance, messages) — everything `npm run db:seed` doesn't
 * already cover. Run this AFTER `npm run db:seed`, since it looks up the
 * four demo accounts by email rather than creating them.
 *
 * Safe to run once; it skips entirely if sermons already exist, rather
 * than risking duplicate rows on a second run.
 */
import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

import { neon } from "@neondatabase/serverless";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set — add it to .env.local first.");
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);

  const existing = (await sql`SELECT COUNT(*) AS count FROM sermons`) as { count: string }[];
  if (Number(existing[0]?.count ?? 0) > 0) {
    console.log("Content already seeded (sermons table isn't empty) — skipping.");
    console.log("To reseed, delete the relevant rows first.");
    return;
  }

  console.log("Seeding sermons…");
  await sql`
    INSERT INTO sermons (slug, title, speaker, description, duration_seconds, published_at) VALUES
    ('the-power-of-prayer', 'The Power of Prayer', 'Pastor Emmanuel Briggs',
      'Discover the transformative power of prayer and how it can change your life, your family, and your community. This message walks through what it looks like to bring the whole of ordinary life honestly before God.',
      2616, '2026-08-30 09:00:00+01'),
    ('walking-in-faith', 'Walking in Faith', 'Pastor Emmanuel Briggs',
      'Faith isn''t the absence of doubt — it''s choosing to take the next step anyway. A message on trusting God when the way forward isn''t clear.',
      2292, '2026-08-23 09:00:00+01'),
    ('grace-changes-everything', 'Grace Changes Everything', 'Pastor Emmanuel Briggs',
      'None of us earn our way to God — and that''s the whole point. A look at what changes when grace, not performance, becomes the foundation.',
      2467, '2026-08-16 09:00:00+01')
  `;

  console.log("Seeding events…");
  await sql`
    INSERT INTO events (site, slug, title, description, location, category, starts_at, ends_at, registration_required) VALUES
    ('church', 'easter-sunday-service', 'Easter Sunday Service',
      'A morning of worship celebrating the resurrection — both services include full kids'' programming.',
      'Main Sanctuary', 'Service', '2027-04-04 09:00:00+01', '2027-04-04 11:00:00+01', true),
    ('church', 'womens-conference', 'Women''s Conference',
      'A day of teaching, worship, and connection for women of every age and season of life.',
      'Newlife Fellowship Hall', 'Conference', '2026-11-14 09:00:00+01', '2026-11-14 16:00:00+01', true),
    ('church', 'youth-retreat', 'Youth Retreat',
      'A weekend away for grades 6–12 — games, worship, and small group discussion in the mountains.',
      'Newlife Retreat Camp', 'Retreat', '2026-11-21 09:00:00+01', '2026-11-21 17:00:00+01', true),
    ('school', 'open-house-campus-tour', 'Open House & Campus Tour',
      'Meet our faculty, tour every classroom, and get your admissions questions answered in person.',
      'Main Campus', 'Admissions', '2026-10-10 09:00:00+01', '2026-10-10 12:00:00+01', true),
    ('school', 'spirit-day', 'Spirit Day',
      'A school-wide day of games, team colors, and friendly house competition.',
      'School Field', 'Student Life', '2026-10-17 08:00:00+01', '2026-10-17 15:00:00+01', false),
    ('school', 'arts-festival', 'Arts Festival',
      'Student art, music, and drama on display for the whole Newlife community.',
      'Arts Centre', 'Arts', '2026-11-07 10:00:00+01', '2026-11-07 15:00:00+01', false)
  `;

  console.log("Linking portal demo data…");
  const users = (await sql`
    SELECT id, email, role FROM users WHERE email IN (
      'student@newlifebaptistchurch.org',
      'parent@newlifebaptistchurch.org',
      'staff@newlifebaptistchurch.org'
    )
  `) as { id: number; email: string; role: string }[];

  const student = users.find((u) => u.role === "student");
  const parent = users.find((u) => u.role === "parent");
  const staff = users.find((u) => u.role === "staff");

  if (!student || !parent || !staff) {
    console.log("Demo accounts not found — run `npm run db:seed` first. Skipping portal content.");
    return;
  }

  // Link David to his parent (his profile was created by seed.ts already).
  await sql`UPDATE student_profiles SET parent_id = ${parent.id} WHERE user_id = ${student.id}`;

  // A second child for the parent dashboard to show more than one kid.
  const graceEmail = "grace.demo@newlifebaptistchurch.org";
  const graceRows = (await sql`
    SELECT id FROM users WHERE email = ${graceEmail}
  `) as { id: number }[];
  let graceUserId = graceRows[0]?.id;
  if (!graceUserId) {
    const inserted = (await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ('Grace Chinedu', ${graceEmail}, 'no-login-not-a-real-account', 'student')
      RETURNING id
    `) as { id: number }[];
    graceUserId = inserted[0].id;
  }
  // Grace has no real login (no usable password) — she exists purely so
  // the parent dashboard has a second, realistic child to show.
  await sql`
    INSERT INTO student_profiles (user_id, parent_id, grade_level, admission_number)
    SELECT ${graceUserId}, ${parent.id}, 'Primary 3', 'NBCS-0002'
    WHERE NOT EXISTS (SELECT 1 FROM student_profiles WHERE user_id = ${graceUserId})
  `;

  const davidProfile = (await sql`SELECT id FROM student_profiles WHERE user_id = ${student.id}`) as { id: number }[];
  const graceProfile = (await sql`SELECT id FROM student_profiles WHERE user_id = ${graceUserId}`) as { id: number }[];
  const davidProfileId = davidProfile[0].id;
  const graceProfileId = graceProfile[0].id;

  const classRows = (await sql`
    INSERT INTO classes (name, grade_level, teacher_id) VALUES
    ('Primary 5 — Mathematics', 'Primary 5', ${staff.id}),
    ('Primary 5 — English', 'Primary 5', ${staff.id}),
    ('Primary 6 — Science', 'Primary 6', ${staff.id})
    RETURNING id, name
  `) as { id: number; name: string }[];
  const mathClass = classRows.find((c) => c.name.includes("Mathematics"))!;
  const englishClass = classRows.find((c) => c.name.includes("English"))!;

  await sql`
    INSERT INTO assignments (class_id, title, due_at) VALUES
    (${mathClass.id}, 'Fractions worksheet', now() + interval '2 days'),
    (${englishClass.id}, 'Book report', now() + interval '5 days')
  `;

  await sql`
    INSERT INTO results (student_id, subject, term, score, max_score) VALUES
    (${davidProfileId}, 'Mathematics', 'Term 2', 88, 100),
    (${davidProfileId}, 'English', 'Term 2', 76, 100),
    (${davidProfileId}, 'Science', 'Term 2', 91, 100),
    (${graceProfileId}, 'Mathematics', 'Term 2', 90, 100)
  `;

  // 20 school days of attendance for David (19 present), 20 for Grace (20 present).
  for (let i = 0; i < 20; i++) {
    await sql`
      INSERT INTO attendance_records (student_id, date, present)
      VALUES (${davidProfileId}, now() - make_interval(days => ${i}), ${i !== 3})
    `;
    await sql`
      INSERT INTO attendance_records (student_id, date, present)
      VALUES (${graceProfileId}, now() - make_interval(days => ${i}), true)
    `;
  }

  await sql`
    INSERT INTO portal_messages (from_user_id, to_user_id, subject, body) VALUES
    (${staff.id}, ${student.id}, 'Great work!', 'Great work on your project this week!'),
    (NULL, ${student.id}, 'Reminder', 'Reminder: Parent-Teacher meeting on Friday.')
  `;

  console.log("\nDone. Sermons, events, and portal demo data are seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

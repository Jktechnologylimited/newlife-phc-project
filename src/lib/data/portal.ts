import { getDb } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import {
  studentDashboard as sampleStudent,
  parentDashboard as sampleParent,
  staffDashboard as sampleStaff,
  adminDashboard as sampleAdmin,
} from "@/lib/sample-data";

// No dedicated class-schedule table exists yet (see README roadmap), so
// "today's schedule" is synthesized as sequential slots around whatever
// classes are real. Everything else here is a genuine query.
const SLOTS = ["8:00 – 9:00 AM", "9:30 – 10:30 AM", "11:00 AM – 12:00 PM", "12:30 – 1:30 PM", "2:00 – 3:00 PM"];
function withSlots(subjects: string[]) {
  return subjects.map((subject, i) => ({ subject, time: SLOTS[i % SLOTS.length] }));
}

async function attendancePercent(db: NonNullable<ReturnType<typeof getDb>>, studentProfileId: number) {
  const rows = (await db`
    SELECT
      COUNT(*) FILTER (WHERE present) AS present,
      COUNT(*) AS total
    FROM attendance_records
    WHERE student_id = ${studentProfileId}
  `) as { present: string; total: string }[];
  const present = Number(rows[0]?.present ?? 0);
  const total = Number(rows[0]?.total ?? 0);
  if (total === 0) return "—";
  return `${Math.round((present / total) * 100)}%`;
}

/**
 * Every dashboard function below wraps its real queries in a try/catch
 * and falls back to sample data on ANY failure — a table that hasn't
 * been migrated yet, a dropped connection, anything. A portal dashboard
 * should never hard-crash just because the DB isn't in the exact state
 * the code expects; the error is still logged so it's easy to spot.
 */

/* ------------------------------- Student ------------------------------- */
export async function getStudentDashboard(userId: number) {
  const db = getDb();
  if (!db) return sampleStudent;

  try {
    const profileRows = (await db`
      SELECT sp.id AS "profileId", sp.grade_level AS "gradeLevel", u.name
      FROM student_profiles sp
      JOIN users u ON u.id = sp.user_id
      WHERE sp.user_id = ${userId}
    `) as { profileId: number; gradeLevel: string; name: string }[];
    const profile = profileRows[0];
    if (!profile) return sampleStudent;

    const classRows = (await db`
      SELECT name FROM classes WHERE grade_level = ${profile.gradeLevel} ORDER BY name
    `) as { name: string }[];

    const assignmentRows = (await db`
      SELECT a.title, a.due_at AS "dueAt"
      FROM assignments a
      JOIN classes c ON c.id = a.class_id
      WHERE c.grade_level = ${profile.gradeLevel}
      ORDER BY a.due_at ASC NULLS LAST
      LIMIT 5
    `) as { title: string; dueAt: string | null }[];

    const resultRows = (await db`
      SELECT subject, score, max_score AS "maxScore"
      FROM results
      WHERE student_id = ${profile.profileId}
      ORDER BY created_at DESC
      LIMIT 5
    `) as { subject: string; score: number; maxScore: number }[];

    const messageRows = (await db`
      SELECT pm.body, pm.created_at AS "createdAt", COALESCE(u.name, 'School Office') AS "fromName"
      FROM portal_messages pm
      LEFT JOIN users u ON u.id = pm.from_user_id
      WHERE pm.to_user_id = ${userId}
      ORDER BY pm.created_at DESC
      LIMIT 5
    `) as { body: string; createdAt: string; fromName: string }[];

    return {
      name: profile.name,
      gradeLevel: profile.gradeLevel,
      upcomingClasses: withSlots(classRows.map((c) => c.name)),
      pendingAssignments: assignmentRows.map((a) => ({
        title: a.title,
        due: a.dueAt ? `Due ${new Date(a.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "No due date",
      })),
      recentResults: resultRows,
      messages: messageRows.map((m) => ({ from: m.fromName, preview: m.body, time: timeAgo(new Date(m.createdAt)) })),
      attendance: await attendancePercent(db, profile.profileId),
    };
  } catch (err) {
    console.error("[getStudentDashboard] falling back to sample data. This usually means the schema is out of date — run `npm run db:migrate`.", err);
    return sampleStudent;
  }
}

/* -------------------------------- Parent -------------------------------- */
export async function getParentDashboard(userId: number) {
  const db = getDb();
  if (!db) return sampleParent;

  try {
    const parentRows = (await db`SELECT name FROM users WHERE id = ${userId}`) as { name: string }[];
    if (!parentRows[0]) return sampleParent;

    const childRows = (await db`
      SELECT sp.id AS "profileId", sp.grade_level AS "gradeLevel", u.name
      FROM student_profiles sp
      JOIN users u ON u.id = sp.user_id
      WHERE sp.parent_id = ${userId}
      ORDER BY u.name
    `) as { profileId: number; gradeLevel: string; name: string }[];

    const children = await Promise.all(
      childRows.map(async (c) => {
        const avgRows = (await db`
          SELECT AVG(score::float / NULLIF(max_score, 0)) AS avg
          FROM results
          WHERE student_id = ${c.profileId}
        `) as { avg: number | null }[];
        const avg = avgRows[0]?.avg;
        const progress = avg == null ? "No results yet" : avg >= 0.7 ? "On track" : "Needs support";
        return {
          name: c.name,
          gradeLevel: c.gradeLevel,
          progress,
          attendance: await attendancePercent(db, c.profileId),
          fees: "Not tracked yet", // no billing table yet — see README roadmap
        };
      }),
    );

    const childIds = childRows.map((c) => c.profileId);
    const recentUpdates =
      childIds.length === 0
        ? []
        : ((await db`
            SELECT r.subject, r.score, u.name AS "childName", r.created_at AS "createdAt"
            FROM results r
            JOIN student_profiles sp ON sp.id = r.student_id
            JOIN users u ON u.id = sp.user_id
            WHERE r.student_id = ANY(${childIds})
            ORDER BY r.created_at DESC
            LIMIT 5
          `) as { subject: string; score: number; childName: string; createdAt: string }[]).map((r) => ({
            text: `${r.childName.split(" ")[0]} scored ${r.score}% in ${r.subject}`,
            time: timeAgo(new Date(r.createdAt)),
          }));

    return { name: parentRows[0].name, children, recentUpdates };
  } catch (err) {
    console.error("[getParentDashboard] falling back to sample data. This usually means the schema is out of date — run `npm run db:migrate`.", err);
    return sampleParent;
  }
}

/* -------------------------------- Staff -------------------------------- */
export async function getStaffDashboard(userId: number) {
  const db = getDb();
  if (!db) return sampleStaff;

  try {
    const staffRows = (await db`SELECT name FROM users WHERE id = ${userId}`) as { name: string }[];
    if (!staffRows[0]) return sampleStaff;

    const classRows = (await db`
      SELECT name, grade_level AS "gradeLevel" FROM classes WHERE teacher_id = ${userId} ORDER BY name
    `) as { name: string; gradeLevel: string | null }[];

    const gradeLevels = [...new Set(classRows.map((c) => c.gradeLevel).filter(Boolean))] as string[];
    const countRows =
      gradeLevels.length === 0
        ? [{ count: "0" }]
        : ((await db`
            SELECT COUNT(*) AS count FROM student_profiles WHERE grade_level = ANY(${gradeLevels})
          `) as { count: string }[]);

    return {
      name: staffRows[0].name,
      myClasses: classRows.map((c) => c.name),
      studentCount: Number(countRows[0]?.count ?? 0),
      todaySchedule: withSlots(classRows.map((c) => c.name)),
    };
  } catch (err) {
    console.error("[getStaffDashboard] falling back to sample data. This usually means the schema is out of date — run `npm run db:migrate`.", err);
    return sampleStaff;
  }
}

/* -------------------------------- Admin -------------------------------- */
export async function getAdminDashboard() {
  const db = getDb();
  if (!db) return sampleAdmin;

  try {
    const [studentsRows, staffRows, classesRows, admissionsRows] = (await Promise.all([
      db`SELECT COUNT(*) AS count FROM student_profiles`,
      db`SELECT COUNT(*) AS count FROM users WHERE role = 'staff'`,
      db`SELECT COUNT(*) AS count FROM classes`,
      db`SELECT COUNT(*) AS count FROM admissions_inquiries WHERE status = 'new'`,
    ])) as { count: string }[][];

    const admissionActivity = (await db`
      SELECT parent_name AS "parentName", student_name AS "studentName", created_at AS "createdAt"
      FROM admissions_inquiries
      ORDER BY created_at DESC
      LIMIT 3
    `) as { parentName: string; studentName: string; createdAt: string }[];

    const rsvpActivity = (await db`
      SELECT er.full_name AS "fullName", e.title AS "eventTitle", er.created_at AS "createdAt"
      FROM event_registrations er
      JOIN events e ON e.id = er.event_id
      ORDER BY er.created_at DESC
      LIMIT 3
    `) as { fullName: string; eventTitle: string; createdAt: string }[];

    const recentActivity = [
      ...admissionActivity.map((a) => ({
        text: `New admissions inquiry: ${a.studentName} (from ${a.parentName})`,
        time: timeAgo(new Date(a.createdAt)),
        at: new Date(a.createdAt).getTime(),
      })),
      ...rsvpActivity.map((r) => ({
        text: `${r.fullName} registered for ${r.eventTitle}`,
        time: timeAgo(new Date(r.createdAt)),
        at: new Date(r.createdAt).getTime(),
      })),
    ]
      .sort((a, b) => b.at - a.at)
      .slice(0, 5)
      .map(({ text, time }) => ({ text, time }));

    return {
      totalStudents: Number(studentsRows[0]?.count ?? 0),
      totalStaff: Number(staffRows[0]?.count ?? 0),
      totalClasses: Number(classesRows[0]?.count ?? 0),
      pendingAdmissions: Number(admissionsRows[0]?.count ?? 0),
      recentActivity: recentActivity.length > 0 ? recentActivity : sampleAdmin.recentActivity,
    };
  } catch (err) {
    console.error("[getAdminDashboard] falling back to sample data. This usually means the schema is out of date — run `npm run db:migrate`.", err);
    return sampleAdmin;
  }
}

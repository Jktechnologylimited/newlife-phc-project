import { getDb } from "@/lib/db";
import { formatSermonDate, formatDuration, formatEventDateBadge, formatEventTime } from "@/lib/format";
import {
  sermons as sampleSermons,
  churchEvents as sampleChurchEvents,
  schoolEvents as sampleSchoolEvents,
  hymns as sampleHymns,
  bulletin as sampleBulletin,
} from "@/lib/sample-data";

export type SermonSummary = {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
};

export type EventSummary = {
  slug: string;
  date: string; // "APR 12"
  title: string;
  time: string;
  location: string;
  description: string;
};

type SermonRow = {
  slug: string;
  title: string;
  speaker: string;
  publishedAt: string;
  durationSeconds: number | null;
  description: string | null;
};

function toSermonSummary(r: SermonRow): SermonSummary {
  return {
    slug: r.slug,
    title: r.title,
    speaker: r.speaker,
    date: formatSermonDate(new Date(r.publishedAt)),
    duration: formatDuration(r.durationSeconds),
    description: r.description ?? "",
  };
}

/**
 * Every function below follows the same shape: try the real query if the
 * DB is connected, but fall back to sample data on ANY failure — not
 * just when DATABASE_URL is unset. A table that hasn't been migrated
 * yet, a dropped connection, a typo in a column name — none of these
 * should take down a page. They're logged so the real problem is still
 * visible in server logs.
 */

export async function getSermons(): Promise<SermonSummary[]> {
  const db = getDb();
  if (!db) return sampleSermons;
  try {
    const rows = (await db`
      SELECT slug, title, speaker,
        published_at AS "publishedAt",
        duration_seconds AS "durationSeconds",
        description
      FROM sermons
      ORDER BY published_at DESC
    `) as SermonRow[];
    return rows.map(toSermonSummary);
  } catch (err) {
    console.error("[getSermons] falling back to sample data:", err);
    return sampleSermons;
  }
}

export async function getSermonBySlug(slug: string): Promise<SermonSummary | null> {
  const db = getDb();
  if (!db) return sampleSermons.find((s) => s.slug === slug) ?? null;
  try {
    const rows = (await db`
      SELECT slug, title, speaker,
        published_at AS "publishedAt",
        duration_seconds AS "durationSeconds",
        description
      FROM sermons
      WHERE slug = ${slug}
    `) as SermonRow[];
    return rows[0] ? toSermonSummary(rows[0]) : null;
  } catch (err) {
    console.error("[getSermonBySlug] falling back to sample data:", err);
    return sampleSermons.find((s) => s.slug === slug) ?? null;
  }
}

type EventRow = {
  slug: string;
  title: string;
  location: string | null;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
};

function toEventSummary(r: EventRow): EventSummary {
  const starts = new Date(r.startsAt);
  const ends = r.endsAt ? new Date(r.endsAt) : null;
  return {
    slug: r.slug,
    date: formatEventDateBadge(starts),
    title: r.title,
    time: formatEventTime(starts, ends),
    location: r.location ?? "",
    description: r.description ?? "",
  };
}

export async function getEvents(site: "church" | "school"): Promise<EventSummary[]> {
  const db = getDb();
  const fallback = site === "church" ? sampleChurchEvents : sampleSchoolEvents;
  if (!db) return fallback;
  try {
    const rows = (await db`
      SELECT slug, title, location, description,
        starts_at AS "startsAt",
        ends_at AS "endsAt"
      FROM events
      WHERE site = ${site}
      ORDER BY starts_at ASC
    `) as EventRow[];
    return rows.map(toEventSummary);
  } catch (err) {
    console.error("[getEvents] falling back to sample data:", err);
    return fallback;
  }
}

export async function getEventBySlug(site: "church" | "school", slug: string): Promise<EventSummary | null> {
  const db = getDb();
  const fallback = () => (site === "church" ? sampleChurchEvents : sampleSchoolEvents).find((e) => e.slug === slug) ?? null;
  if (!db) return fallback();
  try {
    const rows = (await db`
      SELECT slug, title, location, description,
        starts_at AS "startsAt",
        ends_at AS "endsAt"
      FROM events
      WHERE site = ${site} AND slug = ${slug}
    `) as EventRow[];
    return rows[0] ? toEventSummary(rows[0]) : null;
  } catch (err) {
    console.error("[getEventBySlug] falling back to sample data:", err);
    return fallback();
  }
}

/** Looks up an event's numeric id for the RSVP form's foreign key. Null
 * when the DB isn't connected, the table doesn't exist yet, or the
 * event isn't a real DB row (e.g. still running on sample data) — the
 * RSVP still emails either way. */
export async function getEventId(site: "church" | "school", slug: string): Promise<number | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = (await db`SELECT id FROM events WHERE site = ${site} AND slug = ${slug}`) as { id: number }[];
    return rows[0]?.id ?? null;
  } catch (err) {
    console.error("[getEventId] returning null:", err);
    return null;
  }
}

/* -------------------------------- Hymns -------------------------------- */
export type Hymn = {
  slug: string;
  title: string;
  author: string | null;
  year: number | null;
  hymnNumber: string | null;
  scripture: string | null;
  verses: string[];
  chorus: string | null;
};

export async function getHymns(): Promise<Hymn[]> {
  const db = getDb();
  if (!db) return sampleHymns;
  try {
    const rows = (await db`
      SELECT slug, title, author, year,
        hymn_number AS "hymnNumber",
        scripture_reference AS "scripture",
        verses, chorus
      FROM hymns
      ORDER BY title ASC
    `) as Hymn[];
    return rows;
  } catch (err) {
    console.error("[getHymns] falling back to sample data:", err);
    return sampleHymns;
  }
}

export async function getHymnBySlug(slug: string): Promise<Hymn | null> {
  const db = getDb();
  if (!db) return sampleHymns.find((h) => h.slug === slug) ?? null;
  try {
    const rows = (await db`
      SELECT slug, title, author, year,
        hymn_number AS "hymnNumber",
        scripture_reference AS "scripture",
        verses, chorus
      FROM hymns
      WHERE slug = ${slug}
    `) as Hymn[];
    return rows[0] ?? null;
  } catch (err) {
    console.error("[getHymnBySlug] falling back to sample data:", err);
    return sampleHymns.find((h) => h.slug === slug) ?? null;
  }
}

/* ------------------------------ Bulletin ------------------------------ */
export type BulletinItem = { title: string; detail: string };

export type Bulletin = {
  serviceDate: string;
  theme: string | null;
  scripture: string | null;
  sermonTitle: string | null;
  sermonSpeaker: string | null;
  orderOfService: BulletinItem[];
  hymnSlugs: string[];
  announcements: BulletinItem[];
};

const BULLETIN_COLUMNS = `
  service_date AS "serviceDate",
  theme,
  scripture_reference AS "scripture",
  sermon_title AS "sermonTitle",
  sermon_speaker AS "sermonSpeaker",
  order_of_service AS "orderOfService",
  hymn_slugs AS "hymnSlugs",
  announcements
`;

/** The next upcoming Sunday's bulletin, or the most recent one if none
 * is scheduled ahead. */
export async function getBulletin(): Promise<Bulletin | null> {
  const db = getDb();
  if (!db) return sampleBulletin;
  try {
    const upcoming = (await db.query(
      `SELECT ${BULLETIN_COLUMNS} FROM bulletins WHERE service_date >= CURRENT_DATE ORDER BY service_date ASC LIMIT 1`,
    )) as Bulletin[];
    if (upcoming[0]) return upcoming[0];

    const past = (await db.query(`SELECT ${BULLETIN_COLUMNS} FROM bulletins ORDER BY service_date DESC LIMIT 1`)) as Bulletin[];
    return past[0] ?? null;
  } catch (err) {
    console.error("[getBulletin] falling back to sample data:", err);
    return sampleBulletin;
  }
}

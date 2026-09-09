import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const siteEnum = pgEnum("site", ["church", "school"]);

/* ------------------------------ Sermons ------------------------------ */
export const sermons = pgTable("sermons", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  speaker: text("speaker").notNull(),
  series: text("series"),
  scripture: text("scripture"),
  description: text("description"),
  videoUrl: text("video_url"),
  audioUrl: text("audio_url"),
  durationSeconds: integer("duration_seconds"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------- Events ------------------------------- */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  site: siteEnum("site").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  category: text("category"),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  capacity: integer("capacity"),
  registrationRequired: boolean("registration_required").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  attendeeCount: integer("attendee_count").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------- Staff -------------------------------- */
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  site: siteEnum("site").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  department: text("department"),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  email: text("email"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* --------------------------- Admissions leads --------------------------- */
export const admissionsInquiries = pgTable("admissions_inquiries", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  parentName: text("parent_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  studentName: text("student_name").notNull(),
  gradeLevel: text("grade_level").notNull(),
  reason: text("reason").notNull(),
  message: text("message"),
  status: text("status").notNull().default("new"), // new | contacted | touring | applied | enrolled | closed
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------ Prayer wall ------------------------------ */
export const prayerRequests = pgTable("prayer_requests", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  request: text("request").notNull(),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  isPublic: boolean("is_public").notNull().default(false),
  status: text("status").notNull().default("praying"), // praying | answered
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ----------------------------- Contact + list ----------------------------- */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  site: siteEnum("site").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------- Admin users -------------------------------- */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("staff"), // super_admin | church_admin | school_admin | staff
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

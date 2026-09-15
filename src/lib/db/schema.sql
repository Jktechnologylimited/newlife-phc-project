-- Newlife Baptist Church & School — database schema
-- Plain SQL, no ORM. Run via `npm run db:migrate`, or paste directly into
-- Neon's SQL editor. Safe to re-run (every statement is IF NOT EXISTS).

-- ------------------------------ Accounts ------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'parent', 'staff', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------ Sermons ------------------------------
CREATE TABLE IF NOT EXISTS sermons (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  series TEXT,
  scripture TEXT,
  description TEXT,
  video_url TEXT,
  audio_url TEXT,
  duration_seconds INTEGER,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------- Events -------------------------------
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  site TEXT NOT NULL CHECK (site IN ('church', 'school')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  category TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  capacity INTEGER,
  registration_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  attendee_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -------------------------------- Staff --------------------------------
CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  site TEXT NOT NULL CHECK (site IN ('church', 'school')),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------- Admissions leads ---------------------------
CREATE TABLE IF NOT EXISTS admissions_inquiries (
  id SERIAL PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_name TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  reason TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- new | contacted | touring | applied | enrolled | closed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------ Prayer wall ------------------------------
CREATE TABLE IF NOT EXISTS prayer_requests (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  request TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  is_public BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'praying', -- praying | answered
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------- Contact + list -----------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  site TEXT NOT NULL CHECK (site IN ('church', 'school')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -------------------------------- Portals --------------------------------
CREATE TABLE IF NOT EXISTS student_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  parent_id INTEGER REFERENCES users(id),
  admission_number TEXT,
  grade_level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL, -- e.g. "Primary 5 — Mathematics"
  grade_level TEXT,
  teacher_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id),
  title TEXT NOT NULL,
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id),
  subject TEXT NOT NULL,
  term TEXT,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id),
  date TIMESTAMPTZ NOT NULL,
  present BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS portal_messages (
  id SERIAL PRIMARY KEY,
  from_user_id INTEGER REFERENCES users(id),
  to_user_id INTEGER NOT NULL REFERENCES users(id),
  subject TEXT,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT,
  href TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------- Hymns -------------------------------
CREATE TABLE IF NOT EXISTS hymns (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT,
  year INTEGER,
  hymn_number TEXT,
  scripture_reference TEXT,
  verses JSONB NOT NULL DEFAULT '[]', -- array of strings, one per verse
  chorus TEXT, -- repeated between verses when present; null if none
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------ Bulletins ------------------------------
CREATE TABLE IF NOT EXISTS bulletins (
  id SERIAL PRIMARY KEY,
  service_date DATE NOT NULL UNIQUE,
  theme TEXT,
  scripture_reference TEXT,
  sermon_title TEXT,
  sermon_speaker TEXT,
  order_of_service JSONB NOT NULL DEFAULT '[]', -- array of {title, detail}
  hymn_slugs TEXT[] NOT NULL DEFAULT '{}', -- references hymns.slug, in order sung
  announcements JSONB NOT NULL DEFAULT '[]', -- array of {title, detail}
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Added after the initial bulletins table shipped — CREATE TABLE IF NOT
-- EXISTS above is a no-op on a DB that already has this table, so these
-- ADD COLUMN IF NOT EXISTS statements are what actually bring an
-- existing deployment up to date. Same pattern applies any time a column
-- is added to an existing table later.
ALTER TABLE bulletins ADD COLUMN IF NOT EXISTS pdf_url TEXT;
ALTER TABLE bulletins ADD COLUMN IF NOT EXISTS pdf_filename TEXT;

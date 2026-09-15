# Newlife Baptist Church & School

A two-in-one website for Newlife Baptist Church and Newlife Baptist
Church School, Port Harcourt — living under one domain (`/church/*` and
`/school/*`), sharing a header, footer, search, and design system while
each keeps its own accent color and nav.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 ·
Framer Motion · Neon (Postgres, plain SQL — no ORM) · Resend · Zod

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open http://localhost:3000. The site runs and looks complete even with an
empty `.env.local` — see **Demo mode** below.

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Real content storage + accounts | Create a project at [neon.tech](https://neon.tech), copy the **pooled** connection string. |
| `AUTH_SECRET` | Signing portal login sessions | Generate with `openssl rand -base64 32`. Falls back to an insecure dev-only value if unset — fine for preview, never for production. |
| `RESEND_API_KEY` | Sending real email | Create at [resend.com/api-keys](https://resend.com/api-keys). |
| `RESEND_FROM_EMAIL` | Sending real email | Must be on a domain you've verified in Resend. |
| `OFFICE_EMAIL` | Sending real email | Where admissions/contact notifications land. |
| `NEXT_PUBLIC_SITE_URL` | Metadata/links | Your production URL once deployed. |
| `BLOB_READ_WRITE_TOKEN` | Bulletin PDF uploads | Auto-provided on Vercel with Blob storage enabled. For local dev, create a token at Vercel's dashboard → Storage → Blob. Without it, the admin upload form shows a "not connected yet" message. |

### Demo mode

Every form (newsletter signup, admissions inquiry) checks whether
`RESEND_API_KEY` is set. If it isn't, the form still "succeeds" and logs
what it would have sent to the console, instead of crashing — so you can
click through the whole site today, before any secrets are configured.
The same pattern applies to the database: `getDb()` in `src/lib/db/index.ts`
returns `null` without `DATABASE_URL`, and every function in
`src/lib/data/content.ts` and `src/lib/data/portal.ts` falls back to the
sample data in `src/lib/sample-data.ts` when that happens.

### Setting up Neon

No ORM here — `src/lib/db/schema.sql` is plain SQL, and
`src/lib/db/index.ts` just exports a tagged-template query function from
`@neondatabase/serverless`. Every query in the codebase (`lib/auth/actions.ts`,
`lib/data/content.ts`, `lib/data/portal.ts`, `scripts/*.ts`) is written as
plain SQL — e.g. `` await db`SELECT * FROM users WHERE email = ${email}` ``,
with values automatically parameterized (safe from SQL injection).

```bash
npm run db:migrate        # runs src/lib/db/schema.sql against DATABASE_URL
npm run db:seed           # creates one demo login per portal role (see below)
npm run db:seed:content   # seeds sermons, events, and realistic portal data
```

`db:migrate` just runs every `CREATE TABLE IF NOT EXISTS` statement in
`schema.sql`, so it's safe to re-run any time you add a new table there —
no migration-history table or CLI to manage. To browse data without a
GUI dependency, use Neon's own SQL editor in the dashboard, or point any
Postgres client (TablePlus, pgAdmin, `psql`) at your `DATABASE_URL`.

**If you add a table to `schema.sql`, run `npm run db:migrate` again
before deploying.** Every query in `lib/data/content.ts` and
`lib/data/portal.ts` catches database errors and falls back to sample
data rather than crashing a page — so forgetting to migrate won't break
the site, but it does mean that section will quietly show placeholder
content instead of the real thing until you migrate. Check your server
logs (`console.error` lines prefixed like `[getBulletin] falling back to
sample data:`) if a page seems to be showing stale/sample content
unexpectedly.

**Content updates and caching:** pages that read from the database
(`/church`, `/church/sermons`, `/church/events`, `/church/bulletin`,
`/church/hymns`, `/school`, `/school/events`, and their detail pages)
use Next.js's Incremental Static Regeneration with a 60-second
`revalidate`. That means a change made directly in the database (e.g.
adding a sermon via `psql` or Neon's SQL editor) shows up on the live
site within about a minute — no rebuild or redeploy required. Portal
dashboard pages are always rendered fresh per request (no caching),
since they depend on who's logged in.

### Portal logins (Student / Parent / Staff / Admin)

Authentication is real — bcrypt-hashed passwords, signed session cookies
(`jose`), and server-side session verification on every `/portal/*`
request (see **Security note** below). It needs `DATABASE_URL` and,
ideally, `AUTH_SECRET` set.

Staff and Admin accounts aren't self-service (no public signup for those
roles — that's intentional), so after migrating, seed one demo account
per role:

```bash
npm run db:seed
```

This creates:

| Role | Email | Password |
|---|---|---|
| Student | `student@newlifebaptistchurch.org` | `password123` |
| Parent | `parent@newlifebaptistchurch.org` | `password123` |
| Staff | `staff@newlifebaptistchurch.org` | `password123` |
| Admin | `admin@newlifebaptistchurch.org` | `password123` |

Then run `npm run db:seed:content` to give those accounts something real
to see — it links the student to the parent account, creates classes
taught by the staff account, and adds assignments, results, attendance,
and messages so all four dashboards show genuine data instead of empty
states. It also seeds the sermons and events used across the public site.

Change these passwords (or delete the seeded rows) before going to
production. Students and Parents can also self-register at `/signup`.

**Security note:** `src/proxy.ts` (Next.js 16's renamed `middleware.ts`)
redirects unauthenticated visitors away from `/portal/*` as a fast, early
check — but per [CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927),
that layer alone can be bypassed and must never be the only gate. Every
`/portal/*` route is also wrapped in `app/portal/layout.tsx`, which
independently re-verifies the session server-side before rendering
anything. That layout — not the proxy — is the real security boundary.

### Setting up Resend

1. Verify a sending domain (or use their test domain while developing).
2. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `OFFICE_EMAIL` to `.env.local`.
3. Newsletter signup (footer) and the admissions form
   (`/school/admissions`) will start sending real email immediately — no
   code changes needed.

### The "Newlife Assistant" chat widget

A floating chat bubble, present on every marketing page (not on
`/login`, `/signup`, or `/portal/*`, which have their own chrome). It's
intentionally simple — no AI, no API key, no server call:

- `src/lib/faq.ts` is a list of question/keyword/answer entries. Typing a
  question (or tapping a suggested one) matches it against those
  keywords and shows the canned answer — all client-side, instant, free.
- No match found → a friendly fallback pointing to the contact page and
  office email.
- Add more questions any time by adding entries to `faqEntries` — no
  other code changes needed.

**On the church section only**, a second floating button opens a
WhatsApp popover styled like a live-chat "agent available" card — each
pastor gets a real photo with an online indicator and "Available — start
a conversation," not just a plain list (`src/lib/sample-data.ts` →
`pastors`, each with a `whatsapp` number and a `photoKey`). Both buttons
show a one-time greeting bubble a couple of seconds after the page
loads, dismissed automatically once used or ignored for a while. Add
real pastor names, photos, and WhatsApp numbers there before launch —
the current ones are placeholders (see **Photography** below for the
photo sourcing/licensing notes, which apply to leadership photos too).

### Sunday bulletin & hymns

The bulletin is a real uploaded PDF, not manually-entered data. An admin
signs in, goes to **Content** in the admin portal
(`/portal/admin/content`), and uploads this week's bulletin (the same
PDF the church already produces for print) along with the service date
and optional theme/scripture/sermon fields. That:

1. Uploads the file to Vercel Blob (`BLOB_READ_WRITE_TOKEN`)
2. Upserts the `bulletins` row for that date (one row per Sunday —
   uploading again for the same date replaces it)
3. Goes live on `/church/bulletin` immediately via `revalidatePath` —
   no waiting for the 60-second ISR window, no redeploy

`/church/bulletin` embeds the PDF directly (with a download button) and,
if the optional structured fields are filled in, also shows a numbered
order of service, the hymns being sung (each linking to its lyrics), and
announcements underneath — the PDF is the primary source of truth, the
structured fields are a progressive enhancement. `getBulletin()` in
`src/lib/data/content.ts` picks whichever `service_date` is soonest.

`/church/hymns` is a searchable hymnal (also wired into the header's
global search) — `/church/hymns/[slug]` shows full lyrics sized for
actually singing along from a phone, with the chorus (if any) correctly
repeated after each verse. Backed by the `hymns` table.

**Copyright note:** the four sample hymns (Amazing Grace, It Is Well
with My Soul, Holy Holy Holy, What a Friend We Have in Jesus) are all
pre-1900 and unambiguously public domain — safe to reproduce in full.
Most contemporary worship songs are **not** — before adding a hymn or
song written after the early 1900s, confirm your church's licensing
(e.g. a CCLI license) covers displaying its lyrics on your website.

## Project structure

```
src/
  app/
    page.tsx                 gateway landing ("/")
    church/                  church section (/church/*)
    school/                  school section (/school/*)
    login/, signup/, forgot-password/   auth screens
    portal/                  student/parent/staff/admin dashboards (protected)
    not-found.tsx, loading.tsx, template.tsx
  proxy.ts                   route-protection fast-path (Next.js 16 "proxy" convention)
  components/
    layout/                  header, footer, search, mobile nav, switcher
    brand/                   wordmark + the signature "skyline" illustration
    motion/                  shared reveal/stagger animation primitives
    forms/                   client forms wired to server actions
    portal/                  portal shell (sidebar/topbar) + stub pattern
    patterns/                section-tabs, photo-hero, page-stub
    icons/                   generic social + WhatsApp icons (lucide dropped brand marks)
    chat/                    the floating chat + WhatsApp widget
    church/                  hymn-list.tsx — searchable hymn list
  lib/
    db/                      schema.sql (plain SQL) + a raw query client (no ORM)
    data/                    content.ts (sermons/events/hymns/bulletin) + portal.ts (dashboards) — real queries with sample-data fallback
    format.ts                 timestamp -> display-string helpers used by lib/data
    auth/                    session (jose), get-session, login/signup/logout actions
    admin/                   admin-only server actions (bulletin PDF upload, role-checked)
    actions.ts                server actions (newsletter, admissions, RSVP, contact, prayer)
    resend.ts                Resend client
    social.ts, whatsapp.ts    social profile links + WhatsApp click-to-chat helper
    faq.ts                    keyword-matched Q&A for the chat widget (no AI, no API key)
    nav.ts, portal-nav.ts, sample-data.ts   nav config + fallback content
scripts/
  migrate.ts                 runs schema.sql against DATABASE_URL
  seed.ts                    creates one demo account per portal role
  seed-content.ts             sermons, events, and realistic portal data (classes, results, attendance, messages)
```

## Design system

- **Palette:** shared ink/paper neutrals, sampled directly from the real
  church crest — deep pine green (`church`) and warm gold (`school`) as
  the two accent temperatures — defined as Tailwind theme tokens in
  `src/app/globals.css`.
- **Type:** Fraunces (display, self-hosted variable font) + Public Sans
  (body/UI), via `@fontsource-variable` — no runtime call to Google Fonts.
- **Signature visual:** a hand-drawn line-art "skyline" (chapel + spire on
  one side, schoolhouse + flag on the other) in `components/brand/skyline.tsx`,
  reused instead of stock photography. Swap in real campus photos later by
  replacing it with `next/image` wherever it appears.
- **Motion:** one orchestrated hero reveal per page (staggered), restrained
  hover states elsewhere, a subtle route transition in `app/template.tsx`,
  and a gently pulsating logo for the global loading state
  (`app/loading.tsx`, `.animate-logo-pulse` in `globals.css`). Everything
  respects `prefers-reduced-motion`.

## Photography

Every photo on the site is real, free stock photography from Unsplash —
verified individually as licensed under the **Unsplash License** (free for
commercial use, no attribution required), not the paid Unsplash+ tier.
They're registered in `src/lib/photos.ts` with the photographer credited
in a comment for reference. To swap in real campus/congregation photos
later, just change the `id` for any entry — every page that uses it
updates automatically.

This includes the 8 Leadership photos (2 pastors, 2 elders, 4 deacons,
in `src/lib/photos.ts` and referenced by `photoKey` in `sample-data.ts`)
— these are stand-ins for the real pastors/elders/deacons and should be
swapped for actual staff photos before launch, the same as any other
placeholder photo on the site.

> **Note on previewing in a sandboxed environment:** if `images.unsplash.com`
> is unreachable (e.g. a locked-down network), Next's image optimizer will
> fail to load these with a 403. This is a network/firewall restriction,
> not a bug — the URLs are verified valid and will render normally on
> Vercel, any standard host, or a normal local dev machine.

## What's built vs. scaffolded

**Fully built:** every page in the wireframe Batches 01–09 (marketing
site) — gateway, both homepages, all Church and School sub-pages, Sermons,
Events with RSVP, Admissions, News, Resources — plus the full global shell.

**Also fully built (Batch 11 — Accounts & Portals):** real authentication
(bcrypt + signed sessions, not a mockup), `/login` and `/signup`, and all
four role portals (Student, Parent, Staff, Admin) with sidebar navigation
and a working dashboard for each. Every sidebar link routes somewhere —
sub-pages not yet fully built (Timetable, Payments, Users & Roles, Reports,
etc.) show a clearly-labeled "coming next" panel rather than 404ing.

**Real data, not sample data (when DATABASE_URL is set):** Sermons,
Events (both sites), and all four portal dashboards now query Neon
directly — see `src/lib/data/content.ts` and `src/lib/data/portal.ts`.
Portal numbers are genuine relational queries: a student's attendance
percentage, a parent's "on track" / "needs support" assessment, a
teacher's real student count, and the admin dashboard's activity feed are
all computed from actual rows, not hardcoded. RSVPs now persist to
`event_registrations` in addition to sending the confirmation email.
Every one of these still falls back cleanly to `sample-data.ts` when
`DATABASE_URL` isn't set, so the site never breaks in local preview.

**Working end-to-end (Resend-wired):** newsletter signup, admissions
inquiry, event RSVP, general contact form, prayer request submission —
all validated with Zod, all with a graceful demo-mode fallback when
`RESEND_API_KEY` isn't set.

**Leadership, social, and the chat widget:** the Leadership page shows
Pastors, Elders, and the Diaconate as distinct groups, each with a real
photo (see **Photography**), and a real WhatsApp click-to-chat button on
each pastor. Footer social links point to real (placeholder-handle)
URLs, and Sermons links out to YouTube. The floating "Newlife Assistant"
is a simple keyword-matched FAQ bot — no AI, no API key, no server call,
see **The "Newlife Assistant" chat widget** above. A second floating
button, church-section-only, opens a WhatsApp popover styled like a
live-chat "agent available" card, with real photos there too. Also
fixed while building this: the tuition table was priced in USD while the
parent portal already showed Naira — now consistently Naira throughout.

**Sunday bulletin & hymns:** `/church/bulletin` and `/church/hymns` —
see **Sunday bulletin & hymns** above. Not part of the original
wireframe batches; added on request. The bulletin is a real uploaded
PDF (admin uploads it at `/portal/admin/content`), not manually-entered
data — this is also the first genuinely functional piece of the
otherwise-still-stubbed Admin CMS.

**Real site search:** the header's search modal (previously decorative
— static "popular"/"recent" suggestions only) now actually filters
hymns, sermons, and both sites' events as you type, with results linking
straight to the right page.

**Intentionally simplified for this phase:** there's no dedicated
class-schedule table yet, so "upcoming classes" / "today's schedule" on
the Student and Staff dashboards are real classes with synthesized time
slots, not a true timetable. Parent dashboard "fees" shows "Not tracked
yet" — there's no billing table (that's part of the still-stubbed
Payments page). Admissions, RSVP-email, prayer, and contact form
submissions are still email-only, not yet persisted to their tables.

**Not yet started** (from your latest wireframe batches): Batch 10
(site-wide search results/content discovery beyond the current search
modal), Batch 12 (dedicated lead-capture banners, multi-step application
form, conversion analytics), Batch 13 (a documented shared component
library + explicit responsive/loading/empty states beyond what already
exists ad hoc), and the deeper Batch 14/15 admin pages (a real page
editor, site-structure manager, SEO settings, integrations, theming UI) —
the Admin dashboard and Users & Roles routes exist, but the tooling
behind them is still a stub.

## Roadmap

- [ ] **Persist remaining form submissions** — admissions, prayer, and
      contact messages are still email-only; wire them to their tables
      (already defined in `schema.sql`) the same way RSVP now is
- [ ] **A real class-schedule table** — replace the synthesized time
      slots on Student/Staff dashboards with actual timetable data
- [ ] **Billing/fees table** — needed for the Parent dashboard's "fees"
      field and the Payments portal page to be real
- [ ] **Admin CMS** — build out Content, Site Structure, Users & Roles,
      Reports, and Settings behind their existing stub routes
- [ ] **Search & content discovery** — a real results page and
      personalized "recommended for you" content (Batch 10)
- [ ] **Conversion system** — lead-capture banners, a multi-step
      admissions application, and conversion analytics (Batch 12)
- [ ] **Give** — connect a real payment processor (Stripe, Paystack, or
      similar) to the "Give now" button
- [ ] **Real pastor contact info** — the WhatsApp numbers on the
      Leadership page and in the chat widget are placeholders
- [ ] **A smarter chat widget** — if simple keyword matching in
      `lib/faq.ts` ever feels limiting, swapping in a real AI backend
      later is a contained change (one file + one new route), not a redesign
- [ ] **Sermon Series & Media Library filters** — the sermons page is
      ready for tabs (Recent/Series/Speakers/Topics) once there's enough
      real content to filter
- [ ] **Gallery** — a real photo gallery once campus photography is available

## Deploying

Works out of the box on Vercel (or any Node host): connect the repo, add
the environment variables above, and deploy. Neon and Resend both work
without any extra configuration in serverless environments.

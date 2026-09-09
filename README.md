# New Life — Church & Academy

A two-in-one website for New Life Baptist Church and New Life Christian
Academy, living under one domain (`/church/*` and `/school/*`), sharing a
header, footer, search, and design system while each keeps its own accent
color and nav.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 ·
Framer Motion · Drizzle ORM + Neon (Postgres) · Resend · Zod

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
| `DATABASE_URL` | Real content storage | Create a project at [neon.tech](https://neon.tech), copy the **pooled** connection string. |
| `RESEND_API_KEY` | Sending real email | Create at [resend.com/api-keys](https://resend.com/api-keys). |
| `RESEND_FROM_EMAIL` | Sending real email | Must be on a domain you've verified in Resend. |
| `OFFICE_EMAIL` | Sending real email | Where admissions/contact notifications land. |
| `NEXT_PUBLIC_SITE_URL` | Metadata/links | Your production URL once deployed. |

### Demo mode

Every form (newsletter signup, admissions inquiry) checks whether
`RESEND_API_KEY` is set. If it isn't, the form still "succeeds" and logs
what it would have sent to the console, instead of crashing — so you can
click through the whole site today, before any secrets are configured.
The same pattern applies to the database: `getDb()` in `src/lib/db/index.ts`
returns `null` without `DATABASE_URL`, and pages fall back to the sample
data in `src/lib/sample-data.ts`.

### Setting up Neon

```bash
npm run db:generate   # generates SQL migrations from src/lib/db/schema.ts
npm run db:migrate    # applies them to DATABASE_URL
npm run db:studio     # opens Drizzle Studio to browse/edit data
```

### Setting up Resend

1. Verify a sending domain (or use their test domain while developing).
2. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `OFFICE_EMAIL` to `.env.local`.
3. Newsletter signup (footer) and the admissions form
   (`/school/admissions`) will start sending real email immediately — no
   code changes needed.

## Project structure

```
src/
  app/
    page.tsx                 gateway landing ("/")
    church/                  church section (/church/*)
    school/                  school section (/school/*)
    not-found.tsx, loading.tsx, template.tsx
  components/
    layout/                  header, footer, search, mobile nav, switcher
    brand/                   wordmark + the signature "skyline" illustration
    motion/                  shared reveal/stagger animation primitives
    forms/                   client forms wired to server actions
    patterns/                section-tabs (Academics/Student Life) + page-stub (template for future routes)
    icons/                   generic social icons (lucide dropped brand marks)
  lib/
    db/                      Drizzle schema + Neon client
    actions.ts                server actions (newsletter, admissions)
    resend.ts                Resend client
    nav.ts, sample-data.ts   shared nav config + placeholder content
```

## Design system

- **Palette:** shared ink/paper neutrals, with candlelight gold (`church`)
  and meadow green (`school`) as the two accent temperatures — defined as
  Tailwind theme tokens in `src/app/globals.css`.
- **Type:** Fraunces (display, self-hosted variable font) + Public Sans
  (body/UI), via `@fontsource-variable` — no runtime call to Google Fonts.
- **Signature visual:** a hand-drawn line-art "skyline" (chapel + spire on
  one side, schoolhouse + flag on the other) in `components/brand/skyline.tsx`,
  reused instead of stock photography. Swap in real campus photos later by
  replacing it with `next/image` wherever it appears.
- **Motion:** one orchestrated hero reveal per page (staggered), restrained
  hover states elsewhere, and a subtle route transition in `app/template.tsx`.
  Everything respects `prefers-reduced-motion`.

## Photography

Every photo on the site is real, free stock photography from Unsplash —
verified individually as licensed under the **Unsplash License** (free for
commercial use, no attribution required), not the paid Unsplash+ tier.
They're registered in `src/lib/photos.ts` with the photographer credited
in a comment for reference. To swap in real campus/congregation photos
later, just change the `id` for any entry — every page that uses it
updates automatically.

> **Note on previewing in a sandboxed environment:** if `images.unsplash.com`
> is unreachable (e.g. a locked-down network), Next's image optimizer will
> fail to load these with a 403. This is a network/firewall restriction,
> not a bug — the URLs are verified valid and will render normally on
> Vercel, any standard host, or a normal local dev machine.

## What's built vs. scaffolded

**Fully built:** every page in the wireframes (Batches 01–09) now has real
layout and content — the gateway, both full site homepages, Church
About/Ministries/Leadership/Give/Contact/New Here/Small Groups/Volunteer/
Testimonies/Prayer, Sermons (list + detail), Events (list + detail with a
working RSVP form) for both Church and School, School About/Academics
(tabbed: Curriculum/Departments/Calendar)/Student Life (tabbed: Clubs/
Sports/Arts/Leadership)/Admissions (with Fees & FAQ)/News (list + detail)/
Resources/Contact, plus the full global shell (header/footer/search/
mobile nav/switcher), 404, and loading state.

**Working end-to-end (Resend-wired):** newsletter signup, admissions
inquiry, event RSVP, general contact form, prayer request submission —
all validated with Zod, all with a graceful demo-mode fallback when
`RESEND_API_KEY` isn't set.

**Intentionally simplified for this phase** (real content, but not yet
backed by the database): sermon/event data lives in
`src/lib/sample-data.ts` rather than Neon. The schema for all of it
already exists in `src/lib/db/schema.ts` — swapping sample data for live
Neon queries is the main remaining step, not a redesign.

## Roadmap

- [ ] **Wire pages to Neon** — replace `sample-data.ts` reads with live
      Drizzle queries (schema is ready); persist form submissions
      (admissions, RSVP, prayer, contact) to their tables instead of only
      emailing them
- [ ] **Give** — connect a real payment processor (Stripe or similar) to
      the "Give now" button
- [ ] **Sermon Series & Media Library filters** — the sermons page is
      ready for tabs (Recent/Series/Speakers/Topics) once there's enough
      real content to filter
- [ ] **Multi-step admissions application** — the current form is a
      single-step inquiry; a full application + document upload + status
      tracking flow can build on the same `admissions_inquiries` table
- [ ] **Gallery** — a real photo gallery once campus photography is available
- [ ] **Admin / Command Center** — role-based dashboard (`admin_users`
      table already in schema) to manage events, sermons, staff, and
      review admissions/prayer/contact submissions — once you share the
      UI you've started, I'll build the routes and data layer to match

## Deploying

Works out of the box on Vercel (or any Node host): connect the repo, add
the environment variables above, and deploy. Neon and Resend both work
without any extra configuration in serverless environments.

# Newlife Baptist School & Church

A school-first public website built with the existing Next.js 16 App Router, React 19 and Tailwind CSS 4 stack. The school homepage is `/`; `/school` redirects there. The church has a dedicated `/church` section and shared navigation, typography and footer.

## Development

Validated with Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

No credentials are needed for the current public website. Do not create a worktree for a normal cloud task; use the existing isolated checkout. Read AGENTS.md and the installed Next.js guides before changes.

## Current public pages

- `/`: school homepage with school contact and About actions, plus a secondary church introduction.
- `/school/about`: official school story, mission and vision when supplied.
- `/school/academics`: approved programmes when supplied; hidden from navigation until populated.
- `/school/gallery`: approved local photographs and accessible enlargement; hidden from navigation until populated.
- `/school/contact`: verified school contact links when supplied.
- `/church`, `/church/about`, `/church/contact`: dedicated church information and separate contact details.

## Content and publication

Edit `src/lib/institution.ts` to maintain school/church information, separate contacts, programmes and permitted photographs. The client-supplied school history is integrated, along with the motto and locality visible on the school crest. Three client-supplied school exterior photographs and the confirmed school telephone/WhatsApp (+234 814 082 3524) are integrated. The downloadable school crest file is still needed to replace the existing church crest. The site deliberately does not fabricate them. Read [the client checklist](docs/CLIENT-CONTENT.md) for the exact missing items and image entry format.

The production domain is unconfirmed. Canonicals and indexing remain disabled, and the sitemap is empty, until `productionOrigin` is confirmed and `publicationReady` is explicitly enabled after content approval. Unique titles, descriptions and Open Graph metadata are implemented. Structured data is deferred until institutional facts and production identity are verified.

The existing portals, authentication, database schema/scripts, server actions and legacy marketing routes are preserved. Legacy sample content is not linked from the main public website and must be reviewed before publication. No database migrations or seed commands are needed for this task. The previous README is retained in [archived implementation notes](docs/LEGACY-README.md); its sample facts are not approved institutional copy.

## Validation

```sh
npm run lint
npx tsc --noEmit
npx tsx --test tests/institution.test.tsx
npm run build
npm run start
```

The contact tests use synthetic fixtures only. They verify international call/WhatsApp destinations, hidden missing contacts, separation of school/church details, and safe prepublication metadata. Real photograph quality, contact ownership, worship times, academic claims and production deployment still require client materials and review.

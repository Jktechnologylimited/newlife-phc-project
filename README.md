# Newlife Baptist Schools & Church

A photography-led, school-first public website built with the existing Next.js 16 App Router, React 19 and Tailwind CSS 4 stack. The school homepage is `/`; `/school` redirects there. The church has a dedicated `/church` section and shared navigation, typography and footer.

## Development

Validated with Node.js 24 and npm 11.

```sh
npm ci
npm run dev
```

No credentials are needed for the current public website. Do not create a worktree for a normal cloud task; use the existing isolated checkout. Read AGENTS.md and the installed Next.js guides before changes.

## Current public pages

- `/`: full-width school photograph, editorial welcome, educational identity, staggered gallery, school history, church introduction and contact actions.
- `/school/about`: official school story, real school photography and a 1994/1996/1999 history timeline.
- `/school/academics`: verified educational identity and historical foundation, with direct enquiries for current levels and curriculum. Approved programme details can be added centrally.
- `/school/gallery`: three client-supplied exterior photographs with keyboard-accessible enlargement.
- `/school/contact`: confirmed school call/WhatsApp actions and locality; exact directions are requested directly from the school.
- `/church`, `/church/about`, `/church/contact`: dedicated church information and separate contact details.

## Content and publication

Edit `src/lib/institution.ts` to maintain school/church information, separate contacts, programmes and permitted photographs. The client-supplied school history is integrated, along with the motto and locality visible on the school crest. Three client-supplied school exterior photographs and the confirmed school telephone/WhatsApp (+234 814 082 3524) are integrated. The supplied school crest appears in the school header, navigation and footer, and in school sharing images. The school crest also supplies the browser favicon and Apple touch icon. Church pages retain the original church crest. Both identities retain the established green, gold, cream and editorial typography. The footer consistently displays “Powered by Newlife Baptist Church Technical Team”. Read [the client checklist](docs/CLIENT-CONTENT.md) for the exact missing items and image entry format.

The production domain is unconfirmed. Canonicals and indexing remain disabled, and the sitemap is empty, until `productionOrigin` is confirmed and `publicationReady` is explicitly enabled after content approval. Unique titles/descriptions, Open Graph and large Twitter cards are implemented. Eight local 1200×630 social images are ready in `public/social/`; absolute image/canonical URLs are emitted only after the domain is confirmed. School/Church JSON-LD includes only verified facts, with no invented street address, service times, ratings or church contact number.

The existing portals, authentication, database schema/scripts, server actions and legacy marketing routes are preserved. Legacy sample content is not linked from the main public website and must be reviewed before publication. No database migrations or seed commands are needed for this task. The previous README is retained in [archived implementation notes](docs/LEGACY-README.md); its sample facts are not approved institutional copy.

## Validation

```sh
npm run lint
npx tsc --noEmit
npx tsx --test tests/institution.test.tsx tests/site-guide.test.ts
npm run build
npm run start
```

Fifteen automated tests verify international call/WhatsApp destinations, hidden missing contacts, separation of school/church details, safe prepublication metadata, verified structured data and canonical/social URL generation with a synthetic test origin.

For browser/route checks in the cloud environment (Python Playwright and `/usr/bin/chromium` are already available):

```sh
npm run start -- --port 3105
# In another terminal, from the repository root:
python tests/check-public-site.py
```

`NEWLIFE_BASE_URL` overrides the default server URL. `NEWLIFE_QA_DIR` selects a screenshot directory (default `/tmp/newlife-premium-qa`). The check covers five viewport widths, real image loading, mobile keyboard navigation, lightboxes, school/church contact separation, attribution across public HTML routes, social-image dimensions and redirects. It does not send calls/messages or verify legacy sample claims.

To regenerate sharing images using local assets and the installed Next.js image renderer:

```sh
npx tsx scripts/generate-social-images.tsx
```

No external image service, new dependency, additional database or credentials are required. See [the validation record](docs/QA.md) and [client publication checklist](docs/CLIENT-CONTENT.md).


## Automated Newlife site guide

“Ask Newlife” opens a responsive, keyboard-accessible site guide on public pages. It reuses the institutional content in `src/lib/institution.ts` and structured guide topics in `src/lib/faq.ts`. It provides sourced page links, suggested questions, basic follow-up context, a reset action, and honest answers when current details have not been confirmed. Legacy demonstration fees, service times and staff identities are excluded from its knowledge.

This is a local chatbot simulator: no remote AI model, API key, chat database, new dependency or account is needed. Conversations remain in the current tab’s React state and can be cleared. A clearly labelled school-team WhatsApp handoff uses the confirmed school number. Only the latest question is included in the editable WhatsApp message; nothing is sent automatically. Church questions explicitly distinguish this school contact from a church office.

```sh
npx tsx --test tests/site-guide.test.ts tests/institution.test.tsx
# With the production server on port 3107:
python tests/check-site-guide.py
```

Set `NEWLIFE_BASE_URL` to test another local server port. The browser smoke test checks layouts, actual responses, source navigation, keyboard focus, clearing pending responses, plain-text rendering, church/school separation and the encoded human-handoff message. It does not send a WhatsApp message.


## School branding assets

The original uploaded crest is preserved unchanged in `public/images/school/school-logo-original.jpg`. `school.logo` and `church.logo` in `src/lib/institution.ts` select the separate institutional marks. Web and tab icons preserve the entire school crest without cropping or redrawing it.

Regenerate the optimized 512px school mark, 256px icon, 180px Apple icon and multi-size 16/32/48px favicon from the repository root:

```sh
node scripts/generate-school-branding.mjs
npx tsx scripts/generate-social-images.tsx
```

The icon generator uses the Sharp installation already supplied by Next.js. No dependency declarations or lockfile changes are needed. Next.js discovers `src/app/favicon.ico`, `icon.png` and `apple-icon.png` automatically.

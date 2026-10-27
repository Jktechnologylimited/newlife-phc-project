# Validation record

Validated in the cloud workspace on 27 October 2026 with Node.js 24.19.0, npm 11.9.0 and the repository's locked dependencies.

## Passed

- `npm run build`: successful production compilation, TypeScript validation and generation of 82 static entries (includes internal and preserved legacy routes).
- `npm run lint`: no lint errors.
- `npx tsc --noEmit`: no type errors.
- `npx tsx --test tests/institution.test.tsx`: 4 passed, 0 failed or skipped.
- `git diff --check`: clean.
- Production server started using `npm run start -- --hostname 0.0.0.0 --port 3100`.
- Chromium checked `/`, `/school/about`, `/school/academics`, `/school/gallery`, `/school/contact`, `/church`, `/church/about`, `/church/contact`: HTTP 200, one H1, unique title, description and Open Graph title, noindex metadata, no invented canonical, no listed legacy sample claims and no fabricated contact links.
- All eight pages checked at 320, 375, 768 and 1440px: no horizontal overflow; displayed crest images loaded.
- Mobile navigation: open/close, Tab focus containment, Escape dismissal, focus restoration and About link navigation.
- Six unique internal destinations emitted by the curated public shell returned HTTP 200. Academics/gallery are intentionally not promoted while empty.
- All 46 prerendered public routes returned successful HTTP responses (redirects followed). This does not verify legacy institutional claims. Internal framework error routes were excluded.
- `/school`: HTTP 308 to `/`; `/portal/admin`: HTTP 307 to login without a session; unknown route: HTTP 404.
- Robots blocks indexing; the prepublication sitemap has no URLs. No browser page errors occurred during the curated-page checks.
- Desktop and mobile homepage screenshots were visually inspected.
- No dependency declarations, lockfile, database schema, database scripts, authentication or portal files changed. No migration or seed command was run.

## Outstanding

- Authentic hero/gallery photographs and publication permissions have not been supplied. Gallery implementation exists, but enlargement with the real institutional photographs remains unvalidated.
- Contact-link formatting and conditional rendering passed using synthetic test fixtures. Ownership/delivery of actual telephone, WhatsApp and email destinations cannot be verified until supplied.
- Official history, academic programmes, mission/vision, church service information and location require client confirmation. Their absence is stated transparently rather than filled with fictional claims.
- Production domain, canonical URLs, live sitemap URLs, structured data and deployment must be reviewed once institutional content and identity are approved. Indexing remains deliberately disabled.
- Legacy public routes still contain sample information; preserve/rewrite/retire decisions require client direction. They remain accessible but are not promoted by the main shell and inherit noindex metadata.

## School story follow-up, 27 October 2026

The client supplied `OUR STORY-WPS Office (2).docx`; the original is retained in `docs/sources/OUR STORY.docx`. The school history is no longer missing. The homepage and school About page now use the supplied historical account, and the motto/locality visible on the client-shown school crest are included. The source document has no embedded images or contact information. The original downloadable school-logo image is still needed; the existing church crest has not been represented as the new school crest.

Revalidation: production build (including TypeScript), lint and all four existing contact/metadata tests passed. Chromium verified the revised history on `/` and `/school/about`, the full About-page milestones and motto, and overflow checks at 375px and 1440px. Earlier unknown-history notes above describe the previous validation state; official contact details, current programmes, photographs and production domain remain outstanding.

## School photographs and official contact follow-up, 27 October 2026

Integrated all three client-uploaded school exterior JPEGs unchanged. The landscape photograph is used as the school hero; the gallery contains all three and is now linked in navigation. The client confirmed +234 814 082 3524 for school calls and official WhatsApp; church contacts remain separate.

Revalidation passed: production build including TypeScript, lint, five automated tests, and Chromium checks on homepage/contact/gallery at 375/768/1440px. Visible images loaded, the call/WhatsApp destinations matched the confirmed number, and all three gallery photographs opened, loaded and closed with Escape. Browser checks confirmed the school number does not appear in church contact links. Hidden dialog images are intentionally lazy-loaded and are checked when their dialog opens. No real call or WhatsApp message was sent.

Remaining material gaps: downloadable school crest, school email if applicable, full address/map, current programme information, church-specific materials, and confirmed production domain. Earlier notes that school photographs and telephone/WhatsApp were unavailable are superseded by this update.

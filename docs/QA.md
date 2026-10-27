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

## Premium editorial redesign, 27 October 2026 — latest validation

### Implemented

- Full-width, authentic school-photo hero, school-first navigation, serif editorial headings, established pine/gold/cream colours and calmer section spacing.
- Two-column welcome with real school photography; verified motto-based educational introduction; staggered gallery; historical storytelling; secondary church introduction; direct school call/WhatsApp enquiries.
- Refined school About, Academics, Gallery and Contact pages, plus church home/About/Contact pages. Only supplied facts are presented. No new academic programmes, church service times, street address, testimonials or achievements were inferred.
- Typographic school wordmark while the official downloadable school crest is unavailable. The existing church crest is used for the church identity. No JKTL corporate branding was introduced.
- Accessible mobile navigation with native dialog, focus containment, Escape and route-change closure, scroll lock and desktop-resize handling; gallery enlargement and mobile WhatsApp action.
- Exact attribution on public pages and preserved account-entry screens: “Powered by Newlife Baptist Church Technical Team”.
- School and Church JSON-LD from verified facts, unique page metadata and eight branded 1200×630 PNG sharing images. All sharing images are generated locally using the supplied school photograph or church crest. No third-party graphics or external image service was used.

### Executed checks

- `npm run build`: passed, including TypeScript and 82 generated static entries.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npx tsx --test tests/institution.test.tsx`: 8 passed, 0 failed/skipped. Includes metadata generation with a synthetic approved origin; this test URL is not published.
- `python tests/check-public-site.py`: passed against the production server on port 3105.
- All 8 curated pages checked in Chromium at 320, 375, 768, 1024 and 1440px: no horizontal overflow, one H1, unique title, description, Open Graph/Twitter configuration, exact attribution, real visible-image loading and correct contact separation.
- School-first hero and CTA destinations, hero spacing, keyboard focus/Tab containment, Escape/focus restoration, route navigation, desktop-resize menu dismissal, body scroll locking, all 3 gallery enlargements and reduced-motion behaviour passed. No browser page errors occurred.
- All 8 unique internal destinations returned successful HTTP responses.
- HTTP checks passed for 48 public/entry routes, including exact attribution on all 47 HTML responses. The remaining response was an image asset. This is HTTP coverage, not verification of retained legacy sample content.
- All 8 sharing-image URLs served valid 1200×630 PNGs below 1MB each.
- Prepublication robots/empty sitemap, `/school` HTTP 308 redirect, unauthenticated admin HTTP 307 redirect and unknown-route HTTP 404 passed.
- Desktop/mobile screenshots were generated under `/tmp/newlife-premium-qa` and visually reviewed, including the homepage, church and social card composition.
- `git diff --check`: clean. Dependency declarations/lockfile, databases/schema/scripts, portal logic and authentication remain unchanged.

### Publication limitations

The production domain remains unconfirmed. Canonical URLs and absolute Open Graph/Twitter image URLs are intentionally absent; sharing assets are ready, but live sharing is not yet validated. Robots and noindex metadata remain restrictive, and sitemap URLs remain empty. Once the client confirms the origin and content approval, the configuration emits absolute URLs; the publication-ready robots policy allows curated pages and their supporting static/image/social assets.

The downloadable school crest, current academic details, exact school address/map/email if used, and church-specific photographs, services and contacts are still needed. Preserved legacy routes contain sample material and need a separate retain/rewrite/retire decision before production. Reference sites were blocked by network-proxy HTTP 403; their pages were not viewed or copied.

Git author identity was set for this repository only to `JK Technology Limited <engineering@jktl.com.ng>`. This did not change the website attribution or rewrite existing commits.

## Automated site guide, 27 October 2026

Implemented a branded “Ask Newlife” chatbot simulator on public pages, replacing the unused old chat widget and its unverified FAQ answers. The guide uses the approved central institutional content, relevant page links, scoped school/church topics, suggested questions, basic follow-up context, conversation reset and a persistent human-handoff action. Current fees, academic levels, worship times and missing contacts are never invented. The handoff targets the confirmed school WhatsApp number, explicitly distinguished from church office contact details.

Conversations remain in this tab’s React state. No remote AI API, new dependency, account or chat database was added. The latest question is encoded into an editable WhatsApp message only when the visitor chooses that link; tests did not send any message. The guide is labelled automated and makes no human-online or response-time claims. Existing account/portal entry screens keep their focused layout without the widget.

Executed validation:

- Production build including TypeScript: passed; 82 static entries generated.
- ESLint and standalone `npx tsc --noEmit`: passed.
- `npx tsx --test tests/site-guide.test.ts tests/institution.test.tsx`: 15 passed, 0 failed/skipped.
- Guide Chromium checks: responsive dialog bounds at 320×568, 375×812, 768×1024 and 1440×1000; visible input/handoff; actual suggested replies and fee fallback; correct source links; encoded WhatsApp question; focus containment, Escape/focus restoration; reset cancellation of pending replies; plain-text user content; no stored conversation; source navigation; church/school contact distinction; hidden widget on login/signup/password screens; no remote browser AI requests or browser errors. All passed.
- Reply scrolling and initial welcome position were refined during visual review. Desktop and mobile screenshots were captured under `/tmp/newlife-guide-qa`.
- Existing public-site regression checks passed across 8 main pages at 5 widths, 48 public/entry HTTP routes and exact footer attribution on all 47 HTML pages. The school/church pages, photographs and existing portal protection remain intact.
- The footer still displays exactly “Powered by Newlife Baptist Church Technical Team”.

The user additionally requested the green school crest for school branding and the favicon. That portion remains blocked: only the inline chat rendition is available, with no original downloadable logo image. Attachment inspection confirmed the available DOCX and three-photo ZIP contain no crest. An original PNG/JPG is needed; the crest/favicon have not been approximated or replaced with the church logo.

## School crest and favicon completed, 27 October 2026

The client supplied the original school JPEG in `WhatsApp Image 2026-10-15 at 18.21.59.jpeg.zip`. The JPEG is preserved byte-for-byte in `public/images/school/school-logo-original.jpg` (SHA-256 `51d022c22439b6afe4f0cf170ca16125064b0a40c99f58abfb43bb37f9b83de2`). The school header/footer/mobile navigation now render the actual school crest. Church headers, footers and church social images retain their separate crest. Five school social images now include the school crest.

A reproducible local script generates the complete, uncropped crest on a white square background for the 512px web mark, 256px app icon, 180px Apple touch icon and multi-size 16/32/48px ICO favicon. ICO PNG entries use RGBA encoding for compatibility with the Next.js image decoder. No image was redrawn and no dependency declaration or lockfile changed.

Validation passed: production build including TypeScript and 84 static entries; ESLint; all 15 existing automated tests; original-file byte comparison; PNG/Apple-icon dimensions and ICO directory/sizes. Chromium verified actual school crest loading in the header/footer on `/`, `/school/about` and `/school/contact`, the separate church crest on `/church`, favicon/Apple-icon links and served bytes, exact footer attribution, and no horizontal overflow at 320/375/768/1440px. A mobile screenshot was visually reviewed. The exact attribution remains “Powered by Newlife Baptist Church Technical Team”.

The earlier school-logo/favicon blocker is resolved. Production-domain and other institutional-content prerequisites remain independent of this branding change.

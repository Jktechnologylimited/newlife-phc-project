# Newlife publication checklist

The client brief confirms the school/church names and the school as the primary focus. The client has now supplied OUR STORY-WPS Office (2).docx and shown a green school crest. The school story has been integrated into the homepage and About page; the crest confirms the motto “Learning and Growing in God” and locality Rumueme, Port Harcourt. The original school crest was subsequently supplied in a ZIP and is now integrated into the school identity and favicon. Earlier missing-logo notes below are historical and are superseded by the receipt recorded at the end of this checklist. Repository stock photographs, sample events, biography, founding dates, claimed academic levels, service times, contact numbers, email addresses and presumed domains are not client verification.

## Required from the client

- Confirm whether the official public name uses “School” or “Schools” (the new crest says “Schools”; the brief uses “School”). History and church ownership are now supplied. Confirm spellings before publishing a detailed list of historic staff: the source contains variants such as Nyanabe/Nyanabo and unclear teacher-name spellings; these names were not guessed in the public summary.
- School telephone with country code, WhatsApp with country code, and email if used. Confirm these separately from church contacts.
- School physical address and approved map/directions URL.
- Authentic school hero photograph and gallery images, with permission to publish (including consent for identifiable children), accurate alt descriptions and optional factual captions.
- Confirmed academic levels/programmes, curriculum, entry requirements and approved descriptions. Academics is now linked in navigation and describes the verified motto/historical foundation; current academic details are handled through enquiries until supplied.
- Official school mission and vision, if intended for publication.
- Church introduction/history, beliefs if approved, worship times and location, separate telephone/WhatsApp/email, and permitted church photographs.
- Confirmed production origin, domain ownership and hosting target.

## Updating the website

Edit `src/lib/institution.ts`. All verified institutional copy and separate contact details belong there. Unset optional fields are intentionally hidden; do not fill them with examples. The homepage and contact components render call/WhatsApp/email/directions links only when supplied. Store approved images in `public/images/school/` or `public/images/church/`; each image entry needs its root-relative `src`, accurate `alt`, intrinsic `width` and `height`, and optional verified `caption`. Set `hero` separately and add gallery items to `photos`. Local images avoid external stock-image network dependencies. Gallery enlargement uses a native dialog with Escape/close support.

`productionOrigin` must be the client-confirmed HTTPS origin, without a path or trailing slash. Until content is approved, keep `publicationReady = false`: search indexing is disabled and the sitemap is empty. After all necessary content/contact/photo checks pass, set it to true. Page metadata then emits absolute canonicals and social URLs; the sitemap includes the curated public routes. The robots policy permits only curated pages. Add structured data only when the institutional facts and production identity have been confirmed.

## Preserved legacy features and publication conflict

The repository contains authentication, four role portals, database scripts/schema, event registration, sample-data-backed marketing pages, email actions, FAQ chat and newsletter features. They remain on disk and their database records have not been touched. They are no longer linked from the main public shell. The old FAQ and pastor WhatsApp widget is not mounted because it advertises unverified details. This is a presentation change; the component code is retained.

Legacy pages such as school admissions/fees/news/student-life and church leadership/sermons/events/giving still contain sample material and remain directly accessible. This conflicts with publishing a wholly verified public website. They are omitted from primary navigation/sitemap and inherit noindex metadata. Do not publish them as verified institutional content. Before production, the client must decide which legacy pages to retain and supply replacement content, or explicitly authorize redirecting/retiring those URLs. No legacy routes, authentication code, records or database functionality have been deleted.

## Verification

Run `npm run lint`, `npm run build`, and `npx tsc --noEmit`. Start `npm run start -- --hostname 0.0.0.0` and inspect the curated routes, school-index redirect, unknown-page 404, protected-portal redirect, robots and sitemap. Check mobile navigation, keyboard focus, Escape/close, 320/375/768/1440px widths, photograph enlargement, and every supplied contact destination. Real-image and real-contact validation cannot be completed until those assets/details are supplied.

## School story source, received 27 October 2026

`OUR STORY-WPS Office (2).docx` confirms: Sister Doris Abili conceived and established the school in 1994, with church permission to use the church name and premises; four initial children; Mrs. Stella Dodo as administrator; church ownership in 1996 under Bro. G. A. Apapa; PTA formation in 1999, initially chaired by Mr. Stephen Ajibare and later Mr. Lebari. Grammar was edited for readability. The story describes the lack of a fence in its historical context, not current facilities. The nursery/primary description is historical, not evidence of current programmes. No relocation, current enrolment, facilities or later milestones were inferred. The document contains no embedded photographs or contact details.

## Confirmed school contact and photographs, 27 October 2026

The client confirmed +234 814 082 3524 as both the school telephone and official school WhatsApp. These render as `tel:+2348140823524` and a `https://wa.me/2348140823524` link with an encoded school-enquiry message. They are not assigned to the church.

The uploaded WhatsApp ZIP contains three school exterior photographs, inspected and copied unchanged into `public/images/school/`. The landscape image is the homepage hero; all three appear in the gallery with visual descriptions rather than invented facility claims. Gallery navigation is now enabled. The ZIP contains no logo, document, email, map URL or additional contact information. The current school-name spelling remains as requested in the brief, while the building and crest use “Schools”; confirm the preferred public spelling before publication.

These updates supersede earlier checklist entries describing missing school telephone/WhatsApp and photographs. School email (if used), full address/map, current academic programmes, downloadable school crest, church-specific materials and production domain remain outstanding. Client confirmation of photograph publication permissions remains part of final publication review.

## Premium design refinement

The supplied school photographs, school story and confirmed telephone/WhatsApp are integrated in the editorial design. The school now uses a text wordmark so the church crest is not presented as a school crest. Supply the original school crest to add the official school mark; the church retains its existing crest. The school About page includes verified historical milestones; Academics uses the verified motto and historical founding context, with current academic details handled through direct enquiries. Main church content describes only the church/school connection supported by the supplied school history. Unverified mission, service times, church photographs and church contacts are omitted rather than shown as unfinished sections.

Eight static 1200×630 social images are generated locally using authentic supplied imagery. Set the confirmed `productionOrigin` in `src/lib/institution.ts` to enable absolute canonicals and social image URLs; keep `publicationReady` false until institutional publication review is complete. The prepublication robots policy and empty sitemap remain intentional. Once published, robots allows curated pages plus their static/image/social assets, and legacy sample-content routes remain excluded.

The reference sites in the premium brief returned network-proxy HTTP 403 during inspection. The implementation follows the brief’s visual direction without claiming those sites were viewed or importing their assets.

## Automated guide and requested school crest/favicon

The automated site guide now covers the verified main-page information. Answers derive from `institution.ts`, with topic aliases and source links in `faq.ts`. Keep guide topics updated when verified new pages/facts are added. Do not restore the old sample fees, Sunday times, pastor names or presumed email addresses.

The user requested the previously shown green school crest on school pages and as the favicon, with the church crest kept for church pages. The inline crest is visible in chat, but the original image file is not accessible in the workspace or downloadable attachments. Inspection found the story DOCX (no embedded media) and the school photograph ZIP (three exterior JPEGs, no logo). An original PNG/JPG of the school crest is required to complete the exact logo/favicon replacement; it has not been approximated or generated. The exact footer attribution remains “Powered by Newlife Baptist Church Technical Team”.

## School crest received and integrated, 27 October 2026

The client supplied `WhatsApp Image 2026-10-15 at 18.21.59.jpeg.zip`. Its original JPEG is preserved byte-for-byte at `public/images/school/school-logo-original.jpg`. The school header/footer/mobile navigation use the school crest, and the church header/footer continue to use the original church crest. The root browser favicon, 256px icon and 180px Apple touch icon now use the school crest. The five school social cards include the school crest; the church cards retain the church crest.

The full artwork and motto are retained. Square derivatives fit the complete image onto a white background rather than cropping its ribbons or redrawing the mark. `scripts/generate-school-branding.mjs` reproduces all web/icon variants from the original, using the existing Next.js Sharp dependency. The exact footer attribution remains unchanged. Original school-logo availability is resolved; confirmed production domain, current academic details and the other institutional-content gaps remain separate publication items.

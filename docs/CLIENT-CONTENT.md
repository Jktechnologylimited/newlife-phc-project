# Newlife publication checklist

The client brief confirms the school/church names and the school as the primary focus. The client has now supplied OUR STORY-WPS Office (2).docx and shown a green school crest. The school story has been integrated into the homepage and About page; the crest confirms the motto “Learning and Growing in God” and locality Rumueme, Port Harcourt. The crest image is visible in chat but is not available as a downloadable file in the workspace; replacing the existing church crest remains pending receipt of the original PNG/JPG file. Repository stock photographs, sample events, biography, founding dates, claimed academic levels, service times, contact numbers, email addresses and presumed domains are not client verification.

## Required from the client

- Confirm whether the official public name uses “School” or “Schools” (the new crest says “Schools”; the brief uses “School”). History and church ownership are now supplied. Confirm spellings before publishing a detailed list of historic staff: the source contains variants such as Nyanabe/Nyanabo and unclear teacher-name spellings; these names were not guessed in the public summary.
- School telephone with country code, WhatsApp with country code, and email if used. Confirm these separately from church contacts.
- School physical address and approved map/directions URL.
- Authentic school hero photograph and gallery images, with permission to publish (including consent for identifiable children), accurate alt descriptions and optional factual captions.
- Confirmed academic levels/programmes, curriculum, entry requirements and approved descriptions. Academics is omitted from navigation until programmes exist.
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

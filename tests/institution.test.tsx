import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactLinks } from "../src/components/institution/sections";
import {
  school,
  church,
  telephoneHref,
  whatsappHref,
} from "../src/lib/institution";
import { institutionSchema } from "../src/lib/institution-schema";
import { socialCardFor } from "../src/lib/social-cards";
import { pageMetadata } from "../src/lib/site-metadata";

// Synthetic numbers exercise formatting; they are never published as contacts.
test("international call and WhatsApp links preserve the intended destination", () => {
  assert.equal(telephoneHref("+234 (800) 000-0000"), "tel:+2348000000000");
  const url = new URL(
    whatsappHref("+234 (800) 000-0000", "Test School & Church"),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/2348000000000");
  assert.equal(
    url.searchParams.get("text"),
    "Hello, I would like to enquire about Test School & Church.",
  );
});

test("unverified institutional contacts cannot render fake destinations", () => {
  for (const institution of [school, church]) {
    const html = renderToStaticMarkup(
      <ContactLinks
        institution={{
          ...institution,
          telephone: undefined,
          whatsapp: undefined,
          email: undefined,
          address: undefined,
          mapUrl: undefined,
        }}
      />,
    );
    assert.doesNotMatch(html, /href="(?:tel:|mailto:|https:\/\/wa.me\/)/);
    assert.doesNotMatch(html, /not yet been published|coming soon/i);
  }
});

test("approved school contacts render independently from church contacts", () => {
  const fixture = {
    ...school,
    telephone: "+234 800 000 0000",
    whatsapp: "+234 800 000 0001",
    email: "school@example.invalid",
  };
  const html = renderToStaticMarkup(<ContactLinks institution={fixture} />);
  assert.match(html, /href="tel:\+2348000000000"/);
  assert.match(html, /href="https:\/\/wa.me\/2348000000001\?text=/);
  assert.match(html, /href="mailto:school@example.invalid"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.doesNotMatch(
    renderToStaticMarkup(<ContactLinks institution={church} />),
    /school@example.invalid/,
  );
});

test("unapproved site identity cannot emit an invented canonical or enable indexing", () => {
  const metadata = pageMetadata("School", "School information", "/");
  assert.equal(metadata.alternates, undefined);
  assert.deepEqual(metadata.robots, { index: false, follow: false });
  assert.equal(metadata.openGraph?.title, "School");
});

test("confirmed school contact is available without assigning it to the church", () => {
  const html = renderToStaticMarkup(<ContactLinks institution={school} />);
  assert.match(html, /href="tel:\+2348140823524"/);
  assert.match(html, /href="https:\/\/wa.me\/2348140823524\?text=/);
  assert.doesNotMatch(
    renderToStaticMarkup(<ContactLinks institution={church} />),
    /2348140823524/,
  );
});

test("structured data describes verified school facts without inventing church contacts", () => {
  const schoolData = institutionSchema("school");
  const churchData = institutionSchema("church");
  assert.equal(schoolData["@type"], "School");
  assert.equal(schoolData.foundingDate, "1994");
  assert.equal(schoolData.telephone, "+234 814 082 3524");
  assert.equal(schoolData.url, undefined);
  assert.equal(churchData["@type"], "Church");
  assert.equal(churchData.telephone, undefined);
  assert.equal(churchData.address, undefined);
});

test("social cards separate school and church assets without a guessed domain", () => {
  assert.equal(socialCardFor("/school/gallery").file, "school-gallery");
  assert.equal(socialCardFor("/church").church, true);
  const metadata = pageMetadata("Church", "Church information", "/church");
  assert.equal(metadata.openGraph?.images, undefined);
  assert.ok(metadata.twitter && "card" in metadata.twitter);
  assert.equal(metadata.twitter.card, "summary_large_image");
});

test("an approved origin produces matching canonical and absolute social image URLs", () => {
  const metadata = pageMetadata(
    "Our story",
    "School history",
    "/school/about",
    { origin: "https://school.example.invalid", ready: true },
  );
  assert.deepEqual(metadata.alternates, {
    canonical: "https://school.example.invalid/school/about",
  });
  assert.deepEqual(metadata.robots, { index: true, follow: true });
  assert.deepEqual(metadata.openGraph?.images, [
    {
      url: "https://school.example.invalid/social/school-story.png",
      width: 1200,
      height: 630,
      alt: "Small beginnings. A meaningful story.",
    },
  ]);
});

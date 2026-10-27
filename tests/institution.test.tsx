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
    assert.match(html, /Official contact details have not yet been published/);
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

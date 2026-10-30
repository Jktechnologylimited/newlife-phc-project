import { Phone, ArrowUpRight } from "lucide-react";
import { school, telephoneHref, whatsappHref } from "@/lib/institution";
import {
  PageIntro,
  ContactLinks,
  InstitutionImage,
} from "@/components/institution/sections";
import { WhatsappGlyph } from "@/components/icons/social";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "School Contact & Enquiries",
  "Contact Newlife Baptist Schools in Rumueme, Port Harcourt. Call or WhatsApp +234 814 082 3524 for school enquiries.",
  "/school/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="We would love to hear from you"
        title="Let’s begin a conversation."
      >
        <p>
          Have a question about Newlife Baptist Schools? A call or a message is a
          good place to start.
        </p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap contact-page-grid">
          <div>
            <p className="eyebrow">School enquiries</p>
            <h2 className="section-title">Get in touch.</h2>
            <div className="contact-actions">
              {school.telephone && (
                <a
                  href={telephoneHref(school.telephone)}
                  className="button-primary"
                >
                  <Phone size={18} aria-hidden="true" />
                  Call the school
                </a>
              )}
              {school.whatsapp && (
                <a
                  href={whatsappHref(school.whatsapp, school.name)}
                  className="button-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappGlyph className="h-5 w-5" />
                  WhatsApp
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}
            </div>
            <ContactLinks institution={school} />
            <div className="visit-note">
              <h2>Planning a school visit?</h2>
              <p>
                Please call or WhatsApp the school to confirm the exact location
                and arrange your visit before travelling. Our school number is
                for school enquiries.
              </p>
            </div>
          </div>
          <InstitutionImage photo={school.photos[2]} />
        </div>
      </section>
    </>
  );
}

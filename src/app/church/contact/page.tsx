import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { church } from "@/lib/institution";
import { PageIntro, ContactLinks } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Church Enquiries",
  "Information for church enquiries at Newlife Baptist Church. School and church contact information are kept separate.",
  "/church/contact",
);
export default function ChurchContact() {
  const hasContact = Boolean(
    church.telephone || church.whatsapp || church.email || church.address,
  );
  return (
    <>
      <PageIntro
        eyebrow="Newlife Baptist Church"
        title="Connecting with the church."
      >
        <p>A shared history, with separate school and church enquiries.</p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap academic-grid">
          <div>
            <p className="eyebrow">Church enquiries</p>
            <h2 className="section-title">Before your visit.</h2>
            <p className="section-copy">
              Please confirm worship arrangements and the meeting location
              directly with the church before travelling. The telephone and
              WhatsApp number on the school pages are for school enquiries.
            </p>
            {hasContact && (
              <div className="mt-8">
                <ContactLinks institution={church} />
              </div>
            )}
            <Link className="text-link" href="/church">
              Explore the church <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="academic-motto">
            <p className="eyebrow light">Looking for the school?</p>
            <h2 className="section-title">School enquiries.</h2>
            <p className="section-copy">
              If your question is about Newlife Baptist School, its academic
              levels or a school visit, contact the school team.
            </p>
            <Link href="/school/contact" className="text-link light">
              Contact the school <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

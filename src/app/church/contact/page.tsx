import { church } from "@/lib/institution";
import { PageIntro, ContactLinks } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Contact the Church",
  "Contact information and enquiries for Newlife Baptist Church.",
  "/church/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Enquiries" title="Contact the Church">
        <p>{church.name}</p>
      </PageIntro>
      <section className="institution-wrap grid gap-10 pb-24 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper-dim p-7 sm:p-10">
          <h2 className="mb-6 font-display text-2xl">Get in touch</h2>
          <ContactLinks institution={church} />
        </div>
        <div className="py-4">
          <h2 className="font-display text-2xl">
            {church.shortName === "The school"
              ? "School enquiries"
              : "Planning a visit?"}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-slate">
            Please confirm service times and the meeting location with the
            church before travelling. School and church contact details are
            listed separately.
          </p>
        </div>
      </section>
    </>
  );
}

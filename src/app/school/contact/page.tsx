import { school } from "@/lib/institution";
import { PageIntro, ContactLinks } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Contact the School",
  "Contact information and enquiries for Newlife Baptist School.",
  "/school/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Enquiries" title="Contact the School">
        <p>{school.name}</p>
      </PageIntro>
      <section className="institution-wrap grid gap-10 pb-24 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper-dim p-7 sm:p-10">
          <h2 className="mb-6 font-display text-2xl">Get in touch</h2>
          <ContactLinks institution={school} />
        </div>
        <div className="py-4">
          <h2 className="font-display text-2xl">
            {school.shortName === "the school"
              ? "School enquiries"
              : "Planning a visit?"}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-slate">
            For questions about academic levels, admissions and visiting the
            school, please include the information you would like to discuss
            when contacting the school.
          </p>
        </div>
      </section>
    </>
  );
}

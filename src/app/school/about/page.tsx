import { school } from "@/lib/institution";
import { PageIntro, EnquirySection } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "About the School",
  "Discover the story of Newlife Baptist School: founded in 1994 by Sister Doris Abili, with four children, and owned by Newlife Baptist Church since 1996.",
  "/school/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Our story" title={school.name}>
        <p>{school.motto}</p>
        <p className="mt-3 text-base">
          Established in 1994 · {school.locality}
        </p>
      </PageIntro>
      <section className="institution-wrap pb-16">
        <h2 className="mb-6 font-display text-3xl">
          From four children to a shared school community
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
          {school.story.length ? (
            school.story.map((p) => <p key={p}>{p}</p>)
          ) : (
            <p>
              Our official history and institutional information will be shared
              here once approved by the school. In the meantime, visit our
              contact page for the latest enquiry information.
            </p>
          )}
        </div>
        {school.mission && (
          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl">Our mission</h2>
            <p className="mt-4 leading-relaxed text-slate">{school.mission}</p>
          </div>
        )}
        {school.vision && (
          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-2xl">Our vision</h2>
            <p className="mt-4 leading-relaxed text-slate">{school.vision}</p>
          </div>
        )}
      </section>
      <EnquirySection institution={school} href="/school/contact" />
    </>
  );
}

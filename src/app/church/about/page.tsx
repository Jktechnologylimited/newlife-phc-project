import { church } from "@/lib/institution";
import { PageIntro, EnquirySection } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "About the Church",
  "Learn about Newlife Baptist Church and find information for your enquiries.",
  "/church/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Newlife" title={church.name} />
      <section className="institution-wrap pb-16">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate">
          {church.story.length ? (
            church.story.map((p) => <p key={p}>{p}</p>)
          ) : (
            <p>
              Our official history and institutional information will be shared
              here once approved by the church. In the meantime, visit our
              contact page for the latest enquiry information.
            </p>
          )}
        </div>
        {church.mission && (
          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl">Our mission</h2>
            <p className="mt-4 leading-relaxed text-slate">{church.mission}</p>
          </div>
        )}
        {church.vision && (
          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-2xl">Our vision</h2>
            <p className="mt-4 leading-relaxed text-slate">{church.vision}</p>
          </div>
        )}
      </section>
      <EnquirySection institution={church} href="/church/contact" />
    </>
  );
}

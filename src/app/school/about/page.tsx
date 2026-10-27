import { school, schoolMilestones } from "@/lib/institution";
import {
  PageIntro,
  EnquirySection,
  InstitutionImage,
} from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Our School Story",
  "The story of Newlife Baptist School, Rumueme: Sister Doris Abili’s vision in 1994, four first children and a lasting connection with Newlife Baptist Church.",
  "/school/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title="A small beginning. A lasting connection."
      >
        <p>
          The story of Newlife Baptist School, Rumueme, Port Harcourt. Learning
          and growing in God since 1994.
        </p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap">
          <div className="story-introduction">
            <InstitutionImage photo={school.photos[1]} />
            <div className="story-paragraphs">
              <h2 className="section-title">
                It began with
                <br />
                <em>a vision.</em>
              </h2>
              {school.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ol className="milestones" aria-label="School history milestones">
            {schoolMilestones.map((m) => (
              <li key={m.year}>
                <time dateTime={m.year}>{m.year}</time>
                <p>{m.description}</p>
              </li>
            ))}
          </ol>
          {school.mission && (
            <div className="mt-12">
              <h2 className="section-title">Our mission</h2>
              <p className="section-copy">{school.mission}</p>
            </div>
          )}
          {school.vision && (
            <div className="mt-12">
              <h2 className="section-title">Our vision</h2>
              <p className="section-copy">{school.vision}</p>
            </div>
          )}
        </div>
      </section>
      <EnquirySection institution={school} href="/school/contact" />
    </>
  );
}

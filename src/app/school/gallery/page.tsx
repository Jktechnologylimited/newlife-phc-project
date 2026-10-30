import { school } from "@/lib/institution";
import { PageIntro, EnquirySection } from "@/components/institution/sections";
import { Gallery } from "@/components/institution/gallery";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Around Our School",
  "Explore photographs of Newlife Baptist Schools’ buildings, entrance and courtyard in Rumueme, Port Harcourt.",
  "/school/gallery",
);
export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="A sense of place" title="A closer look at Newlife.">
        <p>
          Our school buildings and surroundings in Rumueme, Port Harcourt.
          Select a photograph to take a closer look.
        </p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap">
          <Gallery photos={school.photos} />
        </div>
      </section>
      <EnquirySection institution={school} href="/school/contact" />
    </>
  );
}

import { school } from "@/lib/institution";
import { PageIntro } from "@/components/institution/sections";
import { Gallery } from "@/components/institution/gallery";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "School Gallery",
  "Photographs from Newlife Baptist School, published with the school's approval.",
  "/school/gallery",
);
export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="School life" title="The school gallery" />
      <section className="institution-wrap pb-24">
        {school.photos.length ? (
          <Gallery photos={school.photos} />
        ) : (
          <p className="max-w-2xl leading-relaxed text-slate">
            Photographs of Newlife Baptist School will appear here once supplied
            and approved for publication. We do not use stock photographs to
            represent our school.
          </p>
        )}
      </section>
    </>
  );
}

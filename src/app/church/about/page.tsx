import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { church } from "@/lib/institution";
import { PageIntro } from "@/components/institution/sections";
import { BrandMark } from "@/components/brand/mark";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Our Church & School Story",
  "Learn how Newlife Baptist Church supported the beginnings of Newlife Baptist Schools in 1994 and took ownership in 1996.",
  "/church/about",
);
export default function ChurchAbout() {
  return (
    <>
      <PageIntro eyebrow="Our shared story" title="Faith at the beginning.">
        <p>
          Newlife Baptist Church and the school share a history that began with
          a small building and four children.
        </p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap church-story-grid">
          <div>
            <p className="eyebrow">Church &amp; school</p>
            <h2 className="section-title">
              A place for
              <br />
              <em>a new beginning.</em>
            </h2>
            <div className="story-paragraphs">
              {church.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href="/school/about" className="text-link">
              Read the complete school history{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="church-crest-panel">
            <BrandMark size={240} />
            <p>Newlife Baptist Church</p>
          </div>
        </div>
      </section>
    </>
  );
}

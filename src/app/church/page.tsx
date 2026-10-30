import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { church } from "@/lib/institution";
import {
  InstitutionHero,
  EnquirySection,
} from "@/components/institution/sections";
import { Gallery } from "@/components/institution/gallery";
import { StructuredData } from "@/components/institution/structured-data";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Newlife Baptist Church",
  "Discover Newlife Baptist Church and its connection with Newlife Baptist Schools: a shared story of faith and education.",
  "/church",
);
export default function ChurchPage() {
  return (
    <>
      <StructuredData kind="church" />
      <InstitutionHero institution={church} church />
      <section className="section-space">
        <div className="institution-wrap church-story-grid">
          <div>
            <p className="eyebrow">Faith &amp; education</p>
            <h2 className="section-title">
              A shared beginning.
              <br />
              <em>A continuing connection.</em>
            </h2>
            <p className="section-copy">
              The school’s story began in the church’s small building. With the
              church’s permission, Sister Doris Abili established Newlife
              Baptist Schools in 1994.
            </p>
            <p className="section-copy">
              In 1996, Newlife Baptist Church formally took ownership of the
              school. That history connects the two institutions today.
            </p>
            <Link href="/church/about" className="text-link">
              Our church &amp; school story{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <blockquote className="church-quote">
            Four children. A small church building. The beginning of the Newlife
            school story.
          </blockquote>
        </div>
      </section>
      {church.beliefs.length > 0 && (
        <section className="institution-wrap pb-16">
          <p className="eyebrow">What we believe</p>
          <h2 className="section-title">Our beliefs</h2>
          <ul className="mt-8 space-y-5">
            {church.beliefs.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}
      {church.services.length > 0 && (
        <section className="institution-wrap pb-16">
          <h2 className="section-title">Worship with us</h2>
          <ul className="mt-8 space-y-5">
            {church.services.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong> · {s.time}
              </li>
            ))}
          </ul>
        </section>
      )}
      {church.photos.length > 0 && (
        <section className="section-space institution-wrap">
          <h2 className="section-title mb-8">Church life</h2>
          <Gallery photos={church.photos} />
        </section>
      )}
      <section className="history-section">
        <div className="institution-wrap section-heading-row mb-0">
          <div>
            <p className="eyebrow">Discover our school</p>
            <h2 className="section-title">
              Learning and
              <br />
              <em>Growing in God.</em>
            </h2>
            <p className="section-copy">
              Explore the school at the heart of this shared story.
            </p>
          </div>
          <Link href="/" className="button-primary">
            Visit Newlife Baptist Schools{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <EnquirySection institution={church} href="/church/contact" />
    </>
  );
}

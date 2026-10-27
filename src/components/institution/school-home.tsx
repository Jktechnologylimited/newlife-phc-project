import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { school, church } from "@/lib/institution";
import { InstitutionHero, EnquirySection, InstitutionImage } from "./sections";
import { Gallery } from "./gallery";
export function SchoolHome() {
  return (
    <>
      <InstitutionHero institution={school} />
      <section className="institution-wrap grid gap-10 py-16 sm:py-24 md:grid-cols-2">
        <div>
          <p className="eyebrow">Welcome to our school</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl sm:text-4xl">
            Get to know Newlife.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-slate">
          {school.story.length ? (
            school.story.slice(0, 2).map((p) => <p key={p}>{p}</p>)
          ) : (
            <p>
              Choosing a school begins with a conversation. Explore Newlife
              Baptist School and use our school information pages to guide your
              enquiries.
            </p>
          )}
          <Link
            className="inline-flex items-center gap-2 text-base font-medium text-ink underline underline-offset-4"
            href="/school/about"
          >
            About the school <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        {school.photos[0] && (
          <div className="md:col-span-2">
            <InstitutionImage photo={school.photos[0]} />
          </div>
        )}
      </section>
      {school.programmes.length > 0 && (
        <section className="bg-paper-dim">
          <div className="institution-wrap py-16">
            <p className="eyebrow">The academic experience</p>
            <h2 className="mt-4 font-display text-3xl">Learning at Newlife</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {school.programmes.map((p) => (
                <article key={p.title} className="rounded-2xl bg-paper p-7">
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate">
                    {p.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {school.photos.length > 0 && (
        <section className="institution-wrap py-16">
          <p className="eyebrow">School life</p>
          <h2 className="my-5 font-display text-3xl">
            A closer look at Newlife
          </h2>
          <Gallery photos={school.photos.slice(0, 4)} />
          <Link
            className="mt-7 inline-block underline underline-offset-4"
            href="/school/gallery"
          >
            Explore the gallery
          </Link>
        </section>
      )}
      <EnquirySection institution={school} href="/school/contact" />
      <section className="border-t border-line bg-church-tint/40">
        <div className="institution-wrap flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Also at Newlife</p>
            <h2 className="mt-3 font-display text-2xl">{church.name}</h2>
            <p className="mt-3 max-w-lg leading-relaxed text-slate">
              Discover the church section, with information for visitors and the
              congregation.
            </p>
          </div>
          <Link
            className="site-button shrink-0 bg-church-deep text-paper hover:bg-ink"
            href="/church"
          >
            Visit the church <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

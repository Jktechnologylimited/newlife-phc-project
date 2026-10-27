import Link from "next/link";
import { school } from "@/lib/institution";
import { PageIntro } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Academics",
  "Academic information and programme enquiries for Newlife Baptist School.",
  "/school/academics",
);
export default function AcademicsPage() {
  return (
    <>
      <PageIntro eyebrow="Learning at Newlife" title="Academic information">
        <p>Find out about the school’s educational programmes.</p>
      </PageIntro>
      <section className="institution-wrap pb-24">
        {school.programmes.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {school.programmes.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-line p-8"
              >
                <h2 className="font-display text-2xl">{p.title}</h2>
                <p className="mt-4 leading-relaxed text-slate">
                  {p.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl">Ask the school</h2>
            <p className="mt-5 leading-relaxed text-slate">
              Please confirm available academic levels, curriculum and entry
              requirements directly with the school. Programme details will be
              published once the school has approved them.
            </p>
          </div>
        )}
        <Link
          href="/school/contact"
          className="site-button mt-8 bg-ink text-paper"
        >
          Contact the School
        </Link>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { school, whatsappHref } from "@/lib/institution";
import { PageIntro, EnquirySection } from "@/components/institution/sections";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Learning at Newlife",
  "Learning and Growing in God. Explore the educational foundation of Newlife Baptist Schools and enquire about current academic levels, curriculum and admissions.",
  "/school/academics",
);
export default function AcademicsPage() {
  return (
    <>
      <PageIntro
        eyebrow="The educational experience"
        title="Learning. Growing. In God."
      >
        <p>
          Our school’s motto brings together education and faith. It is a simple
          expression of Newlife’s identity.
        </p>
      </PageIntro>
      <section className="section-space">
        <div className="institution-wrap academic-grid">
          <div>
            <p className="eyebrow">Our foundation</p>
            <h2 className="section-title">
              A school with
              <br />
              <em>a meaningful beginning.</em>
            </h2>
            <p className="section-copy">
              Newlife began as a nursery and primary school in 1994, established
              by Sister Doris Abili with the support of Newlife Baptist Church.
            </p>
            <p className="section-copy">
              Looking for the right next step for your child? Contact the school
              for current academic levels, curriculum information and entry
              requirements.
            </p>
            {school.programmes.length > 0 ? (
              <div className="mt-8">
                {school.programmes.map((p) => (
                  <article key={p.title} className="programme-line">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                  </article>
                ))}
              </div>
            ) : (
              <ul
                className="academic-enquiries"
                aria-label="Topics to discuss with the school"
              >
                <li>
                  Current academic levels <span>Enquire with us</span>
                </li>
                <li>
                  Curriculum &amp; learning <span>Enquire with us</span>
                </li>
                <li>
                  Entry requirements <span>Enquire with us</span>
                </li>
              </ul>
            )}
            <Link href="/school/contact" className="text-link">
              Speak with the school{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <aside className="academic-motto">
            <BookOpen size={38} strokeWidth={1} aria-hidden="true" />
            <p className="section-title">“{school.motto}”</p>
            <p className="section-copy">The Newlife Baptist Schools motto.</p>
            {school.whatsapp && (
              <a
                href={whatsappHref(school.whatsapp, school.name)}
                className="text-link light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Make a school enquiry{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </aside>
        </div>
      </section>
      <EnquirySection institution={school} href="/school/contact" />
    </>
  );
}

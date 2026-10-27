import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { school, church } from "@/lib/institution";
import { InstitutionHero, EnquirySection, InstitutionImage } from "./sections";
import { Gallery } from "./gallery";
import { StructuredData } from "./structured-data";

export function SchoolHome() {
  return (
    <>
      <StructuredData kind="school" />
      <InstitutionHero institution={school} />
      <section className="section-space" id="welcome">
        <div className="institution-wrap welcome-grid">
          <div className="welcome-photo">
            <InstitutionImage photo={school.photos[2]} />
            <div className="photo-year">
              <span>Our story began</span>
              <strong>1994</strong>
            </div>
          </div>
          <div className="welcome-copy">
            <p className="eyebrow">Welcome to Newlife</p>
            <h2 className="section-title">
              Small beginnings.
              <br />
              <em>A meaningful story.</em>
            </h2>
            <p className="section-copy">
              In 1994, Sister Doris Abili had a vision: to establish a nursery
              and primary school with the support of Newlife Baptist Church.
            </p>
            <p className="section-copy">
              Four children, a small church building, and a dedicated team of
              teachers marked the beginning of Newlife Baptist School in
              Rumueme, Port Harcourt.
            </p>
            <Link className="text-link" href="/school/about">
              Get to know our school <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="education-section section-space">
        <div className="institution-wrap education-grid">
          <div>
            <p className="eyebrow light">The educational experience</p>
            <h2 className="section-title">
              Learning with
              <br />
              <em>faith at the heart.</em>
            </h2>
          </div>
          <div>
            <BookOpen
              className="education-icon"
              size={36}
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="education-motto">“{school.motto}”</p>
            <p className="section-copy">
              Our school’s motto expresses the connection between learning and
              faith that is part of Newlife’s identity.
            </p>
            {school.programmes.length > 0 ? (
              school.programmes.map((programme) => (
                <div key={programme.title} className="programme-line">
                  <h3>{programme.title}</h3>
                  <p>{programme.description}</p>
                </div>
              ))
            ) : (
              <p className="section-copy">
                For current academic levels, curriculum and entry requirements,
                speak with the school directly. We will help you find the
                information you need.
              </p>
            )}
            <Link className="text-link light" href="/school/academics">
              Explore academic enquiries{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="institution-wrap">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">A sense of place</p>
              <h2 className="section-title">
                Take a look
                <br />
                <em>around Newlife.</em>
              </h2>
            </div>
            <div>
              <p className="section-copy">
                A closer look at our school buildings
                <br className="hidden sm:block" /> and surroundings in Rumueme.
              </p>
              <Link className="text-link" href="/school/gallery">
                View the gallery <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Gallery photos={school.photos} editorial />
        </div>
      </section>
      <section className="history-section">
        <div className="institution-wrap history-grid">
          <div className="history-numeral" aria-hidden="true">
            1994<span>Where our story starts</span>
          </div>
          <div>
            <p className="eyebrow">Our story, our foundation</p>
            <h2 className="section-title">
              A vision that
              <br />
              <em>brought us together.</em>
            </h2>
            <p className="section-copy">
              From the first four children to church ownership in 1996 and the
              formation of the Parent–Teacher Association in 1999, our history
              is shaped by the people who helped Newlife begin.
            </p>
            <Link className="text-link" href="/school/about">
              Read our full story <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="church-introduction">
        <div className="institution-wrap church-introduction-grid">
          <span className="church-section-number" aria-hidden="true">
            Faith.
            <br />
            Community.
          </span>
          <div>
            <p className="eyebrow light">Our church connection</p>
            <h2 className="section-title">{church.name}</h2>
            <p className="section-copy">
              Newlife Baptist Church welcomed the school into its premises at
              the beginning and formally took ownership in 1996. Discover the
              church behind this shared story.
            </p>
            <Link className="text-link light" href="/church">
              Explore Our Church <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <EnquirySection institution={school} href="/school/contact" />
    </>
  );
}

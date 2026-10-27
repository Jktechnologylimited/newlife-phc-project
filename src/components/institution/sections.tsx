import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { BrandMark } from "@/components/brand/mark";
import {
  telephoneHref,
  whatsappHref,
  type Institution,
  type InstitutionPhoto,
} from "@/lib/institution";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="institution-wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-title">{title}</h1>
        {children && <div className="page-intro-copy">{children}</div>}
      </div>
    </section>
  );
}

export function ContactLinks({ institution }: { institution: Institution }) {
  return (
    <div className="contact-details">
      {institution.telephone && (
        <a
          className="contact-detail"
          href={telephoneHref(institution.telephone)}
        >
          <Phone size={20} aria-hidden="true" />
          <span>
            <span className="contact-detail-label">Telephone</span>
            {institution.telephone}
          </span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {institution.whatsapp && (
        <a
          className="contact-detail"
          href={whatsappHref(institution.whatsapp, institution.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>
            <span className="contact-detail-label">Official WhatsApp</span>
            Enquire on WhatsApp
          </span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {institution.email && (
        <a className="contact-detail" href={`mailto:${institution.email}`}>
          <Mail size={20} aria-hidden="true" />
          <span>
            <span className="contact-detail-label">Email</span>
            {institution.email}
          </span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {(institution.address || institution.locality) && (
        <div className="contact-detail">
          <MapPin size={20} aria-hidden="true" />
          <span>
            <span className="contact-detail-label">
              {institution.address ? "Find us" : "Our community"}
            </span>
            {institution.address ?? institution.locality}
          </span>
        </div>
      )}
      {institution.mapUrl && (
        <a
          className="text-link"
          href={institution.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function InstitutionHero({
  institution,
  church = false,
}: {
  institution: Institution;
  church?: boolean;
}) {
  if (church)
    return (
      <section className="church-hero">
        <div className="institution-wrap church-hero-grid">
          <div>
            <p className="eyebrow light">Welcome to the church</p>
            <h1 className="display-title">
              Newlife
              <br />
              Baptist Church<span className="gold-dot">.</span>
            </h1>
            <p className="hero-description">
              A church and a school. A shared story, rooted in faith.
            </p>
            <div className="hero-actions">
              <Link href="/church/about" className="button-gold">
                Discover our story <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/" className="button-outline light">
                Visit the school <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="church-crest-panel">
            <span className="crest-halo">
              <BrandMark size={210} />
            </span>
            <p>Newlife Baptist Church</p>
            <span>Faith &amp; community</span>
          </div>
        </div>
        <div className="hero-bottom institution-wrap">
          <span>Part of the Newlife story</span>
          <span>Church &amp; school, connected</span>
        </div>
      </section>
    );
  return (
    <section className="premium-hero">
      {institution.hero && (
        <Image
          src={institution.hero.src}
          alt={institution.hero.alt}
          fill
          sizes="100vw"
          preload
          className="premium-hero-photo"
        />
      )}
      <div className="premium-hero-shade" />
      <div className="institution-wrap premium-hero-content">
        <p className="eyebrow light">
          {institution.name} <span className="hero-label-rule" /> Since 1994
        </p>
        <h1 className="display-title">
          Learning.
          <br />
          Growing.
          <br />
          <em>In God.</em>
        </h1>
        <p className="hero-description">
          A story that began with four children.
          <br className="hidden sm:block" /> A school with faith at its heart.
        </p>
        <div className="hero-actions">
          <Link href="/school/contact" className="button-gold">
            Enquire About the School{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/school/about" className="button-outline light">
            Discover Newlife <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="hero-bottom institution-wrap">
        <span>{institution.locality}</span>
      </div>
    </section>
  );
}

export function InstitutionImage({
  photo,
  priority = false,
  className = "",
}: {
  photo: InstitutionPhoto;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`institution-photo ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 768px) 100vw, 50vw"
        preload={priority}
      />
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

export function EnquirySection({
  institution,
  href,
}: {
  institution: Institution;
  href: string;
}) {
  if (
    !institution.telephone &&
    !institution.whatsapp &&
    !institution.email &&
    !institution.address
  )
    return null;
  return (
    <section className="enquiry-section" id="enquiries">
      <div className="institution-wrap enquiry-grid">
        <div>
          <p className="eyebrow">Your next step</p>
          <h2 className="section-title">
            Let’s begin
            <br />
            <em>a conversation.</em>
          </h2>
          <p className="section-copy">
            Questions about {institution.shortName}? We would love to hear from
            you. Call or send a WhatsApp enquiry to get in touch.
          </p>
          <Link href={href} className="text-link">
            Contact {institution.shortName}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="enquiry-details">
          <ContactLinks institution={institution} />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
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
    <section className="institution-wrap py-16 sm:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-display-md sm:text-display-lg text-balance">
        {title}
      </h1>
      {children && (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
          {children}
        </div>
      )}
    </section>
  );
}
export function ContactLinks({ institution }: { institution: Institution }) {
  const hasContact =
    institution.telephone ||
    institution.whatsapp ||
    institution.email ||
    institution.address ||
    institution.mapUrl;
  return (
    <div className="space-y-5">
      {institution.telephone && (
        <a className="contact-link" href={telephoneHref(institution.telephone)}>
          <Phone size={20} aria-hidden="true" />
          <span>{institution.telephone}</span>
        </a>
      )}
      {institution.whatsapp && (
        <a
          className="contact-link"
          href={whatsappHref(institution.whatsapp, institution.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>Enquire on WhatsApp</span>
        </a>
      )}
      {institution.email && (
        <a className="contact-link" href={`mailto:${institution.email}`}>
          <Mail size={20} aria-hidden="true" />
          <span className="break-all">{institution.email}</span>
        </a>
      )}
      {institution.address && (
        <p className="contact-link">
          <MapPin size={20} aria-hidden="true" />
          <span>{institution.address}</span>
        </p>
      )}
      {institution.mapUrl && (
        <a
          className="contact-link underline underline-offset-4"
          href={institution.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions <ArrowRight size={18} aria-hidden="true" />
        </a>
      )}
      {!hasContact && (
        <p className="max-w-xl leading-relaxed text-slate">
          Official contact details have not yet been published. Telephone,
          WhatsApp and location information will appear here once confirmed by{" "}
          {institution.shortName}.
        </p>
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
  return (
    <section
      className={church ? "bg-church-deep text-paper" : "bg-ink text-paper"}
    >
      <div className="institution-wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/75">
            {church ? "Faith & community" : "Welcome to Newlife"}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.75rem] leading-[1.08] sm:text-[4rem] text-balance">
            {institution.name}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/80">
            {institution.introduction ??
              (church
                ? "Welcome to the church section of Newlife. Find church information and keep in touch with the congregation."
                : "A place to begin your family's next chapter. Get to know our school and find the information you need for your child's education.")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="site-button bg-school text-ink hover:bg-school-tint"
              href={church ? "/church/contact" : "/school/contact"}
            >
              Contact {church ? "the Church" : "the School"}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              className="site-button border border-paper/40 hover:bg-paper/10"
              href={church ? "/church/about" : "/school/about"}
            >
              Learn About Us
            </Link>
          </div>
        </div>
        {institution.hero ? (
          <InstitutionImage photo={institution.hero} priority />
        ) : (
          <div
            className="flex min-h-64 items-center justify-center rounded-t-[7rem] rounded-b-2xl border border-paper/15 bg-paper/5 py-14"
            aria-label="Newlife identity"
          >
            <BrandMark size={180} />
          </div>
        )}
      </div>
    </section>
  );
}
export function InstitutionImage({
  photo,
  priority = false,
}: {
  photo: InstitutionPhoto;
  priority?: boolean;
}) {
  return (
    <figure>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
      {photo.caption && (
        <figcaption className="mt-3 text-sm text-slate">
          {photo.caption}
        </figcaption>
      )}
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
  return (
    <section className="institution-wrap py-16 sm:py-24">
      <div className="grid gap-8 rounded-3xl border border-line bg-paper-dim p-7 sm:p-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Let’s keep in touch</p>
          <h2 className="mt-4 font-display text-3xl">
            Have a question for {institution.shortName}?
          </h2>
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 font-medium underline underline-offset-4"
          >
            Contact information
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ContactLinks institution={institution} />
      </div>
    </section>
  );
}

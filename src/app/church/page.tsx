import { church } from "@/lib/institution";
import {
  InstitutionHero,
  EnquirySection,
} from "@/components/institution/sections";
import { Gallery } from "@/components/institution/gallery";
import { pageMetadata } from "@/lib/site-metadata";
export const metadata = pageMetadata(
  "Newlife Baptist Church",
  "Welcome to Newlife Baptist Church. Find church information and contact details for your visit.",
  "/church",
);
export default function ChurchPage() {
  return (
    <>
      <InstitutionHero institution={church} church />
      <section className="institution-wrap grid gap-10 py-16 md:grid-cols-2">
        <div>
          <p className="eyebrow">Welcome to the church</p>
          <h2 className="mt-4 font-display text-3xl">Newlife Baptist Church</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-slate">
          {church.story.length ? (
            church.story.map((p) => <p key={p}>{p}</p>)
          ) : (
            <p>
              Thank you for visiting the church section of Newlife. Official
              church history and information will be shared here as they become
              available.
            </p>
          )}
        </div>
      </section>
      {church.beliefs.length > 0 && (
        <section className="institution-wrap pb-16">
          <h2 className="font-display text-3xl">Our beliefs</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5">
            {church.beliefs.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="bg-church-tint/50">
        <div className="institution-wrap py-14">
          <h2 className="font-display text-3xl">Worship & visiting</h2>
          {church.services.length ? (
            <ul className="mt-6 space-y-3">
              {church.services.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong> · {s.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 max-w-xl leading-relaxed text-slate">
              Please confirm worship times and the meeting location with the
              church before planning your visit.
            </p>
          )}
        </div>
      </section>
      {church.photos.length > 0 && (
        <section className="institution-wrap py-16">
          <h2 className="mb-8 font-display text-3xl">Church life</h2>
          <Gallery photos={church.photos} />
        </section>
      )}
      <EnquirySection institution={church} href="/church/contact" />
    </>
  );
}

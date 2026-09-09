import Link from "next/link";
import type { Metadata } from "next";
import { BookOpenCheck, Users2, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export const metadata: Metadata = { title: "About the School" };

const values = [
  { Icon: BookOpenCheck, title: "Academic excellence", desc: "A rigorous, well-rounded curriculum for every learner." },
  { Icon: Users2, title: "Real community", desc: "Small classes where every student is known by name." },
  { Icon: Sparkles, title: "Character first", desc: "Faith and integrity woven through every subject." },
];

export default function SchoolAboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-20">
        <p className="text-sm font-medium text-school-deep">About the school</p>
        <h1 className="mt-2 max-w-xl font-display text-display-md text-ink sm:text-display-lg">
          Our story, mission, and values
        </h1>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:items-center lg:px-8">
        <Reveal>
          <p className="font-display text-lg">Our story</p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-slate">
            Newlife Baptist Church School opened its doors in 2005 as a
            ministry of Newlife Baptist Church — one mission: give every
            child an excellent, Christ-centered education. We started with
            45 students, right there on the church&apos;s own campus.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-slate">
            Over 20 years later, we&apos;ve expanded to a full campus
            serving Nursery through Year 13 — but the mission, and our
            place within the church family, hasn&apos;t changed.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Photo src={photoUrl("schoolExterior")} alt={photoAlt("schoolExterior")} className="aspect-[4/3] rounded-2xl" />
        </Reveal>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {values.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="rounded-xl bg-paper p-5">
                  <Icon className="h-5 w-5 text-school-deep" />
                  <p className="mt-4 font-display text-lg">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl">See it for yourself</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/75">
              Numbers only tell part of the story — come tour the campus and
              meet our faculty.
            </p>
          </div>
          <Link
            href="/school/admissions#tour"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Book a tour
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Baby, BookOpen, GraduationCap, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { PhotoHero } from "@/components/patterns/photo-hero";
import { photoUrl, photoAlt } from "@/lib/photos";
import { getEvents } from "@/lib/data/content";

export const revalidate = 60; // re-fetch DB content at most once a minute

export const metadata: Metadata = { title: "School" };

const stages = [
  { Icon: Baby, label: "Nursery – Year 2", sub: "Ages 3–7" },
  { Icon: BookOpen, label: "Primary", sub: "Years 3–6" },
  { Icon: GraduationCap, label: "Secondary", sub: "Years 7–13" },
  { Icon: Building2, label: "Facilities", sub: "World-class campus" },
];

const reasons = [
  "Christ-centered education, academically rigorous",
  "Experienced, caring faculty who know every student's name",
  "Modern facilities built for hands-on learning",
  "Strong academic outcomes without losing the human scale",
];

export default async function SchoolHome() {
  const schoolEvents = (await getEvents("school")).slice(0, 3);

  return (
    <div>
      <PhotoHero src={photoUrl("schoolExterior")} alt={photoAlt("schoolExterior")}>
        <Stagger>
          <StaggerItem>
            <p className="text-sm font-medium text-school-tint">Newlife Baptist Church School</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-3 max-w-xl font-display text-display-md leading-[1.05] text-paper sm:text-display-lg">
              Small classes. Big character.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-paper/85">
              A Christ-centered education that nurtures the whole child —
              academically, socially, and spiritually — from nursery through
              graduation.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/school/admissions"
                className="rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                Apply now
              </Link>
              <Link
                href="/school/admissions#tour"
                className="rounded-full border border-paper/40 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
              >
                Schedule a tour
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </PhotoHero>

      {/* stages */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ Icon, label, sub }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-xl p-5">
                <Icon className="h-5 w-5 text-school-deep" />
                <p className="mt-4 font-display text-lg">{label}</p>
                <p className="mt-1 text-sm text-slate">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* why choose us */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:px-8">
          <Reveal>
            <p className="text-sm font-medium text-school-deep">Why choose us</p>
            <h2 className="mt-3 font-display text-3xl">
              A school where every child is known, valued, and challenged.
            </h2>
            <ul className="mt-6 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[0.95rem] text-ink/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href="/school/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              Learn our story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-paper p-7">
              <p className="font-display text-lg">Upcoming events</p>
              <div className="mt-4 divide-y divide-line">
                {schoolEvents.map((e) => (
                  <div key={e.title} className="flex items-center gap-4 py-3">
                    <div className="w-14 shrink-0 text-center">
                      <p className="text-xs font-medium text-school-deep">{e.date.split(" ")[0]}</p>
                      <p className="font-display text-xl leading-none">{e.date.split(" ")[1]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-slate">{e.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* join community CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl">Join our school community</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/75">
              Explore academics, meet our faculty, and see if Newlife
              Baptist Church School is the right fit for your family.
            </p>
          </div>
          <Link
            href="/school/admissions"
            className="shrink-0 rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Start your application
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

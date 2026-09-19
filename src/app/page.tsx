import Link from "next/link";
import {
  Church,
  BookOpen,
  ArrowRight,
  Clock,
  GraduationCap,
  DoorOpen,
  CalendarHeart,
} from "lucide-react";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { PhotoHero } from "@/components/patterns/photo-hero";
import { photoUrl, photoAlt } from "@/lib/photos";

const facts = [
  { Icon: Clock, label: "Sunday services at 9 & 11 AM" },
  { Icon: GraduationCap, label: "Nursery through Grade 12" },
  { Icon: DoorOpen, label: "One campus, two front doors" },
  { Icon: CalendarHeart, label: "Serving Port Harcourt since 1985" },
];

export default function GatewayPage() {
  return (
    <div>
      <PhotoHero src={photoUrl("churchExterior")} alt={photoAlt("churchExterior")}>
        <Stagger className="max-w-xl">
          <StaggerItem>
            <p className="text-sm text-paper/80">
              Founded 1985 · Port Harcourt, Nigeria
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-4 font-display text-display-md leading-[1.05] text-paper sm:text-display-lg">
              Church on Sunday.
              <br />
              School on Monday.
              <br />
              Family every day.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/85">
              Newlife Baptist Church and Newlife Baptist Church School share a
              campus, a congregation, and a conviction: faith and learning
              grow best in the same room.
            </p>
          </StaggerItem>
        </Stagger>
      </PhotoHero>

      {/* Two doors */}
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-4 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border-l-[3px] border-l-school bg-school-tint/40 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-school text-paper">
                <BookOpen className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-2xl">The School</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
                A Christ-centered education from nursery through graduation,
                built around small classes and big character.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink/70">
                <li>Academics</li>
                <li>Admissions</li>
                <li>Student life</li>
                <li>Apply</li>
              </ul>
              <Link
                href="/school"
                className="group mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                Visit the school
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl border-l-[3px] border-l-church bg-church-tint/40 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-church text-ink">
                <Church className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-2xl">The Church</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
                Worship, community, and a place to bring your whole self on
                Sunday morning — and any day after.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink/70">
                <li>Service times</li>
                <li>Ministries</li>
                <li>Sermons</li>
                <li>Give</li>
              </ul>
              <Link
                href="/church"
                className="group mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
              >
                Visit the church
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 lg:px-8">
          {facts.map(({ Icon, label }) => (
            <div key={label} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
              <p className="text-sm leading-snug text-ink/80">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl">New here?</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/75">
              Plan a Sunday visit or book a school tour — either way, someone
              will be waiting at the door for you.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/school/admissions"
              className="rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Book a tour
            </Link>
            <Link
              href="/church"
              className="rounded-full border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
            >
              Plan a visit
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

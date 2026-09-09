import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Users, CalendarDays, HandCoins, Play, ArrowRight } from "lucide-react";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";
import { sermons } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Church" };

const quickInfo = [
  { Icon: Clock, title: "Service times", desc: "Sundays · 9:00 & 11:00 AM", href: "/church#service-times" },
  { Icon: Users, title: "Our ministries", desc: "Find your place", href: "/church/ministries" },
  { Icon: CalendarDays, title: "Upcoming events", desc: "See what's next", href: "/church/events" },
  { Icon: HandCoins, title: "Give", desc: "Support the mission", href: "/church/give" },
];

export default function ChurchHome() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8 lg:pt-20">
        <Stagger className="max-w-xl">
          <StaggerItem>
            <p className="text-sm font-medium text-church-deep">New Life Baptist Church</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-4 text-balance font-display text-display-md text-ink sm:text-display-lg">
              You don&apos;t have to have it figured out to belong here.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-slate">
              We&apos;re a congregation of ordinary people, gathering twice
              every Sunday to worship, ask honest questions, and figure out
              this life of faith together.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/church/new-here"
                className="rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                Plan your visit
              </Link>
              <Link
                href="/church/sermons"
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Watch latest sermon
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
        <Reveal delay={0.15}>
          <Photo src={photoUrl("gathering")} alt={photoAlt("gathering")} className="aspect-[4/3] rounded-2xl" priority />
        </Reveal>
      </section>

      {/* quick info */}
      <section id="service-times" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickInfo.map(({ Icon, title, desc, href }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-line p-5 transition-colors hover:border-church"
              >
                <Icon className="h-5 w-5 text-church-deep" />
                <p className="mt-4 font-display text-lg">{title}</p>
                <p className="mt-1 text-sm text-slate">{desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* belong */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:px-8">
          <Reveal>
            <p className="text-sm font-medium text-church-deep">You belong here</p>
            <h2 className="mt-3 font-display text-3xl">
              A community of believers committed to worship, discipleship,
              service, and each other.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">
              Whether you&apos;ve been in church your whole life or you&apos;re
              curious and a little unsure, there&apos;s a seat with your name
              on it — no dress code, no small talk required.
            </p>
            <Link
              href="/church/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              Learn our story
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/church/sermons"
              className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-church-deep to-ink"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-ink transition-transform group-hover:scale-105">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              </span>
              <span className="absolute bottom-4 left-4 text-sm text-paper/85">
                Watch: Sunday Gathering
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* sermons */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl">Latest sermons</h2>
          <Link href="/church/sermons" className="text-sm font-medium text-ink underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {sermons.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link href={`/church/sermons/${s.slug}`} className="group block">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-stone to-paper-dim">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-sm transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  </span>
                </div>
                <p className="mt-3 font-display text-base leading-snug">{s.title}</p>
                <p className="mt-1 text-sm text-slate">
                  {s.speaker} · {s.date}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

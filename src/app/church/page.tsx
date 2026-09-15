import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Users, CalendarDays, HandCoins, Play, ArrowRight, BookOpen, Music } from "lucide-react";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { PhotoHero } from "@/components/patterns/photo-hero";
import { photoUrl, photoAlt } from "@/lib/photos";
import { getSermons, getBulletin } from "@/lib/data/content";

export const revalidate = 60; // re-fetch DB content at most once a minute

export const metadata: Metadata = { title: "Church" };

const quickInfo = [
  { Icon: Clock, title: "Service times", desc: "Sundays · 9:00 & 11:00 AM", href: "/church#service-times" },
  { Icon: Users, title: "Our ministries", desc: "Find your place", href: "/church/ministries" },
  { Icon: CalendarDays, title: "Upcoming events", desc: "See what's next", href: "/church/events" },
  { Icon: HandCoins, title: "Give", desc: "Support the mission", href: "/church/give" },
];

export default async function ChurchHome() {
  const [allSermons, bulletin] = await Promise.all([getSermons(), getBulletin()]);
  const sermons = allSermons.slice(0, 3);

  return (
    <div>
      <PhotoHero src={photoUrl("gathering")} alt={photoAlt("gathering")}>
        <Stagger>
          <StaggerItem>
            <p className="text-sm font-medium text-church-tint">Newlife Baptist Church</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-3 max-w-xl text-balance font-display text-display-md leading-[1.05] text-paper sm:text-display-lg">
              You don&apos;t have to have it figured out to belong here.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-paper/85">
              We&apos;re a congregation of ordinary people, gathering twice
              every Sunday to worship, ask honest questions, and figure out
              this life of faith together.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/church/new-here"
                className="rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                Plan your visit
              </Link>
              <Link
                href="/church/sermons"
                className="rounded-full border border-paper/40 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
              >
                Watch latest sermon
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </PhotoHero>

      {/* quick info */}
      <section id="service-times" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickInfo.map(({ Icon, title, desc, href }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl p-5 transition-colors hover:bg-church-tint/40"
              >
                <Icon className="h-5 w-5 text-church-deep" />
                <p className="mt-4 font-display text-lg">{title}</p>
                <p className="mt-1 text-sm text-slate">{desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* this sunday */}
      {bulletin && (
        <section className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-6 rounded-2xl bg-ink px-8 py-8 text-paper sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-church-tint">This Sunday</p>
              <h2 className="mt-1.5 font-display text-2xl">{bulletin.theme || "Join us this Sunday"}</h2>
              {bulletin.sermonTitle && (
                <p className="mt-1.5 text-sm text-paper/75">
                  {bulletin.sermonTitle}
                  {bulletin.sermonSpeaker ? ` — ${bulletin.sermonSpeaker}` : ""}
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/church/bulletin"
                className="flex items-center gap-1.5 rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                <BookOpen className="h-3.5 w-3.5" />
                View bulletin
              </Link>
              <Link
                href="/church/hymns"
                className="flex items-center gap-1.5 rounded-full border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
              >
                <Music className="h-3.5 w-3.5" />
                Hymns
              </Link>
            </div>
          </Reveal>
        </section>
      )}

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

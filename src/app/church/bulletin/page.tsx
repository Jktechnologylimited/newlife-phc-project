import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, Music, Megaphone } from "lucide-react";
import { getBulletin, getHymns } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";

export const revalidate = 60; // re-fetch DB content at most once a minute

export const metadata: Metadata = { title: "Sunday Bulletin" };

export default async function BulletinPage() {
  const [bulletin, allHymns] = await Promise.all([getBulletin(), getHymns()]);
  if (!bulletin) notFound();

  const serviceDate = new Date(`${bulletin.serviceDate}T00:00:00Z`);
  const formattedDate = serviceDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const hymnsForService = bulletin.hymnSlugs
    .map((slug) => allHymns.find((h) => h.slug === slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Sunday bulletin</p>
      <h1 className="mt-2 font-display text-4xl">{formattedDate}</h1>
      {bulletin.theme && <p className="mt-2 text-[1.05rem] text-slate">{bulletin.theme}</p>}

      {(bulletin.sermonTitle || bulletin.scripture) && (
        <Reveal className="mt-8 rounded-2xl bg-church-tint/40 p-6">
          {bulletin.sermonTitle && (
            <>
              <p className="text-xs font-medium text-church-deep">Today&apos;s message</p>
              <p className="mt-1 font-display text-2xl">{bulletin.sermonTitle}</p>
              {bulletin.sermonSpeaker && <p className="mt-1 text-sm text-slate">{bulletin.sermonSpeaker}</p>}
            </>
          )}
          {bulletin.scripture && (
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/80">
              <BookOpen className="h-4 w-4 shrink-0 text-church-deep" />
              {bulletin.scripture}
            </p>
          )}
        </Reveal>
      )}

      {bulletin.orderOfService.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl">Order of service</h2>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {bulletin.orderOfService.map((item, i) => (
              <li key={i} className="flex items-baseline gap-4 py-3">
                <span className="w-6 shrink-0 text-sm text-slate">{i + 1}.</span>
                <span className="flex-1">
                  <span className="font-medium">{item.title}</span>
                  {item.detail && <span className="text-slate"> — {item.detail}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {hymnsForService.length > 0 && (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Music className="h-5 w-5 text-church-deep" />
            Hymns
          </h2>
          <p className="mt-1.5 text-sm text-slate">Tap a hymn to see the full lyrics and sing along.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {hymnsForService.map((h) => (
              <Link
                key={h.slug}
                href={`/church/hymns/${h.slug}`}
                className="rounded-xl bg-paper-dim p-4 transition-colors hover:bg-stone/60"
              >
                <p className="font-display text-lg leading-snug">{h.title}</p>
                <p className="mt-0.5 text-xs text-slate">
                  {h.author}
                  {h.hymnNumber ? ` · No. ${h.hymnNumber}` : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {bulletin.announcements.length > 0 && (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Megaphone className="h-5 w-5 text-church-deep" />
            Announcements
          </h2>
          <div className="mt-5 space-y-4">
            {bulletin.announcements.map((a, i) => (
              <div key={i} className="rounded-xl bg-paper-dim p-4">
                <p className="font-medium">{a.title}</p>
                {a.detail && <p className="mt-1 text-sm text-slate">{a.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

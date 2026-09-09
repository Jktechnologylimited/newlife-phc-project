import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Play, Download, Share2 } from "lucide-react";
import { sermons } from "@/lib/sample-data";

export function generateStaticParams() {
  return sermons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  return { title: sermon ? sermon.title : "Sermon" };
}

export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) notFound();

  const related = sermons.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <Link
        href="/church/sermons"
        className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sermons
      </Link>

      <div className="relative mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-church-deep to-ink">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/90 text-ink">
          <Play className="ml-1 h-6 w-6" fill="currentColor" />
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{sermon.title}</h1>
          <p className="mt-1.5 text-sm text-slate">
            {sermon.speaker} · {sermon.date} · {sermon.duration}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm hover:border-ink">
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm hover:border-ink">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-slate">
        Discover the transformative power of prayer and how it can change
        your life, your family, and your community. This message walks
        through what it looks like to bring the whole of ordinary life
        honestly before God.
      </p>

      <div className="mt-12 border-t border-line pt-8">
        <p className="mb-4 font-display text-lg">Related sermons</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((s) => (
            <Link key={s.slug} href={`/church/sermons/${s.slug}`} className="group block">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-stone to-paper-dim">
                <Play className="h-5 w-5 text-ink/60" fill="currentColor" />
              </div>
              <p className="mt-2 text-sm font-medium leading-snug">{s.title}</p>
              <p className="text-xs text-slate">{s.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

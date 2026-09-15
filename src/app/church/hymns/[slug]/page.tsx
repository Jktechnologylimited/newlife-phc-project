import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { hymns as sampleHymns } from "@/lib/sample-data";
import { getHymnBySlug } from "@/lib/data/content";

export const revalidate = 60; // re-fetch DB content at most once a minute

export function generateStaticParams() {
  return sampleHymns.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hymn = await getHymnBySlug(slug);
  return { title: hymn ? hymn.title : "Hymn" };
}

export default async function HymnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hymn = await getHymnBySlug(slug);
  if (!hymn) notFound();

  // Standard hymn convention: chorus repeats after every verse when present.
  const sections: { label: string; text: string }[] = [];
  hymn.verses.forEach((verse, i) => {
    sections.push({ label: `Verse ${i + 1}`, text: verse });
    if (hymn.chorus) sections.push({ label: "Chorus", text: hymn.chorus });
  });

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
      <Link href="/church/hymns" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to hymns
      </Link>

      <h1 className="mt-6 font-display text-4xl">{hymn.title}</h1>
      <p className="mt-2 text-sm text-slate">
        {hymn.author}
        {hymn.year ? ` · ${hymn.year}` : ""}
        {hymn.hymnNumber ? ` · No. ${hymn.hymnNumber}` : ""}
      </p>
      {hymn.scripture && (
        <p className="mt-1 text-sm text-church-deep">{hymn.scripture}</p>
      )}

      <div className="mt-10 space-y-8">
        {sections.map((s, i) => (
          <div key={i}>
            <p className="mb-2 text-sm font-medium text-church-deep">{s.label}</p>
            <p className="whitespace-pre-line text-xl leading-relaxed text-ink">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

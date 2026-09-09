import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { schoolNews } from "@/lib/sample-data";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export function generateStaticParams() {
  return schoolNews.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = schoolNews.find((n) => n.slug === slug);
  return { title: article ? article.title : "News" };
}

export default async function SchoolNewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = schoolNews.find((n) => n.slug === slug);
  if (!article) notFound();

  const related = schoolNews.filter((n) => n.slug !== slug).slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <Link href="/school/news" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to news
      </Link>

      <Photo src={photoUrl("classroom")} alt={photoAlt("classroom")} className="mt-6 aspect-video rounded-2xl" />

      <p className="mt-6 text-sm text-slate">
        {article.category} · {article.date}
      </p>
      <h1 className="mt-1 font-display text-3xl">{article.title}</h1>
      <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-slate">
        {article.excerpt} Students, teachers, and families came together to
        celebrate the achievement — a reminder of what this community
        builds when everyone pitches in.
      </p>

      {related.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <p className="mb-4 font-display text-lg">Related news</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((n) => (
              <Link key={n.slug} href={`/school/news/${n.slug}`} className="block">
                <p className="text-xs text-slate">{n.date}</p>
                <p className="mt-1 text-sm font-medium leading-snug">{n.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

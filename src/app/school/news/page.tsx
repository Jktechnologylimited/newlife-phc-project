import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { schoolNews } from "@/lib/sample-data";

export const metadata: Metadata = { title: "News" };

export default function SchoolNewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">News</p>
      <h1 className="mt-2 font-display text-4xl">Latest news</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Stay up to date with what&apos;s happening at our school.
      </p>

      <div className="mt-10 divide-y divide-line">
        {schoolNews.map((n, i) => (
          <Reveal key={n.slug} delay={i * 0.05}>
            <Link href={`/school/news/${n.slug}`} className="group flex items-start justify-between gap-6 py-5">
              <div>
                <p className="text-xs text-slate">
                  {n.category} · {n.date}
                </p>
                <p className="mt-1 font-display text-lg leading-snug group-hover:underline">{n.title}</p>
                <p className="mt-1 max-w-lg text-sm text-slate">{n.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

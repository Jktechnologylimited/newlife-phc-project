import type { Metadata } from "next";
import { getHymns } from "@/lib/data/content";
import { HymnList } from "@/components/church/hymn-list";

export const revalidate = 60; // re-fetch DB content at most once a minute

export const metadata: Metadata = { title: "Hymns" };

export default async function HymnsPage() {
  const hymns = await getHymns();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Hymns</p>
      <h1 className="mt-2 font-display text-4xl">Sing along</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Full lyrics for hymns we sing together on Sundays — pull this up
        on your phone during service, or look one up ahead of time.
      </p>

      <div className="mt-10">
        <HymnList hymns={hymns} />
      </div>
    </div>
  );
}

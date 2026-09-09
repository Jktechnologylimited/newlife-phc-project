import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { SectionTabs } from "@/components/patterns/section-tabs";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";
import { clubs, sportsList, artsList, studentLeadership } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Student Life" };

function ClubsTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {clubs.map((c) => (
        <div key={c.name} className="rounded-xl border border-line p-4">
          <p className="font-display text-base">{c.name}</p>
          <p className="mt-1 text-xs text-slate">{c.category}</p>
        </div>
      ))}
    </div>
  );
}

function SportsTab() {
  return (
    <div className="flex flex-wrap gap-2">
      {sportsList.map((s) => (
        <span key={s} className="rounded-full border border-line px-4 py-2 text-sm">
          {s}
        </span>
      ))}
    </div>
  );
}

function ArtsTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {artsList.map((a) => (
        <div key={a.name} className="rounded-xl border border-line p-4">
          <p className="font-display text-base">{a.name}</p>
          <p className="mt-1 text-sm text-slate">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}

function LeadershipTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {studentLeadership.map((l) => (
        <div key={l} className="flex items-center gap-3 rounded-xl border border-line p-4">
          <Trophy className="h-4 w-4 text-school-deep" />
          <p className="text-sm font-medium">{l}</p>
        </div>
      ))}
    </div>
  );
}

export default function StudentLifePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-20">
        <p className="text-sm font-medium text-school-deep">Student life</p>
        <h1 className="mt-2 max-w-xl font-display text-display-md text-ink sm:text-display-lg">
          More than academics
        </h1>
        <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-slate">
          A vibrant community where students grow, belong, and try things
          they didn&apos;t know they&apos;d love.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <SectionTabs
          tabs={[
            { id: "clubs", label: "Clubs & Societies", content: <ClubsTab /> },
            { id: "sports", label: "Sports & Fitness", content: <SportsTab /> },
            { id: "arts", label: "Arts & Culture", content: <ArtsTab /> },
            { id: "leadership", label: "Leadership", content: <LeadershipTab /> },
          ]}
        />
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center lg:px-8">
          <Photo src={photoUrl("kidsSoccer")} alt={photoAlt("kidsSoccer")} className="aspect-[4/3] rounded-2xl" />
          <div>
            <p className="font-display text-lg">A community that cares</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
              Our students build friendships, discover talents, and make a
              positive impact — on campus and beyond it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { smallGroups } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Small Groups" };

export default function SmallGroupsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Small groups</p>
      <h1 className="mt-2 font-display text-4xl">Do life together</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Sunday mornings are just the start. Small groups meet in homes
        across Port Harcourt for real conversation, prayer, and friendship.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {smallGroups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.06}>
            <div className="rounded-xl p-5">
              <p className="font-display text-lg">{g.name}</p>
              <p className="mt-1 text-xs text-slate">{g.meets}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{g.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

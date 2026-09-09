import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { leadership } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Leadership</p>
      <h1 className="mt-2 font-display text-4xl">Our leadership</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        The pastors and elders who serve our church family — reach any of
        them through the office if you&apos;d like to talk.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {leadership.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <div className="flex items-center gap-4 rounded-xl border border-line p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-church-tint font-display text-lg text-church-deep">
                {p.initials}
              </span>
              <div>
                <p className="font-display text-lg leading-tight">{p.name}</p>
                <p className="mt-0.5 text-sm text-slate">{p.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

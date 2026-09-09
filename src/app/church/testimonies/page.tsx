import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { testimonies } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Testimonies" };

export default function TestimoniesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Testimonies</p>
      <h1 className="mt-2 font-display text-4xl">Real stories, real faith</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        See how God is at work in the lives of our church family.
      </p>

      <div className="mt-10 space-y-4">
        {testimonies.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div className="rounded-xl p-6">
              <p className="font-display text-lg leading-snug text-ink">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm text-slate">
                {t.name} · {t.since}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

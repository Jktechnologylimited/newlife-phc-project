import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { volunteerOpportunities } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Volunteer</p>
      <h1 className="mt-2 font-display text-4xl">Make an impact</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Church runs on people who show up early and stay a little late.
        Here&apos;s where we could use your gifts.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {volunteerOpportunities.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.06}>
            <div className="flex items-center justify-between gap-4 rounded-xl p-5">
              <div>
                <p className="font-display text-lg">{v.name}</p>
                <p className="mt-1 text-sm text-slate">{v.desc}</p>
              </div>
              <Link
                href="/church/contact"
                className="shrink-0 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
              >
                Apply
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

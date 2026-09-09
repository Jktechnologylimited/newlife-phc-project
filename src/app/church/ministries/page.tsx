import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ministries } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Ministries" };

export default function MinistriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Ministries</p>
      <h1 className="mt-2 font-display text-4xl">Find a ministry, find your place</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Every ministry here exists for one reason: to help you use what
        you&apos;re good at for something that matters.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-xl border border-line p-5">
              <p className="text-xs text-slate">{m.audience}</p>
              <p className="mt-1.5 font-display text-lg">{m.name}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-2xl">Not sure where you fit?</h3>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/75">
            Send us a note about your interests and we&apos;ll help you find
            the right place to plug in.
          </p>
        </div>
        <Link
          href="/church/contact"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Get connected
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </div>
  );
}

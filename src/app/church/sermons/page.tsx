import Link from "next/link";
import type { Metadata } from "next";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { sermons } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Sermons" };

export default function SermonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Sermons</p>
      <h1 className="mt-2 font-display text-4xl">Listen, watch, or read</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Every message from Sunday mornings, going back through our full
        library — organized by series, speaker, and topic.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {sermons.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <Link href={`/church/sermons/${s.slug}`} className="group block">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-stone to-paper-dim">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-sm transition-transform group-hover:scale-105">
                  <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2 py-0.5 text-xs text-paper">
                  {s.duration}
                </span>
              </div>
              <p className="mt-3 font-display text-base leading-snug">{s.title}</p>
              <p className="mt-1 text-sm text-slate">
                {s.speaker} · {s.date}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

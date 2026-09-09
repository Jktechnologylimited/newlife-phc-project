import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { churchEvents } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Events" };

export default function ChurchEventsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Events</p>
      <h1 className="mt-2 font-display text-4xl">Upcoming events</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Be part of what God is doing — conferences, retreats, and gatherings
        for every stage of life.
      </p>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {churchEvents.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.05}>
            <div className="flex items-center gap-6 py-5">
              <div className="w-16 shrink-0 text-center">
                <p className="text-xs font-medium text-church-deep">{e.date.split(" ")[0]}</p>
                <p className="font-display text-2xl leading-none">{e.date.split(" ")[1]}</p>
              </div>
              <div className="flex-1">
                <p className="font-display text-lg">{e.title}</p>
                <p className="mt-0.5 text-sm text-slate">
                  {e.time} · {e.location}
                </p>
              </div>
              <Link
                href={`/church/events/${e.slug}`}
                className="shrink-0 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
              >
                Register
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PrayerForm } from "@/components/forms/prayer-form";
import { prayerRequestsSample } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Prayer Requests" };

export default function PrayerPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">Prayer requests</p>
      <h1 className="mt-2 font-display text-4xl">We&apos;re here to pray with you</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Share your request and our prayer team will be praying for you this
        week — privately, unless you&apos;d like it shared.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <PrayerForm />

        <div>
          <p className="mb-4 font-display text-lg">Recent requests</p>
          <div className="space-y-3">
            {prayerRequestsSample.map((r) => (
              <Reveal key={r.request}>
                <div className="flex items-center justify-between gap-4 rounded-xl p-4">
                  <div>
                    <p className="text-sm font-medium">{r.request}</p>
                    <p className="mt-0.5 text-xs text-slate">
                      {r.name} · {r.date}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-church-tint px-3 py-1 text-xs font-medium text-church-deep">
                    {r.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

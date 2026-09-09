import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Shirt, Baby, ParkingCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = { title: "Plan Your Visit" };

const info = [
  { Icon: Clock, title: "Service times", desc: "Sundays at 9:00 and 11:00 AM — either works, come as you are." },
  { Icon: Shirt, title: "What to wear", desc: "Whatever you're comfortable in. Truly — there's no dress code." },
  { Icon: Baby, title: "Kids & nursery", desc: "Age-appropriate programming for infants through grade 5 during both services." },
  { Icon: ParkingCircle, title: "Parking", desc: "Free parking in the main lot, with spaces reserved for first-time guests." },
];

export default function NewHerePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-church-deep">New here?</p>
      <h1 className="mt-2 font-display text-4xl">Everything you need to know before you come</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        First visits can feel like a lot. Here&apos;s what to expect, so all
        you have to do is show up.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {info.map(({ Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="rounded-xl border border-line p-5">
              <Icon className="h-5 w-5 text-church-deep" />
              <p className="mt-4 font-display text-lg">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 rounded-2xl bg-ink px-8 py-10 text-center text-paper">
        <h3 className="font-display text-2xl">We&apos;ll be looking for you</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-paper/75">
          Stop by the welcome table — someone will show you around and get
          your kids checked in.
        </p>
        <Link
          href="/church/contact"
          className="mt-6 inline-block rounded-full bg-church px-6 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Ask a question first
        </Link>
      </Reveal>
    </div>
  );
}

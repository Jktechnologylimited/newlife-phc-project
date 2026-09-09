import type { Metadata } from "next";
import { Smartphone, Landmark, HandCoins, Gift } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export const metadata: Metadata = { title: "Give" };

const ways = [
  { Icon: Smartphone, title: "Online", desc: "Give securely in under a minute, one-time or recurring." },
  { Icon: Landmark, title: "Bank transfer", desc: "Direct deposit — ask the office for our account details." },
  { Icon: HandCoins, title: "In person", desc: "Cash or check during any Sunday service." },
  { Icon: Gift, title: "Other ways", desc: "Stock gifts, estate planning, and other giving options." },
];

export default function GivePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 md:grid-cols-2 md:items-center lg:px-8 lg:pt-20">
        <div>
          <p className="text-sm font-medium text-church-deep">Give</p>
          <h1 className="mt-2 font-display text-display-md text-ink sm:text-display-lg">
            Your generosity makes room for more
          </h1>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-slate">
            Every gift goes toward keeping our doors open, our staff cared
            for, and our reach growing — locally and beyond.
          </p>
          <button className="mt-8 rounded-full bg-church px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5">
            Give now
          </button>
        </div>
        <Photo src={photoUrl("prayerGroup")} alt={photoAlt("prayerGroup")} className="aspect-[4/3] rounded-2xl" />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <h2 className="font-display text-2xl">Ways to give</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="rounded-xl p-5">
                <Icon className="h-5 w-5 text-church-deep" />
                <p className="mt-4 font-display text-lg">{title}</p>
                <p className="mt-1 text-sm text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center lg:px-8">
          <h3 className="font-display text-2xl">Together we make a difference</h3>
          <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-slate">
            Your giving helps us reach more people, build stronger
            communities, and support both the church and the school that
            call this campus home.
          </p>
        </div>
      </section>
    </div>
  );
}

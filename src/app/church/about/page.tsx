import Link from "next/link";
import type { Metadata } from "next";
import { Home, Sprout, HandHeart, Globe2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photoUrl, photoAlt } from "@/lib/photos";

export const metadata: Metadata = { title: "About the Church" };

const pillars = [
  { Icon: Home, title: "Worship", desc: "Together, every Sunday, without pretense." },
  { Icon: Sprout, title: "Grow", desc: "Discipleship that shapes ordinary, daily life." },
  { Icon: HandHeart, title: "Serve", desc: "Using our gifts for something bigger than us." },
  { Icon: Globe2, title: "Impact", desc: "Reaching our neighborhood and beyond." },
];

export default function ChurchAboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-20">
        <p className="text-sm font-medium text-church-deep">About the church</p>
        <h1 className="mt-2 max-w-xl font-display text-display-md text-ink sm:text-display-lg">
          Our story, mission, and what we believe
        </h1>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:items-center lg:px-8">
        <Reveal>
          <p className="font-display text-lg">Our story</p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-slate">
            New Life Baptist Church began in 1962 with a handful of families
            meeting in a living room, convinced that Riverside needed a
            church where anyone could belong. Over sixty years later, that
            conviction hasn&apos;t changed — even as the congregation, the
            building, and eventually a school grew up around it.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-slate">
            Today we&apos;re a multi-generational church family gathering
            twice every Sunday, still driven by the same simple idea: that
            faith is better lived in community than alone.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Photo
            src={photoUrl("churchExterior")}
            alt={photoAlt("churchExterior")}
            className="aspect-[4/3] rounded-2xl"
          />
        </Reveal>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <Reveal>
              <p className="font-display text-lg">Our mission</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                To lead people into a growing relationship with Jesus
                Christ, and to equip them to make a difference in their
                families, workplaces, and the world.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-display text-lg">Our vision</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                A Riverside where every household knows a church family that
                will show up for them — in celebration and in crisis alike.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-display text-lg">Our values</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Scripture, honesty, hospitality, and the belief that
                everyone is still becoming who God made them to be.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="rounded-xl border border-line p-5">
                <Icon className="h-5 w-5 text-church-deep" />
                <p className="mt-4 font-display text-lg">{title}</p>
                <p className="mt-1 text-sm text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-8 py-10 text-paper sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl">Meet our leadership</h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/75">
              The pastors and elders who shepherd our church family day to day.
            </p>
          </div>
          <Link
            href="/church/leadership"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-church px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Meet the team
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

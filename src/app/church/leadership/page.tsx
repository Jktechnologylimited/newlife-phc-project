import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { pastors, elders, deacons } from "@/lib/sample-data";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappGlyph } from "@/components/icons/social";

export const metadata: Metadata = { title: "Leadership" };

function PersonCard({
  name,
  role,
  initials,
  whatsapp,
  delay,
}: {
  name: string;
  role: string;
  initials: string;
  whatsapp?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-4 rounded-xl p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-church-tint font-display text-lg text-church-deep">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight">{name}</p>
          <p className="mt-0.5 text-sm text-slate">{role}</p>
        </div>
        {whatsapp && (
          <a
            href={whatsappLink(whatsapp, `Hi ${name.split(" ").slice(-1)[0]}, I'd like to reach out through the New Life website.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-ink"
          >
            <WhatsappGlyph className="h-3.5 w-3.5 text-[#25D366]" />
            WhatsApp
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
      <Image
        src="/newlife-logo-256.png"
        alt="Newlife Baptist Church crest"
        width={64}
        height={64}
        className="mb-5"
      />
      <p className="text-sm font-medium text-church-deep">Leadership</p>
      <h1 className="mt-2 font-display text-4xl">Our leadership</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        The pastors, elders, and deacons who serve our church family —
        reach a pastor directly on WhatsApp, or contact the office for
        anyone else.
      </p>

      <div className="mt-12">
        <p className="font-display text-xl">Pastors</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {pastors.map((p, i) => (
            <PersonCard key={p.name} {...p} delay={i * 0.06} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="font-display text-xl">Elders</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {elders.map((p, i) => (
            <PersonCard key={p.name} {...p} delay={i * 0.06} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="font-display text-xl">The Diaconate</p>
        <p className="mt-1.5 text-sm text-slate">
          Our deacons serve the practical and pastoral needs of the church family.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {deacons.map((p, i) => (
            <PersonCard key={p.name} {...p} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </div>
  );
}

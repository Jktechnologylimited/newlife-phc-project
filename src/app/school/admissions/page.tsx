import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AdmissionsForm } from "@/components/forms/admissions-form";

export const metadata: Metadata = { title: "Admissions" };

const reasons = [
  "Christ-centered education, academically rigorous",
  "Experienced and caring faculty",
  "Modern facilities built for hands-on learning",
  "Strong academic outcomes at every level",
];

const steps = [
  { title: "Create an account", desc: "Basic contact info to get started." },
  { title: "Complete the application", desc: "Student and family details." },
  { title: "Upload documents", desc: "Transcripts, ID, and any records we need." },
  { title: "Review & confirm", desc: "Check everything before you submit." },
  { title: "Track progress", desc: "Updates by email and on your dashboard." },
];

export default function AdmissionsPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-20">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-school-deep">Admissions</p>
          <h1 className="mt-3 font-display text-display-md text-ink sm:text-display-lg">
            Start your child&apos;s journey with us
          </h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-slate">
            We keep the admissions process simple and transparent. Follow the
            steps below, or just send us a note and we&apos;ll guide you
            through it personally.
          </p>
        </div>

        <div className="mt-10 grid gap-2 sm:grid-cols-2">
          {reasons.map((r) => (
            <div key={r} className="flex items-start gap-2.5 text-[0.95rem] text-ink/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-school-deep" />
              {r}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/school/admissions/fees" className="rounded-full border border-line px-4 py-2 transition-colors hover:border-ink">
            Fees & tuition
          </Link>
          <Link href="/school/admissions/faq" className="rounded-full border border-line px-4 py-2 transition-colors hover:border-ink">
            Admissions FAQ
          </Link>
        </div>
      </section>

      {/* process */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <h2 className="font-display text-2xl">The application process</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <li>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-school text-sm font-medium text-paper">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-display text-base leading-snug">{s.title}</p>
                  <p className="mt-1 text-sm text-slate">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* form */}
      <section id="tour" className="mx-auto max-w-2xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-2xl">Request info or start your application</h2>
        <p className="mt-2 text-sm text-slate">
          Tell us a bit about your family and we&apos;ll follow up within two
          business days — whether that&apos;s a tour, an application, or just
          your questions answered.
        </p>
        <div className="mt-8">
          <AdmissionsForm />
        </div>
      </section>
    </div>
  );
}

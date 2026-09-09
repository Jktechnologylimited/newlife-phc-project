import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { admissionsFaq } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Admissions FAQ" };

export default function AdmissionsFaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">Admissions FAQ</p>
      <h1 className="mt-2 font-display text-4xl">Find answers to common questions</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Still have a question? Reach out to the admissions office any time.
      </p>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {admissionsFaq.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-medium">{f.q}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate">{f.a}</p>
          </details>
        ))}
      </div>

      <Link
        href="/school/admissions#tour"
        className="mt-10 inline-block rounded-full bg-school px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
      >
        Start your application
      </Link>
    </div>
  );
}

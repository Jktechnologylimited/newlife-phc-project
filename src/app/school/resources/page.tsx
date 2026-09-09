import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { resources } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-school-deep">Resources</p>
      <h1 className="mt-2 font-display text-4xl">Helpful downloads & guides</h1>
      <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-slate">
        Everything a Newlife family might need, in one place.
      </p>

      <div className="mt-10 divide-y divide-line">
        {resources.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.05}>
            <div className="flex items-center gap-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-school-tint text-school-deep">
                <FileText className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-slate">{r.type}</p>
              </div>
              <button className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm hover:border-ink">
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

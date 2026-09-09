import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageStub({
  eyebrow,
  title,
  description,
  experience,
  parentHref,
  parentLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  experience: "church" | "school";
  parentHref: string;
  parentLabel: string;
}) {
  const accent = experience === "church" ? "text-church-deep" : "text-school-deep";
  const accentBg = experience === "church" ? "bg-church" : "bg-school";

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
      <Link
        href={parentHref}
        className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {parentLabel}
      </Link>

      <p className={cn("mt-8 text-sm font-medium", accent)}>{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl text-ink">{title}</h1>
      <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate">
        {description}
      </p>

      <div className="mt-10 flex items-center gap-3 rounded-xl border border-dashed border-line px-5 py-4">
        <span className={cn("h-1.5 w-1.5 rounded-full", accentBg)} />
        <p className="text-sm text-slate">
          This page is mapped out and routed — full content and layout land
          in the next build phase.
        </p>
      </div>
    </div>
  );
}

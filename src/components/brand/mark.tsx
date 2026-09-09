import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 27h28" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <path
        d="M6 27V16h9v11"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M6 16 10.5 6 15 16Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M10.5 6V3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M18 27v-8h9v8" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M18 19l4.5-3 4.5 3" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] tracking-tight">New Life</span>
        {tagline && (
          <span className="mt-0.5 text-[0.7rem] tracking-wide text-slate">
            Church &amp; Academy
          </span>
        )}
      </span>
    </span>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

/** The real Newlife Baptist Church crest — used as the site's universal
 * mark in the header, footer, and anywhere else the brand needs to show
 * up as an actual seal rather than a color swatch. */
export function BrandMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/newlife-logo-256.png"
      alt="Newlife Baptist Church crest"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      priority
    />
  );
}

export function Wordmark({
  className,
  tagline = true,
  size = 36,
}: {
  className?: string;
  tagline?: boolean;
  size?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] tracking-tight">Newlife</span>
        {tagline && (
          <span className="mt-0.5 text-[0.7rem] tracking-wide text-slate">
            Church &amp; School
          </span>
        )}
      </span>
    </span>
  );
}

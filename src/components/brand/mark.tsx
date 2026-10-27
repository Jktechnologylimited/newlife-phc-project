import Image from "next/image";
import { cn } from "@/lib/utils";

/** The supplied church crest is used only for the church identity.
 * The school uses a typographic wordmark until its original crest is available.
 */
export function BrandMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/newlife-logo-256.png"
      alt="Newlife Baptist Church crest"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
export function Wordmark({
  className,
  tagline = true,
  size = 36,
  experience,
}: {
  className?: string;
  tagline?: boolean;
  size?: number;
  experience?: "school" | "church";
}) {
  return (
    <span className={cn("brand-wordmark", className)}>
      {experience !== "school" && <BrandMark size={size} />}
      <span className="brand-wordmark-type">
        <span className="brand-name">
          Newlife<span className="brand-period">.</span>
        </span>
        {tagline && (
          <span className="brand-subtitle">
            {experience === "school"
              ? "Baptist School"
              : experience === "church"
                ? "Baptist Church"
                : "Baptist School & Church"}
          </span>
        )}
      </span>
    </span>
  );
}

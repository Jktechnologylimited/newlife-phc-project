import Image from "next/image";
import { school, church } from "@/lib/institution";
import { cn } from "@/lib/utils";

/** Keep the supplied school and church crests distinct. */
export function BrandMark({
  className,
  size = 36,
  experience = "church",
}: {
  className?: string;
  size?: number;
  experience?: "school" | "church";
}) {
  const logo = experience === "school" ? school.logo : church.logo;
  if (!logo) return null;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
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
      <BrandMark size={size} experience={experience ?? "church"} />
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

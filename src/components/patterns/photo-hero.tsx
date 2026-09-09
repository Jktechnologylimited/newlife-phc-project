import { Photo } from "@/components/media/photo";

export function PhotoHero({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative h-screen overflow-hidden">
      <Photo src={src} alt={alt} className="absolute inset-0 h-full w-full" priority />
      {/* scrim for text legibility over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5" />
      {/* the photo dissolves into the page background at the bottom —
          no hard seam between hero and the section that follows */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent sm:h-56" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 sm:px-5 sm:pb-28 lg:px-8">
        {children}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { productionOrigin, publicationReady } from "@/lib/institution";
import { socialCardFor } from "@/lib/social-cards";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  settings: { origin?: string; ready?: boolean } = {},
): Metadata {
  const origin = settings.origin ?? productionOrigin;
  const ready = settings.ready ?? publicationReady;
  const url = origin ? new URL(path, origin).toString() : undefined;
  const card = socialCardFor(path);
  // Keep absolute social URLs and canonicals absent until the client confirms the origin.
  const image = origin
    ? new URL(`/social/${card.file}.png`, origin).toString()
    : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: {
      index: Boolean(origin && ready),
      follow: Boolean(origin && ready),
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Newlife Baptist Schools & Church",
      locale: "en_NG",
      ...(url ? { url } : {}),
      ...(image
        ? {
            images: [{ url: image, width: 1200, height: 630, alt: card.title }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [{ url: image, alt: card.title }] } : {}),
    },
  };
}

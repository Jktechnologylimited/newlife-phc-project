import type { Metadata } from "next";
import { productionOrigin, publicationReady } from "@/lib/institution";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = productionOrigin
    ? new URL(path, productionOrigin).toString()
    : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: {
      index: Boolean(productionOrigin && publicationReady),
      follow: Boolean(productionOrigin && publicationReady),
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Newlife Baptist School & Church",
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}

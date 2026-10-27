import type { MetadataRoute } from "next";
import {
  productionOrigin,
  publicationReady,
  publicPaths,
} from "@/lib/institution";
export default function robots(): MetadataRoute.Robots {
  if (!productionOrigin || !publicationReady)
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: [
        ...publicPaths.map((path) => `${path}$`),
        "/images/",
        "/social/",
        "/_next/static/",
        "/_next/image",
        "/newlife-logo-256.png",
        "/icon.png",
        "/favicon.ico",
        "/apple-icon.png",
      ],
      disallow: "/",
    },
    sitemap: `${productionOrigin}/sitemap.xml`,
  };
}

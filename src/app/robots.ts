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
      allow: publicPaths.map((path) => `${path}$`),
      disallow: "/",
    },
    sitemap: `${productionOrigin}/sitemap.xml`,
  };
}

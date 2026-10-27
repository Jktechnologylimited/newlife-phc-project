import type { MetadataRoute } from "next";
import {
  productionOrigin,
  publicationReady,
  publicPaths,
  school,
} from "@/lib/institution";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!productionOrigin || !publicationReady) return [];
  return publicPaths
    .filter(
      (path) =>
        (path !== "/school/gallery" || school.photos.length > 0) &&
        (path !== "/school/academics" || school.programmes.length > 0),
    )
    .map((path) => ({ url: new URL(path, productionOrigin).toString() }));
}

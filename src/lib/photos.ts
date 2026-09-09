/**
 * Free stock photography, sourced from Unsplash (Unsplash License — free
 * for commercial use, attribution appreciated but not required). Photo
 * IDs point at Unsplash's CDN directly; swap any of these for real
 * campus/congregation photography later by changing the `id` here only.
 */
function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const photos = {
  churchExterior: {
    id: "1731665388372-71434a66b3d7",
    alt: "A church building with a steeple against a blue sky",
    credit: "Yue Xin",
  },
  gathering: {
    id: "1552997200-4eb4441f0852",
    alt: "A group of people gathered together indoors",
    credit: "Luan Cabral",
  },
  prayerGroup: {
    id: "1763355873417-1e0926397851",
    alt: "A small group praying together",
    credit: "AMONWAT DUMKRUT",
  },
  classroom: {
    id: "1758270704925-fa59d93119c1",
    alt: "A teacher leading a classroom of students",
    credit: "Vitaly Gariev",
  },
  kidsSoccer: {
    id: "1680024439029-d7d4b7f4cba1",
    alt: "Children playing soccer together on a field",
    credit: "Matthew Osborn",
  },
  schoolExterior: {
    id: "1729799959058-bda08177a84c",
    alt: "A brick school building with a clock tower",
    credit: "Roger Starnes Sr",
  },
  library: {
    id: "1498243691581-b145c3f54a5a",
    alt: "Rows of bookshelves in a school library",
    credit: "Priscilla Du Preez",
  },
} as const;

export type PhotoKey = keyof typeof photos;

export function photoUrl(key: PhotoKey, w: number = 1600) {
  return unsplash(photos[key].id, w);
}

export function photoAlt(key: PhotoKey) {
  return photos[key].alt;
}

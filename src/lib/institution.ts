/** Approved identity comes from the client brief. Add only client-verified facts.
 * Keep school and church contacts separate; never substitute stock photos.
 * See docs/CLIENT-CONTENT.md for the publication checklist.
 */
export type InstitutionPhoto = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};
export type Institution = {
  name: string;
  shortName: string;
  story: string[];
  introduction?: string;
  motto?: string;
  locality?: string;
  mission?: string;
  vision?: string;
  telephone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  hero?: InstitutionPhoto;
  photos: InstitutionPhoto[];
};
export const school: Institution & {
  programmes: { title: string; description: string }[];
} = {
  name: "Newlife Baptist School",
  shortName: "the school",
  introduction:
    "Learning and growing in God since 1994. Discover the story of a school that began with four children in the Newlife Baptist Church building.",
  motto: "Learning and Growing in God",
  locality: "Rumueme, Port Harcourt",
  telephone: "+234 814 082 3524",
  whatsapp: "+234 814 082 3524",
  story: [
    "The vision for Newlife Baptist School began in 1994 with Sister Doris Abili, then a lecturer at a tertiary institution in northern Nigeria. With the approval of Newlife Baptist Church, she established a nursery and primary school using the church’s name and premises, with the intention of moving to a permanent site in the future.",
    "The school opened in the small church building with four children. Sister Doris Abili appointed Mrs. Stella Dodo to administer the school when she returned to her teaching post outside Port Harcourt. Together with the pioneer teachers, Mrs. Dodo guided the school through its early years.",
    "In 1996, Newlife Baptist Church formally took ownership of the school under the leadership of Bro. G. A. Apapa. The head teacher and other staff reapplied for their positions and were employed by the church. As the school grew, more teachers and support staff joined its community.",
    "Mrs. Dodo served under successive school management committees. In 1999, parents’ concerns about safety, including the absence of a perimeter fence at that time, and other school matters led to the formation of the Parent–Teacher Association. Its first chairman was Mr. Stephen Ajibare, who was later succeeded by Mr. Lebari.",
  ],
  hero: {
    src: "/images/school/school-exterior-wide.jpg",
    alt: "Wide view of the Newlife Baptist School buildings and courtyard",
    width: 1080,
    height: 813,
  },
  photos: [
    {
      src: "/images/school/school-exterior-wide.jpg",
      alt: "Wide view of the Newlife Baptist School buildings and courtyard",
      width: 1080,
      height: 813,
    },
    {
      src: "/images/school/school-exterior-courtyard.jpg",
      alt: "School building beside palm trees and a fenced play area",
      width: 768,
      height: 1020,
    },
    {
      src: "/images/school/school-exterior-entrance.jpg",
      alt: "School entrance with Newlife Baptist Schools lettering on the building",
      width: 768,
      height: 1020,
    },
  ],
  programmes: [],
};
export const church: Institution & {
  services: { title: string; time: string }[];
  beliefs: string[];
} = {
  name: "Newlife Baptist Church",
  shortName: "the church",
  story: [],
  photos: [],
  services: [],
  beliefs: [],
};
// Set only after the client confirms the production origin, e.g. https://example.org.
// An absent domain intentionally prevents canonicals and search indexing.
export const productionOrigin: string | undefined = undefined;
export const publicationReady: boolean = false;
export function telephoneHref(value: string) {
  return `tel:${value.replace(/[^+0-9]/g, "")}`;
}
export function whatsappHref(value: string, name: string) {
  return `https://wa.me/${value.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello, I would like to enquire about ${name}.`)}`;
}
export const publicPaths = [
  "/",
  "/school/about",
  "/school/academics",
  "/school/gallery",
  "/school/contact",
  "/church",
  "/church/about",
  "/church/contact",
];

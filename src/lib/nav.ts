import { school } from "@/lib/institution";
export type NavLink = { label: string; href: string };
export const schoolNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/school/about" },
  { label: "Academics", href: "/school/academics" },
  ...(school.photos.length
    ? [{ label: "Gallery", href: "/school/gallery" }]
    : []),
  { label: "Church", href: "/church" },
  { label: "Contact", href: "/school/contact" },
];
export const churchNav: NavLink[] = [
  { label: "Church", href: "/church" },
  { label: "About", href: "/church/about" },
  { label: "Contact", href: "/church/contact" },
  { label: "School", href: "/" },
];
export const schoolFooterNav = schoolNav;
export const churchFooterNav = churchNav;
export const popularSearches = [
  { label: "About the school", href: "/school/about" },
  { label: "School enquiries", href: "/school/contact" },
  { label: "Church", href: "/church" },
];

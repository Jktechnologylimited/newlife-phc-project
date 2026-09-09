export type NavLink = { label: string; href: string };

export const churchNav: NavLink[] = [
  { label: "Home", href: "/church" },
  { label: "About", href: "/church/about" },
  { label: "Ministries", href: "/church/ministries" },
  { label: "Sermons", href: "/church/sermons" },
  { label: "Events", href: "/church/events" },
  { label: "Give", href: "/church/give" },
];

export const schoolNav: NavLink[] = [
  { label: "Home", href: "/school" },
  { label: "About", href: "/school/about" },
  { label: "Academics", href: "/school/academics" },
  { label: "Student Life", href: "/school/student-life" },
  { label: "Admissions", href: "/school/admissions" },
  { label: "Contact", href: "/school/contact" },
];

// Fuller link lists for the footer — the header nav stays short on
// purpose, but the footer is where people expect to find everything.
export const churchFooterNav: NavLink[] = [
  ...churchNav,
  { label: "Leadership", href: "/church/leadership" },
  { label: "Small Groups", href: "/church/small-groups" },
  { label: "Volunteer", href: "/church/volunteer" },
  { label: "Prayer", href: "/church/prayer" },
  { label: "Contact", href: "/church/contact" },
];

export const schoolFooterNav: NavLink[] = [
  ...schoolNav,
  { label: "Fees & Tuition", href: "/school/admissions/fees" },
  { label: "News", href: "/school/news" },
  { label: "Resources", href: "/school/resources" },
];

export const popularSearches = [
  { label: "Sermons", href: "/church/sermons" },
  { label: "Events", href: "/church/events" },
  { label: "Admissions", href: "/school/admissions" },
  { label: "Prayer", href: "/church/prayer" },
  { label: "Ministries", href: "/church/ministries" },
  { label: "Classes", href: "/school/academics" },
];

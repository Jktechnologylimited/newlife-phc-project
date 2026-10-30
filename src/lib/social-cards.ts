export const socialCards = {
  "/": {
    file: "school",
    title: "Learning. Growing. In God.",
    label: "Newlife Baptist Schools",
    church: false,
  },
  "/school/about": {
    file: "school-story",
    title: "Small beginnings. A meaningful story.",
    label: "Our school story · Since 1994",
    church: false,
  },
  "/school/academics": {
    file: "school-learning",
    title: "Learning with faith at the heart.",
    label: "Learning at Newlife",
    church: false,
  },
  "/school/gallery": {
    file: "school-gallery",
    title: "A closer look at Newlife.",
    label: "Our school gallery",
    church: false,
  },
  "/school/contact": {
    file: "school-contact",
    title: "Let’s begin a conversation.",
    label: "Newlife Baptist Schools · Enquiries",
    church: false,
  },
  "/church": {
    file: "church",
    title: "A church. A school. A shared story.",
    label: "Newlife Baptist Church",
    church: true,
  },
  "/church/about": {
    file: "church-story",
    title: "Faith at the beginning.",
    label: "Our church & school story",
    church: true,
  },
  "/church/contact": {
    file: "church-contact",
    title: "Connecting with the church.",
    label: "Newlife Baptist Church · Enquiries",
    church: true,
  },
} as const;
export function socialCardFor(path: string) {
  return socialCards[path as keyof typeof socialCards] ?? socialCards["/"];
}

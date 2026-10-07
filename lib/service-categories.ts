export const serviceCategories = [
  {
    id: "circulation",
    title: "Circulation & Research Services",
    shortTitle: "Borrow. Discover. Learn.",
    description: "Start with a good book or a better research question. Connect with our librarians for help finding your next source.",
    href: "/contact",
    linkLabel: "Ask a librarian",
  },
  {
    id: "digital",
    title: "Electronic Resources & Online Services",
    shortTitle: "Your library, online.",
    description: "Explore electronic resources and find support for navigating online information, wherever you study.",
    href: "/resources",
    linkLabel: "Explore resources",
  },
  {
    id: "collaborative",
    title: "Collaborative Spaces",
    shortTitle: "Great ideas start together.",
    description: "Find a place to share ideas, work on a group project, and learn alongside your classmates.",
    href: "/facilities",
    linkLabel: "Explore our spaces",
  },
  {
    id: "individual",
    title: "Individual Study Spaces",
    shortTitle: "A little space to focus.",
    description: "Discover spaces for independent reading, reviewing your notes, and making progress at your own pace.",
    href: "/facilities",
    linkLabel: "Find a study space",
  },
] as const;

export type ServiceCategoryId = (typeof serviceCategories)[number]["id"];
export type PublishedService = { id: string; name: string; description: string; icon: string };

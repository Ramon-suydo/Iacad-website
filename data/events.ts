export type LibraryEvent = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const events: LibraryEvent[] = [
  {
    slug: "research-methods-workshop",
    title: "Research Methods Workshop",
    date: "2026-06-10",
    time: "2:00 PM – 4:00 PM",
    location: "Main Reading Hall",
    description:
      "A hands-on workshop covering academic research strategies, source evaluation, and citation tools.",
  },
  {
    slug: "author-talk-design-industry",
    title: "Author Talk: Careers in the Design Industry",
    date: "2026-06-24",
    time: "1:00 PM – 2:30 PM",
    location: "Lounge & Café Corner",
    description:
      "An informal talk with an industry professional discussing career paths in design and multimedia arts.",
  },
  {
    slug: "thesis-writing-clinic",
    title: "Thesis Writing Clinic",
    date: "2026-07-08",
    time: "9:00 AM – 12:00 PM",
    location: "Silent Study Room",
    description:
      "One-on-one guidance sessions for students preparing thesis proposals and final papers.",
  },
  {
    slug: "library-orientation-new-students",
    title: "Library Orientation for New Students",
    date: "2026-08-03",
    time: "10:00 AM – 11:00 AM",
    location: "Main Reading Hall",
    description:
      "An orientation session introducing new students to library services, resources, and facilities.",
  },
];
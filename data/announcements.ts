export type Announcement = {
  slug: string;
  title: string;
  date: string;
  category: "General" | "Maintenance" | "Academic" | "Event";
  summary: string;
};

export const announcements: Announcement[] = [
  {
    slug: "extended-hours-finals",
    title: "Extended Library Hours During Finals Week",
    date: "2026-05-12",
    category: "Academic",
    summary:
      "The library will extend operating hours until 9:00 PM throughout finals week to support student review sessions.",
  },
  {
    slug: "new-digital-lab-equipment",
    title: "New Workstations Added to the Digital Media Lab",
    date: "2026-04-20",
    category: "General",
    summary:
      "The Digital Media Lab has been upgraded with additional workstations and updated design software.",
  },
  {
    slug: "scheduled-system-maintenance",
    title: "Scheduled Facility Maintenance Notice",
    date: "2026-04-02",
    category: "Maintenance",
    summary:
      "The Silent Study Room will be closed for maintenance and will reopen the following business day.",
  },
  {
    slug: "thesis-archive-update",
    title: "Thesis & Capstone Archive Now Updated",
    date: "2026-03-18",
    category: "Academic",
    summary:
      "Newly approved thesis and capstone submissions have been added to the reference archive for student access.",
  },
];
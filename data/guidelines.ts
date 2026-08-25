export type GuidelineSection = {
  slug: string;
  title: string;
  rules: string[];
};

export const guidelineSections: GuidelineSection[] = [
  {
    slug: "general-conduct",
    title: "General Conduct",
    rules: [
      "Maintain a quiet and respectful environment at all times.",
      "Present a valid school ID upon entry.",
      "Personal belongings must not be left unattended.",
      "Food is not allowed in reading and study areas; beverages are limited to the lounge area.",
    ],
  },
  {
    slug: "borrowing-policy",
    title: "Borrowing Policy",
    rules: [
      "Borrowing privileges are limited to enrolled students, faculty, and staff.",
      "Materials must be returned by the assigned due date to avoid holds.",
      "Reference and archive materials are for in-library use only.",
      "Lost or damaged materials must be reported to the circulation desk immediately.",
    ],
  },
  {
    slug: "facility-usage",
    title: "Facility Usage",
    rules: [
      "Group study pods and rooms should be booked in advance where possible.",
      "Silent Study Room policies must be strictly observed — no conversations permitted.",
      "Digital Media Lab equipment is for academic use only.",
      "Please leave each space clean and organized after use.",
    ],
  },
  {
    slug: "digital-conduct",
    title: "Digital & Device Conduct",
    rules: [
      "Set mobile devices to silent mode within reading and study areas.",
      "Use headphones when accessing multimedia resources.",
      "Report technical issues with lab equipment to library staff.",
      "Printing and scanning services follow institutional usage guidelines.",
    ],
  },
];
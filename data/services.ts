export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: "book" | "search" | "printer" | "users" | "clock" | "graduation";
};

export const services: Service[] = [
  {
    slug: "book-borrowing",
    name: "Book Borrowing & Circulation",
    description:
      "Browse and borrow from an extensive academic and general collection through the circulation desk.",
    icon: "book",
  },
  {
    slug: "research-assistance",
    name: "Research Assistance",
    description:
      "Get guided support from librarians for academic research, citations, and source evaluation.",
    icon: "search",
  },
  {
    slug: "printing-scanning",
    name: "Printing & Scanning",
    description:
      "Access on-site printing, photocopying, and document scanning services for academic materials.",
    icon: "printer",
  },
  {
    slug: "group-study-booking",
    name: "Group Study Room Booking",
    description:
      "Reserve collaboration pods and group rooms in advance for team projects and study sessions.",
    icon: "users",
  },
  {
    slug: "extended-hours",
    name: "Extended Study Hours",
    description:
      "Enjoy extended access during exam periods to support intensive review and academic deadlines.",
    icon: "clock",
  },
  {
    slug: "information-literacy",
    name: "Information Literacy Sessions",
    description:
      "Attend library-led sessions on research methods, database use, and academic integrity.",
    icon: "graduation",
  },
];
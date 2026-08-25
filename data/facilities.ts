export type Campus = "UG" | "SHS";

export type Facility = {
  slug: string;
  name: string;
  campus: Campus;
  description: string;
  image: string;
  tags?: string[];
};

export const campusLabels: Record<Campus, { title: string; description: string }> = {
  UG: {
    title: "Undergraduate Library",
    description:
      "Spaces supporting the School of Computing, School of Design and the Arts, and School of Business and Liberal Arts.",
  },
  SHS: {
    title: "Senior High School Library",
    description:
      "Dedicated facilities designed for the academic and research needs of Senior High School students.",
  },
};

export const facilities: Facility[] = [
  {
    slug: "ug-library-overview",
    name: "UG Library",
    campus: "UG",
    description:
      "The main library space for undergraduate students, offering a full range of study areas and resources.",
    image: "/images/library/facilities/UG LIBRARY.jpg",
    tags: ["Main Area", "Wi-Fi"],
  },
  {
    slug: "ug-silent-room",
    name: "Silent Room",
    campus: "UG",
    description:
      "A strictly silent, enclosed space ideal for deep-focus individual work and exam preparation.",
    image: "/images/library/facilities/UG-Silent Room.jpg",
    tags: ["Silent Zone", "Individual Desks"],
  },
  {
    slug: "ug-research-hub",
    name: "Research Hub",
    campus: "UG",
    description:
      "A dedicated area for academic research, source evaluation, and reference material access.",
    image: "/images/library/facilities/UG-Research Hub.jpg",
    tags: ["Research", "References"],
  },
  {
    slug: "ug-playsmart-area",
    name: "PlaySmart Area",
    campus: "UG",
    description:
      "A relaxed, informal space blending recreation with casual learning between study sessions.",
    image: "/images/library/facilities/UG-PlaySmart Area.jpg",
    tags: ["Casual Space", "Recreation"],
  },
  {
    slug: "ug-hangout-room",
    name: "Hangout Room",
    campus: "UG",
    description:
      "A comfortable communal space for informal conversation, group bonding, and short breaks.",
    image: "/images/library/facilities/UG-Hangout Room.jpg",
    tags: ["Casual Seating"],
  },
  {
    slug: "ug-discussion-room-1",
    name: "Discussion Room 1",
    campus: "UG",
    description:
      "An enclosed group room equipped for team discussions, project planning, and presentations.",
    image: "/images/library/facilities/UG-Discussion Room 1.jpg",
    tags: ["Group Study"],
  },
  {
    slug: "ug-discussion-room-2",
    name: "Discussion Room 2",
    campus: "UG",
    description:
      "A second dedicated discussion room supporting collaborative student work and group study.",
    image: "/images/library/facilities/UG-Discussion Room 2.jpg",
    tags: ["Group Study"],
  },
  {
    slug: "ug-audiovisual-room",
    name: "Audiovisual Room",
    campus: "UG",
    description:
      "A tech-equipped room for multimedia viewing, presentations, and audiovisual coursework.",
    image: "/images/library/facilities/UG-Audiovisual Room.jpg",
    tags: ["Multimedia", "Equipment"],
  },
  {
    slug: "shs-library-overview",
    name: "SHS Library",
    campus: "SHS",
    description:
      "The main library space for Senior High School students, supporting daily academic needs.",
    image: "/images/library/facilities/SHS Library.jpg",
    tags: ["Main Area", "Wi-Fi"],
  },
  {
    slug: "shs-laboratory",
    name: "SHS Laboratory",
    campus: "SHS",
    description:
      "A dedicated laboratory space supporting hands-on learning and applied academic subjects.",
    image: "/images/library/facilities/SHS Laboratory.jpg",
    tags: ["Lab", "Applied Learning"],
  },
  {
    slug: "shs-hangout-room",
    name: "Hangout Room",
    campus: "SHS",
    description:
      "A casual communal space for Senior High students to relax and socialize between classes.",
    image: "/images/library/facilities/SHS Hangout Room.jpg",
    tags: ["Casual Seating"],
  },
  {
    slug: "shs-discussion-room-1",
    name: "Discussion Room 1",
    campus: "SHS",
    description:
      "An enclosed space for small group discussions, project work, and peer study sessions.",
    image: "/images/library/facilities/SHS-Discussion Room 1.jpg",
    tags: ["Group Study"],
  },
  {
    slug: "shs-discussion-room-2",
    name: "Discussion Room 2",
    campus: "SHS",
    description:
      "A second group discussion room designed for collaborative Senior High coursework.",
    image: "/images/library/facilities/SHS Discussion Room 2.jpg",
    tags: ["Group Study"],
  },
  {
    slug: "shs-discussion-room-3",
    name: "Discussion Room 3",
    campus: "SHS",
    description:
      "An additional discussion room supporting group projects and academic collaboration.",
    image: "/images/library/facilities/SHS-Discussion Room 3.jpg",
    tags: ["Group Study"],
  },
];

export const facilitiesByCampus = (campus: Campus) =>
  facilities.filter((f) => f.campus === campus);
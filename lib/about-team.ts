export type LibraryStaffMember = {
  name: string;
  title: string;
  description: string;
  image_url: string;
};

export const defaultLibraryStaff: LibraryStaffMember[] = [
  {
    name: "Yendy D.C. Reyes",
    title: "Chief Librarian",
    description: "",
    image_url: "/images/library/Staff/Staff_Yendy_Reyes.jpeg",
  },
  {
    name: "Jhoana Marie Manalang",
    title: "Librarian",
    description: "",
    image_url: "/images/library/Staff/Staff_Jhoana_Marie_Manalang.jpeg",
  },
  {
    name: "Iris Claire A. Centeno",
    title: "Librarian",
    description: "",
    image_url: "/images/library/Staff/Staff_Iris_Centeno.jpg",
  },
];

export function getLibraryStaff(value: unknown): LibraryStaffMember[] {
  if (!Array.isArray(value)) return defaultLibraryStaff;

  return defaultLibraryStaff.map((fallback) => {
    const member = value.find((item) => {
      if (!item || typeof item !== "object") return false;
      const imageUrl = (item as Record<string, unknown>).image_url;
      return imageUrl === fallback.image_url;
    });
    if (!member || typeof member !== "object") return fallback;
    const item = member as Record<string, unknown>;

    return {
      name: typeof item.name === "string" && item.name.trim() ? item.name.trim() : fallback.name,
      title: typeof item.title === "string" && item.title.trim() ? item.title.trim() : fallback.title,
      description: typeof item.description === "string" ? item.description.trim() : "",
      image_url: fallback.image_url,
    };
  });
}

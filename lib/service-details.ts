import { facilities as defaultFacilities } from "@/data/facilities";
import { services as defaultServices } from "@/data/services";
import type { ServiceCategoryId } from "@/lib/service-categories";

type DescriptionSource = { name: string; description: string };
export type ServiceDetail = DescriptionSource & {
  id: string;
  category: ServiceCategoryId;
  href?: string;
  linkLabel?: string;
  logo?: { src: string; alt: string; width: number; height: number };
};

type ServiceDefinition = ServiceDetail & { aliases?: string[]; source?: "facility" };

// The librarian's explicit catalogue determines membership and order.
const definitions: ServiceDefinition[] = [
  { id: "circulation-borrowing", category: "circulation", name: "Circulation or Borrowing", aliases: ["Book Borrowing & Circulation", "Circulation", "Borrowing"], description: "Browse and borrow academic and general-interest books through the circulation desk." },
  { id: "research-hub", category: "circulation", name: "Research Hub", source: "facility", description: "A dedicated area for academic research, source evaluation, and reference material access." },
  { id: "current-awareness", category: "circulation", name: "Current Awareness", description: "Stay updated with library news, announcements, activities, events, and services." },
  { id: "opac", category: "digital", name: "OPAC (Online Public Access Catalog)", aliases: ["OPAC"], description: "Search for books and other resources in the library collection through the online catalogue.", href: "http://employeeportal.iacademy.edu.ph/#/library-home", linkLabel: "Open OPAC" },
  { id: "ebscohost", category: "digital", name: "EBSCOhost", aliases: ["EBSCO", "EBSCO Host"], description: "Search academic research resources through the library’s EBSCOhost access.", href: "https://research.ebsco.com/c/s6z26u/search", linkLabel: "Open EBSCOhost", logo: { src: "/images/partners/ebsco-logo.png", alt: "EBSCO", width: 300, height: 64 } },
  { id: "il-rosa", category: "digital", name: "iL ROSA Library Reference Online Service Assistant", description: "Get online assistance with library and research questions from our librarians." },
  { id: "libtap", category: "digital", name: "LIBTAP Electronic Login", description: "Record your library visit by tapping your school ID on the LIBTAP scanner upon entering the library." },
  { id: "audiovisual-room", category: "digital", name: "Audiovisual Room", aliases: ["Audio Visual Room", "Audio-Visual Room"], source: "facility", description: "A tech-equipped room for multimedia viewing, presentations, and audiovisual coursework." },
  { id: "headphone-borrowing", category: "digital", name: "Headphone Borrowing Service", aliases: ["Headphone Borrowing"], description: "Borrow headphones for listening to multimedia resources while studying in the library." },
  { id: "computer-section", category: "digital", name: "Computer Section", description: "Access library computers for academic work, research, and online learning." },
  { id: "charging-station", category: "digital", name: "Charging Station", description: "Charge your devices while studying in the library." },
  { id: "wifi", category: "digital", name: "Wi-Fi Connection", aliases: ["Wifi Connection", "WiFi", "Wi-Fi"], description: "Connect to the library’s Wi-Fi network for academic and research needs." },
  { id: "discussion-rooms", category: "collaborative", name: "Discussion Rooms", aliases: ["Discussion Room", "Discussion Room 1"], source: "facility", description: "Enclosed group rooms for team discussions, project planning, and presentations." },
  { id: "playsmart", category: "collaborative", name: "PlaySmart Area", aliases: ["Play Smart Area"], source: "facility", description: "A relaxed, informal space blending recreation with casual learning between study sessions." },
  { id: "hangout", category: "collaborative", name: "Hangout Room", source: "facility", description: "A comfortable communal space for informal conversation, group bonding, and short breaks." },
  { id: "silent-room", category: "individual", name: "Silent Room", source: "facility", description: "A silent, enclosed space for focused individual work and exam preparation." },
];

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getServiceDetails(services: DescriptionSource[], facilities: DescriptionSource[]): ServiceDetail[] {
  return definitions.map(({ aliases = [], source, ...entry }) => {
    const names = [entry.name, ...aliases].map(normalize);
    const matches = (item: DescriptionSource) => names.includes(normalize(item.name)) && item.description.trim();
    const sources = source === "facility" ? [...facilities, ...services] : [...services, ...facilities];
    const match = sources.find(matches) ?? [...defaultServices, ...defaultFacilities].find(matches);
    return { ...entry, description: match?.description ?? entry.description };
  });
}

import { createClient } from "@/lib/supabase/server";

export type SiteSettings = {
  id: string;
  name: string;
  short_name: string;
  tagline: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  hero_image: string | null;
  logo_url: string | null;
  hero_eyebrow: string;
  hero_headline: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_4_value: string;
  stat_4_label: string;
  social_facebook: string | null;
  social_instagram: string | null;
  social_tiktok: string | null;
};

const FALLBACK: SiteSettings = {
  id: "",
  name: "iACADEMY Library",
  short_name: "iACADEMY",
  tagline: "Knowledge. Access. Excellence.",
  description:
    "The official library portal of iACADEMY — informational hub for resources, services, facilities, and academic support across the Undergraduate and Senior High School libraries.",
  address: "iACADEMY Nexus, 7434 Yakal St., Makati City",
  email: "inquire@iacademy.edu.ph",
  phone: "(02) 8889 5555",
  hero_image: "/images/library/facilities/main-library-reading-hall.jpg",
  logo_url: "/images/library/facilities/iAcademyLogo (3).png",
  hero_eyebrow: "iACADEMY Library — Makati Campus",
  hero_headline: "A modern space for focused learning and discovery.",
  stat_1_value: "300+",
  stat_1_label: "Study Seats",
  stat_2_value: "15",
  stat_2_label: "Facilities",
  stat_3_value: "70+",
  stat_3_label: "Weekly Hours",
  stat_4_value: "2",
  stat_4_label: "Campus Libraries",
  social_facebook: "https://www.facebook.com/iACADEMY",
  social_instagram: "https://www.instagram.com/iacademy_edu/",
  social_tiktok: "https://www.tiktok.com/@iacademyofficial",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return (data as SiteSettings) ?? FALLBACK;
}
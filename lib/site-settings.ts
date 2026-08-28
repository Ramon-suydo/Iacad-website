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
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
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
  hours_weekday: "7:30 AM – 7:00 PM",
  hours_saturday: "8:00 AM – 4:00 PM",
  hours_sunday: "Closed",
  social_facebook: "https://www.facebook.com/iACADEMY",
  social_instagram: "https://www.instagram.com/iacademy_edu/",
  social_tiktok: "https://www.tiktok.com/@iacademyofficial",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return (data as SiteSettings) ?? FALLBACK;
}
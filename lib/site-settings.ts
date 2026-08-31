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
  hero_image_2: string;
  hero_image_3: string;
  hero_image_4: string;
  hero_image_5: string;
  hero_primary_cta_label: string;
  hero_primary_cta_href: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_href: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_4_value: string;
  stat_4_label: string;
  home_services_eyebrow: string;
  home_services_title: string;
  home_services_description: string;
  home_services_link_label: string;
  home_services_link_href: string;
  home_facilities_eyebrow: string;
  home_facilities_title: string;
  home_facilities_description: string;
  home_facilities_link_label: string;
  home_facilities_link_href: string;
  home_announcements_title: string;
  home_announcements_link_label: string;
  home_announcements_link_href: string;
  home_events_title: string;
  home_events_link_label: string;
  home_events_link_href: string;
  home_cta_title: string;
  home_cta_description: string;
  home_cta_button_label: string;
  home_cta_button_href: string;
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
  hero_image_2: "/images/library/facilities/UG LIBRARY.jpg",
  hero_image_3: "/images/library/facilities/UG-Research Hub.jpg",
  hero_image_4: "/images/library/facilities/SHS Library.jpg",
  hero_image_5: "/images/library/facilities/UG-Discussion Room 1.jpg",
  hero_primary_cta_label: "Explore Facilities",
  hero_primary_cta_href: "/facilities",
  hero_secondary_cta_label: "View Services",
  hero_secondary_cta_href: "/services",
  stat_1_value: "300+",
  stat_1_label: "Study Seats",
  stat_2_value: "15",
  stat_2_label: "Facilities",
  stat_3_value: "70+",
  stat_3_label: "Weekly Hours",
  stat_4_value: "2",
  stat_4_label: "Campus Libraries",
  home_services_eyebrow: "What We Offer",
  home_services_title: "Services built around your academic needs",
  home_services_description: "From research support to collaborative spaces, the library provides the tools to help you succeed.",
  home_services_link_label: "View all services →",
  home_services_link_href: "/services",
  home_facilities_eyebrow: "Our Spaces",
  home_facilities_title: "Facilities designed for every study style",
  home_facilities_description: "Explore reading halls, discussion rooms, and quiet rooms across our UG and SHS libraries.",
  home_facilities_link_label: "View all facilities →",
  home_facilities_link_href: "/facilities",
  home_announcements_title: "Latest Announcements",
  home_announcements_link_label: "View all →",
  home_announcements_link_href: "/announcements",
  home_events_title: "Upcoming Events",
  home_events_link_label: "View all →",
  home_events_link_href: "/events",
  home_cta_title: "Visit the Library Today",
  home_cta_description: "Explore our resources, book a study space, or reach out to our team for assistance.",
  home_cta_button_label: "Get in Touch",
  home_cta_button_href: "/contact",
  social_facebook: "https://www.facebook.com/iACADEMY",
  social_instagram: "https://www.instagram.com/iacademy_edu/",
  social_tiktok: "https://www.tiktok.com/@iacademyofficial",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return data ? { ...FALLBACK, ...(data as Partial<SiteSettings>) } : FALLBACK;
}

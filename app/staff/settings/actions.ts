"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

const BUCKET = "site-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

async function uploadIfProvided(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null,
  prefix: string,
  fallback: string | null
) {
  if (!file || file.size === 0) return fallback;
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Images must be 5 MB or smaller.");
  const ext = IMAGE_EXTENSIONS[file.type];
  if (!ext) throw new Error("Only JPG, PNG, WebP, and AVIF images are allowed.");
  const path = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveSiteSettings(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;

  const heroImage = await uploadIfProvided(
    supabase,
    formData.get("hero_image") as File | null,
    "hero",
    (formData.get("current_hero_image") as string) || null
  );
  const logoUrl = await uploadIfProvided(
    supabase,
    formData.get("logo") as File | null,
    "logo",
    (formData.get("current_logo_url") as string) || null
  );

  const payload = {
    name: (formData.get("name") as string).trim(),
    short_name: (formData.get("short_name") as string).trim(),
    tagline: (formData.get("tagline") as string).trim(),
    description: (formData.get("description") as string).trim(),
    address: (formData.get("address") as string).trim(),
    email: (formData.get("email") as string).trim(),
    phone: (formData.get("phone") as string).trim(),
    hero_image: heroImage,
    logo_url: logoUrl,
    hero_eyebrow: (formData.get("hero_eyebrow") as string).trim(),
    hero_headline: (formData.get("hero_headline") as string).trim(),
    hero_image_2: (formData.get("hero_image_2") as string).trim(),
    hero_image_3: (formData.get("hero_image_3") as string).trim(),
    hero_image_4: (formData.get("hero_image_4") as string).trim(),
    hero_image_5: (formData.get("hero_image_5") as string).trim(),
    hero_primary_cta_label: (formData.get("hero_primary_cta_label") as string).trim(),
    hero_primary_cta_href: (formData.get("hero_primary_cta_href") as string).trim(),
    hero_secondary_cta_label: (formData.get("hero_secondary_cta_label") as string).trim(),
    hero_secondary_cta_href: (formData.get("hero_secondary_cta_href") as string).trim(),
    stat_1_value: (formData.get("stat_1_value") as string).trim(),
    stat_1_label: (formData.get("stat_1_label") as string).trim(),
    stat_2_value: (formData.get("stat_2_value") as string).trim(),
    stat_2_label: (formData.get("stat_2_label") as string).trim(),
    stat_3_value: (formData.get("stat_3_value") as string).trim(),
    stat_3_label: (formData.get("stat_3_label") as string).trim(),
    stat_4_value: (formData.get("stat_4_value") as string).trim(),
    stat_4_label: (formData.get("stat_4_label") as string).trim(),
    home_services_eyebrow: (formData.get("home_services_eyebrow") as string).trim(),
    home_services_title: (formData.get("home_services_title") as string).trim(),
    home_services_description: (formData.get("home_services_description") as string).trim(),
    home_services_link_label: (formData.get("home_services_link_label") as string).trim(),
    home_services_link_href: (formData.get("home_services_link_href") as string).trim(),
    home_facilities_eyebrow: (formData.get("home_facilities_eyebrow") as string).trim(),
    home_facilities_title: (formData.get("home_facilities_title") as string).trim(),
    home_facilities_description: (formData.get("home_facilities_description") as string).trim(),
    home_facilities_link_label: (formData.get("home_facilities_link_label") as string).trim(),
    home_facilities_link_href: (formData.get("home_facilities_link_href") as string).trim(),
    home_announcements_title: (formData.get("home_announcements_title") as string).trim(),
    home_announcements_link_label: (formData.get("home_announcements_link_label") as string).trim(),
    home_announcements_link_href: (formData.get("home_announcements_link_href") as string).trim(),
    home_events_title: (formData.get("home_events_title") as string).trim(),
    home_events_link_label: (formData.get("home_events_link_label") as string).trim(),
    home_events_link_href: (formData.get("home_events_link_href") as string).trim(),
    home_cta_title: (formData.get("home_cta_title") as string).trim(),
    home_cta_description: (formData.get("home_cta_description") as string).trim(),
    home_cta_button_label: (formData.get("home_cta_button_label") as string).trim(),
    home_cta_button_href: (formData.get("home_cta_button_href") as string).trim(),
    social_facebook: (formData.get("social_facebook") as string)?.trim() || null,
    social_instagram: (formData.get("social_instagram") as string)?.trim() || null,
    social_tiktok: (formData.get("social_tiktok") as string)?.trim() || null,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "site_settings", operation: "update", recordId: id, payload, title: "Site settings" });
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect(`/staff/settings?notice=${saveNotice(role)}`);
}

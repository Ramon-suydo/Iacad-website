"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "site-images";

async function uploadIfProvided(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null,
  prefix: string,
  fallback: string | null
) {
  if (!file || file.size === 0) return fallback;
  const ext = file.name.split(".").pop() || "png";
  const path = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

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
    stat_1_value: (formData.get("stat_1_value") as string).trim(),
    stat_1_label: (formData.get("stat_1_label") as string).trim(),
    stat_2_value: (formData.get("stat_2_value") as string).trim(),
    stat_2_label: (formData.get("stat_2_label") as string).trim(),
    stat_3_value: (formData.get("stat_3_value") as string).trim(),
    stat_3_label: (formData.get("stat_3_label") as string).trim(),
    stat_4_value: (formData.get("stat_4_value") as string).trim(),
    stat_4_label: (formData.get("stat_4_label") as string).trim(),
    social_facebook: (formData.get("social_facebook") as string)?.trim() || null,
    social_instagram: (formData.get("social_instagram") as string)?.trim() || null,
    social_tiktok: (formData.get("social_tiktok") as string)?.trim() || null,
  };

  const { error } = await supabase.from("site_settings").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/staff/settings");
}
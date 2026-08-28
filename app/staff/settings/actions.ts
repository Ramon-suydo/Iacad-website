"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "site-images";

export async function saveSiteSettings(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const currentHeroImage = (formData.get("current_hero_image") as string) || null;
  const file = formData.get("hero_image") as File | null;
  let heroImage = currentHeroImage;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `hero-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    heroImage = publicUrlData.publicUrl;
  }

  const payload = {
    name: (formData.get("name") as string).trim(),
    short_name: (formData.get("short_name") as string).trim(),
    tagline: (formData.get("tagline") as string).trim(),
    description: (formData.get("description") as string).trim(),
    address: (formData.get("address") as string).trim(),
    email: (formData.get("email") as string).trim(),
    phone: (formData.get("phone") as string).trim(),
    hero_image: heroImage,
    social_facebook: (formData.get("social_facebook") as string)?.trim() || null,
    social_instagram: (formData.get("social_instagram") as string)?.trim() || null,
    social_tiktok: (formData.get("social_tiktok") as string)?.trim() || null,
  };

  const { error } = await supabase.from("site_settings").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/staff/settings");
}
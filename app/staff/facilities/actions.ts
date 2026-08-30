"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { friendlyDbError } from "@/lib/db-error";
import type { FormState } from "@/lib/form-state";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const BUCKET = "facility-images";

export async function saveFacility(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const campus = formData.get("campus") as string;
  const description = (formData.get("description") as string).trim();
  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";
  const currentImageUrl = (formData.get("current_image_url") as string) || null;

  const file = formData.get("image") as File | null;
  let imageUrl = currentImageUrl;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slugify(name)}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
    if (uploadError) return { error: uploadError.message };
    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    imageUrl = publicUrlData.publicUrl;
  }

  const payload = {
    name,
    slug: `${campus.toLowerCase()}-${slugify(name)}`,
    campus,
    description,
    image_url: imageUrl,
    tags,
    sort_order: sortOrder,
    published,
    pending_review: role !== "chief",
    submitted_by: user.id,
  };

  if (id) {
    const { error } = await supabase.from("facilities").update(payload).eq("id", id);
    if (error) return { error: friendlyDbError(error, "A facility with this name already exists in this campus") };
  } else {
    const { error } = await supabase.from("facilities").insert(payload);
    if (error) return { error: friendlyDbError(error, "A facility with this name already exists in this campus") };
  }

  revalidatePath("/staff/facilities");
  revalidatePath("/facilities");
  revalidatePath("/");
  redirect("/staff/facilities");
}

export async function deleteFacility(formData: FormData) {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const imageUrl = formData.get("image_url") as string | null;

  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (imageUrl) {
    const marker = `/${BUCKET}/`;
    const idx = imageUrl.indexOf(marker);
    if (idx !== -1) {
      const path = imageUrl.slice(idx + marker.length);
      await supabase.storage.from(BUCKET).remove([path]);
    }
  }

  revalidatePath("/staff/facilities");
  revalidatePath("/facilities");
  revalidatePath("/");
}
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { friendlyDbError } from "@/lib/db-error";
import type { FormState } from "@/lib/form-state";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const BUCKET = "facility-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

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
    if (file.size > MAX_IMAGE_BYTES) return { error: "Images must be 5 MB or smaller." };
    const ext = IMAGE_EXTENSIONS[file.type];
    if (!ext) return { error: "Only JPG, PNG, WebP, and AVIF images are allowed." };
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
    pending_review: false,
    submitted_by: user.id,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "facilities", operation: id ? "update" : "insert", recordId: id, payload, title: name });
  if (error) return { error: friendlyDbError(error, "A facility with this name already exists in this campus") };

  revalidatePath("/staff/facilities");
  revalidatePath("/facilities");
  revalidatePath("/");
  redirect(`/staff/facilities?notice=${saveNotice(role)}`);
}

export async function deleteFacility(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const imageUrl = formData.get("image_url") as string | null;

  const title = (formData.get("name") as string) || "Facility";
  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "facilities", operation: "delete", recordId: id, payload: { image_url: imageUrl }, title });
  if (error) throw new Error(error.message);

  if (role === "chief" && imageUrl) {
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

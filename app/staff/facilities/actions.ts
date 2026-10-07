"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { friendlyDbError } from "@/lib/db-error";
import type { FormState } from "@/lib/form-state";
import { resolveUploadedImage } from "@/lib/uploaded-image";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

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

  const image = await resolveUploadedImage(supabase, user.id, formData,
    { name: "image", bucket: "facility-images" }, currentImageUrl);
  if (image.error) return { error: image.error };

  const payload = {
    name,
    slug: `${campus.toLowerCase()}-${slugify(name)}`,
    campus,
    description,
    image_url: image.url,
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

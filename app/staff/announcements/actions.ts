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

export async function saveAnnouncement(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const summary = (formData.get("summary") as string).trim();
  const published = formData.get("published") === "on";

  const payload = {
    title,
    slug: slugify(title),
    category,
    date,
    summary,
    published,
    pending_review: role !== "chief",
    submitted_by: user.id,
  };

  if (id) {
    const { error } = await supabase.from("announcements").update(payload).eq("id", id);
    if (error) return { error: friendlyDbError(error, "An announcement") };
  } else {
    const { error } = await supabase.from("announcements").insert(payload);
    if (error) return { error: friendlyDbError(error, "An announcement") };
  }

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
  redirect("/staff/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
}
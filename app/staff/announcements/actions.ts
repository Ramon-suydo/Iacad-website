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
    pending_review: false,
    submitted_by: user.id,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "announcements", operation: id ? "update" : "insert", recordId: id, payload, title });
  if (error) return { error: friendlyDbError(error, "An announcement") };

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
  redirect(`/staff/announcements?notice=${saveNotice(role)}`);
}

export async function deleteAnnouncement(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string) || "Announcement";
  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "announcements", operation: "delete", recordId: id, payload: {}, title });
  if (error) throw new Error(error.message);

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
}

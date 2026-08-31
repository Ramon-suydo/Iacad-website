"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function saveGuideline(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const rulesRaw = (formData.get("rules") as string) ?? "";
  const rules = rulesRaw.split("\n").map((r) => r.trim()).filter(Boolean);
  const note = (formData.get("note") as string)?.trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";

  const payload = {
    title,
    slug: slugify(title),
    rules,
    note,
    sort_order: sortOrder,
    published,
    pending_review: false,
    submitted_by: user.id,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "guidelines", operation: id ? "update" : "insert", recordId: id, payload, title });
  if (error) throw new Error(error.message);

  revalidatePath("/staff/guidelines");
  revalidatePath("/guidelines");
  revalidatePath("/");
  redirect(`/staff/guidelines?notice=${saveNotice(role)}`);
}

export async function deleteGuideline(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "guidelines", operation: "delete", recordId: id, payload: {}, title: "Guideline" });
  if (error) throw new Error(error.message);

  revalidatePath("/staff/guidelines");
  revalidatePath("/guidelines");
  revalidatePath("/");
}

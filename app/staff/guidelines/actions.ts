"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";

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
    pending_review: role !== "chief",
    submitted_by: user.id,
  };

  if (id) {
    const { error } = await supabase.from("guidelines").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("guidelines").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/staff/guidelines");
  revalidatePath("/guidelines");
  revalidatePath("/");
  redirect("/staff/guidelines");
}

export async function deleteGuideline(formData: FormData) {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const { error } = await supabase.from("guidelines").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/guidelines");
  revalidatePath("/guidelines");
  revalidatePath("/");
}
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveGuideline(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const rulesRaw = (formData.get("rules") as string) ?? "";
  const rules = rulesRaw
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";

  const payload = {
    title,
    slug: slugify(title),
    rules,
    sort_order: sortOrder,
    published,
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
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const { error } = await supabase.from("guidelines").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/guidelines");
  revalidatePath("/guidelines");
  revalidatePath("/");
}
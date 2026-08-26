"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveAnnouncement(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const summary = (formData.get("summary") as string).trim();
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const published = formData.get("published") === "on";

  const payload = { title, summary, category, date, published, slug: slugify(title) };

  if (id) {
    const { error } = await supabase.from("announcements").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("announcements").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
  redirect("/staff/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/announcements");
  revalidatePath("/announcements");
  revalidatePath("/");
}
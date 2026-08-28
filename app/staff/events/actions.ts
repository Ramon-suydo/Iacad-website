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

export async function saveEvent(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const eventDate = formData.get("event_date") as string;
  const eventTime = (formData.get("event_time") as string).trim();
  const location = (formData.get("location") as string).trim();
  const description = (formData.get("description") as string).trim();
  const published = formData.get("published") === "on";

  const payload = {
    title,
    slug: slugify(title),
    event_date: eventDate,
    event_time: eventTime,
    location,
    description,
    published,
  };

  if (id) {
    const { error } = await supabase.from("events").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("events").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/staff/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/staff/events");
}

export async function deleteEvent(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/events");
  revalidatePath("/events");
  revalidatePath("/");
}
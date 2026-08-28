"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveLibraryHours(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const ids = (formData.get("ids") as string).split(",").filter(Boolean);

  for (const id of ids) {
    const isClosed = formData.get(`is_closed__${id}`) === "on";
    const hoursTextRaw = (formData.get(`hours_text__${id}`) as string)?.trim() || "";
    const hoursText = isClosed ? "Closed" : hoursTextRaw || "Closed";

    const { error } = await supabase
      .from("library_hours")
      .update({ hours_text: hoursText, is_closed: isClosed })
      .eq("id", id);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/staff/hours");
}
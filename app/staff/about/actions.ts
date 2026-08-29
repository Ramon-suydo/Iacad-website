"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveAboutContent(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const goalsRaw = (formData.get("goals") as string) ?? "";
  const goals = goalsRaw.split("\n").map((g) => g.trim()).filter(Boolean);

  const payload = {
    introduction: (formData.get("introduction") as string).trim(),
    mission: (formData.get("mission") as string).trim(),
    vision: (formData.get("vision") as string).trim(),
    goals,
  };

  const { error } = await supabase.from("about_content").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/about");
  redirect("/staff/about");
}
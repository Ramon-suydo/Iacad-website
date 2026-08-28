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

  const payload = {
    mission_left: (formData.get("mission_left") as string).trim(),
    mission_right: (formData.get("mission_right") as string).trim(),
    value_1_title: (formData.get("value_1_title") as string).trim(),
    value_1_description: (formData.get("value_1_description") as string).trim(),
    value_2_title: (formData.get("value_2_title") as string).trim(),
    value_2_description: (formData.get("value_2_description") as string).trim(),
    value_3_title: (formData.get("value_3_title") as string).trim(),
    value_3_description: (formData.get("value_3_description") as string).trim(),
    value_4_title: (formData.get("value_4_title") as string).trim(),
    value_4_description: (formData.get("value_4_description") as string).trim(),
  };

  const { error } = await supabase.from("about_content").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/about");
  redirect("/staff/about");
}
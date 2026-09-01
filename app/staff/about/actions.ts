"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";
import { defaultLibraryStaff } from "@/lib/about-team";

export async function saveAboutContent(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const goalsRaw = (formData.get("goals") as string) ?? "";
  const goals = goalsRaw.split("\n").map((g) => g.trim()).filter(Boolean);
  const staffMembers = defaultLibraryStaff.map((member, index) => ({
    name: String(formData.get(`staff_name_${index}`) ?? "").trim() || member.name,
    title: String(formData.get(`staff_title_${index}`) ?? "").trim() || member.title,
    description: String(formData.get(`staff_description_${index}`) ?? "").trim(),
    image_url: member.image_url,
  }));

  const payload = {
    introduction: (formData.get("introduction") as string).trim(),
    mission: (formData.get("mission") as string).trim(),
    vision: (formData.get("vision") as string).trim(),
    goals,
    staff_members: staffMembers,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "about_content", operation: "update", recordId: id, payload, title: "About page content" });
  if (error) throw new Error(error.message);

  revalidatePath("/about");
  redirect(`/staff/about?notice=${saveNotice(role)}`);
}

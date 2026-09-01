"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";

export async function deleteOwnRequest(formData: FormData) {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");

  const id = formData.get("id") as string;
  const supabase = await createClient();
  const { error } = await supabase
    .from("change_requests")
    .update({ status: "deleted", reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .eq("submitted_by", user.id)
    .eq("status", "pending");

  if (error) throw new Error(error.message);
  revalidatePath("/staff/requests");
  revalidatePath("/staff/approvals");
  redirect("/staff/requests?notice=deleted");
}

export async function clearOwnRequestHistory() {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");

  const supabase = await createClient();
  const { error } = await supabase
    .from("change_requests")
    .update({ status: "deleted", reviewed_at: new Date().toISOString() })
    .eq("submitted_by", user.id)
    .eq("status", "pending");

  if (error) throw new Error(error.message);
  revalidatePath("/staff/requests");
  revalidatePath("/staff/approvals");
  redirect("/staff/requests?notice=cleared");
}
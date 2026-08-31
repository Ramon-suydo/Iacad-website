"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { CHANGE_TABLES, type ChangeTable } from "@/lib/change-requests";

function isAllowedTable(value: string): value is ChangeTable {
  return CHANGE_TABLES.includes(value as ChangeTable);
}

export async function approveItem(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user || role !== "chief") redirect("/staff");
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { data: request, error: requestError } = await supabase
    .from("change_requests").select("*").eq("id", id).eq("status", "pending").single();
  if (requestError || !request || !isAllowedTable(request.table_name)) throw new Error("Approval request unavailable.");

  let error = null;
  if (request.operation === "insert") {
    ({ error } = await supabase.from(request.table_name).insert(request.payload));
  } else if (request.operation === "update" && request.record_id) {
    ({ error } = await supabase.from(request.table_name).update(request.payload).eq("id", request.record_id));
  } else if (request.operation === "delete" && request.record_id) {
    ({ error } = await supabase.from(request.table_name).delete().eq("id", request.record_id));
  } else if (request.operation === "bulk_update" && request.table_name === "library_hours") {
    const changes = request.payload.changes as Array<{ id: string; hours_text: string; is_closed: boolean }>;
    for (const change of changes) {
      const result = await supabase.from("library_hours").update({ hours_text: change.hours_text, is_closed: change.is_closed }).eq("id", change.id);
      if (result.error) { error = result.error; break; }
    }
  } else {
    throw new Error("Invalid approval request.");
  }
  if (error) throw new Error(error.message);

  const { error: statusError } = await supabase.from("change_requests").update({
    status: "approved", reviewed_by: user.id, reviewed_at: new Date().toISOString(),
  }).eq("id", id);
  if (statusError) throw new Error(statusError.message);
  revalidatePath("/staff/approvals");
  revalidatePath(`/staff/${request.table_name}`);
  revalidatePath(`/${request.table_name}`);
  revalidatePath("/", "layout");
  redirect("/staff/approvals?notice=approved");
}

export async function rejectItem(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user || role !== "chief") redirect("/staff");
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("change_requests").update({
    status: "rejected", reviewed_by: user.id, reviewed_at: new Date().toISOString(),
  }).eq("id", id).eq("status", "pending");
  if (error) throw new Error(error.message);
  revalidatePath("/staff/approvals");
  redirect("/staff/approvals?notice=rejected");
}

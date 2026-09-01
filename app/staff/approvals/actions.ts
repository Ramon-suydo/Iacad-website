"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { CHANGE_TABLES, type ChangeTable } from "@/lib/change-requests";

function isAllowedTable(value: string): value is ChangeTable {
  return CHANGE_TABLES.includes(value as ChangeTable);
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * If the payload contains a `slug` field, make sure it's unique within the
 * target table. If it collides with another row (excluding the record being
 * updated, if any), append -2, -3, etc. until it's unique.
 */
async function ensureUniqueSlug(
  supabase: SupabaseServerClient,
  table: ChangeTable,
  payload: Record<string, unknown>,
  excludeId?: string | null
) {
  const baseSlug = payload.slug;
  if (typeof baseSlug !== "string" || baseSlug.length === 0) return payload;

  let candidate = baseSlug;
  let suffix = 2;

  // Loop until we find a slug with no conflicting row.
  // Capped at 50 attempts as a safety net against infinite loops.
  for (let attempts = 0; attempts < 50; attempts++) {
    let query = supabase.from(table).select("id").eq("slug", candidate).limit(1);
    if (excludeId) {
      query = query.neq("id", excludeId);
    }
    const { data: existing, error } = await query;

    if (error) {
      // If the lookup itself fails, don't block the approval on a slug check —
      // fall through and let the real insert/update surface any actual error.
      return payload;
    }

    if (!existing || existing.length === 0) {
      return { ...payload, slug: candidate };
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  // If we somehow exhaust attempts, return the original payload and let the
  // database constraint catch it as before.
  return payload;
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
    const payload = await ensureUniqueSlug(supabase, request.table_name, request.payload, null);
    ({ error } = await supabase.from(request.table_name).insert(payload));
  } else if (request.operation === "update" && request.record_id) {
    const payload = await ensureUniqueSlug(supabase, request.table_name, request.payload, request.record_id);
    ({ error } = await supabase.from(request.table_name).update(payload).eq("id", request.record_id));
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

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        `This request can't be approved because of a duplicate value in ${request.table_name}. Please reject this request or edit it before approving again.`
      );
    }
    throw new Error(error.message);
  }

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
export async function deleteRequestForChief(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user || role !== "chief") redirect("/staff");

  const id = formData.get("id") as string;
  const supabase = await createClient();
  const { error } = await supabase
    .from("change_requests")
    .update({ status: "deleted", reviewed_by: user.id, reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .in("status", ["pending", "approved"]);

  if (error) throw new Error(error.message);
  revalidatePath("/staff/approvals");
  revalidatePath("/staff/requests");
  redirect("/staff/approvals?notice=deleted");
}
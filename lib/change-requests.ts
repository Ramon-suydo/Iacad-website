import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { StaffRole } from "@/lib/staff-role";

export const CHANGE_TABLES = [
  "announcements", "facilities", "events", "services", "guidelines",
  "resources", "about_content", "library_hours", "site_settings",
] as const;

export type ChangeTable = (typeof CHANGE_TABLES)[number];
export type ChangeOperation = "insert" | "update" | "delete" | "bulk_update";

export function saveNotice(role: StaffRole | null) {
  return role === "chief" ? "saved" : "requested";
}

export async function queueOrApplyChange({
  supabase,
  userId,
  role,
  table,
  operation,
  recordId,
  payload,
  title,
}: {
  supabase: SupabaseClient;
  userId: string;
  role: StaffRole | null;
  table: ChangeTable;
  operation: ChangeOperation;
  recordId?: string | null;
  payload: Record<string, unknown>;
  title: string;
}) {
  if (role === "chief") {
    if (operation === "insert") return supabase.from(table).insert(payload);
    if (operation === "update" && recordId) return supabase.from(table).update(payload).eq("id", recordId);
    if (operation === "delete" && recordId) return supabase.from(table).delete().eq("id", recordId);
    if (operation === "bulk_update" && table === "library_hours") {
      const changes = payload.changes as Array<{ id: string; hours_text: string; is_closed: boolean }>;
      for (const change of changes) {
        const { error } = await supabase.from("library_hours").update({
          hours_text: change.hours_text,
          is_closed: change.is_closed,
        }).eq("id", change.id);
        if (error) return { error };
      }
      return { error: null };
    }
    throw new Error("Invalid change request");
  }

  return supabase.from("change_requests").insert({
    table_name: table,
    operation,
    record_id: recordId ?? null,
    payload,
    title,
    submitted_by: userId,
    status: "pending",
  });
}

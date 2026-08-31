import type { PostgrestError } from "@supabase/supabase-js";

export function friendlyDbError(error: PostgrestError, itemLabel: string) {
  if (error.code === "23505") {
    return `${itemLabel} with that name already exists. Please use a different name.`;
  }
  if (error.code === "PGRST205" && error.message.includes("change_requests")) {
    return "The staff approval system has not been initialized yet. Ask the administrator to run migration 202608310003 in Supabase.";
  }
  return error.message;
}

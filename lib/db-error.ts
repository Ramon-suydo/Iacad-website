import type { PostgrestError } from "@supabase/supabase-js";

export function friendlyDbError(error: PostgrestError, itemLabel: string) {
  if (error.code === "23505") {
    return `${itemLabel} with that name already exists. Please use a different name.`;
  }
  return error.message;
}
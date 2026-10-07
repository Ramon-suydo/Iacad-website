"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/lib/form-state";
import { friendlyDbError } from "@/lib/db-error";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

export async function saveLibraryHours(_previous: FormState, formData: FormData): Promise<FormState> {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const ids = (formData.get("ids") as string).split(",").filter(Boolean);

  const changes = ids.map((id) => {
    const isClosed = formData.get(`is_closed__${id}`) === "on";
    const hoursTextRaw = (formData.get(`hours_text__${id}`) as string)?.trim() || "";
    const hoursText = isClosed ? "Closed" : hoursTextRaw || "Closed";
    return { id, hours_text: hoursText, is_closed: isClosed };
  });

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "library_hours", operation: "bulk_update", payload: { changes }, title: "Library hours" });
  if (error) return { error: friendlyDbError(error, "This content") };

  revalidatePath("/", "layout");
  redirect(`/staff/hours?notice=${saveNotice(role)}`);
}

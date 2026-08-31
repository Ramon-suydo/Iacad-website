"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { friendlyDbError } from "@/lib/db-error";
import type { FormState } from "@/lib/form-state";
import { queueOrApplyChange, saveNotice } from "@/lib/change-requests";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function saveEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const eventDate = formData.get("event_date") as string;
  const eventTime = (formData.get("event_time") as string).trim();
  const location = (formData.get("location") as string).trim();
  const description = (formData.get("description") as string).trim();
  const published = formData.get("published") === "on";

  const payload = {
    title,
    slug: slugify(title),
    event_date: eventDate,
    event_time: eventTime,
    location,
    description,
    published,
    pending_review: false,
    submitted_by: user.id,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "events", operation: id ? "update" : "insert", recordId: id, payload, title });
  if (error) return { error: friendlyDbError(error, "An event") };

  revalidatePath("/staff/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect(`/staff/events?notice=${saveNotice(role)}`);
}

export async function deleteEvent(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "events", operation: "delete", recordId: id, payload: {}, title: "Event" });
  if (error) throw new Error(error.message);

  revalidatePath("/staff/events");
  revalidatePath("/events");
  revalidatePath("/");
}

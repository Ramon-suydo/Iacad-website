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

export async function saveResource(_prevState: FormState, formData: FormData): Promise<FormState> {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const itemsRaw = (formData.get("items") as string) ?? "";
  const items = itemsRaw.split("\n").map((r) => r.trim()).filter(Boolean);
  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";

  const payload = {
    name,
    slug: slugify(name),
    description,
    items,
    sort_order: sortOrder,
    published,
    pending_review: false,
    submitted_by: user.id,
  };

  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "resources", operation: id ? "update" : "insert", recordId: id, payload, title: name });
  if (error) return { error: friendlyDbError(error, "A resource category") };

  revalidatePath("/staff/resources");
  revalidatePath("/resources");
  revalidatePath("/");
  redirect(`/staff/resources?notice=${saveNotice(role)}`);
}

export async function deleteResource(formData: FormData) {
  const { user, role } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const { error } = await queueOrApplyChange({ supabase, userId: user.id, role,
    table: "resources", operation: "delete", recordId: id, payload: {}, title: "Resource" });
  if (error) throw new Error(error.message);

  revalidatePath("/staff/resources");
  revalidatePath("/resources");
  revalidatePath("/");
}

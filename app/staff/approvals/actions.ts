"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";

const ALLOWED_TABLES = ["announcements", "facilities", "events", "services", "guidelines", "resources"] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];

function assertTable(table: string): asserts table is AllowedTable {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) throw new Error("Invalid table");
}

export async function approveItem(formData: FormData) {
  const { role } = await getStaffContext();
  if (role !== "chief") redirect("/staff");

  const table = formData.get("table") as string;
  const id = formData.get("id") as string;
  assertTable(table);

  const supabase = await createClient();
  const { error } = await supabase.from(table).update({ pending_review: false }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/approvals");
  revalidatePath(`/staff/${table}`);
  revalidatePath(`/${table}`);
  revalidatePath("/");
}

export async function rejectItem(formData: FormData) {
  const { role } = await getStaffContext();
  if (role !== "chief") redirect("/staff");

  const table = formData.get("table") as string;
  const id = formData.get("id") as string;
  assertTable(table);

  const supabase = await createClient();
  const { error } = await supabase.from(table).update({ pending_review: false, published: false }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/staff/approvals");
  revalidatePath(`/staff/${table}`);
}
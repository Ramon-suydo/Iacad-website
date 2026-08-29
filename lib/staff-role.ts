import { createClient } from "@/lib/supabase/server";

export type StaffRole = "staff" | "chief";

export async function getStaffContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null as StaffRole | null };

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  return { user, role: (profile?.role as StaffRole) ?? "staff" };
}
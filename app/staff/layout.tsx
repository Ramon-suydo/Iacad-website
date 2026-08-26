import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders without the staff shell/nav around it
  if (!user) {
    return <>{children}</>;
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("full_name")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    // Logged in, but not an authorized staff member
    await supabase.auth.signOut();
    redirect("/staff/login");
  }

  return (
    <div className="min-h-screen bg-navy-50/30">
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg font-semibold text-navy-950">
            Library Staff Panel
          </span>
          <span className="text-sm text-navy-700/60">{profile.full_name}</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signOutStaff } from "./actions";

const baseNav = [
  { href: "/staff/announcements", label: "Announcements" },
  { href: "/staff/facilities", label: "Facilities" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/services", label: "Services" },
  { href: "/staff/guidelines", label: "Guidelines" },
  { href: "/staff/resources", label: "Resources" },
  { href: "/staff/about", label: "About Page" },
  { href: "/staff/hours", label: "Library Hours" },
  { href: "/staff/settings", label: "Site Settings" },
];

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("full_name, role")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/staff/login");
  }

  const staffNav =
    profile.role === "chief"
      ? [{ href: "/staff/approvals", label: "Approvals" }, ...baseNav]
      : baseNav;

  return (
    <div className="min-h-screen bg-navy-50/30">
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg font-semibold text-navy-950">
            Library Staff Panel
          </span>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-sm text-navy-700/60">{profile.full_name}</span>
              {profile.role === "chief" && (
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Chief Librarian
                </span>
              )}
            </div>
            <form action={signOutStaff}>
              <button
                type="submit"
                className="rounded-md border border-navy-900/15 px-3 py-1.5 text-xs font-semibold text-navy-700/70 hover:border-navy-900/30 hover:text-navy-950"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-6 pb-3">
          {staffNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-700/70 hover:text-navy-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const staffNav = [
  { href: "/staff/announcements", label: "Announcements" },
  { href: "/staff/facilities", label: "Facilities" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/services", label: "Services" },
  { href: "/staff/guidelines", label: "Guidelines" },
  { href: "/staff/resources", label: "Resources" },
  { href: "/staff/about", label: "About Page" },
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
    .select("full_name")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
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
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { signOutStaff } from "./actions";
import StaffNav from "@/components/StaffNav";
import StaffToast from "@/components/StaffToast";
import { Suspense } from "react";

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
    .maybeSingle();

  if (!profile) {
    return <>{children}</>;
  }

  const staffNav =
    profile.role === "chief"
      ? [{ href: "/staff/approvals", label: "Approvals" }, ...baseNav]
      : [{ href: "/staff/requests", label: "My Requests" }, ...baseNav];

  return (
    <div className="staff-shell min-h-screen bg-paper">
      <header className="border-b border-navy-900/10 bg-white text-navy-950 shadow-[0_10px_30px_-24px_rgba(7,11,31,.35)]">
        <div className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-4 sm:px-7 sm:py-5">
          <Link href="/staff" className="flex items-center gap-3">
            <Image
              src="/images/library/facilities/iAcademyLogo%20(3).png"
              alt="iACADEMY Makati"
              width={1920}
              height={615}
              className="h-auto w-[150px] object-contain sm:w-[180px]"
              priority
            />
            <span className="hidden border-l border-navy-900/10 pl-3 text-sm font-extrabold tracking-tight min-[520px]:block">
              Library Staff <span className="block text-[9px] font-bold uppercase tracking-[.16em] text-cobalt-500">Content Panel</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <span className="block text-sm text-navy-700/70">{profile.full_name}</span>
              {profile.role === "chief" && (
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Chief Librarian
                </span>
              )}
              {profile.role === "staff" && (
                <span className="text-xs font-semibold uppercase tracking-wide text-cobalt-500">
                  Librarian
                </span>
              )}
            </div>
            <form action={signOutStaff}>
              <button
                type="submit"
                className="rounded-lg border border-navy-900/15 px-3 py-2 text-xs font-semibold text-navy-700/70 hover:border-cobalt-500/30 hover:bg-cobalt-500/5 hover:text-navy-950"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
        <StaffNav items={staffNav} />
      </header>
      <div className="mx-auto max-w-[1240px] px-4 py-7 sm:px-7 sm:py-12">{children}</div>
      <Suspense fallback={null}><StaffToast /></Suspense>
    </div>
  );
}

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";

export const metadata: Metadata = { title: "My Requests" };
export const revalidate = 0;

const tableLabels: Record<string, string> = {
  announcements: "Announcement", facilities: "Facility", events: "Event", services: "Service",
  guidelines: "Guideline", resources: "Resource", about_content: "About page",
  library_hours: "Library hours", site_settings: "Site settings",
};

const statusStyles: Record<string, string> = {
  pending: "bg-pop-amber/18 text-amber-800",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function MyRequestsPage() {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();
  const { data: requests } = await supabase.from("change_requests").select("*")
    .eq("submitted_by", user.id).order("created_at", { ascending: false }).limit(100);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">My Requests</h1>
      <p className="mt-1 text-sm text-navy-700/60">Track changes you submitted for chief-librarian review.</p>
      <div className="mt-8 space-y-3">
        {(requests ?? []).length === 0 && <div className="rounded-xl border border-navy-900/10 bg-white p-6 text-sm text-navy-700/60">You have not submitted any requests yet.</div>}
        {(requests ?? []).map((request) => (
          <div key={request.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-navy-900/10 bg-white p-4">
            <div>
              <p className="font-semibold text-navy-950">{request.title}</p>
              <p className="mt-1 text-xs text-navy-700/50">
                {tableLabels[request.table_name] ?? request.table_name} · {request.operation.replace("_", " ")} · {new Date(request.created_at).toLocaleString("en-PH")}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[request.status] ?? "bg-navy-900/5 text-navy-700"}`}>{request.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

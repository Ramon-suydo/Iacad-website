import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import ApproveRejectButtons from "./ApproveRejectButtons";

export const metadata: Metadata = { title: "Approvals" };
export const revalidate = 0;

const tableLabels: Record<string, string> = {
  announcements: "Announcement", facilities: "Facility", events: "Event", services: "Service",
  guidelines: "Guideline", resources: "Resource", about_content: "About page",
  library_hours: "Library hours", site_settings: "Site settings",
};

export default async function ApprovalsPage() {
  const { role } = await getStaffContext();
  if (role !== "chief") redirect("/staff");
  const supabase = await createClient();
  const { data: requests } = await supabase.from("change_requests").select("*").eq("status", "pending").order("created_at", { ascending: true });
  const submitterIds = Array.from(new Set((requests ?? []).map((item) => item.submitted_by)));
  const { data: submitters } = submitterIds.length
    ? await supabase.from("staff_profiles").select("user_id, full_name").in("user_id", submitterIds)
    : { data: [] as { user_id: string; full_name: string }[] };
  const nameFor = (id: string) => submitters?.find((s) => s.user_id === id)?.full_name ?? "Unknown librarian";

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Approvals</h1>
      <p className="mt-1 text-sm text-navy-700/60">
        {(requests?.length ?? 0) === 0 ? "Nothing waiting for review." : `${requests?.length} change request${requests?.length === 1 ? "" : "s"} waiting for review.`}
      </p>
      <div className="mt-8 space-y-3">
        {(requests ?? []).map((request) => (
          <div key={request.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-navy-900/10 bg-white p-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cobalt-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cobalt-500">{request.operation.replace("_", " ")}</span>
                <span className="text-xs text-navy-700/50">{tableLabels[request.table_name] ?? request.table_name}</span>
              </div>
              <p className="mt-2 font-semibold text-navy-950">{request.title}</p>
              <p className="mt-0.5 text-xs text-navy-700/50">Submitted by {nameFor(request.submitted_by)}</p>
            </div>
            <ApproveRejectButtons id={request.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

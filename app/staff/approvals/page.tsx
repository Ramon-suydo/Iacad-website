import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import ApproveRejectButtons from "./ApproveRejectButtons";
import ChangePreview from "./ChangePreview";
import { CHANGE_TABLES } from "@/lib/change-requests";
import {
  ChangedFields,
  describeChangeRequest,
  formatRequestDate,
  statusStyles,
  tableLabels,
} from "../change-request-summary";

export const metadata: Metadata = { title: "Approvals" };
export const revalidate = 0;

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
  const requestsWithCurrent = await Promise.all((requests ?? []).map(async (request) => {
    if (!CHANGE_TABLES.includes(request.table_name) || request.operation === "insert") {
      return { request, current: null };
    }
    if (request.operation === "bulk_update" && request.table_name === "library_hours") {
      const changes = Array.isArray(request.payload?.changes) ? request.payload.changes : [];
      const ids = changes.map((change: { id?: string }) => change.id).filter(Boolean) as string[];
      if (!ids.length) return { request, current: [] };
      const { data } = await supabase.from("library_hours").select("*").in("id", ids);
      return { request, current: data ?? [] };
    }
    if (!request.record_id) return { request, current: null };
    const { data } = await supabase.from(request.table_name).select("*").eq("id", request.record_id).maybeSingle();
    return { request, current: data ?? null };
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Approvals</h1>
      <p className="mt-1 text-sm text-navy-700/60">
        {(requests?.length ?? 0) === 0 ? "Nothing waiting for review." : `${requests?.length} change request${requests?.length === 1 ? "" : "s"} waiting for review.`}
      </p>
      <div className="mt-8 space-y-3">
        {requestsWithCurrent.map(({ request, current }) => (
          <div key={request.id} className="rounded-xl border border-navy-900/10 bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-cobalt-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cobalt-500">{request.operation.replaceAll("_", " ")}</span>
                  <span className="text-xs font-medium text-navy-700/50">{tableLabels[request.table_name] ?? request.table_name}</span>
                </div>
                <p className="mt-2 font-semibold text-navy-950">{request.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-700/70">{describeChangeRequest(request)}</p>
                <p className="mt-2 text-xs text-navy-700/50">
                  Submitted by {nameFor(request.submitted_by)} - Requested on {formatRequestDate(request.created_at)}
                </p>
                <ChangedFields payload={request.payload ?? {}} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[request.status] ?? "bg-navy-900/5 text-navy-700"}`}>{request.status}</span>
                <ApproveRejectButtons id={request.id} status={request.status} />
              </div>
            </div>
            <ChangePreview operation={request.operation} current={current} proposed={request.payload ?? {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

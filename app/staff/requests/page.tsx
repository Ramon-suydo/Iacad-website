import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import { CHANGE_TABLES } from "@/lib/change-requests";
import ChangePreview from "../approvals/ChangePreview";
import { ClearRequestHistoryButton, DeleteRequestButton } from "./DeleteRequestButtons";
import {
  ChangedFields,
  describeChangeRequest,
  formatRequestDate,
  statusStyles,
  tableLabels,
} from "../change-request-summary";

export const metadata: Metadata = { title: "My Requests" };
export const revalidate = 0;

type DataRecord = Record<string, unknown>;

async function getCurrentRecord(supabase: Awaited<ReturnType<typeof createClient>>, request: DataRecord) {
  const tableName = String(request.table_name ?? "");
  const operation = String(request.operation ?? "");

  if (!CHANGE_TABLES.includes(tableName as (typeof CHANGE_TABLES)[number]) || operation === "insert") {
    return null;
  }
  if (operation === "bulk_update" && tableName === "library_hours") {
    const payload = request.payload as DataRecord | null;
    const changes = Array.isArray(payload?.changes) ? payload.changes : [];
    const ids = changes.map((change) => typeof change === "object" && change ? (change as DataRecord).id : null).filter(Boolean) as string[];
    if (!ids.length) return [];
    const { data } = await supabase.from("library_hours").select("*").in("id", ids);
    return data ?? [];
  }
  if (!request.record_id) return null;
  const { data } = await supabase.from(tableName).select("*").eq("id", String(request.record_id)).maybeSingle();
  return data ?? null;
}

export default async function MyRequestsPage() {
  const { user } = await getStaffContext();
  if (!user) redirect("/staff/login");
  const supabase = await createClient();
  const { data: requests } = await supabase.from("change_requests").select("*")
    .eq("submitted_by", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(100);

  const requestsWithCurrent = await Promise.all((requests ?? []).map(async (request) => ({
    request,
    current: request.status === "pending" ? await getCurrentRecord(supabase, request) : null,
  })));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">My Requests</h1>
          <p className="mt-1 text-sm text-navy-700/60">Track changes waiting for chief-librarian review.</p>
        </div>
        {requestsWithCurrent.length > 0 && <ClearRequestHistoryButton />}
      </div>
      <div className="mt-8 space-y-4">
        {requestsWithCurrent.length === 0 && <div className="rounded-xl border border-navy-900/10 bg-white p-6 text-sm text-navy-700/60">You do not have any pending requests.</div>}
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
                <p className="mt-2 text-xs text-navy-700/50">Requested on {formatRequestDate(request.created_at)}</p>
                <ChangedFields payload={request.payload ?? {}} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[request.status] ?? "bg-navy-900/5 text-navy-700"}`}>{request.status}</span>
                <DeleteRequestButton id={request.id} />
              </div>
            </div>
            <ChangePreview operation={request.operation} current={current} proposed={request.payload ?? {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

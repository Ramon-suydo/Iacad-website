import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffContext } from "@/lib/staff-role";
import ApproveRejectButtons from "./ApproveRejectButtons";

export const metadata: Metadata = { title: "Approvals" };
export const revalidate = 0;

const sections = [
  { table: "announcements", label: "Announcement", titleField: "title" },
  { table: "facilities", label: "Facility", titleField: "name" },
  { table: "events", label: "Event", titleField: "title" },
  { table: "services", label: "Service", titleField: "name" },
  { table: "guidelines", label: "Guideline Section", titleField: "title" },
  { table: "resources", label: "Resource Category", titleField: "name" },
] as const;

export default async function ApprovalsPage() {
  const { role } = await getStaffContext();
  if (role !== "chief") redirect("/staff");

  const supabase = await createClient();

  const results = await Promise.all(
    sections.map(async (s) => {
      const { data } = await supabase.from(s.table).select("*").eq("pending_review", true);
      return { ...s, items: data ?? [] };
    })
  );

  const submitterIds = Array.from(
    new Set(results.flatMap((r) => r.items.map((i: any) => i.submitted_by).filter(Boolean)))
  );

  const { data: submitters } = submitterIds.length
    ? await supabase.from("staff_profiles").select("user_id, full_name").in("user_id", submitterIds)
    : { data: [] as { user_id: string; full_name: string }[] };

  const nameFor = (id: string | null) =>
    submitters?.find((s) => s.user_id === id)?.full_name ?? "Unknown staff";

  const totalPending = results.reduce((sum, r) => sum + r.items.length, 0);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Approvals</h1>
      <p className="mt-1 text-sm text-navy-700/60">
        {totalPending === 0
          ? "Nothing waiting for review."
          : `${totalPending} item${totalPending === 1 ? "" : "s"} waiting for your review.`}
      </p>

      <div className="mt-8 space-y-8">
        {results
          .filter((r) => r.items.length > 0)
          .map((section) => (
            <div key={section.table}>
              <h2 className="font-serif text-lg font-semibold text-navy-950">{section.label}s</h2>
              <div className="mt-3 space-y-3">
                {section.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-4"
                  >
                    <div>
                      <p className="font-medium text-navy-950">{item[section.titleField]}</p>
                      <p className="mt-0.5 text-xs text-navy-700/50">Submitted by {nameFor(item.submitted_by)}</p>
                    </div>
                    <ApproveRejectButtons table={section.table} id={item.id} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
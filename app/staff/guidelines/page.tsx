import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "Manage Guidelines",
};

export const revalidate = 0;

export default async function StaffGuidelinesPage() {
  const supabase = await createClient();
  const { data: guidelines } = await supabase
    .from("guidelines")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy-950">Guidelines</h1>
          <p className="mt-1 text-sm text-navy-700/60">
            Manage the policy sections shown on the public Guidelines page.
          </p>
        </div>
        <Link
          href="/staff/guidelines/new"
          className="rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          + New Section
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {guidelines?.length === 0 && (
          <p className="text-sm text-navy-700/60">No guideline sections yet. Create your first one above.</p>
        )}

        {guidelines?.map((g) => (
          <div
            key={g.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-5 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-700/70">
                  {g.rules?.length ?? 0} rule{g.rules?.length === 1 ? "" : "s"}
                </span>
                {g.pending_review && (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Pending Review
                  </span>
                )}
              </div>
              <h2 className="mt-2 truncate font-serif text-lg font-semibold text-navy-950">{g.title}</h2>
              <p className="mt-1 line-clamp-1 text-sm text-navy-700/70">
                {g.rules?.[0]}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/staff/guidelines/${g.id}/edit`}
                className="text-sm font-medium text-navy-900 hover:text-gold-600"
              >
                Edit
              </Link>
              <DeleteButton id={g.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
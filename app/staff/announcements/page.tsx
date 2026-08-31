import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "Manage Announcements",
};

const categoryStyles: Record<string, string> = {
  General: "bg-navy-900/10 text-navy-900",
  Maintenance: "bg-orange-500/10 text-orange-700",
  Academic: "bg-gold-500/10 text-gold-600",
  Event: "bg-emerald-500/10 text-emerald-700",
};

export const revalidate = 0;

export default async function StaffAnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Announcements</h1>
          <p className="mt-1 text-sm text-navy-700/60">
            Manage what shows up on the public Announcements page and homepage.
          </p>
        </div>
        <Link
          href="/staff/announcements/new"
          className="rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          + New Announcement
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {announcements?.length === 0 && (
          <p className="text-sm text-navy-700/60">No announcements yet. Create your first one above.</p>
        )}

        {announcements?.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-5 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[a.category] ?? categoryStyles.General}`}
                >
                  {a.category}
                </span>
                <span className="text-xs text-navy-700/50">
                  {new Date(a.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                {a.pending_review && (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Pending Review
                  </span>
                )}
              </div>
              <h2 className="mt-2 truncate text-lg font-extrabold text-navy-950">{a.title}</h2>
              <p className="mt-1 line-clamp-1 text-sm text-navy-700/70">{a.summary}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/staff/announcements/${a.id}/edit`}
                className="text-sm font-medium text-navy-900 hover:text-gold-600"
              >
                Edit
              </Link>
              <DeleteButton id={a.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "Manage Events",
};

export const revalidate = 0;

export default async function StaffEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy-950">Events</h1>
          <p className="mt-1 text-sm text-navy-700/60">
            Manage what shows up on the public Events page.
          </p>
        </div>
        <Link
          href="/staff/events/new"
          className="rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          + New Event
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {events?.length === 0 && (
          <p className="text-sm text-navy-700/60">No events yet. Create your first one above.</p>
        )}

        {events?.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-5 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-navy-700/50">
                  {new Date(e.event_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {e.event_time} · {e.location}
                </span>
                {!e.published && (
                  <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600">
                    Draft
                  </span>
                )}
              </div>
              <h2 className="mt-2 truncate font-serif text-lg font-semibold text-navy-950">{e.title}</h2>
              <p className="mt-1 line-clamp-1 text-sm text-navy-700/70">{e.description}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/staff/events/${e.id}/edit`}
                className="text-sm font-medium text-navy-900 hover:text-gold-600"
              >
                Edit
              </Link>
              <DeleteButton id={e.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
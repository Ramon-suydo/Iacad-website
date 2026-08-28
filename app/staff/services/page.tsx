import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "Manage Services",
};

export const revalidate = 0;

export default async function StaffServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy-950">Services</h1>
          <p className="mt-1 text-sm text-navy-700/60">
            Manage what shows up on the public Services page.
          </p>
        </div>
        <Link
          href="/staff/services/new"
          className="rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          + New Service
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {services?.length === 0 && (
          <p className="text-sm text-navy-700/60">No services yet. Create your first one above.</p>
        )}

        {services?.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-5 shadow-card"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-700/70">
                  {s.icon}
                </span>
                {!s.published && (
                  <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600">
                    Draft
                  </span>
                )}
              </div>
              <h2 className="mt-2 truncate font-serif text-lg font-semibold text-navy-950">{s.name}</h2>
              <p className="mt-1 line-clamp-1 text-sm text-navy-700/70">{s.description}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/staff/services/${s.id}/edit`}
                className="text-sm font-medium text-navy-900 hover:text-gold-600"
              >
                Edit
              </Link>
              <DeleteButton id={s.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
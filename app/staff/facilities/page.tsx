import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "Manage Facilities",
};

export const revalidate = 0;

type Facility = {
  id: string;
  name: string;
  campus: "UG" | "SHS";
  description: string;
  image_url: string | null;
  published: boolean;
  pending_review: boolean;
};

function FacilityGroup({ title, items }: { title: string; items: Facility[] }) {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-lg font-semibold text-navy-950">{title}</h2>
      <div className="mt-4 space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-navy-700/60">No facilities in this campus yet.</p>
        )}
        {items.map((f) => (
          <div
            key={f.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-900/10 bg-white p-5 shadow-card"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-navy-100">
                {f.image_url && (
                  <img src={f.image_url} alt={f.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-serif text-base font-semibold text-navy-950">{f.name}</h3>
                  {f.pending_review && (
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      Pending Review
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-navy-700/70">{f.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/staff/facilities/${f.id}/edit`}
                className="text-sm font-medium text-navy-900 hover:text-gold-600"
              >
                Edit
              </Link>
              <DeleteButton id={f.id} imageUrl={f.image_url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function StaffFacilitiesPage() {
  const supabase = await createClient();
  const { data: facilities } = await supabase
    .from("facilities")
    .select("*")
    .order("campus", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  const ug = (facilities ?? []).filter((f) => f.campus === "UG");
  const shs = (facilities ?? []).filter((f) => f.campus === "SHS");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy-950">Facilities</h1>
          <p className="mt-1 text-sm text-navy-700/60">
            Manage the UG and SHS facility listings shown on the public Facilities page.
          </p>
        </div>
        <Link
          href="/staff/facilities/new"
          className="rounded-md bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
        >
          + New Facility
        </Link>
      </div>

      <FacilityGroup title="Undergraduate Library" items={ug} />
      <FacilityGroup title="Senior High School Library" items={shs} />
    </div>
  );
}
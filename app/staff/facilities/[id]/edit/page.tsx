import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FacilityForm from "../../FacilityForm";

export default async function EditFacilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: facility } = await supabase.from("facilities").select("*").eq("id", id).single();

  if (!facility) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Edit Facility</h1>
      <div className="mt-6">
        <FacilityForm facility={facility} />
      </div>
    </div>
  );
}

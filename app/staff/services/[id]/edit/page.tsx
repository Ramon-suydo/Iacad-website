import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ServiceForm from "../../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase.from("services").select("*").eq("id", id).single();

  if (!service) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Edit Service</h1>
      <div className="mt-6">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
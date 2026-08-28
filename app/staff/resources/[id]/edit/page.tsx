import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResourceForm from "../../ResourceForm";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: resource } = await supabase.from("resources").select("*").eq("id", id).single();

  if (!resource) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Edit Resource Category</h1>
      <div className="mt-6">
        <ResourceForm resource={resource} />
      </div>
    </div>
  );
}
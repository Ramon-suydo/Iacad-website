import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GuidelineForm from "../../GuidelineForm";

export default async function EditGuidelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: guideline } = await supabase.from("guidelines").select("*").eq("id", id).single();

  if (!guideline) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Edit Guideline Section</h1>
      <div className="mt-6">
        <GuidelineForm guideline={guideline} />
      </div>
    </div>
  );
}
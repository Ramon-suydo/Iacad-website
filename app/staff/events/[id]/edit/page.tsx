import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EventForm from "../../EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();

  if (!event) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Edit Event</h1>
      <div className="mt-6">
        <EventForm event={event} />
      </div>
    </div>
  );
}

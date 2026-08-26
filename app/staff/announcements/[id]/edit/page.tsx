import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AnnouncementForm from "../../AnnouncementForm";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: announcement } = await supabase.from("announcements").select("*").eq("id", id).single();

  if (!announcement) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">Edit Announcement</h1>
      <div className="mt-6">
        <AnnouncementForm announcement={announcement} />
      </div>
    </div>
  );
}
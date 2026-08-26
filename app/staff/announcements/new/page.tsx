import AnnouncementForm from "../AnnouncementForm";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Announcement</h1>
      <div className="mt-6">
        <AnnouncementForm />
      </div>
    </div>
  );
}
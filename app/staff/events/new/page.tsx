import EventForm from "../EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">New Event</h1>
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
}

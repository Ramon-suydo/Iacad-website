import EventForm from "../EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Event</h1>
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
}
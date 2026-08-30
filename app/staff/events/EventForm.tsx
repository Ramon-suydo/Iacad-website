"use client";

import { useActionState } from "react";
import { saveEvent } from "./actions";

type Event = {
  id: string;
  title: string;
  event_date: string;
  event_time: string;
  location: string;
  description: string;
  published: boolean;
};

export default function EventForm({ event }: { event?: Event }) {
  const [state, formAction, pending] = useActionState(saveEvent, null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {event && <input type="hidden" name="id" value={event.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Title</label>
        <input
          name="title"
          required
          defaultValue={event?.title}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Date</label>
          <input
            type="date"
            name="event_date"
            required
            defaultValue={event?.event_date}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Time</label>
          <input
            name="event_time"
            required
            placeholder="2:00 PM – 4:00 PM"
            defaultValue={event?.event_time}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Location</label>
        <input
          name="location"
          required
          defaultValue={event?.location}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={event?.description}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-950">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published ?? true}
          className="h-4 w-4 rounded border-navy-900/30"
        />
        Published (visible to site visitors)
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
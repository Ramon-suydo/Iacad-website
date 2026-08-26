"use client";

import { saveAnnouncement } from "./actions";

type Announcement = {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  published: boolean;
};

export default function AnnouncementForm({ announcement }: { announcement?: Announcement }) {
  return (
    <form action={saveAnnouncement} className="max-w-xl space-y-5">
      {announcement && <input type="hidden" name="id" value={announcement.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Title</label>
        <input
          name="title"
          required
          defaultValue={announcement?.title}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Summary</label>
        <textarea
          name="summary"
          required
          rows={4}
          defaultValue={announcement?.summary}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Category</label>
          <select
            name="category"
            required
            defaultValue={announcement?.category ?? "General"}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          >
            <option>General</option>
            <option>Maintenance</option>
            <option>Academic</option>
            <option>Event</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Date</label>
          <input
            type="date"
            name="date"
            required
            defaultValue={announcement?.date}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-950">
        <input
          type="checkbox"
          name="published"
          defaultChecked={announcement?.published ?? true}
          className="h-4 w-4 rounded border-navy-900/30"
        />
        Published (visible to site visitors)
      </label>

      <button
        type="submit"
        className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
      >
        Save
      </button>
    </form>
  );
}
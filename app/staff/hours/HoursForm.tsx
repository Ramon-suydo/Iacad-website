"use client";

import { saveLibraryHours } from "./actions";
import type { LibraryHoursData, DayHours } from "@/lib/library-hours";

function DayRow({ day }: { day: DayHours }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-navy-900/10 bg-white p-4">
      <span className="w-28 shrink-0 text-sm font-semibold text-navy-950">{day.day_name}</span>
      <input
        name={`hours_text__${day.id}`}
        defaultValue={day.hours_text === "Closed" ? "" : day.hours_text}
        placeholder="e.g. 8:00 AM – 5:00 PM"
        className="min-w-0 flex-1 rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
      />
      <label className="flex shrink-0 items-center gap-2 text-sm text-navy-700/70">
        <input
          type="checkbox"
          name={`is_closed__${day.id}`}
          defaultChecked={day.is_closed}
          className="h-4 w-4 rounded border-navy-900/30"
        />
        Closed
      </label>
    </div>
  );
}

export default function HoursForm({ hours }: { hours: LibraryHoursData }) {
  const allIds = [...hours.main, ...hours.extension].map((d) => d.id).join(",");

  return (
    <form action={saveLibraryHours} className="max-w-2xl space-y-8">
      <input type="hidden" name="ids" value={allIds} />

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Main Library</h2>
        <div className="mt-4 space-y-2">
          {hours.main.map((day) => (
            <DayRow key={day.id} day={day} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Library Extension</h2>
        <div className="mt-4 space-y-2">
          {hours.extension.map((day) => (
            <DayRow key={day.id} day={day} />
          ))}
        </div>
      </div>

      <p className="text-xs text-navy-700/50">
        Checking "Closed" for a day overrides whatever's typed in that field — the public site will show "Closed" regardless.
      </p>

      <button
        type="submit"
        className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
      >
        Save Hours
      </button>
    </form>
  );
}
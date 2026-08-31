import type { DayHours } from "@/lib/library-hours";

export default function LibraryHoursTable({
  main,
  extension,
}: {
  main: DayHours[];
  extension: DayHours[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-navy-900/10">
      <div className="grid min-w-[520px] grid-cols-3 bg-navy-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white/70">
        <span>Day</span>
        <span className="text-right">Main Library</span>
        <span className="text-right">Extension</span>
      </div>
      <div className="min-w-[520px] divide-y divide-navy-900/8">
        {main.map((day, i) => {
          const ext = extension[i];
          return (
            <div key={day.id} className="grid grid-cols-3 px-4 py-2.5 text-sm">
              <span className="text-navy-700/70">{day.day_name}</span>
              <span className={`text-right font-medium ${day.is_closed ? "text-navy-700/40" : "text-navy-950"}`}>
                {day.hours_text}
              </span>
              <span className={`text-right font-medium ${ext?.is_closed ? "text-navy-700/40" : "text-navy-950"}`}>
                {ext?.hours_text ?? "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

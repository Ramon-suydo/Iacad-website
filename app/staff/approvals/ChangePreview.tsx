type DataRecord = Record<string, unknown>;

const hiddenFields = new Set(["id", "created_at", "updated_at"]);

const fieldLabels: Record<string, string> = {
  image_url: "Image",
  hero_image: "Hero image",
  logo_url: "Logo",
  staff_members: "Library staff",
  pending_review: "Pending review",
  is_closed: "Closed",
  hours_text: "Hours",
  day_name: "Day",
};

function labelFor(key: string) {
  return fieldLabels[key] ?? key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sameValue(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function ValueDisplay({ value }: { value: unknown }) {
  if (value === null || value === undefined || value === "") {
    return <span className="italic text-navy-700/40">Not set</span>;
  }
  if (typeof value === "boolean") return <span>{value ? "Yes" : "No"}</span>;
  if (typeof value === "string" || typeof value === "number") {
    return <span className="whitespace-pre-wrap break-words">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="italic text-navy-700/40">None</span>;
    if (value.every((item) => typeof item !== "object" || item === null)) {
      return (
        <ul className="space-y-1.5">
          {value.map((item, index) => <li key={index} className="flex gap-2"><span className="text-cobalt-500">•</span><span>{String(item)}</span></li>)}
        </ul>
      );
    }
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="rounded-lg border border-navy-900/10 bg-navy-900/[.025] p-3">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wide text-cobalt-500">
              {typeof item === "object" && item && "name" in item ? String((item as DataRecord).name) : `Item ${index + 1}`}
            </p>
            <ValueDisplay value={item} />
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as DataRecord).filter(([key]) => !hiddenFields.has(key));
    return (
      <dl className="space-y-2">
        {entries.map(([key, item]) => (
          <div key={key} className="grid gap-0.5 sm:grid-cols-[110px_1fr] sm:gap-3">
            <dt className="text-xs font-semibold text-navy-700/50">{labelFor(key)}</dt>
            <dd><ValueDisplay value={item} /></dd>
          </div>
        ))}
      </dl>
    );
  }
  return <span>{String(value)}</span>;
}

export default function ChangePreview({
  operation,
  current,
  proposed,
}: {
  operation: string;
  current: DataRecord | DataRecord[] | null;
  proposed: DataRecord;
}) {
  const currentRecord = !Array.isArray(current) ? current : null;
  const fields = Object.entries(proposed).filter(([key, value]) => {
    if (hiddenFields.has(key)) return false;
    if (operation !== "update" || !currentRecord) return true;
    return !sameValue(currentRecord[key], value);
  });

  return (
    <details className="group mt-4 border-t border-navy-900/10 pt-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-extrabold uppercase tracking-[.1em] text-cobalt-500 hover:text-navy-950">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cobalt-500/8 text-base leading-none transition-transform group-open:rotate-45">+</span>
        Review changes
      </summary>

      <div className="mt-4 space-y-4">
        {fields.length === 0 && operation !== "delete" ? (
          <p className="rounded-lg bg-navy-900/5 p-3 text-sm text-navy-700/60">No differing fields were found.</p>
        ) : fields.map(([key, proposedValue]) => (
          <section key={key} className="overflow-hidden rounded-xl border border-navy-900/10">
            <h3 className="border-b border-navy-900/10 bg-navy-900/[.035] px-4 py-2.5 text-xs font-extrabold text-navy-950">{labelFor(key)}</h3>
            <div className="grid md:grid-cols-2">
              <div className="border-b border-navy-900/10 p-4 md:border-b-0 md:border-r">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-navy-700/50">Current</p>
                <div className="text-sm leading-relaxed text-navy-700/80">
                  {operation === "insert" ? (
                    <span className="italic text-navy-700/40">New item</span>
                  ) : (
                    <ValueDisplay value={Array.isArray(current) && key === "changes" ? current : currentRecord?.[key]} />
                  )}
                </div>
              </div>
              <div className="bg-cobalt-500/[.025] p-4">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-cobalt-500">Proposed</p>
                <div className="text-sm leading-relaxed text-navy-950"><ValueDisplay value={proposedValue} /></div>
              </div>
            </div>
          </section>
        ))}

        {operation === "delete" && current && (
          <section className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-red-600">Item to be deleted</p>
            <div className="text-sm leading-relaxed text-navy-950"><ValueDisplay value={current} /></div>
          </section>
        )}
      </div>
    </details>
  );
}

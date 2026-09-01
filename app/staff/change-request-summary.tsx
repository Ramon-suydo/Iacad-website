type DataRecord = Record<string, unknown>;

export const tableLabels: Record<string, string> = {
  announcements: "Announcement",
  facilities: "Facility",
  events: "Event",
  services: "Service",
  guidelines: "Guideline",
  resources: "Resource",
  about_content: "About page",
  library_hours: "Library hours",
  site_settings: "Site settings",
};

export const statusStyles: Record<string, string> = {
  pending: "bg-pop-amber/18 text-amber-800",
  approved: "bg-emerald-100 text-emerald-700",
};

const hiddenFields = new Set(["id", "created_at", "updated_at", "submitted_by", "pending_review"]);

const fieldLabels: Record<string, string> = {
  image_url: "Image",
  hero_image: "Hero image",
  logo_url: "Logo",
  staff_members: "Library staff",
  is_closed: "Closed",
  hours_text: "Hours",
  day_name: "Day",
  sort_order: "Sort order",
  short_name: "Short name",
  home_cta_title: "Home CTA title",
  home_cta_description: "Home CTA description",
  home_services_title: "Home services title",
  home_services_description: "Home services description",
  home_facilities_title: "Home facilities title",
  home_facilities_description: "Home facilities description",
};

export function labelFor(key: string) {
  return fieldLabels[key] ?? key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatRequestDate(value: string) {
  return new Date(value).toLocaleString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function describeChangeRequest(request: {
  table_name: string;
  operation: string;
  title: string;
  payload?: DataRecord | null;
}) {
  const area = tableLabels[request.table_name] ?? request.table_name;
  const action = request.operation.replaceAll("_", " ");
  const fieldCount = changedFieldNames(request.payload ?? {}).length;
  const fieldText = fieldCount === 1 ? "1 field" : `${fieldCount} fields`;

  if (request.operation === "insert") return `Adds a new ${area.toLowerCase()} entry named "${request.title}".`;
  if (request.operation === "delete") return `Requests removal of the ${area.toLowerCase()} entry "${request.title}".`;
  if (request.operation === "bulk_update") return `Updates multiple ${area.toLowerCase()} entries across ${fieldText}.`;
  return `Requests an ${action} to ${area.toLowerCase()} for "${request.title}" across ${fieldText}.`;
}

export function changedFieldNames(payload: DataRecord) {
  if (Array.isArray(payload.changes)) {
    const names = new Set<string>();
    payload.changes.forEach((change) => {
      if (!change || typeof change !== "object") return;
      Object.keys(change as DataRecord).forEach((key) => {
        if (!hiddenFields.has(key)) names.add(key);
      });
    });
    return Array.from(names);
  }

  return Object.keys(payload).filter((key) => !hiddenFields.has(key));
}

export function ChangedFields({ payload }: { payload?: DataRecord | null }) {
  const fields = changedFieldNames(payload ?? {});

  if (fields.length === 0) {
    return <p className="mt-3 text-xs text-navy-700/45">No changed fields recorded.</p>;
  }

  if (fields.length > 8) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-cobalt-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cobalt-500">
          {fields.length} fields changed
        </span>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {fields.map((field) => (
        <span key={field} className="rounded-full bg-cobalt-500/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cobalt-500">
          {labelFor(field)}
        </span>
      ))}
    </div>
  );
}

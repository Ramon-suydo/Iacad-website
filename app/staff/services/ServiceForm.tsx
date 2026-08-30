"use client";

import { useActionState } from "react";
import { saveService } from "./actions";

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
  published: boolean;
};

const icons = [
  { value: "book", label: "Book" },
  { value: "search", label: "Search" },
  { value: "printer", label: "Printer" },
  { value: "users", label: "Users / Group" },
  { value: "clock", label: "Clock" },
  { value: "graduation", label: "Graduation Cap" },
];

export default function ServiceForm({ service }: { service?: Service }) {
  const [state, formAction, pending] = useActionState(saveService, null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {service && <input type="hidden" name="id" value={service.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Name</label>
        <input
          name="name"
          required
          defaultValue={service?.name}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={service?.description}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Icon</label>
          <select
            name="icon"
            required
            defaultValue={service?.icon ?? "book"}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          >
            {icons.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-navy-700/50">
            Icon shapes are fixed to this set for now.
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Sort order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={service?.sort_order ?? 0}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-950">
        <input
          type="checkbox"
          name="published"
          defaultChecked={service?.published ?? true}
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
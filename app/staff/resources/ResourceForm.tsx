"use client";

import { useActionState } from "react";
import { saveResource } from "./actions";

type Resource = {
  id: string;
  name: string;
  description: string;
  items: string[];
  sort_order: number;
  published: boolean;
};

export default function ResourceForm({ resource }: { resource?: Resource }) {
  const [state, formAction, pending] = useActionState(saveResource, null);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {resource && <input type="hidden" name="id" value={resource.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Category name</label>
        <input
          name="name"
          required
          defaultValue={resource?.name}
          placeholder="Print Collection"
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Description</label>
        <textarea
          name="description"
          required
          rows={2}
          defaultValue={resource?.description}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Items</label>
        <textarea
          name="items"
          required
          rows={6}
          defaultValue={resource?.items?.join("\n")}
          placeholder={"One item per line, e.g.\nAcademic textbooks and references\nDesign and multimedia arts publications"}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">
          Type one item per line — each line becomes a separate bullet point on the public page.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Sort order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={resource?.sort_order ?? 0}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
          <p className="mt-1 text-xs text-navy-700/50">Lower numbers appear first.</p>
        </div>

        <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy-950">
          <input
            type="checkbox"
            name="published"
            defaultChecked={resource?.published ?? true}
            className="h-4 w-4 rounded border-navy-900/30"
          />
          Published (visible to site visitors)
        </label>
      </div>

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
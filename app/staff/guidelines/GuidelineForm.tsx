"use client";

import { saveGuideline } from "./actions";

type Guideline = {
  id: string;
  title: string;
  rules: string[];
  sort_order: number;
  published: boolean;
};

export default function GuidelineForm({ guideline }: { guideline?: Guideline }) {
  return (
    <form action={saveGuideline} className="max-w-xl space-y-5">
      {guideline && <input type="hidden" name="id" value={guideline.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Section title</label>
        <input
          name="title"
          required
          defaultValue={guideline?.title}
          placeholder="General Conduct"
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Rules</label>
        <textarea
          name="rules"
          required
          rows={8}
          defaultValue={guideline?.rules?.join("\n")}
          placeholder={"One rule per line, e.g.\nMaintain a quiet and respectful environment at all times.\nPresent a valid school ID upon entry."}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">
          Type one rule per line — each line becomes a separate bullet point on the public page.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Sort order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={guideline?.sort_order ?? 0}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
          <p className="mt-1 text-xs text-navy-700/50">Lower numbers appear first.</p>
        </div>

        <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy-950">
          <input
            type="checkbox"
            name="published"
            defaultChecked={guideline?.published ?? true}
            className="h-4 w-4 rounded border-navy-900/30"
          />
          Published (visible to site visitors)
        </label>
      </div>

      <button
        type="submit"
        className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
      >
        Save
      </button>
    </form>
  );
}
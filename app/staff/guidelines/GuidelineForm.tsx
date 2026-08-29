"use client";

import { saveGuideline } from "./actions";

type Guideline = {
  id: string;
  title: string;
  rules: string[];
  note: string | null;
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
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Rules</label>
        <textarea
          name="rules"
          required
          rows={10}
          defaultValue={guideline?.rules?.join("\n")}
          placeholder="One rule per line"
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">One rule per line.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Closing note (optional)</label>
        <textarea
          name="note"
          rows={3}
          defaultValue={guideline?.note ?? ""}
          placeholder="e.g. consequences for non-compliance"
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
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
        </div>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy-950">
          <input
            type="checkbox"
            name="published"
            defaultChecked={guideline?.published ?? true}
            className="h-4 w-4 rounded border-navy-900/30"
          />
          Published
        </label>
      </div>

      <button type="submit" className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
        Save
      </button>
    </form>
  );
}
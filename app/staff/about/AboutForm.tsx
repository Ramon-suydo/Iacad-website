"use client";

import { saveAboutContent } from "./actions";

type AboutContent = {
  id: string;
  mission_left: string;
  mission_right: string;
  value_1_title: string;
  value_1_description: string;
  value_2_title: string;
  value_2_description: string;
  value_3_title: string;
  value_3_description: string;
  value_4_title: string;
  value_4_description: string;
};

export default function AboutForm({ content }: { content: AboutContent }) {
  return (
    <form action={saveAboutContent} className="max-w-2xl space-y-8">
      <input type="hidden" name="id" value={content.id} />

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">Mission Statement</h2>
        <p className="mt-1 text-xs text-navy-700/50">
          Shown as two side-by-side columns. Leave a blank line between paragraphs within each column.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Left column</label>
            <textarea
              name="mission_left"
              required
              rows={8}
              defaultValue={content.mission_left}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">Right column</label>
            <textarea
              name="mission_right"
              required
              rows={8}
              defaultValue={content.mission_right}
              className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-lg font-semibold text-navy-950">What We Value</h2>
        <p className="mt-1 text-xs text-navy-700/50">The four value cards shown on the About page.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="rounded-lg border border-navy-900/10 p-4">
              <label className="mb-1.5 block text-sm font-medium text-navy-950">Value {n} title</label>
              <input
                name={`value_${n}_title`}
                required
                defaultValue={content[`value_${n}_title` as keyof AboutContent] as string}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
              />
              <label className="mb-1.5 mt-3 block text-sm font-medium text-navy-950">Value {n} description</label>
              <textarea
                name={`value_${n}_description`}
                required
                rows={3}
                defaultValue={content[`value_${n}_description` as keyof AboutContent] as string}
                className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
              />
            </div>
          ))}
        </div>
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
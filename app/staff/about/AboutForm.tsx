"use client";

import { saveAboutContent } from "./actions";

type AboutContent = {
  id: string;
  introduction: string;
  mission: string;
  vision: string;
  goals: string[];
};

export default function AboutForm({ content }: { content: AboutContent }) {
  return (
    <form action={saveAboutContent} className="max-w-2xl space-y-8">
      <input type="hidden" name="id" value={content.id} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Introduction</label>
        <textarea
          name="introduction"
          required
          rows={12}
          defaultValue={content.introduction}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">Leave a blank line between paragraphs.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Mission</label>
        <textarea
          name="mission"
          required
          rows={4}
          defaultValue={content.mission}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Vision</label>
        <textarea
          name="vision"
          required
          rows={3}
          defaultValue={content.vision}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Goals & Objectives</label>
        <textarea
          name="goals"
          required
          rows={12}
          defaultValue={content.goals?.join("\n")}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">One goal per line.</p>
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
"use client";

import { useState } from "react";
import { saveFacility } from "./actions";

type Facility = {
  id: string;
  name: string;
  campus: "UG" | "SHS";
  description: string;
  image_url: string | null;
  tags: string[] | null;
  sort_order: number;
  published: boolean;
};

export default function FacilityForm({ facility }: { facility?: Facility }) {
  const [preview, setPreview] = useState<string | null>(facility?.image_url ?? null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <form action={saveFacility} className="max-w-xl space-y-5">
      {facility && <input type="hidden" name="id" value={facility.id} />}
      <input type="hidden" name="current_image_url" value={facility?.image_url ?? ""} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Name</label>
        <input
          name="name"
          required
          defaultValue={facility?.name}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Campus</label>
        <select
          name="campus"
          required
          defaultValue={facility?.campus ?? "UG"}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        >
          <option value="UG">Undergraduate (UG)</option>
          <option value="SHS">Senior High School (SHS)</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={facility?.description}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Tags (comma separated)</label>
        <input
          name="tags"
          defaultValue={facility?.tags?.join(", ")}
          placeholder="Main Area, Wi-Fi"
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-950">Sort order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={facility?.sort_order ?? 0}
            className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
          />
          <p className="mt-1 text-xs text-navy-700/50">Lower numbers show first within their campus.</p>
        </div>

        <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy-950">
          <input
            type="checkbox"
            name="published"
            defaultChecked={facility?.published ?? true}
            className="h-4 w-4 rounded border-navy-900/30"
          />
          Published (visible to site visitors)
        </label>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Photo</label>
        {preview && (
          <img src={preview} alt="Preview" className="mb-3 h-40 w-full rounded-md object-cover" />
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-navy-700/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-navy-950 hover:file:bg-navy-900/10"
        />
        <p className="mt-1 text-xs text-navy-700/50">
          {facility ? "Leave empty to keep the current photo." : "Upload a photo for this facility."}
        </p>
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
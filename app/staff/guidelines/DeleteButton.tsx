"use client";

import { deleteGuideline } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteGuideline}
      onSubmit={(e) => {
        if (!confirm("Delete this guideline section? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
        Delete
      </button>
    </form>
  );
}
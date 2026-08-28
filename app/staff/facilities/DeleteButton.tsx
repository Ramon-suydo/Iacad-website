"use client";

import { deleteFacility } from "./actions";

export default function DeleteButton({ id, imageUrl }: { id: string; imageUrl: string | null }) {
  return (
    <form
      action={deleteFacility}
      onSubmit={(e) => {
        if (!confirm("Delete this facility? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="image_url" value={imageUrl ?? ""} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
        Delete
      </button>
    </form>
  );
}
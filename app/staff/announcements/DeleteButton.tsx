"use client";

import { deleteAnnouncement } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteAnnouncement}
      onSubmit={(e) => {
        if (!confirm("Delete this announcement? This cannot be undone.")) {
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
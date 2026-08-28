"use client";

import { deleteService } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteService}
      onSubmit={(e) => {
        if (!confirm("Delete this service? This cannot be undone.")) {
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
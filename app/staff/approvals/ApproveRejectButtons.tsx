"use client";

import { approveItem, rejectItem } from "./actions";

export default function ApproveRejectButtons({ table, id }: { table: string; id: string }) {
  return (
    <div className="flex items-center gap-2">
      <form action={approveItem}>
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="rounded-md bg-gold-500 px-3 py-1.5 text-xs font-semibold text-navy-950 hover:bg-gold-400">
          Approve
        </button>
      </form>
      <form
        action={rejectItem}
        onSubmit={(e) => {
          if (!confirm("Reject this? It will be unpublished until the staff member resubmits it.")) e.preventDefault();
        }}
      >
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
          Reject
        </button>
      </form>
    </div>
  );
}
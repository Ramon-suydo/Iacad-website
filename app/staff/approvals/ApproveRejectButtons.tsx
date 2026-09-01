"use client";

import { useEffect, useRef, useState } from "react";
import { approveItem, deleteRequestForChief, rejectItem } from "./actions";

type ConfirmMode = "reject" | "delete" | null;

export default function ApproveRejectButtons({ id, status = "pending" }: { id: string; status?: string }) {
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const isPending = status === "pending";

  useEffect(() => {
    if (!confirmMode) return;
    cancelButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmMode(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [confirmMode]);

  const isDelete = confirmMode === "delete";

  return (
    <>
      <div className="flex items-center gap-2">
        {isPending && (
          <>
            <form action={approveItem}>
              <input type="hidden" name="id" value={id} />
              <button type="submit" className="rounded-md bg-gold-500 px-3 py-1.5 text-xs font-semibold text-navy-950 hover:bg-gold-400">
                Approve
              </button>
            </form>
            <button
              type="button"
              onClick={() => setConfirmMode("reject")}
              className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Reject
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setConfirmMode("delete")}
          className="rounded-md border border-navy-900/15 px-3 py-1.5 text-xs font-semibold text-navy-700/70 hover:bg-navy-900/5 hover:text-navy-950"
        >
          Delete
        </button>
      </div>

      {confirmMode && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={`${confirmMode}-title-${id}`}
          aria-describedby={`${confirmMode}-description-${id}`}
          className="fixed bottom-5 right-4 z-[110] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-red-200 bg-white shadow-[0_24px_70px_-24px_rgba(7,11,31,.65)] sm:right-6"
        >
          <div className="h-1 bg-gradient-to-r from-red-500 to-pop-coral" />
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">!</span>
              <div>
                <h2 id={`${confirmMode}-title-${id}`} className="text-sm font-extrabold text-navy-950">
                  {isDelete ? "Delete this request?" : "Reject this request?"}
                </h2>
                <p id={`${confirmMode}-description-${id}`} className="mt-1 text-xs leading-relaxed text-navy-700/60">
                  {isDelete
                    ? "This permanently removes the request record from the approval history."
                    : "The proposed changes will be declined and the live website will remain unchanged."}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setConfirmMode(null)}
                className="rounded-lg border border-navy-900/15 px-3.5 py-2 text-xs font-semibold text-navy-700/70 hover:bg-navy-900/5 hover:text-navy-950"
              >
                Keep request
              </button>
              <form action={isDelete ? deleteRequestForChief : rejectItem}>
                <input type="hidden" name="id" value={id} />
                <button type="submit" className="rounded-lg bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-700">
                  {isDelete ? "Delete" : "Reject"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { clearOwnRequestHistory, deleteOwnRequest } from "./actions";

type DeleteMode = "single" | "all";

export function DeleteRequestButton({ id }: { id: string }) {
  return <ConfirmDeleteButton id={id} mode="single" label="Delete" />;
}

export function ClearRequestHistoryButton() {
  return <ConfirmDeleteButton mode="all" label="Clear history" />;
}

function ConfirmDeleteButton({ id, mode, label }: { id?: string; mode: DeleteMode; label: string }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const title = mode === "all" ? "Clear request history?" : "Delete this request?";
  const description = mode === "all"
    ? "This permanently removes your pending and approved request records from this list."
    : "This permanently removes this request record from your history.";

  useEffect(() => {
    if (!confirmOpen) return;
    cancelButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [confirmOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        {label}
      </button>

      {confirmOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={`delete-title-${mode}-${id ?? "all"}`}
          aria-describedby={`delete-description-${mode}-${id ?? "all"}`}
          className="fixed bottom-5 right-4 z-[110] w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-red-200 bg-white shadow-[0_24px_70px_-24px_rgba(7,11,31,.65)] sm:right-6"
        >
          <div className="h-1 bg-gradient-to-r from-red-500 to-pop-coral" />
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">!</span>
              <div>
                <h2 id={`delete-title-${mode}-${id ?? "all"}`} className="text-sm font-extrabold text-navy-950">{title}</h2>
                <p id={`delete-description-${mode}-${id ?? "all"}`} className="mt-1 text-xs leading-relaxed text-navy-700/60">{description}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-navy-900/15 px-3.5 py-2 text-xs font-semibold text-navy-700/70 hover:bg-navy-900/5 hover:text-navy-950"
              >
                Keep
              </button>
              <form action={mode === "all" ? clearOwnRequestHistory : deleteOwnRequest}>
                {id && <input type="hidden" name="id" value={id} />}
                <button type="submit" className="rounded-lg bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-700">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword, type PasswordFormState } from "./actions";

const initialState: PasswordFormState = null;

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "success" in state) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="max-w-lg space-y-5 rounded-2xl border border-navy-900/10 bg-white p-5 sm:p-7">
      <div>
        <label htmlFor="current_password" className="mb-1.5 block text-sm font-semibold text-navy-950">
          Current password
        </label>
        <input id="current_password" name="current_password" type="password" autoComplete="current-password" required
          className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
      </div>
      <div>
        <label htmlFor="new_password" className="mb-1.5 block text-sm font-semibold text-navy-950">
          New password
        </label>
        <input id="new_password" name="new_password" type="password" autoComplete="new-password" minLength={8} required
          className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
        <p className="mt-1 text-xs text-navy-700/50">Use at least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm_password" className="mb-1.5 block text-sm font-semibold text-navy-950">
          Confirm new password
        </label>
        <input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" minLength={8} required
          className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
      </div>

      {state && "error" in state && <p role="alert" className="text-sm font-medium text-red-600">{state.error}</p>}
      {state && "success" in state && <p role="status" className="text-sm font-medium text-green-700">{state.success}</p>}

      <button type="submit" disabled={pending}
        className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-bold text-navy-950 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Changing password..." : "Change password"}
      </button>
    </form>
  );
}

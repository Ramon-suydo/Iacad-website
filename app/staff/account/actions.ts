"use server";

import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/form-state";

export type PasswordFormState = FormState | { success: string };

export async function changePassword(
  _previousState: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Complete all password fields." };
  }
  if (newPassword.length < 8) {
    return { error: "The new password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "The new passwords do not match." };
  }
  if (currentPassword === newPassword) {
    return { error: "Choose a new password that is different from the current one." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "Your session has expired. Sign in again and retry." };
  }

  const { error: verificationError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (verificationError) {
    return { error: "The current password is incorrect." };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return { error: error.message };
  }

  return { success: "Password changed successfully." };
}

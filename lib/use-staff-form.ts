"use client";

import { useState, useTransition, type FormEvent } from "react";
import { unstable_rethrow } from "next/navigation";
import type { FormState } from "@/lib/form-state";
import type { ImageUploadField } from "@/lib/image-upload";
import { uploadFormImages } from "@/lib/upload-form-images";

export function useStaffForm<State extends FormState | { success: string }>(
  save: (previous: null, data: FormData) => Promise<State>,
  images: ImageUploadField[] = [],
) {
  const [state, setState] = useState<State | FormState>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    setState(null);
    startTransition(async () => {
      if (images.length) {
        try {
          await uploadFormImages(formData, images);
        } catch (error) {
          setState({ error: error instanceof Error ? error.message : "Photo upload failed. Try again." });
          return;
        }
      }
      try {
        setState(await save(null, formData));
      } catch (error) {
        // Successful saves and expired sessions use Next.js redirect exceptions.
        unstable_rethrow(error);
        setState({ error: "The save could not be confirmed. Your entries are still here. Check your connection and try again; if this page was open during an update, refresh it first." });
      }
    });
  }

  // An event handler keeps uncontrolled fields and selected files intact after failures.
  return { state, onSubmit, pending };
}

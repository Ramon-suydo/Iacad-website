import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { imageValidationError, type ImageUploadField } from "@/lib/image-upload";

export async function resolveUploadedImage(
  supabase: SupabaseClient, userId: string, formData: FormData,
  { name, bucket }: ImageUploadField, fallback: string | null,
) {
  const file = formData.get(name);
  if (file instanceof File && file.size > 0) {
    return { error: "Refresh this page before uploading a photo, then select it again." };
  }
  const path = formData.get(`uploaded_${name}_path`);
  if (!path) return { url: fallback };
  if (typeof path !== "string" || !path.startsWith(`${userId}/`) ||
      !/^[a-f0-9-]+\.(jpg|png|webp|avif)$/.test(path.slice(userId.length + 1))) {
    return { error: "Invalid photo upload. Select the photo again." };
  }
  // Verify the stored object, rather than trusting browser-supplied size/type or URLs.
  const { data, error } = await supabase.storage.from(bucket).info(path);
  if (error || !data) return { error: "The uploaded photo could not be verified. Try again." };
  const size = data.size ?? data.metadata?.size;
  const type = data.contentType ?? data.metadata?.mimetype;
  if (typeof size !== "number" || !Number.isFinite(size) || size <= 0 || typeof type !== "string") {
    return { error: "The uploaded photo could not be verified. Try again." };
  }
  const validationError = imageValidationError({ size, type });
  if (validationError) return { error: validationError };
  return { url: supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl };
}

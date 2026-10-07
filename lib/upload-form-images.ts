"use client";

import { createClient } from "@/lib/supabase/client";
import { IMAGE_EXTENSIONS, imageValidationError, type ImageUploadField } from "@/lib/image-upload";

const uploads = new WeakMap<File, Map<string, string>>();

export async function uploadFormImages(formData: FormData, fields: ImageUploadField[]) {
  // Validate every selection before uploading any of them.
  for (const { name } of fields) {
    const file = formData.get(name);
    if (file instanceof File && file.size > 0) {
      const error = imageValidationError(file);
      if (error) throw new Error(error);
    }
  }
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Your session has expired. Sign in again and retry.");

  for (const { name, bucket } of fields) {
    const file = formData.get(name);
    // Photo bytes must never enter the Server Action request (Vercel caps it at 4.5 MB).
    formData.delete(name);
    formData.delete(`uploaded_${name}_path`);
    if (!(file instanceof File) || file.size === 0) continue;
    const cacheKey = `${user.id}/${bucket}`;
    let path = uploads.get(file)?.get(cacheKey);
    if (!path) {
      path = `${user.id}/${crypto.randomUUID()}.${IMAGE_EXTENSIONS[file.type]}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600", upsert: false, contentType: file.type,
      });
      if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`);
      const cached = uploads.get(file) ?? new Map<string, string>();
      cached.set(cacheKey, path);
      uploads.set(file, cached);
    }
    formData.set(`uploaded_${name}_path`, path);
  }
}

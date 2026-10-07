export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function imageValidationError(file: { size: number; type: string }): string | null {
  if (file.size > MAX_IMAGE_BYTES) return "Images must be 5 MB or smaller.";
  if (!IMAGE_EXTENSIONS[file.type]) return "Only JPG, PNG, WebP, and AVIF images are allowed.";
  return null;
}

export type ImageUploadField = { name: string; bucket: "facility-images" | "site-images" };

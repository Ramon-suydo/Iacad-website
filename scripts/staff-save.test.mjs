import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { File } from "node:buffer";
import { webcrypto } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const requireDependency = createRequire(import.meta.url);
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function load(file, mocks = {}, globals = {}) {
  const filename = path.join(projectRoot, file);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loadedModule = { exports: {} };
  vm.runInNewContext(source, {
    module: loadedModule, exports: loadedModule.exports, File, FormData, crypto: webcrypto, ...globals,
    require(name) {
      if (name in mocks) return mocks[name];
      if (name === "server-only") return {};
      if (name.startsWith("@/")) return load(`${name.slice(2)}.ts`, mocks);
      return requireDependency(name);
    },
  }, { filename });
  return loadedModule.exports;
}

function storageClient(overrides = {}) {
  const calls = [];
  const storage = {
    async upload(objectPath, file) { calls.push({ objectPath, file }); return { error: null }; },
    async info() { return { data: { size: 5 * 1024 * 1024, contentType: "image/jpeg" }, error: null }; },
    getPublicUrl(objectPath) { return { data: { publicUrl: `https://storage.example/${objectPath}` } }; },
    ...overrides,
  };
  return {
    calls, storage: { from: () => storage },
    auth: { getUser: async () => ({ data: { user: { id: "staff-user" } }, error: null }) },
  };
}

const fields = [{ name: "image", bucket: "facility-images" }];
function photoForm(size = 5 * 1024 * 1024, type = "image/jpeg", name = "image") {
  const data = new FormData();
  data.set(name, new File([new Uint8Array(size)], "photo.jpg", { type }));
  data.set("description", "Keep my edits");
  return data;
}

test("a permitted 5 MB photo goes to storage, never to the save request", async () => {
  const client = storageClient();
  const { uploadFormImages } = load("lib/upload-form-images.ts", { "@/lib/supabase/client": { createClient: () => client } });
  const data = photoForm();
  await uploadFormImages(data, fields);
  assert.equal(client.calls[0].file.size, 5 * 1024 * 1024);
  assert.equal(data.has("image"), false);
  assert.match(data.get("uploaded_image_path"), /^staff-user\/.+\.jpg$/);
  assert.equal(data.get("description"), "Keep my edits");
});

test("two settings photos bypass the aggregate request limit", async () => {
  const client = storageClient();
  const { uploadFormImages } = load("lib/upload-form-images.ts", { "@/lib/supabase/client": { createClient: () => client } });
  const data = photoForm(5 * 1024 * 1024, "image/jpeg", "hero_image");
  data.set("logo", new File([new Uint8Array(5 * 1024 * 1024)], "logo.png", { type: "image/png" }));
  await uploadFormImages(data, [{ name: "hero_image", bucket: "site-images" }, { name: "logo", bucket: "site-images" }]);
  assert.equal(client.calls.length, 2);
  assert.equal(data.has("hero_image"), false);
  assert.equal(data.has("logo"), false);
});

test("invalid photos fail before uploading and upload failures are recoverable", async () => {
  const client = storageClient({ upload: async () => ({ error: { message: "Storage unavailable" } }) });
  const { uploadFormImages } = load("lib/upload-form-images.ts", { "@/lib/supabase/client": { createClient: () => client } });
  await assert.rejects(uploadFormImages(photoForm(5 * 1024 * 1024 + 1), fields), /5 MB/);
  await assert.rejects(uploadFormImages(photoForm(10, "image/gif"), fields), /Only JPG/);
  assert.equal(client.calls.length, 0);
  await assert.rejects(uploadFormImages(photoForm(), fields), /Storage unavailable/);
});

test("retrying a failed save reuses the uploaded photo", async () => {
  const client = storageClient();
  const { uploadFormImages } = load("lib/upload-form-images.ts", { "@/lib/supabase/client": { createClient: () => client } });
  const original = photoForm();
  const file = original.get("image");
  await uploadFormImages(original, fields);
  const retry = new FormData();
  retry.set("image", file);
  await uploadFormImages(retry, fields);
  assert.equal(client.calls.length, 1);
  assert.equal(retry.get("uploaded_image_path"), original.get("uploaded_image_path"));
});

test("server verifies ownership, actual file metadata, and preserves existing photos", async () => {
  const { resolveUploadedImage } = load("lib/uploaded-image.ts");
  const client = storageClient();
  const data = new FormData();
  assert.equal((await resolveUploadedImage(client, "staff-user", data, fields[0], "/old.jpg")).url, "/old.jpg");
  data.set("uploaded_image_path", "someone-else/abc.jpg");
  assert.match((await resolveUploadedImage(client, "staff-user", data, fields[0], null)).error, /Invalid/);
  data.set("uploaded_image_path", "staff-user/abc.jpg");
  assert.match((await resolveUploadedImage(client, "staff-user", data, fields[0], null)).url, /abc.jpg$/);
  const oversized = storageClient({ info: async () => ({ data: { size: 6 * 1024 * 1024, contentType: "image/jpeg" }, error: null }) });
  assert.match((await resolveUploadedImage(oversized, "staff-user", data, fields[0], null)).error, /5 MB/);
  const invalid = storageClient({ info: async () => ({ data: { size: 100, contentType: "text/html" }, error: null }) });
  assert.match((await resolveUploadedImage(invalid, "staff-user", data, fields[0], null)).error, /Only JPG/);
  const missing = storageClient({ info: async () => ({ data: {}, error: null }) });
  assert.match((await resolveUploadedImage(missing, "staff-user", data, fields[0], null)).error, /verified/);
});

test("save rejection stays in the form and never resets entries", async () => {
  let state;
  let operation;
  let prevented = false;
  const { useStaffForm } = load("lib/use-staff-form.ts", {
    react: { useState: () => [null, (value) => { state = value; }], useTransition: () => [false, (callback) => { operation = callback(); }] },
    "@/lib/upload-form-images": {},
    "next/navigation": { unstable_rethrow: () => {} },
  }, { FormData: class { constructor(form) { return form; } } });
  const { onSubmit } = useStaffForm(async () => { throw new Error("Server failed"); });
  const form = photoForm(10);
  onSubmit({ preventDefault() { prevented = true; }, currentTarget: form });
  await operation;
  assert.equal(prevented, true);
  assert.match(state.error, /entries are still here/);
  assert.equal(form.get("description"), "Keep my edits");
});

test("successful save redirects are rethrown to the Next.js router", async () => {
  let operation;
  let state;
  const redirect = { digest: "NEXT_REDIRECT;push;/staff/facilities;307;" };
  const { useStaffForm } = load("lib/use-staff-form.ts", {
    react: { useState: () => [null, (value) => { state = value; }], useTransition: () => [false, (callback) => { operation = callback(); }] },
    "@/lib/upload-form-images": {},
    "next/navigation": { unstable_rethrow: (error) => { if (error === redirect) throw error; } },
  }, { FormData: class { constructor(form) { return form; } } });
  useStaffForm(async () => { throw redirect; }).onSubmit({ preventDefault() {}, currentTarget: photoForm(10) });
  await assert.rejects(operation, (error) => error === redirect);
  assert.equal(state, null);
});

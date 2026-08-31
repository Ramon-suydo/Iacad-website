import sharp from "sharp";
import { mkdir, readdir, rename, rm, stat } from "fs/promises";
import path from "path";

const SOURCE_DIR = "public/images/library/facilities";
const BACKUP_DIR = "public/images/library/facilities-original";

async function run() {
  await mkdir(BACKUP_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter(
    (file) => !file.startsWith("__optimized__") && /\.(jpg|jpeg|png)$/i.test(file)
  );

  console.log(`Found ${files.length} images to optimize...\n`);

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const tempPath = path.join(SOURCE_DIR, `__optimized__${file}`);

    // Resize and compress while preserving the source format.
    const image = sharp(inputPath).resize({ width: 1920, withoutEnlargement: true });
    if (/\.png$/i.test(file)) {
      await image.png({ compressionLevel: 9, quality: 78 }).toFile(tempPath);
    } else {
      await image.jpeg({ quality: 78, mozjpeg: true }).toFile(tempPath);
    }

    const oldStat = await stat(inputPath);
    const newStat = await stat(tempPath);

    // Move the exact original to the backup directory, then put the optimized
    // image in its place. Renaming avoids Windows file-truncation lock issues.
    await rm(backupPath, { force: true });
    await rename(inputPath, backupPath);
    await rename(tempPath, inputPath);

    const oldMB = (oldStat.size / 1024 / 1024).toFixed(2);
    const newMB = (newStat.size / 1024 / 1024).toFixed(2);
    console.log(`${file}: ${oldMB}MB → ${newMB}MB`);
  }

  console.log("\nDone. Originals backed up to facilities-original/");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

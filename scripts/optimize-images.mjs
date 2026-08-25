import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import path from "path";

const SOURCE_DIR = "public/images/library/facilities";
const BACKUP_DIR = "public/images/library/facilities-original";

async function run() {
  await mkdir(BACKUP_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((f) =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  console.log(`Found ${files.length} images to optimize...\n`);

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const tempPath = path.join(SOURCE_DIR, `__optimized__${file}`);

    // Backup original first
    await sharp(inputPath).toFile(backupPath);

    // Resize + compress
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tempPath);

    const { size: originalSize } = await sharp(inputPath).metadata();
    const fs = await import("fs/promises");
    const oldStat = await fs.stat(inputPath);
    const newStat = await fs.stat(tempPath);

    await fs.rm(inputPath);
    await fs.rename(tempPath, inputPath);

    const oldMB = (oldStat.size / 1024 / 1024).toFixed(2);
    const newMB = (newStat.size / 1024 / 1024).toFixed(2);
    console.log(`${file}: ${oldMB}MB → ${newMB}MB`);
  }

  console.log("\nDone. Originals backed up to facilities-original/");
}

run().catch(console.error);
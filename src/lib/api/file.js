import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const BASE_URL_UPLOAD = "/uploads/zplus";

export const generateFilepath = async (directory, filename) => {
  const uploadDir =
    process.env.NODE_ENV === "production"
      ? `/var/www${BASE_URL_UPLOAD}${directory}`
      : path.join(process.cwd(), `public${BASE_URL_UPLOAD}${directory}`);

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filepath = path.join(uploadDir, filename);

  return filepath;
};

export const saveFile = async (file, directory) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const extension = path.extname(file.name);
  const filename = `${timestamp}${extension}`;

  const filepath = await generateFilepath(directory, filename);
  await writeFile(filepath, buffer);

  return filename;
};

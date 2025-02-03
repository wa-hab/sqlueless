import { s3 } from "bun";

export const getUrl = (
  key: string,
  method: "PUT" | "GET",
  expiresIn: number = 3600,
): string => {
  return s3.presign(key, {
    expiresIn,
    method,
  });
};

export const generateStorageKey = (
  userId: string,
  fileName: string,
): string => {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${userId}/${timestamp}-${sanitizedFileName}`;
};

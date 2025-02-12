import { S3Client } from "bun";

const s3 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  bucket: process.env.CLOUDFLARE_BUCKET_NAME,
  secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY_SECRET,
  accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
});

export const storageClient = s3;

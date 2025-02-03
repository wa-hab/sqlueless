import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { requireAuth } from "@/lib/middleware/auth";
import { getUrl, generateStorageKey } from "@/repository/storage";

const app = new Hono();

const uploadSchema = z.object({
  fileName: z.string().min(1),
});

// Get upload URL
app.post(
  "/upload",
  requireAuth,
  zValidator("json", uploadSchema),
  async (c) => {
    const { fileName } = c.req.valid("json");
    const session = c.get("session");

    const key = generateStorageKey(session.userId, fileName);
    const uploadUrl = getUrl(key, "PUT");

    return c.json({
      key,
      url: uploadUrl,
    });
  },
);

// Get download URL
app.get("/download/:key", requireAuth, async (c) => {
  const key = c.req.param("key");

  try {
    const downloadUrl = getUrl(key, "GET");
    return c.json({ url: downloadUrl });
  } catch (error) {
    return c.json({ message: "File not found" }, 404);
  }
});

export const storageRouter = app;

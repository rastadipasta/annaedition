import { del, list } from "@vercel/blob";
import { getBlobToken } from "@/lib/blob-token";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const token = getBlobToken();
  if (!token) return Response.json({ error: "Storage is not configured" }, { status: 503 });
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  let cursor: string | undefined; let deleted = 0;
  do {
    const page = await list({ prefix: "inquiries/", cursor, limit: 100, token });
    const expired = page.blobs.filter((blob) => new Date(blob.uploadedAt).getTime() <= cutoff);
    if (expired.length) { await del(expired.map((blob) => blob.url), { token }); deleted += expired.length; }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return Response.json({ deleted });
}

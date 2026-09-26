// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { del, list } from "@vercel/blob";
import { GET } from "./route";

vi.mock("@vercel/blob", () => ({ del: vi.fn(), list: vi.fn() }));

describe("upload cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("CRON_SECRET", "test-cleanup-secret");
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "test-blob-token");
    vi.stubEnv("BOLB_READ_WRITE_TOKEN", "");
  });
  afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
  const request = (token = "test-cleanup-secret") => new Request("https://example.com/api/cleanup", { headers: { authorization: `Bearer ${token}` } });

  it("rejects missing configuration and wrong credentials without accessing storage", async () => {
    expect((await GET(request("wrong"))).status).toBe(401);
    vi.stubEnv("CRON_SECRET", "");
    expect((await GET(request())).status).toBe(401);
    expect(list).not.toHaveBeenCalled();
    expect(del).not.toHaveBeenCalled();
  });

  it("reports unavailable storage instead of silently claiming success", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    expect((await GET(request())).status).toBe(503);
  });

  it.each(["BLOB_READ_WRITE_TOKEN", "BOLB_READ_WRITE_TOKEN"])("deletes only expired inquiry files across all result pages using %s", async (variable) => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    vi.stubEnv(variable, "test-blob-token");
    const now = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(now);
    const cutoff = now - 30 * 24 * 60 * 60 * 1000;
    const blob = (url: string, uploadedAt: number) => ({ url, uploadedAt: new Date(uploadedAt), pathname: "inquiries/file.pdf", downloadUrl: url, size: 10, etag: "test-etag" });
    vi.mocked(list).mockResolvedValueOnce({ blobs: [blob("https://example.com/expired", cutoff), blob("https://example.com/recent", cutoff + 1)], hasMore: true, cursor: "next" });
    vi.mocked(list).mockResolvedValueOnce({ blobs: [blob("https://example.com/older", cutoff - 1)], hasMore: false });
    const response = await GET(request());
    expect(await response.json()).toEqual({ deleted: 2 });
    expect(list).toHaveBeenNthCalledWith(2, { prefix: "inquiries/", cursor: "next", limit: 100, token: "test-blob-token" });
    expect(del).toHaveBeenNthCalledWith(1, ["https://example.com/expired"], { token: "test-blob-token" });
    expect(del).toHaveBeenNthCalledWith(2, ["https://example.com/older"], { token: "test-blob-token" });
  });
});

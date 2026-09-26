// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleUpload } from "@vercel/blob/client";
import { POST } from "./route";

vi.mock("@vercel/blob/client", () => ({ handleUpload: vi.fn() }));

describe("upload token endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");
    vi.stubEnv("BOLB_READ_WRITE_TOKEN", "");
  });
  afterEach(() => vi.unstubAllEnvs());
  const request = () => new Request("https://example.com/api/upload", {
    method: "POST",
    body: JSON.stringify({ type: "blob.generate-client-token", payload: { pathname: "inquiries/test.pdf" } }),
  });

  it.each(["BLOB_READ_WRITE_TOKEN", "BOLB_READ_WRITE_TOKEN"])("passes %s to the SDK", async (variable) => {
    vi.stubEnv(variable, "test-blob-token");
    vi.mocked(handleUpload).mockResolvedValue({ type: "blob.generate-client-token", clientToken: "test-client-token" });
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ type: "blob.generate-client-token", clientToken: "test-client-token" });
    expect(handleUpload).toHaveBeenCalledWith(expect.objectContaining({ token: "test-blob-token" }));
  });

  it("rejects unconfigured storage without calling the SDK", async () => {
    expect((await POST(request())).status).toBe(503);
    expect(handleUpload).not.toHaveBeenCalled();
  });
});

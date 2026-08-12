import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: "Dateiupload ist lokal nicht konfiguriert." }, { status: 503 });
  try {
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("inquiries/")) throw new Error("Ungültiger Dateipfad");
        return { allowedContentTypes: ["image/jpeg", "image/png", "application/pdf"], maximumSizeInBytes: 25 * 1024 * 1024, addRandomSuffix: true };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Upload fehlgeschlagen" }, { status: 400 });
  }
}

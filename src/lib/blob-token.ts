// The connected Vercel store uses the custom BOLB prefix.
export function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || process.env.BOLB_READ_WRITE_TOKEN?.trim();
}

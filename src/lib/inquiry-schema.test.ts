import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";

const valid = {
  type: "private" as const,
  name: "Anna Beispiel",
  email: "anna@example.com",
  phone: "",
  message: "",
  consent: true as const,
  website: "",
  startedAt: Date.now() - 5000,
  attachmentUrls: [],
  details: { area: "Wohnzimmer" },
};

describe("inquirySchema", () => {
  it("accepts a valid private inquiry", () => { expect(inquirySchema.safeParse(valid).success).toBe(true); });
  it("supports all inquiry types", () => { for (const type of ["private", "business", "call"] as const) expect(inquirySchema.safeParse({ ...valid, type }).success).toBe(true); });
  it("rejects missing consent", () => { expect(inquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false); });
  it("rejects the honeypot field", () => { expect(inquirySchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false); });
  it("rejects invalid email and too many uploads", () => { expect(inquirySchema.safeParse({ ...valid, email: "invalid", attachmentUrls: Array(6).fill("https://example.com/a.pdf") }).success).toBe(false); });
});

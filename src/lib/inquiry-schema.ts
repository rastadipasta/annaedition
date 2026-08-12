import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["private", "business", "call"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().optional(),
  attachmentUrls: z.array(z.string().url()).max(5).optional().default([]),
  details: z.record(z.string(), z.union([z.string().max(1000), z.array(z.string().max(250)).max(10)])),
});

export type ValidInquiry = z.infer<typeof inquirySchema>;

import { Resend } from "resend";
import { ConfirmationEmail, InquiryEmail } from "@/emails/inquiry-email";
import { inquirySchema } from "@/lib/inquiry-schema";

export const runtime = "nodejs";

async function verifyTurnstile(token: string | undefined, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const body = new FormData(); body.append("secret", secret); body.append("response", token);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]; if (ip) body.append("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = await response.json() as { success?: boolean };
  return Boolean(result.success);
}

export async function POST(request: Request) {
  try {
    const parsed = inquirySchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Bitte prüfe die markierten Angaben.", issues: parsed.error.flatten() }, { status: 400 });
    const inquiry = parsed.data;
    if (Date.now() - inquiry.startedAt < 2500) return Response.json({ error: "Die Anfrage wurde zu schnell gesendet." }, { status: 400 });
    if (!(await verifyTurnstile(inquiry.turnstileToken, request))) return Response.json({ error: "Die Sicherheitsprüfung ist fehlgeschlagen." }, { status: 400 });

    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV !== "production") return Response.json({ ok: true, demo: true });
      return Response.json({ error: "Der E-Mail-Dienst ist noch nicht konfiguriert." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.INQUIRY_FROM_EMAIL || "ANNA ÉDITION <onboarding@resend.dev>";
    const to = process.env.INQUIRY_TO_EMAIL || "studio@annaedition.de";
    const id = crypto.randomUUID();
    const [studioMail, confirmation] = await Promise.all([
      resend.emails.send({ from, to, replyTo: inquiry.email, subject: `Neue ${inquiry.type}-Anfrage · ${inquiry.name}`, react: InquiryEmail({ inquiry }) }, { headers: { "Idempotency-Key": `inquiry-${id}` } }),
      resend.emails.send({ from, to: inquiry.email, subject: "Deine Anfrage bei ANNA ÉDITION", react: ConfirmationEmail({ inquiry }) }, { headers: { "Idempotency-Key": `confirmation-${id}` } }),
    ]);
    if (studioMail.error || confirmation.error) return Response.json({ error: "Die E-Mail konnte nicht vollständig zugestellt werden." }, { status: 502 });
    return Response.json({ ok: true, id: studioMail.data?.id });
  } catch {
    return Response.json({ error: "Unerwarteter Fehler. Bitte versuche es später erneut." }, { status: 500 });
  }
}

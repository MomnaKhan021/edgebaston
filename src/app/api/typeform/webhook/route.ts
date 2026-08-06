import crypto from "node:crypto";
import { db } from "@/lib/db";

// Typeform posts a form_response here on every submission; we store it as an
// Inquiry so it shows up in the admin → Inquiries tab.
export const dynamic = "force-dynamic";

type TfField = { id?: string; ref?: string; title?: string; type?: string };
type TfAnswer = {
  field?: { id?: string; ref?: string; type?: string };
  type?: string;
  text?: string;
  email?: string;
  phone_number?: string;
  url?: string;
  number?: number;
  boolean?: boolean;
  date?: string;
  choice?: { label?: string; other?: string };
  choices?: { labels?: string[] };
};

function answerValue(a: TfAnswer): string {
  switch (a.type) {
    case "text":
    case "long_text":
      return a.text ?? "";
    case "email":
      return a.email ?? "";
    case "phone_number":
      return a.phone_number ?? "";
    case "url":
      return a.url ?? "";
    case "number":
      return a.number != null ? String(a.number) : "";
    case "boolean":
      return a.boolean ? "Yes" : "No";
    case "date":
      return a.date ?? "";
    case "choice":
      return a.choice?.label ?? a.choice?.other ?? "";
    case "choices":
      return (a.choices?.labels ?? []).join(", ");
    default:
      return a.text ?? a.email ?? a.phone_number ?? "";
  }
}

export async function POST(req: Request) {
  const raw = await req.text();

  // Optional integrity check — set TYPEFORM_WEBHOOK_SECRET and the matching
  // secret on the Typeform webhook to reject spoofed posts.
  const secret = process.env.TYPEFORM_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get("typeform-signature") ?? "";
    const expected = "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("base64");
    const ok =
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!ok) return new Response("invalid signature", { status: 401 });
  }

  let payload: { form_response?: { definition?: { title?: string; fields?: TfField[] }; answers?: TfAnswer[] } };
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const fr = payload.form_response;
  if (!fr) return Response.json({ ok: true, skipped: "no form_response" });

  const fields = fr.definition?.fields ?? [];
  const answers = fr.answers ?? [];
  const titleFor = (a: TfAnswer) =>
    (fields.find((f) => f.id === a.field?.id)?.title ?? a.field?.ref ?? "Response").toString();

  // Heuristic: pull name/email/phone by matching the question title.
  const byKeyword = (kw: string) => {
    const hit = answers.find((a) => titleFor(a).toLowerCase().includes(kw));
    return hit ? answerValue(hit) : "";
  };
  const emailAnswer = answers.find((a) => a.type === "email");
  const phoneAnswer = answers.find((a) => a.type === "phone_number");

  const name = byKeyword("name") || "Typeform submission";
  const email = (emailAnswer ? answerValue(emailAnswer) : byKeyword("email")) || "";
  const phone = (phoneAnswer ? answerValue(phoneAnswer) : byKeyword("phone")) || "";
  const subject = byKeyword("subject") || fr.definition?.title || "Enquiry (Typeform)";
  const message =
    answers.map((a) => `${titleFor(a)}: ${answerValue(a)}`).join("\n") || "(no answers submitted)";

  try {
    await db.inquiry.create({ data: { name, email, phone, subject, message } });
  } catch (e) {
    // Never make Typeform retry forever on our DB hiccup — log and 200.
    console.error("[typeform-webhook] failed to store inquiry:", e);
    return Response.json({ ok: false, stored: false });
  }

  return Response.json({ ok: true, stored: true });
}

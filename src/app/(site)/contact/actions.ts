"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";

const schema = z.object({
  name: z.string().min(2, { error: "Please enter your name." }),
  email: z.email({ error: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, { error: "Please enter a short message." }),
});

export type ContactState = {
  ok?: boolean;
  error?: string;
};

export async function submitInquiry(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  await db.inquiry.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? "",
      subject: parsed.data.subject ?? "",
      message: parsed.data.message,
    },
  });

  // Keep the settings query warm so the page can show the confirmation.
  await getSettings();

  return { ok: true };
}

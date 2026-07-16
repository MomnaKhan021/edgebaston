"use server";

import { redirect } from "next/navigation";
import {
  verifyCredentials,
  createSession,
  destroySession,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }
  if (!verifyCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

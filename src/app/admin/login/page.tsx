import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default async function LoginPage() {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen items-center justify-center bg-eb-navy px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/logo-navy.svg"
            alt={settings.siteName}
            className="mx-auto mb-4 h-10 w-auto"
          />
          <h1 className="text-lg font-bold text-eb-navy">Content dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage {settings.siteName}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

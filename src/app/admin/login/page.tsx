import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default async function LoginPage() {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-background p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white">
            {settings.siteName.charAt(0)}
          </div>
          <h1 className="text-xl font-semibold">{settings.siteName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to the content dashboard
          </p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo credentials are set in your <code>.env</code> file.
        </p>
      </div>
    </div>
  );
}

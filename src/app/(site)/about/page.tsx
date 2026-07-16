import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-brand">
          About {settings.siteName}
        </h1>
        <p className="mt-2 text-muted-foreground">{settings.tagline}</p>
      </header>

      {settings.aboutText ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: settings.aboutText }}
        />
      ) : (
        <p className="text-muted-foreground">About content coming soon.</p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Our mission", body: "To provide accessible, high-quality education that empowers every student." },
          { title: "Our values", body: "Excellence, integrity, inclusion, and a lifelong love of learning." },
          { title: "Our community", body: "A diverse, supportive environment where everyone can thrive." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border bg-muted p-5">
            <h3 className="font-bold text-brand">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

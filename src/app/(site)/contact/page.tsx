import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-brand">Get in touch</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question about admissions, courses, or campus life? We&apos;d
          love to hear from you.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-muted p-6">
            <h2 className="mb-4 font-bold text-brand">Contact details</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="font-semibold">Address</div>
                <div className="text-muted-foreground">{settings.address}</div>
              </li>
              <li>
                <div className="font-semibold">Email</div>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-accent hover:underline"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                <div className="font-semibold">Phone</div>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-accent hover:underline"
                >
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

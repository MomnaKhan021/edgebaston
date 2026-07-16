import { getSettings } from "@/lib/settings";
import { saveSettings } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Field, Input, Textarea, SubmitButton } from "@/components/admin/ui";

export default async function SettingsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, sp] = await Promise.all([getSettings(), searchParams]);

  return (
    <form action={saveSettings} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand">Site settings</h1>
        <p className="text-sm text-muted-foreground">
          Branding, homepage hero, about text and contact details.
        </p>
      </div>

      {sp.saved && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          ✓ Settings saved.
        </p>
      )}

      {/* Branding */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-brand">Branding</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Site name" htmlFor="siteName">
            <Input id="siteName" name="siteName" defaultValue={settings.siteName} />
          </Field>
          <Field label="Tagline" htmlFor="tagline">
            <Input id="tagline" name="tagline" defaultValue={settings.tagline} />
          </Field>
          <Field label="Primary colour" htmlFor="primaryColor" hint="Used across the site.">
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primaryColor"
                defaultValue={settings.primaryColor}
                className="h-10 w-14 cursor-pointer rounded border"
              />
              <span className="text-sm text-muted-foreground">
                {settings.primaryColor}
              </span>
            </div>
          </Field>
          <Field label="Accent colour" htmlFor="accentColor">
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="accentColor"
                defaultValue={settings.accentColor}
                className="h-10 w-14 cursor-pointer rounded border"
              />
              <span className="text-sm text-muted-foreground">
                {settings.accentColor}
              </span>
            </div>
          </Field>
        </div>
      </section>

      {/* Homepage hero */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-brand">Homepage hero</h2>
        <div className="space-y-4">
          <Field label="Hero title" htmlFor="heroTitle">
            <Input id="heroTitle" name="heroTitle" defaultValue={settings.heroTitle} />
          </Field>
          <Field label="Hero subtitle" htmlFor="heroSubtitle">
            <Textarea
              id="heroSubtitle"
              name="heroSubtitle"
              rows={2}
              defaultValue={settings.heroSubtitle}
            />
          </Field>
          <Field
            label="Hero background image URL"
            htmlFor="heroImageUrl"
            hint="Optional. Shown faded behind the hero text."
          >
            <Input
              id="heroImageUrl"
              name="heroImageUrl"
              defaultValue={settings.heroImageUrl}
              placeholder="https://…"
            />
          </Field>
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-brand">About page content</h2>
        <RichTextEditor
          name="aboutText"
          defaultValue={settings.aboutText}
          placeholder="Tell visitors about the college…"
        />
      </section>

      {/* Contact */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-brand">Contact details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={settings.email} />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={settings.phone} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Address" htmlFor="address">
              <Input id="address" name="address" defaultValue={settings.address} />
            </Field>
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 -mx-4 border-t bg-muted/80 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <SubmitButton>Save settings</SubmitButton>
      </div>
    </form>
  );
}

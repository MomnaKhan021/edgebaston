import { getSettings } from "@/lib/settings";
import { saveSettings } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
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
        <h1 className="text-2xl font-bold text-eb-navy">Site settings</h1>
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
        <h2 className="mb-4 font-bold text-eb-navy">Branding</h2>
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

      {/* SEO & metadata */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-eb-navy">SEO &amp; metadata</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The title and description search engines (Google) and browser tabs show, plus the favicon (the little icon in the browser tab).
        </p>
        <div className="space-y-4">
          <Field
            label="Meta title"
            htmlFor="metaTitle"
            hint="Shown in the browser tab and as the headline in search results. Aim for ~50–60 characters. Leave empty to use the site name and tagline."
          >
            <Input id="metaTitle" name="metaTitle" defaultValue={settings.metaTitle} placeholder="Edgbaston College — Sixth Form in Birmingham" />
          </Field>
          <Field
            label="Meta description"
            htmlFor="metaDescription"
            hint="The summary under the title in search results. Aim for ~150–160 characters. Leave empty to use the tagline."
          >
            <Textarea
              id="metaDescription"
              name="metaDescription"
              rows={3}
              defaultValue={settings.metaDescription}
              placeholder="Birmingham's top-performing independent sixth form college…"
            />
          </Field>
          <Field
            label="Favicon"
            hint="The small icon shown in the browser tab. Upload a square PNG or ICO (32×32 or larger)."
          >
            <ImageUpload name="faviconUrl" defaultValue={settings.faviconUrl} aspect="aspect-square" />
          </Field>
          <Field
            label="Social share image"
            hint="The preview image shown when the site link is shared on WhatsApp, Facebook, LinkedIn, etc. Use a wide image — 1200×630 works best. Leave empty to use the home banner by default."
          >
            <ImageUpload name="ogImageUrl" defaultValue={settings.ogImageUrl} aspect="aspect-[1200/630]" />
          </Field>
          <Field
            label="Google Analytics GA4 ID"
            htmlFor="ga4Id"
            hint="Your GA4 Measurement ID (starts with G-). Found in Google Analytics → Admin → Data streams. Leave empty to disable tracking."
          >
            <Input id="ga4Id" name="ga4Id" defaultValue={settings.ga4Id} placeholder="G-XXXXXXXXXX" />
          </Field>
        </div>
      </section>

      {/* Homepage hero */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-eb-navy">Homepage hero</h2>
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
            label="Hero background image"
            hint="Optional. Shown faded behind the hero text."
          >
            <ImageUpload name="heroImageUrl" defaultValue={settings.heroImageUrl} aspect="aspect-[16/9]" />
          </Field>
        </div>
      </section>

      {/* About */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-eb-navy">About page content</h2>
        <RichTextEditor
          name="aboutText"
          defaultValue={settings.aboutText}
          placeholder="Tell visitors about the college…"
        />
      </section>

      {/* Contact */}
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-eb-navy">Contact details</h2>
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

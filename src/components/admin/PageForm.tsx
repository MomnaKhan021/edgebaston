import Link from "next/link";
import { savePage } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { RedirectField } from "@/components/admin/RedirectField";
import { Field, Input, Textarea, Toggle, SubmitButton } from "@/components/admin/ui";

type PageValues = {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  redirectUrl?: string;
  showInNav?: boolean;
  published?: boolean;
  order?: number;
};

export function PageForm({ page }: { page?: PageValues }) {
  const p = page ?? {};
  const isEdit = Boolean(p.id);

  return (
    <form action={savePage} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={p.id} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eb-navy">
          {isEdit ? "Edit page" : "New page"}
        </h1>
        <Link
          href="/admin/pages"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Page title *" htmlFor="title">
            <Input id="title" name="title" required defaultValue={p.title} />
          </Field>
          <Field
            label="URL slug"
            htmlFor="slug"
            hint={
              p.slug
                ? `Lives at /${p.slug}`
                : "Leave blank to auto-generate. Use slashes for nested paths, e.g. guard/course → /guard/course"
            }
          >
            <Input
              id="slug"
              name="slug"
              defaultValue={p.slug}
              placeholder="auto (e.g. guard/course)"
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <Field label="Page content" hint="Full rich-text content for this page.">
          <RichTextEditor
            name="content"
            defaultValue={p.content ?? ""}
            placeholder="Write your page content here…"
          />
        </Field>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <RedirectField defaultValue={p.redirectUrl} noun="page" />
      </div>

      {/* SEO — per-page meta title & description (also used by template copies) */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-eb-navy">SEO &amp; metadata</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The title and description that search engines (Google) and browser tabs show for this page.
        </p>
        <div className="space-y-4">
          <Field
            label="Meta title"
            htmlFor="metaTitle"
            hint="Shown in the browser tab and as the headline in search results (~50–60 characters). Leave empty to use the page title."
          >
            <Input id="metaTitle" name="metaTitle" defaultValue={p.metaTitle} />
          </Field>
          <Field
            label="Meta description"
            htmlFor="metaDescription"
            hint="The summary under the title in search results (~150–160 characters). Leave empty to auto-generate from the page content."
          >
            <Textarea id="metaDescription" name="metaDescription" rows={3} defaultValue={p.metaDescription} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Nav order" htmlFor="order">
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={p.order ?? 0}
            />
          </Field>
          <div className="flex items-end pb-2">
            <Toggle
              name="published"
              label="Published"
              defaultChecked={p.published ?? true}
            />
          </div>
          <div className="flex items-end pb-2">
            <Toggle
              name="showInNav"
              label="Show in navigation"
              defaultChecked={p.showInNav ?? false}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton>{isEdit ? "Save changes" : "Create page"}</SubmitButton>
        <Link
          href="/admin/pages"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

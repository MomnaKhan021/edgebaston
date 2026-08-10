import Link from "next/link";
import { savePost } from "@/app/admin/actions";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RedirectField } from "@/components/admin/RedirectField";
import { Field, Input, Textarea, Toggle, SubmitButton } from "@/components/admin/ui";

type PostValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  category?: string;
  imageUrl?: string;
  authorName?: string;
  authorImage?: string;
  redirectUrl?: string;
  published?: boolean;
  featured?: boolean;
  order?: number;
};

export function PostForm({ post }: { post?: PostValues }) {
  const p = post ?? {};
  const isEdit = Boolean(p.id);

  return (
    <form action={savePost} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={p.id} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eb-navy">{isEdit ? "Edit post" : "New post"}</h1>
        <Link href="/admin/blog" className="text-sm font-medium text-muted-foreground hover:underline">← Back</Link>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Post title *" htmlFor="title">
            <Input id="title" name="title" required defaultValue={p.title} />
          </Field>
          <Field label="URL slug" htmlFor="slug" hint={p.slug ? `Lives at /blog/${p.slug}` : "Leave blank to auto-generate from the title."}>
            <Input id="slug" name="slug" defaultValue={p.slug} placeholder="auto" />
          </Field>
          <Field label="Category" htmlFor="category" hint="Drives the filter tabs, e.g. Implants, Orthodontics, White Teeth.">
            <Input id="category" name="category" defaultValue={p.category} placeholder="e.g. Implants" />
          </Field>
          <Field label="Author name" htmlFor="authorName">
            <Input id="authorName" name="authorName" defaultValue={p.authorName} placeholder="e.g. Owais Ahmed" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Excerpt" hint="Short summary shown on the listing card.">
            <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={p.excerpt ?? ""} />
          </Field>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <Field label="Cover image" hint="Shown on the listing card and at the top of the article.">
            <ImageUpload name="imageUrl" defaultValue={p.imageUrl ?? ""} />
          </Field>
        </div>
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <Field label="Author photo">
            <ImageUpload name="authorImage" defaultValue={p.authorImage ?? ""} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <Field label="Article content" hint="Type in Visual, or switch to the HTML tab to paste full HTML markup (kept exactly). Headings, links and buttons take the site's branding automatically.">
          <ArticleEditor name="content" defaultValue={p.content ?? ""} />
        </Field>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <RedirectField defaultValue={p.redirectUrl} noun="article" />
      </div>

      {/* SEO — per-post meta title & description */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="mb-1 font-bold text-eb-navy">SEO &amp; metadata</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The title and description that search engines (Google) and browser tabs show for this article.
        </p>
        <div className="space-y-4">
          <Field
            label="Meta title"
            htmlFor="metaTitle"
            hint="Shown in the browser tab and as the headline in search results (~50–60 characters). Leave empty to use the post title."
          >
            <Input id="metaTitle" name="metaTitle" defaultValue={p.metaTitle} />
          </Field>
          <Field
            label="Meta description"
            htmlFor="metaDescription"
            hint="The summary under the title in search results (~150–160 characters). Leave empty to use the excerpt."
          >
            <Textarea id="metaDescription" name="metaDescription" rows={3} defaultValue={p.metaDescription} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Order" htmlFor="order" hint="Lower shows first.">
            <Input id="order" name="order" type="number" defaultValue={p.order ?? 0} />
          </Field>
          <div className="flex items-end pb-2">
            <Toggle name="published" label="Published" defaultChecked={p.published ?? true} />
          </div>
          <div className="flex items-end pb-2">
            <Toggle name="featured" label="Featured" defaultChecked={p.featured ?? false} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton>{isEdit ? "Save changes" : "Create post"}</SubmitButton>
        <Link href="/admin/blog" className="text-sm font-medium text-muted-foreground hover:underline">Cancel</Link>
      </div>
    </form>
  );
}

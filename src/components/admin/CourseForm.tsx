import Link from "next/link";
import { saveCourse } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Field, Input, Textarea, Select, Toggle, SubmitButton } from "@/components/admin/ui";

type CourseValues = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  level?: string;
  duration?: string;
  fee?: string;
  summary?: string;
  content?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
  order?: number;
};

const LEVELS = [
  "Undergraduate",
  "Postgraduate",
  "Diploma",
  "Certificate",
  "Foundation",
].map((v) => ({ value: v, label: v }));

export function CourseForm({ course }: { course?: CourseValues }) {
  const c = course ?? {};
  const isEdit = Boolean(c.id);

  return (
    <form action={saveCourse} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={c.id} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand">
          {isEdit ? "Edit course" : "New course"}
        </h1>
        <Link
          href="/admin/courses"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Course title *" htmlFor="title">
            <Input id="title" name="title" required defaultValue={c.title} />
          </Field>
          <Field
            label="URL slug"
            htmlFor="slug"
            hint="Leave blank to auto-generate from the title."
          >
            <Input id="slug" name="slug" defaultValue={c.slug} placeholder="auto" />
          </Field>
          <Field label="Category" htmlFor="category">
            <Input
              id="category"
              name="category"
              defaultValue={c.category ?? "General"}
            />
          </Field>
          <Field label="Level" htmlFor="level">
            <Select
              id="level"
              name="level"
              defaultValue={c.level ?? "Undergraduate"}
              options={LEVELS}
            />
          </Field>
          <Field label="Duration" htmlFor="duration">
            <Input
              id="duration"
              name="duration"
              defaultValue={c.duration}
              placeholder="e.g. 3 years"
            />
          </Field>
          <Field label="Fees" htmlFor="fee">
            <Input
              id="fee"
              name="fee"
              defaultValue={c.fee}
              placeholder="e.g. £9,250 / year"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field
            label="Short summary"
            htmlFor="summary"
            hint="A one-line blurb shown on course cards."
          >
            <Textarea
              id="summary"
              name="summary"
              rows={2}
              defaultValue={c.summary}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Image URL" htmlFor="imageUrl">
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={c.imageUrl}
              placeholder="https://…"
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <Field label="Full description" hint="Rich text — this appears on the course page.">
          <RichTextEditor
            name="content"
            defaultValue={c.content ?? ""}
            placeholder="Describe the course, modules, careers…"
          />
        </Field>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Display order" htmlFor="order">
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={c.order ?? 0}
            />
          </Field>
          <div className="flex items-end pb-2">
            <Toggle
              name="published"
              label="Published"
              defaultChecked={c.published ?? true}
            />
          </div>
          <div className="flex items-end pb-2">
            <Toggle
              name="featured"
              label="Feature on homepage"
              defaultChecked={c.featured ?? false}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton>{isEdit ? "Save changes" : "Create course"}</SubmitButton>
        <Link
          href="/admin/courses"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

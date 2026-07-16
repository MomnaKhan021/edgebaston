import Link from "next/link";
import { saveStaff } from "@/app/admin/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Field, Input, Select, Toggle, SubmitButton } from "@/components/admin/ui";

type StaffValues = {
  id?: string;
  name?: string;
  role?: string;
  department?: string;
  category?: string;
  email?: string;
  phone?: string;
  bio?: string;
  photoUrl?: string;
  published?: boolean;
  order?: number;
};

const CATEGORIES = ["Admin", "Faculty", "Support"].map((v) => ({
  value: v,
  label: v,
}));

export function StaffForm({ member }: { member?: StaffValues }) {
  const m = member ?? {};
  const isEdit = Boolean(m.id);

  return (
    <form action={saveStaff} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={m.id} />}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand">
          {isEdit ? "Edit staff member" : "New staff member"}
        </h1>
        <Link
          href="/admin/staff"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name *" htmlFor="name">
            <Input id="name" name="name" required defaultValue={m.name} />
          </Field>
          <Field label="Role / title" htmlFor="role">
            <Input
              id="role"
              name="role"
              defaultValue={m.role}
              placeholder="e.g. Head of Business"
            />
          </Field>
          <Field label="Department" htmlFor="department">
            <Input
              id="department"
              name="department"
              defaultValue={m.department}
            />
          </Field>
          <Field label="Category" htmlFor="category">
            <Select
              id="category"
              name="category"
              defaultValue={m.category ?? "Faculty"}
              options={CATEGORIES}
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={m.email} />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={m.phone} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Photo URL" htmlFor="photoUrl">
            <Input
              id="photoUrl"
              name="photoUrl"
              defaultValue={m.photoUrl}
              placeholder="https://…"
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <Field label="Biography" hint="Rich text — appears on the faculty page.">
          <RichTextEditor
            name="bio"
            defaultValue={m.bio ?? ""}
            placeholder="A short professional biography…"
          />
        </Field>
      </div>

      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display order" htmlFor="order">
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={m.order ?? 0}
            />
          </Field>
          <div className="flex items-end pb-2">
            <Toggle
              name="published"
              label="Visible on site"
              defaultChecked={m.published ?? true}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton>{isEdit ? "Save changes" : "Add member"}</SubmitButton>
        <Link
          href="/admin/staff"
          className="text-sm font-medium text-muted-foreground hover:underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { compressDataUri, compressInlineImages } from "@/lib/images";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { toSlug, toPathSlug } from "@/lib/utils";

/** Guard used by every mutating action (Server Actions are directly callable). */
async function assertAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function str(formData: FormData, key: string, fallback = ""): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : fallback;
}
function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}
function int(formData: FormData, key: string, fallback = 0): number {
  const n = parseInt(str(formData, key), 10);
  return Number.isNaN(n) ? fallback : n;
}
/** Normalise a redirect URL: trim, drop if empty, ensure it has a scheme. */
function redirectUrl(formData: FormData, key: string): string {
  const raw = str(formData, key).trim();
  if (!raw) return "";
  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith("/")) return raw;
  return `https://${raw}`;
}

/** Ensure a slug is unique for a model, appending -2, -3, … if needed. */
async function uniqueSlug(
  model: "course" | "page",
  base: string,
  currentId?: string,
): Promise<string> {
  // Pages may live at nested paths (e.g. "guard/course"); courses are flat.
  const root = (model === "page" ? toPathSlug(base) : toSlug(base)) || "item";
  let slug = root;
  let i = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing =
      model === "course"
        ? await db.course.findUnique({ where: { slug } })
        : await db.page.findUnique({ where: { slug } });
    if (!existing || existing.id === currentId) return slug;
    i += 1;
    slug = `${root}-${i}`;
  }
}

/* ----------------------------- Courses ----------------------------- */

export async function saveCourse(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  const title = str(formData, "title").trim();
  if (!title) throw new Error("Title is required");

  const slug = await uniqueSlug("course", str(formData, "slug") || title, id || undefined);

  const data = {
    title,
    slug,
    category: str(formData, "category", "General"),
    level: str(formData, "level", "Undergraduate"),
    duration: str(formData, "duration"),
    fee: str(formData, "fee"),
    summary: str(formData, "summary"),
    content: await compressInlineImages(str(formData, "content")),
    imageUrl: await compressDataUri(str(formData, "imageUrl")),
    redirectUrl: redirectUrl(formData, "redirectUrl"),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    order: int(formData, "order"),
  };

  if (id) {
    await db.course.update({ where: { id }, data });
  } else {
    await db.course.create({ data });
  }

  revalidateTag("courses", "max");
  revalidatePath("/courses");
  revalidatePath("/");
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourse(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  if (id) await db.course.delete({ where: { id } });
  revalidateTag("courses", "max");
  revalidatePath("/courses");
  revalidatePath("/admin/courses");
}

/* ------------------------------ Staff ------------------------------ */

export async function saveStaff(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  const name = str(formData, "name").trim();
  if (!name) throw new Error("Name is required");

  const data = {
    name,
    role: str(formData, "role"),
    department: str(formData, "department"),
    category: str(formData, "category", "Faculty"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    bio: str(formData, "bio"),
    photoUrl: await compressDataUri(str(formData, "photoUrl"), 800),
    published: bool(formData, "published"),
    order: int(formData, "order"),
  };

  if (id) {
    await db.staff.update({ where: { id }, data });
  } else {
    await db.staff.create({ data });
  }

  revalidatePath("/faculty");
  revalidatePath("/");
  revalidatePath("/admin/staff");
  redirect("/admin/staff");
}

export async function deleteStaff(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  if (id) await db.staff.delete({ where: { id } });
  revalidatePath("/faculty");
  revalidatePath("/admin/staff");
}

/* ------------------------------ Pages ------------------------------ */

export async function savePage(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  const title = str(formData, "title").trim();
  if (!title) throw new Error("Title is required");

  const slug = await uniqueSlug("page", str(formData, "slug") || title, id || undefined);

  const data = {
    title,
    slug,
    content: await compressInlineImages(str(formData, "content")),
    redirectUrl: redirectUrl(formData, "redirectUrl"),
    showInNav: bool(formData, "showInNav"),
    published: bool(formData, "published"),
    order: int(formData, "order"),
  };

  if (id) {
    await db.page.update({ where: { id }, data });
  } else {
    await db.page.create({ data });
  }

  revalidatePath("/", "layout"); // nav links may have changed
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deletePage(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  if (id) await db.page.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/pages");
}

/* ---------------------------- Inquiries ---------------------------- */

export async function toggleInquiryRead(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  const read = bool(formData, "read");
  if (id) await db.inquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  if (id) await db.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}

/* ----------------------------- Settings ---------------------------- */

export async function saveSettings(formData: FormData) {
  await assertAuth();
  const data = {
    siteName: str(formData, "siteName", "Edgebaston College"),
    tagline: str(formData, "tagline"),
    heroTitle: str(formData, "heroTitle"),
    heroSubtitle: str(formData, "heroSubtitle"),
    heroImageUrl: await compressDataUri(str(formData, "heroImageUrl")),
    aboutText: str(formData, "aboutText"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    address: str(formData, "address"),
    primaryColor: str(formData, "primaryColor", "#1e3a5f"),
    accentColor: str(formData, "accentColor", "#c9a227"),
  };

  await db.siteSetting.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidateTag("settings", "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

/* ------------------------- Template sections ------------------------- */

/**
 * Save one template section's fields (from /admin/templates). Field names
 * come from the section definition in src/lib/templates.ts; image fields are
 * compressed before storing. The public site re-renders immediately.
 */
export async function saveSection(formData: FormData) {
  await assertAuth();
  const { getSectionDef } = await import("@/lib/templates");

  const template = str(formData, "_template");
  const key = str(formData, "_section");
  const def = getSectionDef(template, key);
  if (!def) throw new Error("Unknown section");

  const data: Record<string, string> = {};
  for (const field of def.fields) {
    let value = str(formData, field.name);
    if (field.type === "image" && value.startsWith("data:image/")) {
      value = await compressDataUri(value);
    }
    if (field.type === "url") value = redirectUrl(formData, field.name);
    data[field.name] = value;
  }

  await db.templateSection.upsert({
    where: { template_key: { template, key } },
    update: { data: JSON.stringify(data) },
    create: { template, key, data: JSON.stringify(data) },
  });

  revalidateTag("sections", "max");
  revalidatePath("/", "layout");
  redirect(`/admin/templates/${template}?saved=${key}`);
}

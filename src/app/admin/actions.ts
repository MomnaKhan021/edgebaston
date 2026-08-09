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
/**
 * A full URL pointing at our own deploy host (e.g. *.vercel.app) is rewritten
 * to a relative path so links keep working after the real domain goes live.
 */
function toRelativeIfInternal(u: string): string {
  try {
    const p = new URL(u);
    if (/(^|\.)vercel\.app$/i.test(p.hostname)) return (p.pathname + p.search + p.hash) || "/";
  } catch {
    /* not absolute — leave as-is */
  }
  return u;
}

/**
 * Normalise a link: trim, drop if empty, keep site-relative paths as-is, and
 * ensure external links have a scheme (rewriting our own deploy host to a path).
 */
function redirectUrl(formData: FormData, key: string): string {
  const raw = str(formData, key).trim();
  if (!raw) return "";
  if (raw.startsWith("/")) return raw; // already a site-relative path
  const withScheme = /^(https?:)?\/\//i.test(raw) ? raw.replace(/^\/\//, "https://") : `https://${raw}`;
  return toRelativeIfInternal(withScheme);
}

/** Ensure a slug is unique for a model, appending -2, -3, … if needed. */
async function uniqueSlug(
  model: "course" | "page" | "post",
  base: string,
  currentId?: string,
): Promise<string> {
  // Pages may live at nested paths (e.g. "guard/course"); courses/posts are flat.
  const root = (model === "page" ? toPathSlug(base) : toSlug(base)) || "item";
  let slug = root;
  let i = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing =
      model === "course"
        ? await db.course.findUnique({ where: { slug } })
        : model === "post"
          ? await db.post.findUnique({ where: { slug } })
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
    metaTitle: str(formData, "metaTitle").trim(),
    metaDescription: str(formData, "metaDescription").trim(),
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

/* ------------------------------ Blog posts ------------------------------ */

export async function savePost(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  const title = str(formData, "title").trim();
  if (!title) throw new Error("Title is required");

  const slug = await uniqueSlug("post", str(formData, "slug") || title, id || undefined);

  let authorImage = str(formData, "authorImage");
  if (authorImage.startsWith("data:image/")) authorImage = await compressDataUri(authorImage, 200);
  let imageUrl = str(formData, "imageUrl");
  if (imageUrl.startsWith("data:image/")) imageUrl = await compressDataUri(imageUrl, 1400);

  const data = {
    title,
    slug,
    excerpt: str(formData, "excerpt").trim(),
    content: await compressInlineImages(str(formData, "content")),
    metaTitle: str(formData, "metaTitle").trim(),
    metaDescription: str(formData, "metaDescription").trim(),
    category: str(formData, "category").trim(),
    imageUrl,
    authorName: str(formData, "authorName").trim(),
    authorImage,
    redirectUrl: redirectUrl(formData, "redirectUrl"),
    published: bool(formData, "published"),
    featured: bool(formData, "featured"),
    order: int(formData, "order"),
  };

  if (id) {
    await db.post.update({ where: { id }, data });
  } else {
    await db.post.create({ data });
  }

  revalidateTag("sections", "max");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await assertAuth();
  const id = str(formData, "id");
  if (id) await db.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
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
    metaTitle: str(formData, "metaTitle"),
    metaDescription: str(formData, "metaDescription"),
    faviconUrl: await compressDataUri(str(formData, "faviconUrl")),
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
  const { instancePageId } = await import("@/lib/templateInstances");

  const template = str(formData, "_template");
  const key = str(formData, "_section");
  // For a template-backed page, rows live under "inst_<id>" but the field
  // definitions come from its base template.
  const pageId = instancePageId(template);
  let baseKey = template;
  if (pageId) {
    const pg = await db.page.findUnique({ where: { id: pageId } });
    if (!pg) throw new Error("Unknown page");
    baseKey = pg.templateKey;
  }
  const def = getSectionDef(baseKey, key);
  if (!def) throw new Error("Unknown section");

  const data: Record<string, string> = {};
  for (const field of def.fields) {
    let value = str(formData, field.name);
    if (field.type === "image" && value.startsWith("data:image/")) {
      value = await compressDataUri(value);
    }
    if (field.type === "rich") value = await compressInlineImages(value);
    if (field.type === "menu") {
      const { parseMenu } = await import("@/lib/templates");
      value = JSON.stringify(parseMenu(value));
    }
    if (field.type === "url") value = redirectUrl(formData, field.name);
    if (field.type === "list") {
      // Keep only the defined item fields and compress uploaded images.
      let items: Record<string, string>[] = [];
      try {
        const arr = JSON.parse(value || "[]");
        if (Array.isArray(arr)) {
          for (const raw of arr) {
            if (!raw || typeof raw !== "object") continue;
            const item: Record<string, string> = {};
            for (const f of field.itemFields ?? []) {
              let v = String((raw as Record<string, unknown>)[f.name] ?? "");
              if (f.type === "image" && v.startsWith("data:image/")) {
                v = await compressDataUri(v, 1200);
              }
              item[f.name] = v;
            }
            items.push(item);
          }
        }
      } catch {
        items = [];
      }
      value = JSON.stringify(items);
    }
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

/**
 * Copy saved content between two items. Values are "<type>:<id>":
 *   template:<key>  — a designed page template
 *   inst:<pageId>   — a page built from a template (section content in inst_<id>)
 *   course:<id>     — a course
 *   page:<id>       — a plain rich-text page
 * Section-based items (template + inst) copy with each other; courses copy with
 * courses; plain pages copy with plain pages. Anything else is a mismatch.
 */
/**
 * Turn a page on/off on the live site from the template dashboard. Works for
 * both a designed page template (stored in the "__page" section flag) and a
 * template-backed page instance ("inst_<id>", stored on its Page row).
 */
/** Read a designed page's existing "__page" settings (published + SEO meta). */
async function readPageMeta(template: string): Promise<Record<string, string>> {
  const row = await db.templateSection.findUnique({
    where: { template_key: { template, key: "__page" } },
  });
  if (!row?.data) return {};
  try {
    const obj = JSON.parse(row.data);
    return obj && typeof obj === "object" ? (obj as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** Merge new fields into a page's "__page" settings without clobbering the rest. */
async function upsertPageMeta(template: string, patch: Record<string, string>) {
  const merged = { ...(await readPageMeta(template)), ...patch };
  const data = JSON.stringify(merged);
  await db.templateSection.upsert({
    where: { template_key: { template, key: "__page" } },
    update: { data },
    create: { template, key: "__page", data },
  });
}

export async function setPagePublished(formData: FormData) {
  await assertAuth();
  const template = str(formData, "template");
  if (!template) redirect("/admin/templates");
  const published = bool(formData, "published");
  const { instancePageId } = await import("@/lib/templateInstances");
  const pageId = instancePageId(template);
  if (pageId) {
    await db.page.update({ where: { id: pageId }, data: { published } });
  } else {
    await upsertPageMeta(template, { published: published ? "1" : "0" });
  }
  revalidateTag("sections", "max");
  revalidatePath("/", "layout");
  redirect(`/admin/templates/${template}?status=${published ? "on" : "off"}`);
}

/** Save a designed page's SEO meta title/description (merged into "__page"). */
export async function savePageMeta(formData: FormData) {
  await assertAuth();
  const template = str(formData, "template");
  if (!template) redirect("/admin/templates");
  await upsertPageMeta(template, {
    metaTitle: str(formData, "metaTitle").trim(),
    metaDescription: str(formData, "metaDescription").trim(),
    redirectUrl: redirectUrl(formData, "redirectUrl"),
  });
  revalidateTag("sections", "max");
  revalidatePath("/", "layout");
  redirect(`/admin/templates/${template}?saved=meta`);
}

export async function duplicateTemplate(formData: FormData) {
  await assertAuth();
  const { getTemplateDef } = await import("@/lib/templates");
  const { instanceNamespace } = await import("@/lib/templateInstances");
  const from = str(formData, "from");
  const to = str(formData, "to");
  if (!from || !to || from === to) redirect("/admin/templates?copied=invalid");

  const split = (v: string) => {
    const [type, ...rest] = v.split(":");
    return { type, id: rest.join(":") };
  };
  const family = (type: string) =>
    type === "template" || type === "inst" ? "section" : type;

  const a = split(from);
  const b = split(to);
  if (family(a.type) !== family(b.type)) redirect("/admin/templates?copied=mismatch");

  // Resolve a section-based item to its base template def + DB namespace + name.
  const resolveSection = async (item: { type: string; id: string }) => {
    if (item.type === "template") {
      const def = getTemplateDef(item.id);
      return def ? { def, ns: item.id, name: def.name } : null;
    }
    const pg = await db.page.findUnique({ where: { id: item.id } });
    if (!pg) return null;
    const def = getTemplateDef(pg.templateKey);
    return def ? { def, ns: instanceNamespace(pg.id), name: pg.title } : null;
  };

  let copied = 0;
  let name = "";

  if (family(a.type) === "section") {
    const src = await resolveSection(a);
    const tgt = await resolveSection(b);
    if (!src || !tgt) redirect("/admin/templates?copied=invalid");
    name = tgt.name;
    // Only copy sections that also exist on the target (matching keys).
    const toKeys = new Set(tgt.def.sections.map((s) => s.key));
    const rows = await db.templateSection.findMany({ where: { template: src.ns } });
    for (const r of rows) {
      if (!toKeys.has(r.key)) continue;
      await db.templateSection.upsert({
        where: { template_key: { template: tgt.ns, key: r.key } },
        update: { data: r.data },
        create: { template: tgt.ns, key: r.key, data: r.data },
      });
      copied++;
    }
  } else if (a.type === "course") {
    const src = await db.course.findUnique({ where: { id: a.id } });
    const tgt = await db.course.findUnique({ where: { id: b.id } });
    if (!src || !tgt) redirect("/admin/templates?copied=invalid");
    await db.course.update({
      where: { id: b.id },
      data: {
        category: src.category,
        level: src.level,
        duration: src.duration,
        fee: src.fee,
        summary: src.summary,
        content: src.content,
        imageUrl: src.imageUrl,
      },
    });
    copied = 1;
    name = tgt.title;
  } else if (a.type === "page") {
    const src = await db.page.findUnique({ where: { id: a.id } });
    const tgt = await db.page.findUnique({ where: { id: b.id } });
    if (!src || !tgt) redirect("/admin/templates?copied=invalid");
    await db.page.update({
      where: { id: b.id },
      data: { content: src.content, redirectUrl: src.redirectUrl },
    });
    copied = 1;
    name = tgt.title;
  } else {
    redirect("/admin/templates?copied=invalid");
  }

  revalidateTag("sections", "max");
  revalidatePath("/", "layout");
  redirect(`/admin/templates?copied=${copied}&name=${encodeURIComponent(name)}`);
}

/**
 * Create a brand-new page from a designed template. The new Page renders that
 * template's layout at its own slug, pre-filled with a copy of the template's
 * current content (stored under the "inst_<id>" namespace) that can then be
 * edited independently.
 */
export async function createPageFromTemplate(formData: FormData) {
  await assertAuth();
  const { canInstance, instanceNamespace } = await import("@/lib/templateInstances");
  const templateKey = str(formData, "template");
  const title = str(formData, "title").trim();
  if (!title || !canInstance(templateKey)) {
    redirect("/admin/templates?created=invalid");
  }

  const slug = await uniqueSlug("page", str(formData, "slug").trim() || title);
  const page = await db.page.create({
    data: { title, slug, templateKey, published: true },
  });

  // Seed the new page's content with a copy of the template's current content.
  const ns = instanceNamespace(page.id);
  const rows = await db.templateSection.findMany({ where: { template: templateKey } });
  for (const r of rows) {
    await db.templateSection.create({ data: { template: ns, key: r.key, data: r.data } });
  }

  revalidateTag("sections", "max");
  revalidatePath("/", "layout");
  redirect(`/admin/templates/${ns}?created=1`);
}

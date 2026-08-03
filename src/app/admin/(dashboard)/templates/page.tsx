import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { IconTemplates } from "@/components/admin/icons";

export default function TemplatesAdmin() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eb-navy">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Edit the content of each designed page, section by section. Changes go live as soon as you save.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <Link
            key={t.key}
            href={`/admin/templates/${t.key}`}
            className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-eb-cream text-eb-navy">
                <IconTemplates className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-eb-navy group-hover:text-eb-blue">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.sections.length} sections</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

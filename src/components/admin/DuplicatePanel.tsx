"use client";

import { useState } from "react";
import { duplicateTemplate } from "@/app/admin/actions";

type Opt = { key: string; name: string };

/**
 * "Copy content between pages" tool — copies the saved content of one page's
 * template onto another existing page (matching sections only).
 */
export function DuplicatePanel({ templates }: { templates: Opt[] }) {
  const [from, setFrom] = useState(templates[0]?.key ?? "");
  const [to, setTo] = useState(templates[1]?.key ?? "");

  const select =
    "rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue";

  return (
    <form action={duplicateTemplate} className="rounded-2xl border bg-background p-5 shadow-sm">
      <h2 className="text-sm font-bold text-eb-navy">Copy content between pages</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Copies the saved content of one page onto another. Only sections that both pages share are
        copied; the target page&apos;s matching sections are overwritten. This can&apos;t be undone.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">Copy from</span>
          <select name="from" value={from} onChange={(e) => setFrom(e.target.value)} className={select}>
            {templates.map((t) => (
              <option key={t.key} value={t.key}>{t.name}</option>
            ))}
          </select>
        </label>
        <span className="pb-2 text-muted-foreground">→</span>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">Copy to</span>
          <select name="to" value={to} onChange={(e) => setTo(e.target.value)} className={select}>
            {templates.map((t) => (
              <option key={t.key} value={t.key}>{t.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={from === to}
          className="rounded-lg bg-eb-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-eb-blue disabled:opacity-40"
        >
          Copy content
        </button>
      </div>
    </form>
  );
}

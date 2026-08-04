"use client";

import { useState } from "react";
import { duplicateTemplate } from "@/app/admin/actions";

type Opt = { value: string; name: string };
type Group = { label: string; options: Opt[] };

/**
 * "Copy content between items" tool — copies the saved content of one page,
 * course or custom page onto another of the SAME type. Options are grouped so
 * the client can pick any designed page, course or custom page from one list.
 */
export function DuplicatePanel({ groups }: { groups: Group[] }) {
  const all = groups.flatMap((g) => g.options);
  const [from, setFrom] = useState(all[0]?.value ?? "");
  const [to, setTo] = useState(all[1]?.value ?? all[0]?.value ?? "");

  const select =
    "min-w-[220px] rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue";

  // Copy families: designed pages + pages built from templates share sections
  // ("section"); courses and plain custom pages copy within their own kind.
  const family = (v: string) => {
    const type = v.split(":")[0];
    return type === "template" || type === "inst" ? "section" : type;
  };
  const sameType = family(from) === family(to);
  const disabled = from === to || !sameType;

  const renderOptions = () =>
    groups.map((g) => (
      <optgroup key={g.label} label={g.label}>
        {g.options.map((o) => (
          <option key={o.value} value={o.value}>{o.name}</option>
        ))}
      </optgroup>
    ));

  return (
    <form action={duplicateTemplate} className="rounded-2xl border bg-background p-5 shadow-sm">
      <h2 className="text-sm font-bold text-eb-navy">Copy content between items</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Copies saved content between two items of the same kind — designed pages and pages built from
        templates copy with each other; courses copy with courses; custom pages with custom pages. Only
        sections both share are copied. The target is overwritten; this can&apos;t be undone.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">Copy from</span>
          <select name="from" value={from} onChange={(e) => setFrom(e.target.value)} className={select}>
            {renderOptions()}
          </select>
        </label>
        <span className="pb-2 text-muted-foreground">→</span>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">Copy to</span>
          <select name="to" value={to} onChange={(e) => setTo(e.target.value)} className={select}>
            {renderOptions()}
          </select>
        </label>
        <button
          type="submit"
          disabled={disabled}
          className="rounded-lg bg-eb-navy px-5 py-2 text-sm font-bold text-white transition hover:bg-eb-blue disabled:opacity-40"
        >
          Copy content
        </button>
      </div>
      {!sameType && from && to && (
        <p className="mt-3 text-xs font-medium text-amber-600">
          Pick two items of the same type to copy between them.
        </p>
      )}
    </form>
  );
}

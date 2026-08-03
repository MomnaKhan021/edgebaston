"use client";

import { useRef, useState } from "react";
import type { FieldDef } from "@/lib/templates";

type Item = Record<string, string>;

function parseInitial(value: unknown): Item[] {
  const norm = (arr: unknown[]): Item[] =>
    arr
      .filter((x) => x && typeof x === "object")
      .map((x) => Object.fromEntries(Object.entries(x as object).map(([k, v]) => [k, String(v ?? "")])));

  if (Array.isArray(value)) return norm(value);
  const raw = String(value ?? "").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return arr
          .filter((x) => x && typeof x === "object")
          .map((x) => Object.fromEntries(Object.entries(x).map(([k, v]) => [k, String(v ?? "")])));
      }
    } catch {
      /* ignore */
    }
  }
  // Legacy "Label | /url" lines
  return raw
    .split("\n")
    .map((line) => {
      const [label, url] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", url: url ?? "" };
    })
    .filter((l) => l.label);
}

function ItemImage({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-14 w-20 rounded-md border object-cover" />
      ) : (
        <div className="grid h-14 w-20 place-items-center rounded-md border border-dashed text-[10px] text-muted-foreground">
          No image
        </div>
      )}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-eb-navy hover:bg-eb-cream"
      >
        {value ? "Replace" : "Upload"}
      </button>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-xs font-medium text-muted-foreground hover:text-red-600"
        >
          Remove
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange(String(reader.result ?? ""));
          reader.readAsDataURL(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/**
 * Repeatable-items editor (cards, menu items, articles…). Items are stored
 * as a JSON array in a single hidden input; the server action sanitises and
 * compresses any uploaded images on save.
 */
export function ListField({
  name,
  itemLabel = "Item",
  itemFields,
  defaultValue = "",
}: {
  name: string;
  itemLabel?: string;
  itemFields: FieldDef[];
  defaultValue?: unknown;
}) {
  const [items, setItems] = useState<Item[]>(() => parseInitial(defaultValue));

  const update = (i: number, key: string, value: string) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
  const remove = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const add = () =>
    setItems((prev) => [...prev, Object.fromEntries(itemFields.map((f) => [f.name, ""]))]);

  const inputCls =
    "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue";

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      {items.map((item, i) => (
        <div key={i} className="rounded-xl border bg-background p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-eb-navy">
              {itemLabel} {i + 1}
            </p>
            <div className="flex items-center gap-1.5">
              <button type="button" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}
                className="grid h-7 w-7 place-items-center rounded-md border text-eb-navy hover:bg-eb-cream disabled:opacity-30">
                ↑
              </button>
              <button type="button" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}
                className="grid h-7 w-7 place-items-center rounded-md border text-eb-navy hover:bg-eb-cream disabled:opacity-30">
                ↓
              </button>
              <button type="button" onClick={() => remove(i)}
                className="ml-1 rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                Remove
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {itemFields.map((f) => (
              <div key={f.name}>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">{f.label}</label>
                {f.type === "image" ? (
                  <ItemImage value={item[f.name] ?? ""} onChange={(v) => update(i, f.name, v)} />
                ) : f.type === "textarea" ? (
                  <textarea rows={3} value={item[f.name] ?? ""} onChange={(e) => update(i, f.name, e.target.value)} className={inputCls} />
                ) : (
                  <input
                    type="text"
                    value={item[f.name] ?? ""}
                    onChange={(e) => update(i, f.name, e.target.value)}
                    placeholder={f.type === "url" ? "/contact or https://…" : undefined}
                    className={inputCls}
                  />
                )}
                {f.hint && <p className="mt-1 text-[11px] text-muted-foreground">{f.hint}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full rounded-xl border-2 border-dashed border-eb-blue/40 py-3 text-sm font-bold text-eb-blue transition hover:border-eb-blue hover:bg-eb-blue/5"
      >
        + Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

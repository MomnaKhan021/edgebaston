"use client";

import { useState } from "react";

type Item = { label: string; url: string; children: Item[] };

const MAX_DEPTH = 3;
const emptyItem = (): Item => ({ label: "", url: "", children: [] });

function parseInitial(value: unknown): Item[] {
  const norm = (arr: unknown): Item[] =>
    (Array.isArray(arr) ? arr : [])
      .filter((x) => x && typeof x === "object")
      .map((x) => {
        const o = x as Record<string, unknown>;
        return { label: String(o.label ?? ""), url: String(o.url ?? o.href ?? ""), children: norm(o.children) };
      });
  if (Array.isArray(value)) return norm(value);
  const raw = String(value ?? "").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      return norm(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }
  return raw
    .split("\n")
    .map((l) => {
      const [label, url] = l.split("|").map((s) => s.trim());
      return { label: label ?? "", url: url ?? "", children: [] as Item[] };
    })
    .filter((i) => i.label);
}

/** Apply `fn` to the sibling list that contains the item at `path`. */
function mutateList(items: Item[], path: number[], fn: (list: Item[], index: number) => Item[]): Item[] {
  if (path.length === 1) return fn(items, path[0]);
  const [i, ...rest] = path;
  return items.map((it, idx) => (idx === i ? { ...it, children: mutateList(it.children, rest, fn) } : it));
}
/** Apply `fn` to the single item at `path`. */
function mutateItem(items: Item[], path: number[], fn: (it: Item) => Item): Item[] {
  const [i, ...rest] = path;
  return items.map((it, idx) =>
    idx === i ? (rest.length ? { ...it, children: mutateItem(it.children, rest, fn) } : fn(it)) : it,
  );
}

/**
 * Nested menu editor. Each item has a label + link and can hold sub-items up
 * to three levels deep. The whole tree is serialised to a hidden input so it
 * submits with the section form.
 */
export function MenuBuilder({ name, defaultValue = "" }: { name: string; defaultValue?: unknown }) {
  const [items, setItems] = useState<Item[]>(() => parseInitial(defaultValue));

  const setField = (path: number[], key: "label" | "url", val: string) =>
    setItems((prev) => mutateList(prev, path, (list, i) => list.map((it, idx) => (idx === i ? { ...it, [key]: val } : it))));
  const remove = (path: number[]) =>
    setItems((prev) => mutateList(prev, path, (list, i) => list.filter((_, idx) => idx !== i)));
  const move = (path: number[], dir: -1 | 1) =>
    setItems((prev) =>
      mutateList(prev, path, (list, i) => {
        const j = i + dir;
        if (j < 0 || j >= list.length) return list;
        const next = [...list];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      }),
    );
  const addChild = (path: number[]) =>
    setItems((prev) => mutateItem(prev, path, (it) => ({ ...it, children: [...it.children, emptyItem()] })));
  const addRoot = () => setItems((prev) => [...prev, emptyItem()]);

  const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue";

  const renderList = (list: Item[], parentPath: number[]) =>
    list.map((item, i) => {
      const path = [...parentPath, i];
      const depth = path.length; // 1-based
      return (
        <div key={i} className="rounded-xl border bg-background p-3" style={{ marginLeft: depth > 1 ? 0 : undefined }}>
          <div className="flex items-start gap-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <input
                value={item.label}
                placeholder="Menu label (e.g. Courses)"
                onChange={(e) => setField(path, "label", e.target.value)}
                className={inputCls}
              />
              <input
                value={item.url}
                placeholder="/courses or https://…"
                onChange={(e) => setField(path, "url", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" aria-label="Move up" onClick={() => move(path, -1)} disabled={i === 0}
                className="grid h-8 w-8 place-items-center rounded-md border text-eb-navy hover:bg-eb-cream disabled:opacity-30">↑</button>
              <button type="button" aria-label="Move down" onClick={() => move(path, 1)} disabled={i === list.length - 1}
                className="grid h-8 w-8 place-items-center rounded-md border text-eb-navy hover:bg-eb-cream disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(path)}
                className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">Remove</button>
            </div>
          </div>

          {(item.children.length > 0 || depth < MAX_DEPTH) && (
            <div className="mt-3 space-y-2 border-l-2 border-eb-blue/20 pl-3 sm:pl-4">
              {renderList(item.children, path)}
              {depth < MAX_DEPTH && (
                <button
                  type="button"
                  onClick={() => addChild(path)}
                  className="rounded-lg border border-dashed border-eb-blue/40 px-3 py-1.5 text-xs font-bold text-eb-blue transition hover:border-eb-blue hover:bg-eb-blue/5"
                >
                  + Add sub-item under &ldquo;{item.label || "this item"}&rdquo;
                </button>
              )}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {renderList(items, [])}
      <button
        type="button"
        onClick={addRoot}
        className="w-full rounded-xl border-2 border-dashed border-eb-blue/40 py-3 text-sm font-bold text-eb-blue transition hover:border-eb-blue hover:bg-eb-blue/5"
      >
        + Add menu item
      </button>
    </div>
  );
}

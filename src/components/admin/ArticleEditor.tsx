"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

/**
 * Blog article editor with two tabs sharing one value:
 *  • Visual — the rich editor (great for typing prose).
 *  • HTML   — a raw code box that stores EXACTLY what you paste/type, so full
 *    HTML markup is preserved verbatim (the article renders it as-is, styled
 *    by the site's branding). Use this tab when pasting HTML — the visual
 *    editor may drop tags it doesn't understand.
 *
 * A single hidden input (`name`) submits the value with the form.
 */
export function ArticleEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"visual" | "html">("visual");
  // Remount the rich editor with the latest value each time we enter Visual.
  const [richKey, setRichKey] = useState(0);

  const tab = (active: boolean) =>
    "rounded-lg px-3 py-1.5 text-xs font-bold transition " +
    (active ? "bg-eb-navy text-white" : "text-eb-navy hover:bg-eb-cream");

  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div className="mb-2 inline-flex gap-1 rounded-xl border bg-background p-1">
        <button type="button" className={tab(mode === "visual")} onClick={() => { setRichKey((k) => k + 1); setMode("visual"); }}>
          Visual
        </button>
        <button type="button" className={tab(mode === "html")} onClick={() => setMode("html")}>
          {"</> HTML"}
        </button>
      </div>

      {mode === "visual" ? (
        <RichTextEditor key={richKey} name={`${name}__visual`} defaultValue={value} onChange={setValue} placeholder="Write the article…" />
      ) : (
        <div className="overflow-hidden rounded-lg border bg-background">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            placeholder="<p>Paste or write full HTML here…</p>"
            className="block min-h-[360px] w-full resize-y bg-background px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground outline-none"
          />
          <p className="border-t bg-muted px-4 py-2 text-[11px] text-muted-foreground">
            Raw HTML — kept exactly as typed and styled with the site&apos;s branding on the article page.
          </p>
        </div>
      )}
    </div>
  );
}
